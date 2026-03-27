const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const themeToggle = document.querySelector(".theme-toggle");
const navClock = document.querySelector("#nav-clock");

const themeStorageKey = "major-lens-theme";

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);

  if (themeToggle) {
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
  }
}

function getPreferredTheme() {
  const savedTheme = localStorage.getItem(themeStorageKey);

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

applyTheme(getPreferredTheme());

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem(themeStorageKey, nextTheme);
  });
}

if (navClock) {
  const formatter = new Intl.DateTimeFormat([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  function updateClock() {
    navClock.textContent = formatter.format(new Date());
  }

  updateClock();
  window.setInterval(updateClock, 1000);
}

const typewriterNodes = document.querySelectorAll("[data-typewriter]");

function runTypewriter(node, delay = 120) {
  const finalText = node.textContent.trim();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!finalText || reducedMotion) {
    return;
  }

  node.textContent = "";
  node.classList.add("is-typing");

  let index = 0;

  const timerId = window.setInterval(() => {
    index += 1;
    node.textContent = finalText.slice(0, index);

    if (index >= finalText.length) {
      window.clearInterval(timerId);
      node.classList.remove("is-typing");
      node.classList.add("is-done");
      window.setTimeout(() => node.classList.remove("is-done"), 900);
    }
  }, delay);
}

if (typewriterNodes.length > 0) {
  typewriterNodes.forEach((node, index) => {
    window.setTimeout(() => runTypewriter(node, 34), 220 + index * 120);
  });
}

const revealTargets = document.querySelectorAll(
  ".info-card, .metric-card, .process-card, .glass-card, .checklist-card, .quote-card, .timeline-item, .question-list article, .major-tile, .major-detail, .advisor-card, .chart-card, .issue-card, .cta-panel, .spotlight-panel, .hero-stats article"
);

if (revealTargets.length > 0) {
  revealTargets.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealTargets.forEach((element) => observer.observe(element));
  }
}

window.addEventListener("pointermove", (event) => {
  document.body.style.setProperty("--pointer-x", `${event.clientX}px`);
  document.body.style.setProperty("--pointer-y", `${event.clientY}px`);
});

const pathButtons = document.querySelectorAll("[data-path-target]");
const bookingFeedback = document.querySelector("#booking-feedback");
const bookingButtons = document.querySelectorAll(".booking-button");

function showBookingMessage(message) {
  if (!bookingFeedback) return;

  bookingFeedback.textContent = message;
  bookingFeedback.classList.add("visible");

  window.clearTimeout(showBookingMessage.timeoutId);
  showBookingMessage.timeoutId = window.setTimeout(() => {
    bookingFeedback.classList.remove("visible");
  }, 3200);
}

if (bookingButtons.length > 0) {
  bookingButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-book-target");
      showBookingMessage(`Fictional booking request saved for: ${target}.`);
    });
  });
}

if (pathButtons.length > 0) {
  pathButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-path-target");

      pathButtons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-selected", String(isActive));
      });

      document.querySelectorAll(".journey-panel").forEach((panel) => {
        panel.hidden = panel.id !== `journey-${target}`;
      });
    });
  });
}

