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

  // Stop all audio when another audio player is played
  useEffect(() => {
    window.tmmStopAllAudio = new Event('tmmStopAllAudio');
    window.addEventListener('tmmStopAllAudio', pauseAudio);
    return () => {
      window.removeEventListener('tmmStopAllAudio', pauseAudio);
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
      setTimelinePlayheadLeft(audio.current.currentTime);
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

  useEffect(() => {
    const percentage = currentTime / audioDuration * 100;
    const width = percentage + '%';
    let left = timelinePlayheadLeft;
    if(!timelineHovering) left = percentage + '%';
    setTimelineBarWidth(width);
    setTimelinePlayheadLeft(left);
  }, [currentTime]);

  const playAudio = () => {
    if(audioCanPlay){ 
      window.dispatchEvent(window.tmmStopAllAudio);
      audio.current.play();
      setPaused(false);
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
  // const playpauseclasses = paused ? 'tmm_audio-player_play-pause paused' : 'tmm_audio-player_play-pause';
  return(
    <div className="tmm_audio-player">
      <audio ref={audio} src={src} preload="metadata" crossOrigin="anonymous"></audio>
      <div className="tmm_audio-player_timeline">
        <div className="tmm_audio-player_timeline_loaded" style={timeline_loaded_style}></div>
        <div className="tmm_audio-player_timeline_bar" style={timeline_bar_style}></div>
        <div className="tmm_audio-player_timeline_playhead" style={timeline_playhead_style}></div>
        <div data-testid="audio-timeline" ref={audio_timeline} className="tmm_audio-player_timeline_overlay"></div>
      </div>
      {/*<button className={playpauseclasses} onClick={handlePlayPause}></button>*/}
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
