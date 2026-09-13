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
    video: "assets/movies/mickeys-first-haircut.mp4",
    thumb: "assets/thumbnails/mickeys-first-haircut.jpg",
    source: "0019 Mickey baby first hair cut.mp4"
  },
  {
    id: "mafalda-drive-picnic",
    title: "125 Mafalda Drive Picnic",
    video: "assets/movies/mafalda-drive-picnic.mp4",
    thumb: "assets/thumbnails/mafalda-drive-picnic.jpg",
    source: "125 m.mp4"
  },
  {
    id: "church-picnic",
    title: "Church Picnic",
    video: "assets/movies/church-picnic.mp4",
    thumb: "assets/thumbnails/church-picnic.jpg",
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
    video: "assets/movies/150-woodside.mp4",
    thumb: "assets/thumbnails/150-woodside.jpg",
    source: "todler Mickey D&M.mp4"
  },
  {
    id: "family-christmas-time",
    title: "Family Christmas Time",
    video: "assets/movies/family-christmas-time.mp4",
    thumb: "assets/thumbnails/family-christmas-time.jpg",
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
