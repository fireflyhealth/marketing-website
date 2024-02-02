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
import type Player from 'vimeo__player';

type Props = {
  video: SanityTypes.Video;
  width?: string;
};

export const Video: FC<Props> = ({ video, width }) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLProgressElement>(null);

  const [player, setPlayer] = useState<Player | null>(null);
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
    videoPlayer.on('timeupdate', ({ percent }) => setProgress(percent * 100));
  }, [videoRef, video.videoLink]);

  // reset video progress after video finishes
  useEffect(() => {
    if (!player) return;

    if (progress === 100) {
      setTimeout(() => {
        player.setCurrentTime(0);
        setIsPlaying(false);
        player.exitFullscreen();
        setIsFullscreen(false);
      }, 1000);
    }
  }, [player, progress]);

  // set total duration of video
  useEffect(() => {
    if (!player) return;
    player.getDuration().then((res) => setTotalDuration(res));
  }, [player]);

  // set and update current duration of video
  useEffect(() => {
    if (!player) return;

    player.on('timeupdate', () => {
      player.getCurrentTime().then((res) => setCurrentDuration(res));
    });
  }, [player]);

  // controls fullscreen icon when entering and exiting
  // fullscreen mode while the video is playing
  useEffect(() => {
    if (isPlaying && isFullscreen) {
      setIsFullscreen(false);
    }
  }, [isPlaying, isFullscreen]);

  function handlePlay() {
    if (!player) return;
    player?.play();

    setIsPlaying(true);
  }

  function handlePause() {
    if (!player) return;
    player.pause();

    setIsPlaying(false);
  }

  function handleMute() {
    if (!player) return;
    setIsMuted(true);
    player.setVolume(0);
  }

  function handleUnmute() {
    if (!player) return;
    setIsMuted(false);
    player.setVolume(1);
  }

  function handleFullscreen() {
    if (!player) return;
    player.getFullscreen();
    player.requestFullscreen();
    setIsFullscreen(true);
  }

  function handleExitFullscreen() {
    if (!player) return;
    player.exitFullscreen();
    setIsFullscreen(false);
  }

  const togglePlay = () => (isPlaying ? handlePause() : handlePlay());
  const toggleMute = () => (isMuted ? handleUnmute() : handleMute());
  const toggleFullscreen = () =>
    isFullscreen ? handleExitFullscreen() : handleFullscreen();

  const seek = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!player) return;
    const clientRect = progressRef.current?.getBoundingClientRect();

    //@ts-ignore
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
            width={1000}
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
