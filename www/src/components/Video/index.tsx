import { FC, useState, useRef, useEffect } from 'react';
import { useInView } from 'react-hook-inview';
import Vimeo from '@vimeo/player';
import cn from 'classnames';
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
};

export const Video: FC<Props> = ({
  video,
  posterSizes,
  showTitleCard,
  titleCardProps,
  width,
  autoplay = false,
  isHighlighted = false,
}) => {
  const videoRef = useRef<HTMLDivElement>(null);

  const [inViewRef, inView] = useInView({
    threshold: 1,
  });

  const [player, setPlayer] = useState<Vimeo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // set video player
  useEffect(() => {
    if (!videoRef.current) return;

    const options = {
      url: video.videoLink,
      controls: true,
      responsive: true,
    };

    const videoPlayer = new Vimeo(videoRef.current, options);

    setPlayer(videoPlayer);

    videoPlayer.on('play', () => setIsPlaying(true));

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

  // handle autoplay when video is in view
  useEffect(() => {
    if (inView) {
      setIsPlaying(true);
      handlePlay();
    } else {
      setIsPlaying(false);
      handlePause();
    }
  }, [inView]);

  function handlePlay() {
    player?.play();
  }

  function handlePause() {
    player?.pause();
  }

  function handleFullscreen() {
    player?.requestFullscreen();
  }

  const togglePlay = () => (isPlaying ? handlePause() : handlePlay());

  if (!video.videoLink) return null;

  return (
    <div ref={inViewRef} id="video-component" className={cn(OuterVideoWrapper)}>
      <div className={cn(VideoWrapper, width ? `${width}` : 'w-full')}>
        {!isPlaying && (
          <div
            id="video-poster-image"
            className={cn(PosterImage)}
            onLoad={() => {
              if (!videoRef.current) return;
              videoRef.current.style.opacity = '1';
            }}
          >
            <SanityImage
              image={video.posterImage}
              aspectRatio={9 / 16}
              sizes={posterSizes}
            />
          </div>
        )}
        <div ref={videoRef} className={cn(VideoPlayer, 'opacity-0')} />
        {autoplay === true && !isPlaying && (
          <div className={cn(FullscreenButton)}>
            <button onClick={handleFullscreen}>
              <SimpleIcon
                type="external-link"
                wrapperStyles={cn(
                  isHighlighted ? 'theme-text-color-decorative' : 'text-yellow',
                )}
              />
            </button>
          </div>
        )}
        {autoplay === false && !isPlaying && (
          <div className={cn(PlayButton)}>
            <Button
              variant="primary"
              label="Play video"
              id="video-play-button"
              onClick={togglePlay}
            />
          </div>
        )}
      </div>
      {showTitleCard && titleCardProps && !isPlaying && (
        <VideoTitleCard
          eyebrow={titleCardProps.eyebrow}
          heading={titleCardProps.heading}
          body={titleCardProps.body}
          onClick={togglePlay}
        />
      )}
    </div>
  );
};