const kuMajors = [
  {
    id: "computer-science",
    emoji: "💻",
    name: "Computer Science",
    cluster: "Computing",
    workload: "High",
    complexity: "High",
    rhythm: "Coding labs, projects, debugging, math-heavy logic",
    outlook: "Fast-paced and project-driven. Strong for students who like building, problem-solving, and long technical assignments.",
    meeting: "Computer Science faculty reality-check meeting"
  },
  {
    id: "computer-engineering",
    emoji: "🖥️",
    name: "Computer Engineering",
    cluster: "Computing",
    workload: "High",
    complexity: "High",
    rhythm: "Hardware, software, systems labs, applied math",
    outlook: "A mix of computing and engineering demands. Good for students who enjoy technical depth and systems thinking.",
    meeting: "Computer Engineering faculty reality-check meeting"
  },
  {
    id: "robotics-ai",
    emoji: "🤖",
    name: "Robotics and AI",
    cluster: "Computing",
    workload: "High",
    complexity: "High",
    rhythm: "Programming, automation, modeling, AI concepts, team projects",
    outlook: "Best for students comfortable with coding, experimentation, and interdisciplinary problem-solving.",
    meeting: "Robotics and AI faculty reality-check meeting"
  },
  {
    id: "applied-math",
    emoji: "📊",
    name: "Applied Mathematics",
    cluster: "Science and Math",
    workload: "Medium",
    complexity: "High",
    rhythm: "Abstract thinking, equations, proofs, modeling",
    outlook: "Conceptually demanding and analytical. Great for students who enjoy rigorous mathematical thinking.",
    meeting: "Applied Mathematics faculty reality-check meeting"
  },
  {
    id: "mechanical-engineering",
    emoji: "⚙️",
    name: "Mechanical Engineering",
    cluster: "Engineering",
    workload: "High",
    complexity: "High",
    rhythm: "Problem sets, design work, physics-based analysis",
    outlook: "Demanding and structured. A strong fit for students who like mechanics, design, and sustained technical work.",
    meeting: "Mechanical Engineering faculty reality-check meeting"
  },
  {
    id: "engineering-systems",
    emoji: "📈",
    name: "Engineering Systems and Management",
    cluster: "Engineering",
    workload: "Medium",
    complexity: "Medium",
    rhythm: "Operations, systems thinking, management decisions, teamwork",
    outlook: "Useful for students who like engineering contexts but also want strategy, organization, and applied decision-making.",
    meeting: "Engineering Systems and Management faculty reality-check meeting"
  },
  {
    id: "electrical-engineering",
    emoji: "⚡",
    name: "Electrical Engineering",
    cluster: "Engineering",
    workload: "High",
    complexity: "High",
    rhythm: "Circuits, systems, lab work, technical calculations",
    outlook: "Intense and concept-heavy. Good for students who enjoy math, precision, and technical problem-solving.",
    meeting: "Electrical Engineering faculty reality-check meeting"
  },
  {
    id: "civil-engineering",
    emoji: "🏗️",
    name: "Civil Engineering",
    cluster: "Engineering",
    workload: "High",
    complexity: "Medium",
    rhythm: "Structures, materials, design tasks, calculations",
    outlook: "Applied and practical, with a strong technical base and design-oriented workload.",
    meeting: "Civil Engineering faculty reality-check meeting"
  },
  {
    id: "chemical-engineering",
    emoji: "🧪",
    name: "Chemical Engineering",
    cluster: "Engineering",
    workload: "High",
    complexity: "High",
    rhythm: "Chemistry, process design, lab interpretation, calculations",
    outlook: "A strong option for students comfortable with both chemistry concepts and technical engineering workloads.",
    meeting: "Chemical Engineering faculty reality-check meeting"
  },
  {
    id: "biomedical-engineering",
    emoji: "🧬",
    name: "Biomedical Engineering",
    cluster: "Engineering",
    workload: "High",
    complexity: "High",
    rhythm: "Engineering principles applied to health and biology",
    outlook: "Best for students interested in the overlap between engineering systems and life sciences.",
    meeting: "Biomedical Engineering faculty reality-check meeting"
  },
  {
    id: "aerospace-engineering",
    emoji: "🚀",
    name: "Aerospace Engineering",
    cluster: "Engineering",
    workload: "High",
    complexity: "High",
    rhythm: "Advanced mechanics, systems, modeling, design",
    outlook: "Demanding and highly technical. Often suits students who enjoy physics, design, and large-scale systems.",
    meeting: "Aerospace Engineering faculty reality-check meeting"
  },
  {
    id: "energy-engineering",
    emoji: "🔋",
    name: "Energy Engineering",
    cluster: "Engineering",
    workload: "Medium",
    complexity: "Medium",
    rhythm: "Energy systems, sustainability topics, applied engineering analysis",
    outlook: "A practical option for students interested in engineering with a strong systems and resource focus.",
    meeting: "Energy Engineering faculty reality-check meeting"
  },
  {
    id: "petroleum-engineering",
    emoji: "🛢️",
    name: "Petroleum Engineering",
    cluster: "Engineering",
    workload: "High",
    complexity: "Medium",
    rhythm: "Applied engineering, field-focused systems, technical calculations",
    outlook: "Good for students who want a focused engineering discipline with strong technical application.",
    meeting: "Petroleum Engineering faculty reality-check meeting"
  },
  {
    id: "cell-biology",
    emoji: "🔬",
    name: "Cell and Molecular Biology",
    cluster: "Science and Math",
    workload: "Medium",
    complexity: "High",
    rhythm: "Lab-based learning, scientific detail, biology concepts",
    outlook: "Best for students who like research-style learning, scientific precision, and biological systems.",
    meeting: "Cell and Molecular Biology faculty reality-check meeting"
  },
  {
    id: "physics",
    emoji: "⚛️",
    name: "Physics",
    cluster: "Science and Math",
    workload: "High",
    complexity: "High",
    rhythm: "Conceptual theory, math, analytical problem-solving",
    outlook: "Excellent for students who enjoy abstract thinking, mathematical modeling, and fundamental scientific questions.",
    meeting: "Physics faculty reality-check meeting"
  },
  {
    id: "chemistry",
    emoji: "⚗️",
    name: "Chemistry",
    cluster: "Science and Math",
    workload: "Medium",
    complexity: "Medium",
    rhythm: "Lab work, theory, reactions, analysis",
    outlook: "Works well for students who enjoy scientific experimentation, detail, and applied theory.",
    meeting: "Chemistry faculty reality-check meeting"
  },
  {
    id: "earth-planetary",
    emoji: "🪐",
    name: "Earth and Planetary Sciences",
    cluster: "Science and Math",
    workload: "Medium",
    complexity: "Medium",
    rhythm: "Scientific investigation, earth systems, observation and analysis",
    outlook: "A strong fit for students interested in environmental systems, geology, and planetary questions.",
    meeting: "Earth and Planetary Sciences faculty reality-check meeting"
  }
];

