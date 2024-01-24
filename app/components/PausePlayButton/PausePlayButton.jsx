import React from 'react';
import './PausePlayButton.scss';

export const PausePlayButton = ({paused, onClick}) => {

  const onButtonClick = (e) => {
    e.preventDefault();
    onClick();
  }

  return(
    <a href="#" onClick={onButtonClick} className={`tmm_pause-play-button${paused ? ' tmm_paused': ''}`}>
      {paused && (
        <div className="tmm_pause-play-button_play">
          <div className="tmm_pause-play-button_play_triangle"></div>
        </div>
      )}
      {!paused && (
        <div className="tmm_pause-play-button_pause">
          <div className="tmm_pause-play-button_pause_rectangle0"></div>
          <div className="tmm_pause-play-button_pause_rectangle1"></div>
        </div>
      )}
    </a>
  );
}
