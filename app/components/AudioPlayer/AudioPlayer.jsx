import React, {useState, useEffect, useRef} from 'react';
import { PausePlayButton } from '../PausePlayButton/PausePlayButton.jsx';
import './AudioPlayer.scss';

export const AudioPlayer = ({src}) => {
  const [showError, setShowError] = useState(false);
  const [paused, setPaused] = useState(true);
  const [audioCanPlay, setAudioCanPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [timelineHovering, setTimelineHovering] = useState(false);
  const [timelinePlayheadLeft, setTimelinePlayheadLeft] = useState('0px');
  const [timelineLoadedWidth, setTimelineLoadedWidth] = useState('0%');
  const [timelineBarWidth, setTimelineBarWidth] = useState('0%');
  const audio = useRef(null);
  const audio_timeline = useRef(null);

  const onloadedMeta = () => {
    setAudioDuration(audio.current.duration);
    setAudioCanPlay(true);
    if(!paused) playAudio();
  }

  const onAudioError = (e) => {
    setShowError(true);
  }

  // Stop all audio when another audio player is played (non-iframe)
  // useEffect(() => {
  //   window.tmmStopAllAudio = new Event('tmmStopAllAudio');
  //   window.addEventListener('tmmStopAllAudio', pauseAudio);
  //   return () => {
  //     window.removeEventListener('tmmStopAllAudio', pauseAudio);
  //   };
  // }, []);

  // Stop all audio when another audio player is played (iframe)
  useEffect(() => {
    window.addEventListener('message', (event) => {
      // console.log('message received', event, src);
      if(event.data === 'tmmStopAllAudio') pauseAudio();
    })
    return () => {
      window.removeEventListener('message');
    };
  }, []);

  useEffect(() => {
    setShowError(false);

    audio.current.addEventListener('loadedmetadata', onloadedMeta);

    audio.current.addEventListener('error', onAudioError);

    audio.current.onended = (event) => {
      audio.current.currentTime = 0;
      setTimelinePlayheadLeft('0px');
      setTimelineBarWidth('0px');
    }

    audio.current.ontimeupdate = (event) => {
      setCurrentTime(event.target.currentTime);
    }

    audio_timeline.current.onmouseenter = (event) => {
      setTimelineHovering(true);
    }
    audio_timeline.current.onmouseleave = (event) => {
      setTimelineHovering(false);
    }
    audio_timeline.current.onmousemove = (event) => {
      const left = event.offsetX < 0 ? 0 : event.offsetX;
      setTimelinePlayheadLeft(left + 'px');
    }
    audio_timeline.current.onmousedown = (event) => {
      const time = event.offsetX / event.target.offsetWidth * audio.current.duration;
      audio.current.currentTime = time;
      playAudio();
    }
    return () => {
      audio.current.removeEventListener('loadedmetadata', onloadedMeta);
    }
  }, [src]);

  // Set playhead to current time when not hovering
  useEffect(() => {
    if(!timelineHovering) {
      setTimelinePlayheadLeft(currentTime / audioDuration * 100 + '%');
    }
  }, [timelineHovering])

  // Update timeline bar and playhead
  useEffect(() => {
    const percentage = currentTime / audioDuration * 100;
    const width = percentage + '%';
    let left = timelinePlayheadLeft;
    if(!timelineHovering && !paused) left = percentage + '%';
    setTimelineBarWidth(width);
    setTimelinePlayheadLeft(left);
  }, [currentTime]);

  const playAudio = () => {
    if(audioCanPlay){ 
      // window.dispatchEvent(window.tmmStopAllAudio);
      parent.postMessage('tmmStopAllAudio', '*');
      setTimeout(() => {
        audio.current.play();
        setPaused(false);
      }, 10);
    }
  }

  const pauseAudio = (e) => {
    audio.current.pause();
    setPaused(true);
  }

  const handlePlayPause = () => {
    if(paused){
      playAudio();
    }else{
      pauseAudio();
    }
  }

  const timeline_loaded_style = {width: timelineLoadedWidth};
  const timeline_bar_style = {width: timelineBarWidth};
  const timeline_playhead_style = {left: timelinePlayheadLeft};
  return(
    <div className="tmm_audio-player">
      <audio ref={audio} src={src} preload="metadata" crossOrigin="anonymous"></audio>
      <div className="tmm_audio-player_timeline">
        <div className="tmm_audio-player_timeline_loaded" style={timeline_loaded_style}></div>
        <div className="tmm_audio-player_timeline_bar" style={timeline_bar_style}></div>
        <div className="tmm_audio-player_timeline_playhead" style={timeline_playhead_style}></div>
        <div data-testid="audio-timeline" ref={audio_timeline} className="tmm_audio-player_timeline_overlay"></div>
      </div>
      <div className="tmm_audio-player_pause-play-button-container">
        <PausePlayButton paused={paused} onClick={handlePlayPause} />
      </div>
      {showError && (
        <div className="tmm_audio-player_error">
          <div className="tmm_audio-player_error_text">There was an error loading the audio file.</div>
        </div>
      )}
    </div>
  );
}
