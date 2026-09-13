// Movie catalog for the viewer. Video/thumbnail filenames are slugs (not the
// original source filenames) to avoid spaces/"&" in asset paths; the source
// column below is just for traceability back to D:/GilsWorkFolder/Pictures/Movie.
// Entries have either a `video` (local mp4 under assets/movies) or a
// `youtubeId` (hosted on YouTube instead, e.g. because the local file was
// too large to commit) - script.js picks the playback path based on which
// field is present.
window.MOVIES = [
  {
    id: "mickeys-first-haircut",
    title: "Mickeys First Hair Cut",
    thumb: "assets/thumbnails/mickeys-first-haircut.jpg",
    youtubeId: "OQ8OctGR2Gw",
    source: "0019 Mickey baby first hair cut.mp4"
  },
  {
    id: "mafalda-drive-picnic",
    title: "125 Mafalda Drive Picnic",
    thumb: "assets/thumbnails/mafalda-drive-picnic.jpg",
    youtubeId: "2jI7BvJwE3w",
    source: "125 m.mp4"
  },
  {
    id: "church-picnic",
    title: "Church Picnic",
    thumb: "assets/thumbnails/church-picnic.jpg",
    youtubeId: "cJrBZvsf3KA",
    source: "Church Picnic.avi"
  },
  {
    id: "another-picnic",
    title: "Another Picnic",
    video: "assets/movies/another-picnic.mp4",
    thumb: "assets/thumbnails/another-picnic.jpg",
    source: "t1.mp4"
  },
  {
    id: "150-woodside",
    title: "150 Woodside",
    thumb: "assets/thumbnails/150-woodside.jpg",
    youtubeId: "gVNv7nuuWbg",
    source: "todler Mickey D&M.mp4"
  },
  {
    id: "family-christmas-time",
    title: "Family Christmas Time",
    thumb: "assets/thumbnails/family-christmas-time.jpg",
    youtubeId: "KWEZrLoz464",
    source: "Uncle M Aunt L.mp4"
  },
  {
    id: "fun-at-crystal-beach",
    title: "Fun at Crystal Beach",
    thumb: "assets/thumbnails/fun-at-crystal-beach.jpg",
    youtubeId: "DzzNt3oLtkY",
    source: "0019 Mickey baby.mp4"
  }
];
