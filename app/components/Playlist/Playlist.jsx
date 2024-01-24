import React, {useState} from 'react';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer.jsx';
import './Playlist.scss';

export const Playlist = ({tracks}) => {
  const [currentTrack, setCurrentTrack] = useState(0);

  const trackOnClick = (event) => {
    event.preventDefault();
    setCurrentTrack(parseInt(event.currentTarget.getAttribute('data-index')));
  }

  return(
    <div className="tmm_playlist_container">
      <div className="tmm_playlist_player">
      <AudioPlayer src={tracks[currentTrack].url} />
      </div>
      <div className="tmm_playlist_list">
        {tracks.map((track, index) => {
          return(
            <a href="#" data-index={index} onClick={trackOnClick} className={`tmm_playlist_list_track ${currentTrack === index ? 'active' : ''}`} key={index}>
              <div className="tmm_playlist_list_track_title">{index + 1}. {track.title}</div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
