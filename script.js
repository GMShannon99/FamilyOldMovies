(function () {
  "use strict";

  var MOVIES = window.MOVIES || [];

  var appEl = document.getElementById("app");
  var gridEl = document.getElementById("movie-grid");
  var videoOverlayEl = document.getElementById("video-overlay");
  var videoPlayerEl = document.getElementById("video-player");
  var youtubePlayerEl = document.getElementById("youtube-player");
  var overlayCloseBtnEl = document.getElementById("overlay-close-btn");

  var videoOpen = false;
  var exited = false;

  function buildMovieCard(movie) {
    var card = document.createElement("button");
    card.type = "button";
    card.className = "movie-card";
    card.setAttribute("aria-label", "Play " + movie.title);

    var strip = document.createElement("div");
    strip.className = "filmstrip";

    var left = document.createElement("span");
    left.className = "sprockets sprockets-left";
    strip.appendChild(left);

    var img = document.createElement("img");
    img.className = "thumb";
    img.src = movie.thumb;
    img.alt = movie.title;
    img.loading = "lazy";
    img.draggable = false;
    strip.appendChild(img);

    var right = document.createElement("span");
    right.className = "sprockets sprockets-right";
    strip.appendChild(right);

    card.appendChild(strip);

    var label = document.createElement("div");
    label.className = "movie-title";
    label.textContent = movie.title;
    card.appendChild(label);

    card.addEventListener("click", function () {
      openVideo(movie);
    });

    return card;
  }

  function buildExitCard() {
    var card = document.createElement("button");
    card.type = "button";
    card.className = "movie-card exit-card";
    card.setAttribute("aria-label", "Exit Movies");

    var strip = document.createElement("div");
    strip.className = "filmstrip";

    var symbol = document.createElement("span");
    symbol.className = "exit-symbol";
    symbol.innerHTML =
      '<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">' +
      '<rect x="3" y="3" width="114" height="34" rx="5" fill="none" stroke="#ffffff" stroke-width="4"/>' +
      '<path d="M20 20 H86 M64 6 L92 20 L64 34" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>' +
      "</svg>";
    strip.appendChild(symbol);

    card.appendChild(strip);

    var label = document.createElement("div");
    label.className = "movie-title";
    label.textContent = "Exit Movies";
    card.appendChild(label);

    card.addEventListener("click", exitViewer);

    return card;
  }

  // Opens the clicked movie full-screen on the black stage. For local movies,
  // play() is called synchronously inside this click handler (a direct user
  // gesture), which is what lets the browser play it unmuted instead of
  // blocking it as autoplay. YouTube-hosted movies use autoplay=0 in the
  // embed URL instead (see buildYoutubeEmbedUrl) and start via the player's
  // own on-screen play button.
  function buildYoutubeEmbedUrl(youtubeId) {
    return "https://www.youtube.com/embed/" + youtubeId + "?rel=0&autoplay=0";
  }

  function openVideo(movie) {
    videoOverlayEl.classList.add("visible");
    videoOverlayEl.setAttribute("aria-hidden", "false");
    videoOpen = true;

    if (movie.youtubeId) {
      videoOverlayEl.classList.add("youtube-mode");
      videoPlayerEl.style.display = "none";
      youtubePlayerEl.style.display = "block";
      youtubePlayerEl.src = buildYoutubeEmbedUrl(movie.youtubeId);
    } else {
      videoOverlayEl.classList.remove("youtube-mode");
      youtubePlayerEl.style.display = "none";
      videoPlayerEl.style.display = "block";
      videoPlayerEl.src = movie.video;
      videoPlayerEl.play().catch(function () {
        /* ignore: some browsers may still reject programmatic play() */
      });
    }
  }

  function closeVideo() {
    if (!videoOpen) return;
    videoOpen = false;
    videoOverlayEl.classList.remove("visible");
    videoOverlayEl.classList.remove("youtube-mode");
    videoOverlayEl.setAttribute("aria-hidden", "true");
    videoPlayerEl.pause();
    videoPlayerEl.removeAttribute("src");
    videoPlayerEl.load();
    // Clearing src (rather than just hiding the iframe) is what actually
    // stops YouTube playback/audio, since the embedded player keeps running
    // in its own document otherwise.
    youtubePlayerEl.removeAttribute("src");
  }

  function exitViewer() {
    if (exited) return;
    exited = true;
    appEl.classList.add("exiting");
    setTimeout(function () {
      window.location.href = "https://gmshannon99.github.io/MySelectMenu/";
    }, 850);
  }

  function handleKeydown(e) {
    if (e.key === "Escape" && videoOpen) {
      closeVideo();
    }
  }

  MOVIES.forEach(function (movie) {
    gridEl.appendChild(buildMovieCard(movie));
  });
  gridEl.appendChild(buildExitCard());

  videoPlayerEl.addEventListener("ended", closeVideo);
  videoPlayerEl.addEventListener("click", closeVideo);
  // A cross-origin YouTube iframe can't be clicked-through to close the way
  // the same-origin <video> element can (clicks inside it never reach our
  // document), and there's no "ended" event without the full YouTube IFrame
  // Player API, so the close button above is the reliable affordance here.
  overlayCloseBtnEl.addEventListener("click", closeVideo);
  document.addEventListener("keydown", handleKeydown);
})();
