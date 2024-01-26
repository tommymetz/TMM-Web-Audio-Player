import React from 'react';
import { createRoot } from 'react-dom/client';
import { Playlist } from './components/Playlist';

export const init = (config) => {
  const embedDiv = config.embedDiv || 'tmm-audio-player-embed';
  const container = document.getElementById(embedDiv);
  if(container === null) return console.error(`TMM Web Audio Player: Could not find element with id ${embedDiv}`)
  const root = createRoot(container);
  root.render(<Playlist {...config} />);
}

