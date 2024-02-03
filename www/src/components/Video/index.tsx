import { FC, useState, useRef, useEffect, SyntheticEvent } from 'react';
import Vimeo from '@vimeo/player';
import cn from 'classnames';
import * as SanityTypes from '@/types/sanity';
import { SimpleIcon } from '@/svgs/SimpleIcon';
import { Button } from '@/atoms/Button';
import { SanityImage } from '@/atoms/Image/SanityImage';
import {
  VideoWrapper,
  PosterImage,
  VideoPlayer,
  Controls,
  ProgressWrapper,
  ProgressSeekButton,
  ProgressBar,
  PlayButton,
  Duration,
} from './styles';

type Props = {
  video: SanityTypes.Video;
  width?: string;
};

export const Video: FC<Props> = ({ video, width }) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLProgressElement>(null);

  const [player, setPlayer] = useState<Vimeo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(0);

  // calculate time and stylize to 0:00 format
  const calculateTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  };

  // set video player
  useEffect(() => {
    if (!videoRef.current) return;

    const options = {
      url: video.videoLink,
      controls: false,
      responsive: true,
    };

    const videoPlayer = new Vimeo(videoRef.current, options);

    setPlayer(videoPlayer);

    videoPlayer.on('play', () => setIsPlaying(true));

    videoPlayer.on('pause', () => setIsPlaying(false));

    videoPlayer.on('timeupdate', ({ duration, percent, seconds }) => {
      // update progress bar
      setProgress(percent * 100);

      // set total duration of video
      setTotalDuration(duration);

      // set and update duration of video
      setCurrentDuration(seconds);
    });

    videoPlayer.on('volumechange', ({ volume }) => {
      if (volume === 0) {
        setIsMuted(true);
      } else setIsMuted(false);
    });

    videoPlayer.on('fullscreenchange', ({ fullscreen }) => {
      if (fullscreen) {
        setIsFullscreen(true);
      } else setIsFullscreen(false);
    });

    videoPlayer.on('ended', () => {
      const resetVideo = () =>
        setTimeout(() => {
          videoPlayer.setCurrentTime(0);
          setIsPlaying(false);
          videoPlayer.exitFullscreen();
          setIsFullscreen(false);
        }, 1500);
      resetVideo();
      return () => {
        clearTimeout(resetVideo());
      };
    });
  }, [videoRef, video.videoLink]);

  // controls fullscreen icon when entering and exiting
  // fullscreen mode while the video is playing
  useEffect(() => {
    if (isPlaying && isFullscreen) {
      setIsFullscreen(false);
    }
  }, [isPlaying, isFullscreen]);

  function handlePlay() {
    player?.play();
  }

  function handlePause() {
    player?.pause();
  }

  function handleMute() {
    player?.setVolume(0);
  }

  function handleUnmute() {
    player?.setVolume(1);
  }

  function handleFullscreen() {
    player?.getFullscreen();
    player?.requestFullscreen();
  }

  function handleExitFullscreen() {
    player?.exitFullscreen();
  }

  const togglePlay = () => (isPlaying ? handlePause() : handlePlay());
  const toggleMute = () => (isMuted ? handleUnmute() : handleMute());
  const toggleFullscreen = () =>
    isFullscreen ? handleExitFullscreen() : handleFullscreen();

  const seek = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!player) return;
    const clientRect = progressRef.current?.getBoundingClientRect();

    const pageX = e.pageX;
    const max = await player.getDuration();
    const left = clientRect?.left || 0;
    const width = clientRect?.width || 0;

    let position = pageX - left;
    position = position < 0 ? 0 : position;
    position = position > width ? width : position;

    const percent = (position * 100) / width;
    const time = +(percent * (max / 100)).toFixed(0);
    player.setCurrentTime(time);
  };

  if (!video.videoLink) return null;

  return (
    <div className={cn(VideoWrapper, width ? `${width}` : 'w-full')}>
      {!isPlaying && (
        <div className={cn(PosterImage)}>
          <SanityImage
            image={video.posterImage}
            aspectRatio={9 / 16}
            sizes={['57vw', '90vw', '66vw']}
          />
        </div>
      )}
      <div ref={videoRef} className={cn(VideoPlayer)} />
      <>
        {isPlaying ? (
          <div className={cn(Controls)}>
            <button onClick={togglePlay} aria-label="Pause">
              <SimpleIcon type="pause" className="w-4 text-yellow-light" />
            </button>
            <div className={cn(ProgressWrapper)}>
              <div className={cn(Duration)}>
                {calculateTime(currentDuration)}
              </div>
              <button onClick={seek} className={cn(ProgressSeekButton)}>
                <progress
                  ref={progressRef}
                  id="progress-bar"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                  className={cn(ProgressBar)}
                  max="100"
                  value={progress}
                />
              </button>
              <div className={cn(Duration)}>{calculateTime(totalDuration)}</div>
            </div>
            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <SimpleIcon
                  type="sound-mute"
                  className="w-4 text-yellow-light"
                />
              ) : (
                <SimpleIcon type="sound-on" className="w-4 text-yellow-light" />
              )}
            </button>
            <button
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? (
                <SimpleIcon
                  type="exit-fullscreen"
                  className="w-4 text-yellow-light"
                />
              ) : (
                <SimpleIcon
                  type="fullscreen"
                  className="w-4 text-yellow-light"
                />
              )}
            </button>
          </div>
        ) : (
          <div className={cn(PlayButton)}>
            <Button
              variant="primary"
              label="Play video"
              id="video-play-button"
              onClick={togglePlay}
            />
          </div>
        )}
      </>
    </div>
  );
};
