import { useEffect, useRef } from 'react';

<<<<<<< HEAD
interface CustomAudioElement extends HTMLAudioElement {
  customStarted?: boolean;
  customEnded?: boolean;
  customPaused?: boolean;
  customProps?: {
    customStarted?: boolean;
    customEnded?: boolean;
    customPaused?: boolean;
  };
}

type TCustomAudioResult = { audioRef: React.MutableRefObject<CustomAudioElement | null> };
=======
type TCustomAudioResult = { audioRef: React.MutableRefObject<HTMLAudioElement | null> };
>>>>>>> upstream/main

export default function useCustomAudioRef({
  setIsPlaying,
}: {
  setIsPlaying: (isPlaying: boolean) => void;
}): TCustomAudioResult {
<<<<<<< HEAD
  const audioRef = useRef<CustomAudioElement | null>(null);
=======
  const audioRef = useRef<HTMLAudioElement | null>(null);
>>>>>>> upstream/main
  useEffect(() => {
    let lastTimeUpdate: number | null = null;
    let sameTimeUpdateCount = 0;

    const handleEnded = () => {
      setIsPlaying(false);
      console.log('global audio ended');
      if (audioRef.current) {
<<<<<<< HEAD
        audioRef.current.customEnded = true;
=======
>>>>>>> upstream/main
        URL.revokeObjectURL(audioRef.current.src);
      }
    };

    const handleStart = () => {
      setIsPlaying(true);
      console.log('global audio started');
<<<<<<< HEAD
      if (audioRef.current) {
        audioRef.current.customStarted = true;
      }
=======
>>>>>>> upstream/main
    };

    const handlePause = () => {
      console.log('global audio paused');
<<<<<<< HEAD
      if (audioRef.current) {
        audioRef.current.customPaused = true;
      }
=======
>>>>>>> upstream/main
    };

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
<<<<<<< HEAD
        // console.log('Current time: ', currentTime);
=======
>>>>>>> upstream/main

        if (currentTime === lastTimeUpdate) {
          sameTimeUpdateCount += 1;
        } else {
          sameTimeUpdateCount = 0;
        }

        lastTimeUpdate = currentTime;

        if (sameTimeUpdateCount >= 1) {
          console.log('Detected end of audio based on time update');
          audioRef.current.pause();
          handleEnded();
        }
      }
    };

    const audioElement = audioRef.current;

    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('play', handleStart);
      audioRef.current.addEventListener('pause', handlePause);
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
<<<<<<< HEAD

      audioRef.current.customProps = {
        customStarted: false,
        customEnded: false,
        customPaused: false,
      };
=======
>>>>>>> upstream/main
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('ended', handleEnded);
        audioElement.removeEventListener('play', handleStart);
        audioElement.removeEventListener('pause', handlePause);
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
        URL.revokeObjectURL(audioElement.src);
      }
    };
  }, [setIsPlaying]);

  return { audioRef };
}
