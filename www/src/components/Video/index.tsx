import { FC, useState, useRef, useEffect, SyntheticEvent } from 'react';
import Vimeo from '@vimeo/player';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { Button } from '@/atoms/Button';
import { SanityImage } from '@/atoms/Image/SanityImage';
import { VideoWrapper, PosterImage, VideoPlayer, PlayButton } from './styles';

type Props = {
  video: SanityTypes.Video;
  posterSizes: string[];
  width?: string;
};

export const Video: FC<Props> = ({ video, posterSizes, width }) => {
  const videoRef = useRef<HTMLDivElement>(null);

  const [player, setPlayer] = useState<Vimeo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [totalDuration, setTotalDuration] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);

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

    videoPlayer.on('timeupdate', ({ duration, percent, seconds }) => {
      // set total duration of video
      setTotalDuration(duration);

      // set and update duration of video
      setCurrentDuration(seconds);
    });

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

  function handlePlay() {
    player?.play();
  }

  function handlePause() {
    player?.pause();
  }

  const togglePlay = () => (isPlaying ? handlePause() : handlePlay());

  if (!video.videoLink) return null;

  return (
    <div className={cn(VideoWrapper, width ? `${width}` : 'w-full')}>
      {!isPlaying && (
        <div
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
      {!isPlaying && (
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
  );
};
