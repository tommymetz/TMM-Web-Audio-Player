import React from 'react';
import { createRoot } from 'react-dom/client';
import { Playlist } from './components/Playlist';

export const init = (config) => {
  const embed_div = config.embed_div || 'tmm-audio-player-embed';
  const container = document.getElementById(embed_div);
  if(container === null) return console.error(`TMM Web Audio Player: Could not find element with id ${embed_div}`)
  const root = createRoot(container);
  root.render(<Playlist {...config} />);
}

