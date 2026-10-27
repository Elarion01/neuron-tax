
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const challenge = document.getElementById("challenge");
const questionText = document.getElementById("question");
const answerInput = document.getElementById("answer-input");
const checkButton = document.getElementById("check-answer");
const feedback = document.getElementById("feedback");
const results = document.getElementById("results");

let currentQuery = "";
let currentAnswer = "";
let attempts = 0;

const questions = [
  {
    category: "Maths",
    question: "What is 15 × 4?",
    answer: "60"
  },
  {
    category: "Riddle",
    question: "What has keys but cannot open locks?",
    answer: "keyboard"
  },
  {
    category: "Computer Science",
    question: "What does CPU stand for?",
    answer: "central processing unit"
  },
  {
    category: "Maths",
    question: "What is the square of 9?",
    answer: "81"
  },
  {
    category: "Riddle",
    question: "What gets wetter as it dries?",
    answer: "towel"
  },
  {
    category: "Computer Science",
    question: "Which language runs directly in most web browsers?",
    answer: "javascript"
  }
];

const wrongRoasts = [
  "💀 Your neurons just filed a complaint.",
  "BRO. Even the calculator is disappointed.",
  "🧠 Brain.exe has stopped responding.",
  "That answer needs a software update.",
  "I can't let that brain be drowsy!"
];

const correctRoasts = [
  "Fine, Einstein. You may proceed. 🧠",
  "Neurons activated. Search unlocked! 🔓",
  "Look at you actually using your brain!",
  "Impressive. Your brain is still under warranty."
];

function showRandomQuestion() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  const selected = questions[randomIndex];

  currentAnswer = selected.answer;
  attempts = 0;

  questionText.textContent =
    `${selected.category}: ${selected.question}`;

  answerInput.value = "";
  feedback.textContent = "";
  challenge.hidden = false;
  results.replaceChildren();
  answerInput.focus();
}


searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const enteredText = searchInput.value.trim();

  if (!enteredText) return;

  // Secret bypass keyword: brain.exe
  if (enteredText.toLowerCase().startsWith("brain.exe")) {
    currentQuery = enteredText
      .slice("brain.exe".length)
      .trim();

    if (!currentQuery) {
      feedback.textContent =
        "Secret mode needs a search query too, genius. 💀";
      challenge.hidden = false;
      questionText.textContent =
        "What do you want to search without paying your Neuron Tax?";
      answerInput.hidden = true;
      checkButton.hidden = true;
      return;
    }

    window.open(
      "https://www.google.com/search?q=" +
      encodeURIComponent(currentQuery),
      "_blank",
      "noopener,noreferrer"
    );

    return;
  }

  currentQuery = enteredText;

  answerInput.hidden = false;
  checkButton.hidden = false;
  
  showRandomQuestion();
});


checkButton.addEventListener("click", function () {
  const userAnswer = answerInput.value.trim().toLowerCase();

  if (!userAnswer) {
    feedback.textContent = "Type an answer first, genius. 💀";
    return;
  }

  if (userAnswer === currentAnswer.toLowerCase()) {
    feedback.textContent =
      correctRoasts[Math.floor(Math.random() * correctRoasts.length)];

    results.replaceChildren();

    const message = document.createElement("p");
    message.textContent = `Neuron Tax paid for: "${currentQuery}"`;
    results.appendChild(message);

    const link = document.createElement("a");
    link.textContent = "🔎 Reveal Search Results";
    link.href =
      "https://www.google.com/search?q=" +
      encodeURIComponent(currentQuery);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    results.appendChild(link);

    challenge.hidden = true;
  } else {
    attempts++;

    feedback.textContent =
      wrongRoasts[Math.floor(Math.random() * wrongRoasts.length)];

    if (attempts >= 3) {
      feedback.textContent +=
        " Three attempts and still struggling? Try again, legend. 💀";
    }
  }
});

answerInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkButton.click();
  }
});

