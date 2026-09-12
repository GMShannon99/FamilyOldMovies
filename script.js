(function () {
  "use strict";

  var MOVIES = window.MOVIES || [];

  var appEl = document.getElementById("app");
  var gridEl = document.getElementById("movie-grid");
  var videoOverlayEl = document.getElementById("video-overlay");
  var videoPlayerEl = document.getElementById("video-player");

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
    symbol.textContent = "✕";
    strip.appendChild(symbol);

    card.appendChild(strip);

    var label = document.createElement("div");
    label.className = "movie-title";
    label.textContent = "Exit Movies";
    card.appendChild(label);

    card.addEventListener("click", exitViewer);

    return card;
  }

  // Opens the clicked movie full-screen on the black stage. play() is called
  // synchronously inside this click handler (a direct user gesture), which is
  // what lets the browser play it unmuted instead of blocking it as autoplay.
  function openVideo(movie) {
    videoPlayerEl.src = movie.video;
    videoOverlayEl.classList.add("visible");
    videoOverlayEl.setAttribute("aria-hidden", "false");
    videoOpen = true;
    videoPlayerEl.play().catch(function () {
      /* ignore: some browsers may still reject programmatic play() */
    });
  }

  function closeVideo() {
    if (!videoOpen) return;
    videoOpen = false;
    videoOverlayEl.classList.remove("visible");
    videoOverlayEl.setAttribute("aria-hidden", "true");
    videoPlayerEl.pause();
    videoPlayerEl.removeAttribute("src");
    videoPlayerEl.load();
  }

  function exitViewer() {
    if (exited) return;
    exited = true;
    appEl.classList.add("exiting");
    setTimeout(function () {
      try {
        window.close();
      } catch (e) {
        /* ignore: not all browsers allow scripted tabs to close themselves */
      }
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
  document.addEventListener("keydown", handleKeydown);
})();
