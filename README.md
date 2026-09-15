# FamilyOldMovies

A single black-screen grid of family 8mm-to-digital movie transfers, each
shown as a clickable filmstrip-style thumbnail. Clicking one plays it
full-screen; clicking the video (or, for YouTube-hosted entries, a dedicated
close button) returns to the grid. Live at
https://gmshannon99.github.io/FamilyOldMovies/.

## Movie catalog

Each movie is either hosted locally as an mp4 under `assets/movies/`, or
embedded from YouTube - whichever keeps the file under GitHub's 100MB push
limit while staying as close to full quality as practical. All ten are
currently YouTube-hosted (the first six started as a local re-encode and
were moved to YouTube once the local file turned out too large, or too low
quality after the compression needed to fit, for a comfortable local copy;
the last four were added as YouTube-only from the start); local hosting
remains fully supported in the code for any future addition that doesn't
need it.

| Title | Hosting | Where |
|---|---|---|
| Mickeys First Hair Cut | YouTube | [OQ8OctGR2Gw](https://youtu.be/OQ8OctGR2Gw) |
| 125 Mafalda Drive Picnic | YouTube | [2jI7BvJwE3w](https://youtu.be/2jI7BvJwE3w) |
| Church Picnic | YouTube | [cJrBZvsf3KA](https://youtu.be/cJrBZvsf3KA) |
| 150 Woodside | YouTube | [gVNv7nuuWbg](https://youtu.be/gVNv7nuuWbg) |
| Family Christmas Time | YouTube | [KWEZrLoz464](https://youtu.be/KWEZrLoz464) |
| Outing at Crystal Beach | YouTube | [DVcUslMnzsI](https://youtu.be/DVcUslMnzsI) |
| Uncle Mike, Hartman, Sarach | YouTube | [QI-d92C2S9U](https://youtu.be/QI-d92C2S9U) |
| Queen for a Day | YouTube | [JEc1h-xvOvY](https://youtu.be/JEc1h-xvOvY) |
| Mickey and puppies | YouTube | [WTOVfmdkA8k](https://youtu.be/WTOVfmdkA8k) |
| Aunt Rickie's Birthday | YouTube | [R3rtlTn6U3k](https://youtu.be/R3rtlTn6U3k) |

The catalog lives in `movies.js`, one object per movie:

```js
{
  id: "mickeys-first-haircut",
  title: "Mickeys First Hair Cut",
  thumb: "assets/thumbnails/mickeys-first-haircut.jpg",
  youtubeId: "OQ8OctGR2Gw",      // YouTube-hosted entries
  // video: "assets/movies/...", // local entries use this instead
  source: "0019 Mickey baby first hair cut.mp4" // original filename, for
                                 // traceability back to D:/GilsWorkFolder/Pictures/Movie
}
```

An entry has either a `video` (local mp4) or a `youtubeId` (YouTube embed),
never both - `script.js` picks the playback path based on which field is
present. `source` is included when the movie started life as a local file,
as a record of which original file it came from; entries added as
YouTube-only from the start (no local re-encode ever existed) omit it.
`thumb` is normally a local file under `assets/thumbnails/`, but can also
be a remote URL (e.g. `https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg`,
YouTube's own thumbnail) for entries that skip generating a local
thumbnail - either way it's unaffected by which playback path is used.

### Adding a local movie

1. Re-encode to H.264/AAC via the bundled ffmpeg binary (`imageio-ffmpeg`'s
   `ffmpeg-win-x86_64-v7.1.exe`), capped at 720p width, CRF 23 -
   `ffmpeg -i input -vf "scale='min(1280,iw)':-2" -c:v libx264 -crf 23
   -preset medium -c:a aac -b:a 128k -movflags +faststart output.mp4`.
   Raise the CRF if the result is still too large for GitHub's 100MB limit
   (each +6-9 roughly halves the file size) rather than shrinking the
   resolution further.
2. Generate a first-frame thumbnail with the same ffmpeg binary:
   `ffmpeg -i output.mp4 -frames:v 1 -update 1 -q:v 2 thumb.jpg`.
3. Use a web-safe slug for both filenames (e.g. `fun-at-crystal-beach.mp4`)
   - the source column in `movies.js` is what preserves the original
   filename for traceability, not the asset path.
4. Add the entry to `movies.js` with a `video` field pointing at the mp4.

### Adding a YouTube-hosted movie

Add the entry with a `youtubeId` field (the same catalog entry, just no
`video` field) - no changes to `script.js`/`style.css` are needed, since the
YouTube playback path (iframe embed at
`https://www.youtube.com/embed/VIDEO_ID?rel=0&autoplay=0`, dedicated close
button) is already generic across all entries.

## Exit icon

The last grid item is always "Exit Movies" - a white-outline one-way-sign
SVG - regardless of how many movies are in the catalog, since it's appended
to the grid after the `MOVIES.forEach` loop rather than being part of the
array. Clicking it navigates to
[MySelectMenu](https://gmshannon99.github.io/MySelectMenu/), the launcher
this app is normally opened from.

## Why the movies are YouTube-hosted instead of local

Local playback (`video-player`, full-page `<video>`, click-anywhere/`ended`
event to close) is the simpler path and was the original design, and is
still what the code falls back to for any entry with a `video` field. Each
of these seven source files, though, was long enough that re-encoding it to
fit under GitHub's 100MB push limit at the standard 720p/CRF 23 settings
either produced a file still too large, or required compressing quality
down enough that YouTube hosting became the better tradeoff. YouTube
playback uses a cross-origin `<iframe>` instead of a `<video>` element,
which changes how the overlay closes: clicks inside the iframe never reach
our document, and there's no `ended` event without loading the full
YouTube IFrame Player API, so a dedicated close button (visible only for
YouTube entries) stands in for both.

## A note on GitHub Pages deploys

This repo has twice seen the legacy Pages build silently stall on a
specific commit (status stuck at `"building"` indefinitely, or not queuing
a new build at all after a push) rather than erroring out. If a push
doesn't show up live within a minute or two, check
`gh api repos/GMShannon99/FamilyOldMovies/pages/builds/latest` - if it's
not `"built"` for the latest commit, force a rebuild with
`gh api -X POST repos/GMShannon99/FamilyOldMovies/pages/builds`.
