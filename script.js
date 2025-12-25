const music = document.getElementById("bg-music");

const playlist = [
  "assets/song1.mp3",
  "assets/song2.mp3"
];

let currentTrack = 0;

/* play first song on intro tap */
intro.addEventListener("click", () => {
  music.volume = 0.6;
  music.src = playlist[currentTrack];
  music.play().catch(() => {});
  intro.classList.add("hidden");
});

/* when a song ends → play next */
music.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  music.src = playlist[currentTrack];
  music.play();
});

/* 🔇 Mute Button Logic */
const muteBtn = document.getElementById("muteBtn");

intro.addEventListener("click", () => {
  if (music) {
    music.volume = 0.6;
    music.muted = false;
    music.play().catch(() => {});
  }

  // ✅ SHOW THE MUTE BUTTON
  if (muteBtn) {
    muteBtn.style.display = "block";
  }

  intro.classList.add("hidden");
});

if (muteBtn && music) {
  muteBtn.addEventListener("click", () => {
    music.muted = !music.muted;
    muteBtn.textContent = music.muted ? "🔇" : "🔊";
  });
}

/* ❄️ Snowfall Effect (particles.js) */
particlesJS("snowfall", {
  particles: {
    number: {
      value: 120,
      density: { enable: true, value_area: 900 }
    },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: {
      value: 0.7,
      random: true
    },
    size: {
      value: 4,
      random: true
    },
    move: {
      enable: true,
      speed: 2,
      direction: "bottom",
      out_mode: "out"
    }
  },
  retina_detect: true
});

/* ================================
   ❄️ Falling Snow + Food Logic
   ================================ */
const fallLayer = document.getElementById("fall");
const snow = ["❄️","✨"];
const food = ["🍪","🍰","🥐","🍫","☕"];

function spawnFall(){
  const el = document.createElement("div");
  el.className = "fall";
  const pool = Math.random() < 0.6 ? snow : food;
  el.textContent = pool[Math.floor(Math.random()*pool.length)];
  el.style.left = Math.random()*100 + "%";
  el.style.animationDuration = 7 + Math.random()*6 + "s";
  el.style.opacity = 0.4 + Math.random()*0.5;
  fallLayer.appendChild(el);
  setTimeout(()=>el.remove(),15000);
}
setInterval(spawnFall,420);

/* 🎄 Ribbon Tree Generator */
const ribbon = document.getElementById("ribbon");

const SEGMENTS = 60;
const HEIGHT = 300;
const BASE_RADIUS = 100;
const TURNS = 5;

for(let i=0;i<SEGMENTS;i++){
  const seg = document.createElement("div");
  seg.className = "tree-dot";

  const colors = [
    "#E53935", // deep red
    "#F26A6A", // soft red
    "#F5F1E8", // warm white
    "#FFF7EC"  // soft white
  ];

  seg.style.setProperty(
    "--dot-color",
    colors[Math.floor(Math.random() * colors.length)]
  );

  const t = i / SEGMENTS;
  const angle = t * TURNS * Math.PI * 2;
  const radius = BASE_RADIUS * (1 - t);
  const y = HEIGHT * t;

  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

seg.style.transform = `
  translate3d(${x}px, ${-y}px, ${z}px)
`;

  ribbon.appendChild(seg);
}

/* 🎧 Wrapped Slides */
const slides = document.querySelectorAll(".slide");
let index = 0;

document.getElementById("wrapped").addEventListener("click",()=>{
  slides[index].classList.remove("active");
  index = (index+1) % slides.length;
  slides[index].classList.add("active");
});

/* ================================
   ✨ Pointer Trail Logic
   ================================ */

const trailLayer = document.getElementById("trail");

let lastX = 0;
let lastY = 0;

function spawnTrail(x, y){
  const dot = document.createElement("div");
  dot.className = "trail-dot";
  dot.style.left = x + "px";
  dot.style.top = y + "px";

  trailLayer.appendChild(dot);

  setTimeout(() => dot.remove(), 900);
}

window.addEventListener("pointermove", e => {
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  const distance = Math.sqrt(dx*dx + dy*dy);

  if(distance > 12){        // controls density
    spawnTrail(e.clientX, e.clientY);
    lastX = e.clientX;
    lastY = e.clientY;
  }
});

/* ================================
   ⭐ Place Star at TRUE Tree Apex
   ================================ */

const star = document.getElementById("star");

// Same HEIGHT you use for dots
const STAR_OFFSET = 18; // breathing room above top dot

star.style.transform = `
  translate3d(0px, ${-(HEIGHT + STAR_OFFSET)}px, 30px)
`;

/* ================================
   ❄️ Wrapped Card Flip Logic
================================ */
const print = document.getElementById("polaroidPrint");

document.getElementById("wrapped").addEventListener("click", () => {
  print.classList.add("is-flipping");

  setTimeout(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
    print.classList.remove("is-flipping");
  }, 220);
});
