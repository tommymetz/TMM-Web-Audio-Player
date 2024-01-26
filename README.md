# TMM Web Audio Player

This is a simple embeddable web audio playlist player built with ReactJS.

<img src="https://github.com/tommymetz/TMM-Web-Audio-Player/blob/main/screenshot.png?raw=true" width="400"/>

## How To Use

This isn't your typical iframe embed like most players because there is no
backend. This can be used by simply hosting the js, css and audio files on a CDN
(like Amazon Web Services S3) and then embed this code to load and display on
your website.

1. Host `tmm-web-audio-player.css` and `tmm-web-audio-player.js`, located in the
   `public` folder, as well as your mp3 files on a CDN like S3. Make sure these
   files are publicly accessible over the web. You will need to add the
   following CORS configuration to your S3 bucket:

```
[
  {
    "AllowedHeaders": [
        "*"
    ],
    "AllowedMethods": [
        "GET"
    ],
    "AllowedOrigins": [
        "*"
    ],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3000
  }
]
```

2. Embed the following code **once** in your site. Preferably in the header but could
also be just above the first instance of this player.
```
<link rel="stylesheet" href="https://[path-to-cdn]/tmm-web-audio-player.css">
<script type="text/javascript" src="https:://[path-to-cdn]/tmm-web-audio-player.js"></script>
```

3. Embed the following where you would like the player to appear. The `div`
   object is the container where the player will be embedded. Style it if you
   like but specifing the width will be important. And don't specify a height so
   the player can grow as tall as it needs. Fill out the `tracks` array with the
   songs and point them to the files on your CDN.
```
<div style="width:100%" id="tmm-web-audio-player-embed-01"></div>
<script type="text/javascript">
  (function() {
    TMMWebAudioPlayer.init({
      embedDiv: 'tmm-web-audio-player-embed-01',
      tracks: [
        {title: "Title of song", file: "https://[path-to-cdn]/audio/example-tommymetz.mp3"},
        {title: "Title of song", file: "https://[path-to-cdn]/audio/example-wirefaces.mp3"},
        {title: "Title of song", file: "https://[path-to-cdn]/audio/example-tylerfong.mp3"},
      ]
    });
  })();
</script>
```

4. You may also embed this multiple times (the css and js files in step #1
   should only be embedded once). Just make sure you change the id on the div
   as well as in the `embed_div` parameter so that each embed has a unique id.

### Init Params
- `embed_div` - The div you'd like the player to built into. If you have
  multiple embeds just make sure each div has a unique it.
- `tracks` - An array of tracks.
  - `title` - The text to appear in the playlist.
  - `file` - The url to the audio file.

# Development

This was quickly developed and could use some more love like tests etc.

If you want to use this and have some requests, please contact tom@tommetzmedia.com.

## Examples

To view the examples locally, run `yarn install` and `yarn start`. This will
open up a page showing a working example.

## Build

- `yarn build` will build a production ready files.
- `yarn build:watch` will build as you develop.

