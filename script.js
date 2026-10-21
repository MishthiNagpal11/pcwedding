/* ===== EDIT ME ===== */
const CFG = {
  groom: "Parnika",
  bride: "Chirag",
  year: 2026, // confirm the wedding year
  tz: "+05:30", // timezone of the venue
  startTime: "00:00", // first event start (HH:MM) for the countdown
  familyLines: [
    "With the blessings of the Almighty ",
    "Late Smt. Nirmal & Late Sh. Krishan Lal Harjai",
  ],
  familyNames: ["Mrs. Ruchi & Mr. Dinesh Harjai"],
  brideFamily: "S/O Mrs. Shammi & Mr. Mahesh Takkar",
  familyHeading: [
    "Harjai Family",
    "Malhotra Family",
    "Nijhawan Family",
    "Sehgal Family",
  ],
  events: [
    {
      cls: "s",
      t: "Palms of Promise",
      d: "An enchanting afternoon of love, laughter, music and cherished memories.",
      date: "1<sup>st</sup> December",
      time: "11:00 AM",
      venue: "The Page, Rohtak",
    },
    {
      cls: "r",
      t: "Midnight Dance Soiree",
      d: "A golden promise exchanged by candlelight, among flowers and family.",
      date: "1<sup>st</sup> December",
      time: "7:30 PM",
      venue: "The Page, Rohtak",
    },
    {
      cls: "h",
      t: "Mohey Rang-De",
      d: "A pop of hot pink for her, a touch of lavender for him.",
      date: "2<sup>nd</sup> December",
      time: "11:00 AM",
      venue: "The Page, Rohtak",
    },
    {
      cls: "w",
      t: "Golden Hour- Vows & Vidaai",
      d: "Two hearts, one forever, surrounded by the people we love.",
      date: "2<sup>nd</sup> December",
      time: "7:00 PM",
      venue: "Zorbagh Banquet, Rohtak",
    },
  ],

  venues: [
    {
      id: "venue1",
      title: "Where We Begin",
      name: "The Page",
      city: "Rohtak, Haryana",
      mapUrl:
        "https://www.google.com/maps/dir/?api=1&destination=The+Page%2C+Rohtak%2C+Haryana",
      image: "images/thePage.jpg",
    },
    {
      id: "venue2",
      title: "Where We Continue",
      name: "Zorbagh Banquet",
      city: "Rohtak, Haryana",
      mapUrl:
        "https://www.google.com/maps/dir/?api=1&destination=Zorbagh+Banquet%2C+Rohtak%2C+Haryana",
      image: "images/zorbagh.jpg",
    },
  ],

  hashtag: "#HumParChhaayaIshq",
  images: { sky: "", haldi: "", sangeet: "", ring: "", wedding: "", venue: "" }, // optional: paste image URLs / data URIs to replace the drawn backgrounds
};
/* ==================== */
const $ = (id) => document.getElementById(id),
  Y = CFG.year;
$("n1").textContent = CFG.groom;
$("n2").textContent = CFG.bride;
$("fam").innerHTML =
  CFG.familyLines.map((l) => `<div>${l}</div>`).join("") +
  '<div style="margin-top:8px"><b>' +
  "Mrs. Ruchi & Mr. Dinesh Harjai</b></div><div>request the honour of your presence at the wedding ceremony of their beloved daughter</div>";
$("bf").textContent = CFG.brideFamily;
$("dt").textContent = "2nd December " + Y;
$("fn").textContent = CFG.groom + " & " + CFG.bride;
$("fd").textContent = "1st & 2nd December " + Y;
$("fh2").textContent = CFG.hashtag;
const heading = $("fh");
heading.replaceChildren();

const familyNames = Array.isArray(CFG.familyHeading)
  ? CFG.familyHeading
  : [CFG.familyHeading];

familyNames.forEach((name) => {
  const span = document.createElement("span");
  span.className = "family-heading";
  span.textContent = name;
  heading.appendChild(span);
});
/* Render both venue sections in CFG.venues order */
const venueSections = document.querySelectorAll(".venue-section");

CFG.venues.forEach((venue, index) => {
  const section = venueSections[index];

  // Skip if the matching HTML section doesn't exist.
  if (!section) return;

  const title = section.querySelector("h2");
  const name = section.querySelector("h3");
  const location = section.querySelector(".venue-location");
  const directions = section.querySelector(".directions-btn");
  const number = section.querySelector(".venue-number");

  if (title) title.textContent = venue.title;
  if (name) name.textContent = venue.name;
  if (location) location.textContent = venue.city;

  if (directions && venue.mapUrl) {
    directions.href = venue.mapUrl;
    directions.target = "_blank";
    directions.rel = "noopener noreferrer";
  }

  if (number) {
    number.textContent = String(index + 1).padStart(2, "0");
  }

  if (venue.image) {
    section.style.setProperty("--venue-image", `url("${venue.image}")`);
  }
});

$("ev").innerHTML = CFG.events
  .map(
    (e) =>
      `<article class="ec rv ${e.cls}"><div><h3>${e.t}</h3><p>${e.d}</p><div class="m"><span><i>DATE</i>${e.date}</span><span><i>TIME</i>${e.time}</span></div></div></article>`,
  )
  .join("");
