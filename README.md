# TMM Web Audio Player

This is a simple embeddable web audio playlist player built with react.

## How To Use

This isn't your typical iframe embed like most players because there is no
backend. This can be used by simply hosting the js, css and audio files on a CDN
(like Amazon Web Services S3) and then embed this code to load and display on
your website.

```
<!-- Embed this once in your site in the header -->
<link rel="stylesheet" href="/tmm-web-audio-player.css">
<script type="text/javascript" src="/tmm-web-audio-player.js"></script>

<!-- Embed this where you would like the player to appear -->
<div style="width: 400px" id="tmm-web-audio-player-embed-01"></div>
<script type="text/javascript">
  (function() {
    TMMWebAudioPlayer.init({
      embed_div: 'tmm-web-audio-player-embed-01',
      tracks: [
        {title: "Title of song", url: "https://your-cdn/example-tommymetz.mp3"},
        {title: "Title of song", url: "https://your-cdn/audio/example-wirefaces.mp3"},
        {title: "Title of song", url: "https://your-cdn/audio/example-tylerfong.mp3"},
      ]
    });
  })();
</script>
```

### Init Params
- `embed_div` - The div you'd like the player to built into. This allows you to
  have multiple instances of this player. Just make sure each div has a unique
  id.
- `tracks` - An array of tracks.
  - `title` - The text to appear in the playlist.
  - `url` - The url to the audio file on your CDN.

## Build

`yarn build` will build a production ready files.
`yarn build:watch` will build as you develop.

## Examples

To view the examples locally, run `yarn install` and `yarn start`. This will
open up a page showing a working example.
