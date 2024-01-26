# TMM Web Audio Player

This is a simple embeddable web audio playlist player built with ReactJS.

<img src="https://github.com/tommymetz/TMM-Web-Audio-Player/blob/main/screenshot.png?raw=true" width="400"/>

## How To Use

This player can be embedded directly into your site OR via an iframe.

### Direct Embedding

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
   as well as in the `embedDiv` parameter so that each embed has a unique id.

### Iframe embedding

You can host this repo yourself and use it as your iframe embed. Here is what
that looks like using netlify:

```
<iframe 
  src="https://[your-netlify-project].netlify.app/?tracksJsonUrl=https://[path-to-cdn]/tracks.json"
  frameborder="0" scrolling="no" style="width:100%; height:300px"></iframe>
```

In order to make this work you need to upload a `tracks.json` file to your CDN
that the iframe references via the `tracksJsonUrl` param. That file should live
in the same folder as your mp3 files and look like this:

```
[
  {"title": "Cool Song You Like", "file": "example-tommymetz.mp3"},
  {"title": "Let's Eat Ice Cream", "file": "example-wirefaces.mp3"},
  {"title": "Casio Keyboard Pandemic", "file": "example-tylerfong.mp3"}
]
```

To help you debug you can also pass a param at the end of the `tracksJsonUrl`
param: `?tracksJsonUrl=https://[path-to-cdn]/tracks.json&debug=true`.


## Init Params
- `embedDiv` - The div you'd like the player to built into. If you have
  multiple embeds just make sure each div has a unique it.
- `tracks` - An array of tracks.
  - `title` - The text to appear in the playlist.
  - `file` - The url to the audio file.
- `tracksJsonUrl` - If you want to load the track info from a json file. How
  iframe embedding works so you can specify the file via the iframe src.

# Development

This was quickly developed and could use some more love like tests etc.

If you want to use this and have some requests, please contact tom@tommetzmedia.com.

## Examples

To view the examples locally, run `yarn install` and `yarn start`. This will
open up a page showing a working example.

## Build

- `yarn build` will build a production ready files.
- `yarn build:watch` will build as you develop.

