import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from 'next/image';
import ReactPlayer from 'react-player';

const VideoModal = () => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [played, setPlayed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (progress) => {
    setPlayed(progress.played);
  };

  const handleSeek = (fraction) => {
    playerRef.current.seekTo(fraction * duration);
  };

  const handleDuration = (dur) => {
    setDuration(dur);
  };

  const handleNext = () => {
    playerRef.current.seekTo(Math.min(duration, played + 10)); // Skip forward by 10 seconds
  };

  const handleBack = () => {
    playerRef.current.seekTo(Math.max(0, played - 10)); // Skip backward by 10 seconds
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      playerRef.current.wrapper.requestFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='bg-[#E9E9E9] p-2 rounded-full'>
          <Image src="/assets/svg/video.svg" width={22} height={22} alt="video_icon" />
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-[520px] h-[420px] p-5">
        <DialogHeader className="text-center">
          <h3 className='text-[20px]'>Types of Photography</h3>
        </DialogHeader>
        
        <div className="flex flex-col items-center">
          <ReactPlayer 
            ref={playerRef}
            url="https://www.youtube.com/watch?v=LXb3EKWsInQ" 
            width="100%" 
            height="70%" 
            playing={playing} 
            muted={muted}
            controls={false} 
            onProgress={handleProgress} 
            onDuration={handleDuration}
            className="rounded-lg"
          />
          <div className="flex items-center justify-between w-full mt-3 bg-black bg-opacity-80 rounded-full px-2">
            <span className="text-white">{Math.floor(duration * played)}s</span>
            <div className="flex items-center justify-center  flex-1 mx-2">
              <button onClick={handleBack} className="text-white"> <Image src="/assets/svg/left.svg" width={22} height={22} alt="video_icon" /></button>
              <button onClick={handlePlayPause} className="text-white">{playing ? '<FaPlay />' : '▶️'}</button>
              <button onClick={handleNext} className="text-white"> <Image src="/assets/svg/right.svg" width={22} height={22} alt="video_icon" /></button>
            </div>
            <button onClick={toggleMute} className="text-white">{muted ? '🔇' : '🔊'}</button>
            <button onClick={toggleFullscreen} className="text-white">📽️</button>
          </div>
        </div>

        <div className='flex justify-end mt-5'>
          <Button variant="primary" className="w-fit text-end text-[#222] bg-[#F7F7F7] border border-[#E9E9E9]">Close Video</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default VideoModal;
