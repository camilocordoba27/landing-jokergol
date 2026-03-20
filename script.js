(function () {
      const grid = document.getElementById("promoGrid");
      const tags = Array.from(document.querySelectorAll(".tag[data-filter]"));
      const search = document.getElementById("search");

      function setPressed(activeTag) {
        tags.forEach(t => t.setAttribute("aria-pressed", String(t === activeTag)));
      }

      function applyFilter() {
        const active = tags.find(t => t.getAttribute("aria-pressed") === "true");
        const filter = active?.dataset.filter ?? "all";
        const q = (search?.value ?? "").trim().toLowerCase();

        Array.from(grid.querySelectorAll(".promo")).forEach(card => {
          const type = card.dataset.type || "all";
          const text = card.innerText.toLowerCase();
          const matchesType = filter === "all" ? true : type === filter;
          const matchesQuery = q ? text.includes(q) : true;
          card.style.display = (matchesType && matchesQuery) ? "" : "none";
        });
      }

      tags.forEach(tag => {
        tag.addEventListener("click", () => {
          setPressed(tag);
          applyFilter();
        });
      });

      search?.addEventListener("input", applyFilter);

      document.querySelectorAll("[data-cta]").forEach(btn => {
        btn.addEventListener("click", () => {
          const key = btn.getAttribute("data-cta");
          alert("CTA: " + key + " (conectalo a tu link real)");
        });
      });
    })();

    function registroEpic() {
    window.location.href = "#";
  }

  function uniteEpic() {
    window.location.href = "#"
  }

  function rakeBack(){
    window.location.href = "#"
  }

  function cashBack() {
    window.location.href= "#"
  }


  //Carousel
  (function () {
    const root = document.getElementById("promoCarousel");
    if (!root) return;

    const track = root.querySelector(".carousel__track");
    const slides = Array.from(root.querySelectorAll(".carousel__slide"));
    const prevBtn = root.querySelector(".carousel__btn--prev");
    const nextBtn = root.querySelector(".carousel__btn--next");
    const dotsWrap = root.querySelector(".carousel__dots");

    let index = 0;
    let autoplayId = null;
    const AUTOPLAY_MS = 3800;
    const LOOP = true;

    function clampIndex(i) {
      if (LOOP) return (i + slides.length) % slides.length;
      return Math.max(0, Math.min(i, slides.length - 1));
    }

    function goTo(i, { focusDot = false } = {}) {
      index = clampIndex(i);
      track.style.transform = `translateX(${-index * 100}%)`;
      updateDots();
      if (focusDot) dotsWrap.querySelectorAll("button")[index]?.focus();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    function buildDots() {
      dotsWrap.innerHTML = "";
      slides.forEach((_, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "carousel__dot";
        b.setAttribute("aria-label", `Ir al slide ${i + 1}`);
        b.addEventListener("click", () => goTo(i, { focusDot: true }));
        dotsWrap.appendChild(b);
      });
      updateDots();
    }

    function updateDots() {
      const dots = Array.from(dotsWrap.querySelectorAll(".carousel__dot"));
      dots.forEach((d, i) => d.setAttribute("aria-current", String(i === index)));
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayId = window.setInterval(next, AUTOPLAY_MS);
    }

    function stopAutoplay() {
      if (autoplayId) window.clearInterval(autoplayId);
      autoplayId = null;
    }

    // Pause on hover/focus within (desktop)
    root.addEventListener("mouseenter", stopAutoplay);
    root.addEventListener("mouseleave", startAutoplay);
    root.addEventListener("focusin", stopAutoplay);
    root.addEventListener("focusout", startAutoplay);

    // Buttons
    prevBtn?.addEventListener("click", prev);
    nextBtn?.addEventListener("click", next);

    // Keyboard
    root.setAttribute("tabindex", "0");
    root.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    });

    // Swipe (touch)
    let startX = 0;
    let deltaX = 0;
    let isDown = false;

    function onPointerDown(e) {
      isDown = true;
      startX = e.clientX;
      deltaX = 0;
      track.style.transition = "none";
      stopAutoplay();
    }

    function onPointerMove(e) {
      if (!isDown) return;
      deltaX = e.clientX - startX;
      const percent = (deltaX / root.clientWidth) * 100;
      track.style.transform = `translateX(${(-index * 100) + percent}%)`;
    }

    function onPointerUp() {
      if (!isDown) return;
      isDown = false;
      track.style.transition = "";
      const threshold = root.clientWidth * 0.15;

      if (Math.abs(deltaX) > threshold) {
        deltaX < 0 ? next() : prev();
      } else {
        goTo(index);
      }
      startAutoplay();
    }

    root.addEventListener("pointerdown", onPointerDown);
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerup", onPointerUp);
    root.addEventListener("pointercancel", onPointerUp);
    root.addEventListener("dragstart", (e) => e.preventDefault());

    // Init
    buildDots();
    goTo(0);
    startAutoplay();
  })();