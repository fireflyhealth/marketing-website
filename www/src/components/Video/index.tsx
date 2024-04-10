import { FC, useState, useRef, useEffect, useCallback } from 'react';
import Vimeo from '@vimeo/player';
import cn from 'classnames';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import * as SanityTypes from '@/types/sanity';
import { Button } from '@/atoms/Button';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { SimpleIcon } from '@/svgs/SimpleIcon';
import {
  OuterVideoWrapper,
  VideoWrapper,
  PosterImage,
  VideoPlayer,
  PlayButton,
  FullscreenButton,
} from './styles';
import { VideoTitleCard } from './VideoTitleCard';

type Props = {
  video: SanityTypes.Video;
  posterSizes: string[];
  showTitleCard?: boolean;
  titleCardProps?: Pick<
    SanityTypes.VideoHeader,
    'eyebrow' | 'heading' | 'body'
  >;
  width?: string;
  autoplay?: boolean;
  isHighlighted?: boolean;
  posterImagePriority?: boolean;
};

const Video: FC<Props> = ({
  video,
  posterSizes,
  showTitleCard,
  titleCardProps,
  width,
  autoplay = false,
  isHighlighted = false,
  posterImagePriority,
}) => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const aspectRatio = video.videoRatio || 9 / 16;

  const { isIntersecting } = useIntersectionObserver(videoContainerRef, {
    /* Begin loading the video when it is visible and within 25% of the top and bottom of the viewport */
    rootMargin: '-25% 0px -25% 0px',
    threshold: 0.5,
  });

  const [player, setPlayer] = useState<Vimeo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // set video player
  useEffect(() => {
    if (!videoRef.current) return;

    const options = {
      url: video.videoLink,
      controls: true,
      responsive: false,
      muted: true,
      playsinline: true,
    };

    const videoPlayer = new Vimeo(videoRef.current, options);

    setPlayer(videoPlayer);

    videoPlayer.on('play', () => {
      setIsPlaying(true);
    });

    videoPlayer.on('pause', () => setIsPlaying(false));

    videoPlayer.on('ended', () => {
      const resetVideo = () =>
        setTimeout(() => {
          videoPlayer.setCurrentTime(0);
          setIsPlaying(false);
        }, 1500);
      resetVideo();
      return () => {
        clearTimeout(resetVideo());
      };
    });
  }, [videoRef, video.videoLink]);

  useEffect(() => {
    if (player) {
      player.ready().then(() => {
        if (videoRef.current) {
          const vimeoIframe = videoRef.current.querySelector('iframe');
          if (!isPlaying) {
            vimeoIframe?.setAttribute('tabindex', '-1');
          } else {
            vimeoIframe?.setAttribute('tabindex', '0');
          }
        }
      });
    }
  }, [player, isPlaying]);

  const handlePlay = useCallback(async () => {
    if (!player) return;
    const isPaused = await player.getPaused();
    if (isPaused) {
      /* NOTE:
       * This is not a true "fix" for the "The play() request was interrupted
       * by a call to pause()" error. This happens when the user quickly scrolls
       * past an autoplay video, because:
       * - element enters view:
       *   - handlePlay() is called
       *   - player.play() is called
       * - element goes out of view:
       *   - handlePause() is called
       *   - player.getPaused() returns false (even though player.play() has not finished)
       *   - player.pause() is called
       *     - player.play() has not finished, so it throws the error.
       *
       * This try/catch (and that in handlePause) prevents this error from crashing
       * the page, however, it still occurs. But, the behavior will still be what we
       * want it to: since player.play() fails, the video will not be playing when we
       * do not want it to be.
       */
      try {
        await player.play();
      } catch (e) {
        const message = e instanceof Error ? e.message : 'failed to play';
        console.error(message);
      }
    }
  }, [player]);

  const handlePause = useCallback(async () => {
    if (!player) return;
    const isPaused = await player.getPaused();
    if (!isPaused) {
      /* See note above */
      try {
        await player.pause();
      } catch (e) {
        const message = e instanceof Error ? e.message : 'failed to play';
        console.error(message);
      }
    }
  }, [player]);

  // handle autoplay when video is in view
  useEffect(() => {
    if (!autoplay) return;
    if (isIntersecting) {
      handlePlay();
    } else {
      handlePause();
    }
  }, [autoplay, isIntersecting, handlePlay, handlePause]);

  function handleFullscreen() {
    player?.requestFullscreen();
  }

  const togglePlay = () => (isPlaying ? handlePause() : handlePlay());

  if (!video.videoLink) return null;

  return (
    <div
      ref={videoContainerRef}
      id="video-component"
      className={cn(OuterVideoWrapper, {
        'flex flex-col md:flex-none': showTitleCard && titleCardProps,
      })}
    >
      <div className="w-full" style={{ paddingTop: `${aspectRatio * 100}%` }} />
      <div className={cn(VideoWrapper, width ? `${width}` : 'w-full')}>
        <div
          id="video-poster-image"
          className={cn(PosterImage, 'transition-all', {
            'opacity-0 pointer-events-none': isPlaying,
          })}
          onLoad={() => {
            setIsReady(true);
          }}
        >
          <SanityImage
            image={video.posterImage}
            aspectRatio={aspectRatio}
            sizes={posterSizes}
            priority={posterImagePriority}
          />
        </div>

        <div
          ref={videoRef}
          className={cn(VideoPlayer, isReady ? '' : 'opacity-1')}
        />
        {autoplay === true && (
          <div
            className={cn(FullscreenButton, 'transition-all', {
              'opacity-0 pointer-events-none': isPlaying,
            })}
          >
            <button
              onClick={handleFullscreen}
              aria-label="Open video in fullscreen"
            >
              <SimpleIcon
                type="external-link"
                wrapperStyles={cn(
                  isHighlighted ? 'theme-text-color-decorative' : 'text-yellow',
                )}
              />
            </button>
          </div>
        )}
        {autoplay === false && !showTitleCard && !titleCardProps && (
          <div
            className={cn(PlayButton, 'transition-all', {
              'opacity-0 pointer-events-none': isPlaying,
            })}
          >
            <Button
              variant="primary"
              label="Play video"
              id="video-play-button"
              onClick={togglePlay}
            />
          </div>
        )}
      </div>
      {showTitleCard && titleCardProps && (
        <VideoTitleCard
          eyebrow={titleCardProps.eyebrow}
          heading={titleCardProps.heading}
          body={titleCardProps.body}
          isPlaying={isPlaying}
          onClick={togglePlay}
          wrapperClassName={cn('transition-all', {
            'md:opacity-0 md:pointer-events-none': isPlaying,
          })}
        />
      )}
    </div>
  );
};

/* 
  This component is dynamically imported across the app
  so we have to use a default export in order to do so.
*/
export default Video;
