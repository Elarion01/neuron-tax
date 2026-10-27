const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const challenge = document.getElementById("challenge");
const questionText = document.getElementById("question");
const optionsBox = document.getElementById("options");
const feedback = document.getElementById("feedback");
const results = document.getElementById("results");

let currentQuery = "";
let currentQuestion = null;
let attempts = 0;

// Each wrong option has its own roast based on the mistake.
const questions = [
  {
    category: "Maths",
    question: "What is 15 × 4?",
    options: [
      { text: "60", correct: true },
      { text: "45", roast: "45? That's 15 × 3. Your neurons skipped a row. 💀" },
      { text: "70", roast: "70? Rounding up because you felt generous?" },
      { text: "54", roast: "54? Where did that come from? Pure vibes." }
    ]
  },
  {
    category: "Riddle",
    question: "What has keys but cannot open locks?",
    options: [
      { text: "A keyboard", correct: true },
      { text: "A broken door", roast: "A broken door? That's a lock problem, not a keys problem." },
      { text: "A blacksmith", roast: "A blacksmith makes keys AND opens locks. Deep, but wrong." },
      { text: "A wallet", roast: "A wallet? Unless you carry 87 keys, no. 💀" }
    ]
  },
  {
    category: "Computer Science",
    question: "What does CPU stand for?",
    options: [
      { text: "Central Processing Unit", correct: true },
      { text: "Computer Personal Unit", roast: "'Computer Personal Unit'? Sounds like your laptop's diary." },
      { text: "Central Program Utility", roast: "Central Program Utility? You invented a government office." },
      { text: "Core Power Unit", roast: "Core Power Unit? That's a phone charger, buddy." }
    ]
  },
  {
    category: "Maths",
    question: "What is the square of 9?",
    options: [
      { text: "81", correct: true },
      { text: "18", roast: "18? You doubled it. That's not squaring, that's laziness." },
      { text: "99", roast: "99? You wrote 9 twice and called it maths." },
      { text: "72", roast: "72 is 9 × 8. So close, yet your neurons are off by one." }
    ]
  },
  {
    category: "Riddle",
    question: "What gets wetter as it dries?",
    options: [
      { text: "A towel", correct: true },
      { text: "A sponge", roast: "A sponge gets wetter by soaking, not drying. Nice try though." },
      { text: "Rain", roast: "Rain doesn't dry anything. It just ruins your hair." },
      { text: "A washing machine", roast: "A washing machine? It wets everything and dries nothing." }
    ]
  },
  {
    category: "Computer Science",
    question: "Which language runs directly in most web browsers?",
    options: [
      { text: "JavaScript", correct: true },
      { text: "Python", roast: "Python? A snake can't run in your browser. 🐍" },
      { text: "Java", roast: "Java is to JavaScript what ham is to hamster. Classic mix-up." },
      { text: "C++", roast: "C++ in a browser? Your laptop would file for divorce." }
    ]
  },
  {
    category: "Computer Science",
    question: "What does HTML stand for?",
    options: [
      { text: "HyperText Markup Language", correct: true },
      { text: "HighText Machine Language", roast: "You literally built this site in HTML and still missed it. 💀" },
      { text: "HyperTool Multi Language", roast: "HyperTool? Your brain is buffering." },
      { text: "Home Text Markup Language", roast: "Home Text? That's not HTML, that's a WhatsApp status." }
    ]
  },
  {
    category: "Computer Science",
    question: "How many bits are in a byte?",
    options: [
      { text: "8", correct: true },
      { text: "4", roast: "4 is a nibble. Yes, that's a real word. Look it up." },
      { text: "16", roast: "16? Your byte went to the gym." },
      { text: "10", roast: "10? You counted fingers, not bits. 🖐️" }
    ]
  },
  {
    category: "Maths",
    question: "What comes next? 2, 4, 8, 16, ...",
    options: [
      { text: "32", correct: true },
      { text: "24", roast: "24? You added 8 and called it a pattern." },
      { text: "30", roast: "30? The pattern is doubling, not 'whatever feels right'." },
      { text: "20", roast: "20? You added 4 for no reason. Chaos energy." }
    ]
  },
  {
    category: "Riddle",
    question: "What has a head and a tail but no body?",
    options: [
      { text: "A coin", correct: true },
      { text: "A snake", roast: "A snake has a whole body. That's literally its entire thing. 🐍" },
      { text: "A broom", roast: "A broom has a head and a handle. Cute guess, no cigar." },
      { text: "A dog", roast: "A dog has a body. A very good body, but still a body. 🐶" }
    ]
  }
];

