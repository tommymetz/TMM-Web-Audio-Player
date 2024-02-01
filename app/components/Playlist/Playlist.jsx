import React, {useState, useEffect} from 'react';
import { AudioPlayer } from '../AudioPlayer/AudioPlayer.jsx';
import './Playlist.scss';

export const Playlist = ({tracks, tracksJsonUrl}) => {
  const [loaded, setLoaded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [finalTracks, setFinalTracks] = useState([]);

  useEffect(() => {
    // If tracks are provided, we're good to go
    if(tracks && tracks.length > 0){
      setFinalTracks(tracks);
      return setLoaded(true);
    }

    // If no tracks or tracksJsonUrl, show error
    if(!tracks && !tracksJsonUrl) {
      setErrorMessage('There were no tracks or a track JSON file provided.');
      setShowError(true);
      return setLoaded(true);
    }

    // If tracksJsonUrl, fetch the JSON file
    if(tracksJsonUrl){
      fetch(tracksJsonUrl)
        .then(response => response.json())
        .then(data => {
          const fileLocation = tracksJsonUrl.substring(0, tracksJsonUrl.lastIndexOf('/') + 1);
          setFinalTracks(data.map(track => {
            return {
              ...track,
              file: fileLocation + track.file
            }
          }));
          setLoaded(true);
        })
        .catch(error => {
          setErrorMessage(error.message);
          setShowError(true);
          setLoaded(true);
        });
    }
  }, [tracks, tracksJsonUrl]);

  const trackOnClick = (event) => {
    event.preventDefault();
    setCurrentTrack(parseInt(event.currentTarget.getAttribute('data-index')));
  }

  const onTrackEnd = () => {
    const nextTrack = currentTrack + 1
    if(nextTrack < finalTracks.length) setCurrentTrack(nextTrack)
  }

  if(!loaded) return null
  return(
    <div className="tmm_playlist_container">
      {!showError && finalTracks.length > 0 && (
        <>
          <div className="tmm_playlist_player">
            <AudioPlayer src={finalTracks[currentTrack].file} onEnd={onTrackEnd} />
          </div>
          <div className="tmm_playlist_list">
            {finalTracks.map((track, index) => {
              return(
                <a href="#" data-index={index} onClick={trackOnClick} className={`tmm_playlist_list_track ${currentTrack === index ? 'active' : ''}`} key={index}>
                  <div className="tmm_playlist_list_track_title">{index + 1}. {track.title}</div>
                </a>
              );
            })}
          </div>
        </>
      )}
      {showError && (
        <div className="tmm_playlist_container_error">
          <div className="tmm_playlist_container_error_text">{errorMessage}</div>
        </div>
      )}
    </div>
  );
}