/* NEURON TAX — Interactive Neural Circuit Background */
(() => {
  const canvas = document.getElementById("neural-background");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;
  let circuits = [];
  let nodes = [];
  let mouse = { x: -1000, y: -1000 };
  let targetTilt = { x: 0, y: 0 };
  let tilt = { x: 0, y: 0 };
  let animationId;

  const blue = [22, 191, 255];
  const gold = [255, 198, 109];

  const random = (min, max) => Math.random() * (max - min) + min;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    createNetwork();
  }

  function createNetwork() {
    circuits = [];
    nodes = [];

    const spacing = 65;
    const columns = Math.ceil(width / spacing);
    const rows = Math.ceil(height / spacing);

    // Circuit paths use horizontal and vertical turns.
    for (let i = 0; i < Math.min(columns * rows * 0.65, 260); i++) {
      const startX = random(0, columns) * spacing;
      const startY = random(0, rows) * spacing;
      const points = [{ x: startX, y: startY }];

      let x = startX;
      let y = startY;
      const segments = Math.floor(random(2, 6));

      for (let j = 0; j < segments; j++) {
        if (Math.random() > 0.5) {
          x += random(-3, 3) * spacing;
        } else {
          y += random(-3, 3) * spacing;
        }

        x = Math.max(-spacing, Math.min(width + spacing, x));
        y = Math.max(-spacing, Math.min(height + spacing, y));

        points.push({ x, y });
      }

      circuits.push({
        points,
        color: Math.random() > 0.25 ? blue : gold,
        phase: random(0, 1),
        speed: random(0.001, 0.004),
        pulse: random(0, 1)
      });
    }

    // Neural connection points.
    const count = Math.min(65, Math.floor(width * height / 18000));

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: random(0, width),
        y: random(0, height),
        radius: random(1.5, 3.5),
        phase: random(0, Math.PI * 2),
        color: Math.random() > 0.3 ? blue : gold,
        drift: random(0.15, 0.6)
      });
    }
  }

  function drawCircuit(circuit, time) {
    const points = circuit.points;
    if (points.length < 2) return;

    const [r, g, b] = circuit.color;
    let nearest = Infinity;

    for (const point of points) {
      nearest = Math.min(
        nearest,
        Math.hypot(point.x - mouse.x, point.y - mouse.y)
      );
    }

    const influence = Math.max(0, 1 - nearest / 190);
    const pulse = (time * circuit.speed + circuit.phase) % 1;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      const previous = points[i - 1];

      // Tiny cursor-driven wiggle near the mouse.
      const distance = Math.hypot(point.x - mouse.x, point.y - mouse.y);
      const wiggle = distance < 160
        ? Math.sin(time * 0.004 + i) * influence * 4
        : 0;

      ctx.lineTo(
        point.x + wiggle,
        point.y - wiggle * 0.5
      );
    }

    ctx.lineWidth = 0.8 + influence * 1.5;
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.12 + influence * 0.65})`;
    ctx.shadowBlur = influence * 18;
    ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Moving electrical pulse along the path.
    const segmentCount = points.length - 1;
    const position = pulse * segmentCount;
    const segment = Math.min(Math.floor(position), segmentCount - 1);
    const fraction = position - segment;
    const a = points[segment];
    const c = points[segment + 1];

    const px = a.x + (c.x - a.x) * fraction;
    const py = a.y + (c.y - a.y) * fraction;

    ctx.beginPath();
    ctx.arc(px, py, 1.5 + influence * 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.35 + influence * 0.65})`;
    ctx.shadowBlur = 12 + influence * 18;
    ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  function drawNode(node, time) {
    const distance = Math.hypot(node.x - mouse.x, node.y - mouse.y);
    const influence = Math.max(0, 1 - distance / 200);
    const [r, g, b] = node.color;
    const breathe = (Math.sin(time * 0.002 + node.phase) + 1) / 2;
    const radius = node.radius + breathe * 1.2 + influence * 3;

    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.35 + influence * 0.65})`;
    ctx.shadowBlur = 5 + breathe * 8 + influence * 28;
    ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
    ctx.fill();
    ctx.shadowBlur = 0;

    if (influence > 0.05) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius + 5 + influence * 10, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${influence * 0.45})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function animate(time) {
    ctx.clearRect(0, 0, width, height);

    // Smooth, subtle parallax based on cursor position.
    tilt.x += (targetTilt.x - tilt.x) * 0.035;
    tilt.y += (targetTilt.y - tilt.y) * 0.035;

    ctx.save();
    ctx.translate(tilt.x, tilt.y);

    // Very subtle background grid.
    ctx.strokeStyle = "rgba(45, 115, 160, 0.055)";
    ctx.lineWidth = 1;
    const grid = 55;

    for (let x = 0; x < width; x += grid) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y < height; y += grid) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    circuits.forEach(circuit => drawCircuit(circuit, time));
    nodes.forEach(node => drawNode(node, time));

    // Soft blue aura follows the cursor.
    if (mouse.x >= 0 && mouse.y >= 0) {
      const aura = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 190
      );

      aura.addColorStop(0, "rgba(22, 191, 255, 0.09)");
      aura.addColorStop(0.5, "rgba(22, 191, 255, 0.025)");
      aura.addColorStop(1, "rgba(22, 191, 255, 0)");

      ctx.fillStyle = aura;
      ctx.fillRect(mouse.x - 190, mouse.y - 190, 380, 380);
    }

    ctx.restore();
    animationId = requestAnimationFrame(animate);
  }

  window.addEventListener("pointermove", event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    targetTilt.x = (event.clientX / width - 0.5) * -10;
    targetTilt.y = (event.clientY / height - 0.5) * -10;
  }, { passive: true });

  window.addEventListener("pointerleave", () => {
    mouse.x = -1000;
    mouse.y = -1000;
    targetTilt.x = 0;
    targetTilt.y = 0;
  });

  window.addEventListener("resize", resize);

  // Pause animation when the tab is hidden to save resources.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(animate);
    }
  });

  resize();
  animationId = requestAnimationFrame(animate);
})();