const correctRoasts = [
  "Wow, your brain is stronger than I thought. I assumed it was half dead. 🧠",
  "Correct! I thought your brain was drowsy, but look at you go.",
  "I never knew your brain had this much intelligence in it. Impressive.",
  "Right answer! Someone give this brain a medal (and maybe a coffee). ☕",
  "Correct. Your neurons just woke up and chose violence. 💪",
  "Plot twist: your brain actually works. Who knew?",
  "Okay, genius. Don't let it go to your head. It's still small. 😏",
  "Right! Your brain is officially out of drowsy mode. 🔓"
];

const pick = list => list[Math.floor(Math.random() * list.length)];

function shuffle(list) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function showRandomQuestion() {
  currentQuestion = pick(questions);
  attempts = 0;

  questionText.textContent =
    `${currentQuestion.category}: ${currentQuestion.question}`;

  feedback.textContent = "";
  results.replaceChildren();
  optionsBox.replaceChildren();
  optionsBox.hidden = false;

  shuffle([...currentQuestion.options]).forEach(option => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";
    button.textContent = option.text;
    button.addEventListener("click", () => handleChoice(option, button));
    optionsBox.appendChild(button);
  });

  challenge.hidden = false;
}

function handleChoice(option, button) {
  if (option.correct) {
        results.replaceChildren();

    const praise = document.createElement("p");
    praise.className = "praise";
    praise.textContent = "✅ Correct! " + pick(correctRoasts);
    results.appendChild(praise);

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

        startMaze(link);
    challenge.hidden = true;
    return;
  }

  attempts++;
  button.disabled = true;
  button.classList.add("wrong");
  feedback.textContent = option.roast;
    feedback.classList.remove("roast");
  void feedback.offsetWidth; // restarts the animation on every wrong click
  feedback.classList.add("roast");

  if (attempts >= 3) {
    feedback.textContent +=
      " Only one option left. A coin flip would've won by now. 💀";
  }
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const enteredText = searchInput.value.trim();
  if (!enteredText) return;

  // Secret bypass keyword: brain.exe
  if (enteredText.toLowerCase().startsWith("brain.exe")) {
    currentQuery = enteredText.slice("brain.exe".length).trim();

    if (!currentQuery) {
      feedback.textContent =
        "Secret mode needs a search query too, genius. 💀";
      challenge.hidden = false;
      questionText.textContent =
        "What do you want to search without paying your Neuron Tax?";
      optionsBox.hidden = true;
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
  showRandomQuestion();
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
/* THE WASTE-YOUR-TIME MAZE */
const mazePages = [
  { text: "You think you're done? 😏 Not yet. Go to the next page. You might find something interesting.", btn: "Next page →" },
  { text: "Nothing here yet. But the next page looks promising. 👀", btn: "Next page →" },
  { text: "Almost there. Maybe. Probably not. Keep clicking.", btn: "Surely this one →" },
  { text: "You might find something you want on the next page. Trust me. 🤝", btn: "I trust you →" },
  { text: "Still nothing. But your click count is looking great! 📈", btn: "Keep clicking →" },
  { text: "Halfway there! (This is a lie. You're past halfway. It's worse.)", btn: "Ugh, fine →" },
  { text: "Fun fact: you could have just googled this in 2 seconds. 💀", btn: "Next page →" },
  { text: "The next page has what you're looking for. Definitely. 100%.", btn: "Last time, I swear →" },
  { text: "Your brain is working so hard. Or is it just your finger? 🖱️", btn: "Almost… →" }
];

function startMaze(finalLink) {
  const maze = document.createElement("div");
  maze.className = "maze";
  results.appendChild(maze);
  finalLink.hidden = true;

  let page = 0;

  function render() {
    maze.replaceChildren();

    const counter = document.createElement("p");
    counter.className = "maze-counter";
    counter.textContent = `Page ${page + 1} / 10`;
    maze.appendChild(counter);

    const text = document.createElement("p");
    text.className = "maze-text";
    maze.appendChild(text);

    if (page < mazePages.length) {
      text.textContent = mazePages[page].text;

      const next = document.createElement("button");
      next.type = "button";
      next.textContent = mazePages[page].btn;
      next.style.transform =
        `translateX(${Math.floor(Math.random() * 160) - 80}px)`;
      next.addEventListener("click", () => {
        page++;
        render();
      });
      maze.appendChild(next);
    } else {
      text.textContent =
        "🎉 You have managed to waste your time completely. Final access granted.";
      finalLink.hidden = false;
    }
  }

  render();
}