const majorGrid = document.querySelector("#major-grid");
const majorDetail = document.querySelector("#major-detail");

function toneClass(value) {
  return value.toLowerCase();
}

function renderMajorDetail(major) {
  if (!majorDetail) return;

  majorDetail.innerHTML = `
    <span class="major-tag">${major.cluster}</span>
    <div class="detail-header">
      <div>
        <h2>${major.name}</h2>
        <p>${major.outlook}</p>
      </div>
      <div class="detail-emoji" aria-hidden="true">${major.emoji}</div>
    </div>
    <div class="major-meta">
      <div class="major-metric">
        <span>Workload</span>
        <span class="pill ${toneClass(major.workload)}">${major.workload}</span>
      </div>
      <div class="major-metric">
        <span>Complexity</span>
        <span class="pill ${toneClass(major.complexity)}">${major.complexity}</span>
      </div>
      <div class="major-metric">
        <span>Academic rhythm</span>
        <strong>${major.rhythm}</strong>
      </div>
      <div class="major-metric">
        <span>Recommended meeting</span>
        <strong>${major.meeting}</strong>
      </div>
    </div>
    <button class="button primary booking-button dynamic-booking" type="button" data-book-target="${major.meeting}">Book this meeting</button>
  `;

  const dynamicButton = majorDetail.querySelector(".dynamic-booking");
  if (dynamicButton) {
    dynamicButton.addEventListener("click", () => {
      showBookingMessage(`Fictional booking request saved for: ${major.meeting}.`);
    });
  }
}

if (majorGrid && majorDetail) {
  majorGrid.innerHTML = kuMajors.map((major, index) => `
    <button class="major-tile${index === 0 ? " active" : ""}" type="button" data-major-id="${major.id}">
      <span class="major-emoji" aria-hidden="true">${major.emoji}</span>
      <span>${major.name}</span>
    </button>
  `).join("");

  renderMajorDetail(kuMajors[0]);

  majorGrid.querySelectorAll(".major-tile").forEach((tile) => {
    tile.addEventListener("click", () => {
      const major = kuMajors.find((item) => item.id === tile.getAttribute("data-major-id"));
      if (!major) return;

      majorGrid.querySelectorAll(".major-tile").forEach((item) => {
        item.classList.toggle("active", item === tile);
      });

      renderMajorDetail(major);
    });
  });
}