const I = CFG.images;
if (I.sky) $("sky").style.background = `url(${I.sky}) center/cover`;
[
  ["haldi", ".h"],
  ["sangeet", ".s"],
  ["ring", ".r"],
  ["wedding", ".w"],
].forEach(([k, s]) => {
  if (I[k]) {
    const el = document.querySelector(".ec" + s);
    if (el) el.style.backgroundImage = `url(${I[k]})`;
  }
});

/* envelope */
const env = $("env");
env.addEventListener("click", () => {
  if (env.classList.contains("open")) return;

  env.classList.add("open");
  setTimeout(() => document.body.classList.remove("lock"), 1500);

  // Start the rain theme when the envelope is opened.
  const song = $("wedding-song");
  if (song) {
    song.currentTime = 50; // Start at 0:50
    song.play().catch((error) => {
      console.warn("Music playback could not start:", error);
    });
  }
});
/* countdown */
const target = new Date(`${Y}-12-01T${CFG.startTime}:00${CFG.tz}`);
const cd = $("cd");
cd.innerHTML = ["DAYS", "HOURS", "MINUTES", "SECONDS"]
  .map((l) => `<div><b>0</b><span>${l}</span></div>`)
  .join("");
const nums = cd.querySelectorAll("b");
function tick() {
  let d = Math.max(0, target - Date.now()) / 1000;
  const v = [
    Math.floor(d / 86400),
    Math.floor((d % 86400) / 3600),
    Math.floor((d % 3600) / 60),
    Math.floor(d % 60),
  ];
  v.forEach((n, i) => (nums[i].textContent = String(n).padStart(2, "0")));
}
tick();
const timer = setInterval(tick, 1000);
addEventListener("pagehide", () => clearInterval(timer));

/* scratch */
(function () {
  const cv = $("cv"),
    card = $("card"),
    x = cv.getContext("2d");
  let w,
    h,
    down = false,
    n = 0;
  function fit() {
    const b = card.getBoundingClientRect();
    w = cv.width = b.width;
    h = cv.height = b.height;
    const g = x.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#DB8FA4");
    g.addColorStop(1, "#D3849B");
    x.globalCompositeOperation = "source-over";
    x.fillStyle = g;
    x.fillRect(0, 0, w, h);
  }
  fit();
  function sc(e) {
    const b = cv.getBoundingClientRect();
    x.globalCompositeOperation = "destination-out";
    x.beginPath();
    x.arc(e.clientX - b.left, e.clientY - b.top, 22, 0, 7);
    x.fill();
    if (++n % 8 == 0) chk();
  }
  function chk() {
    const d = x.getImageData(0, 0, w, h).data;
    let c = 0;
    for (let i = 3; i < d.length; i += 64) if (!d[i]) c++;
    if (c / (d.length / 64) > 0.4) card.classList.add("done");
  }
  cv.addEventListener("pointerdown", (e) => {
    down = true;
    cv.setPointerCapture(e.pointerId);
    sc(e);
  });
  cv.addEventListener("pointermove", (e) => {
    if (down) sc(e);
  });
  ["pointerup", "pointercancel"].forEach((t) =>
    cv.addEventListener(t, () => {
      down = false;
      chk();
    }),
  );
  cv.tabIndex = 0;
  cv.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.classList.add("done");
    }
  });
})();

/* reveal + parallax */
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.15 },
);
document.querySelectorAll(".rv").forEach((el) => io.observe(el));
const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
if (!rm)
  addEventListener(
    "scroll",
    () => {
      const s = $("welcome");
      const o = -s.getBoundingClientRect().top * 0.15;
      $("sky").style.transform = `translateY(${o}px)`;
    },
    { passive: true },
  );

document.addEventListener("DOMContentLoaded", () => {
  const venueSections = document.querySelectorAll(".venue-section");

  // Reveal each venue as it enters the screen.
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    venueSections.forEach((section) => {
      observer.observe(section);
    });
  } else {
    venueSections.forEach((section) => {
      section.classList.add("is-visible");
    });
  }
});

(() => {
  const song = document.getElementById("wedding-song");
  const button = document.getElementById("mus");

  if (!song || !button) return;

  let musicRequested = false;

  function updateButton(isPlaying) {
    button.classList.toggle("on", isPlaying);
    button.setAttribute("aria-pressed", String(isPlaying));
    button.setAttribute("aria-label", isPlaying ? "Pause music" : "Play music");
    button.title = isPlaying ? "Pause music" : "Play music";
  }

  async function playMusic() {
    if (document.hidden) return;

    try {
      await song.play();
      updateButton(true);
    } catch (error) {
      updateButton(false);
      console.warn("Music playback was blocked:", error);
    }
  }

  // Start automatically when the envelope is opened.

  // The button remains available for pause/resume.
  button.addEventListener("click", async () => {
    if (!song.paused) {
      musicRequested = false;
      song.pause();
      updateButton(false);
    } else {
      musicRequested = true;
      await playMusic();
    }
  });

  // Pause in background tabs; resume only if music was requested.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      song.pause();
      updateButton(false);
    } else if (musicRequested) {
      playMusic();
    }
  });

  song.addEventListener("play", () => updateButton(true));
  song.addEventListener("pause", () => updateButton(false));

  updateButton(false);
})();
