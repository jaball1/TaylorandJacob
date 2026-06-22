function checkPassword() {
  const password = document.getElementById("passwordInput").value;
  const correctPassword = "Maggie";

  if (password === correctPassword) {
    document.getElementById("passwordBox").style.display = "none";
    document.getElementById("rsvpContent").style.display = "block";
    document.getElementById("errorMsg").innerText = "";
  } else {
    document.getElementById("errorMsg").innerText = "Wrong password";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const nav = document.querySelector(".navbar");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");

      const isOpen = navLinks.classList.contains("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (e) => {
      const clickedInsideNav = nav && nav.contains(e.target);
      if (!clickedInsideNav) {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const targetEl = document.querySelector(targetId);

      if (!targetEl) return;

      e.preventDefault();

      const navHeight = nav ? nav.offsetHeight : 0;
      const targetTop =
        targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    });
  });

  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 40) {
        nav.style.padding = "10px 45px";
        nav.style.background = "rgba(12, 26, 18, 0.75)";
      } else {
        nav.style.padding = "16px 45px";
        nav.style.background = "rgba(12, 26, 18, 0.55)";
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
});

const slides = document.querySelectorAll(".slide");
let shuffledIndexes = [];
let currentPosition = 0;
let slideTimer;

function shuffleSlides() {
  shuffledIndexes = Array.from(slides.keys());

  for (let i = shuffledIndexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledIndexes[i], shuffledIndexes[j]] = [shuffledIndexes[j], shuffledIndexes[i]];
  }

  currentPosition = 0;
}

function showSlide(position) {
  slides.forEach(slide => {
    slide.style.display = "none";
  });

  const actualIndex = shuffledIndexes[position];
  slides[actualIndex].style.display = "block";
}

function nextSlide() {
  currentPosition++;

  if (currentPosition >= shuffledIndexes.length) {
    shuffleSlides();
  }

  showSlide(currentPosition);
}

window.changeSlide = function(direction) {
  clearInterval(slideTimer);

  currentPosition += direction;

  if (currentPosition >= shuffledIndexes.length) {
    shuffleSlides();
  }

  if (currentPosition < 0) {
    currentPosition = shuffledIndexes.length - 1;
  }

  showSlide(currentPosition);
  slideTimer = setInterval(nextSlide, 7000);
};

if (slides.length > 0) {
  shuffleSlides();
  showSlide(currentPosition);
  slideTimer = setInterval(nextSlide, 7000);
}
