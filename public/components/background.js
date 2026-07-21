const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

let width;
let height;

let offset = 0;

const GRID_SIZE = 60;

// ----------------------
// Resize
// ----------------------

function resizeCanvas() {

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();


// ----------------------
// Procedural Graph
// ----------------------

function generateGraph() {

    const points = [];

    let y = height / 2;

    for (let x = -100; x < width + 300; x += 18) {

        y += (Math.random() - 0.5) * 45;

        y = Math.max(height * 0.15, y);
        y = Math.min(height * 0.85, y);

        points.push({ x, y });

    }

    return points;

}

const graphs = [

    {
        points: generateGraph(),
        speed: 0.25,
        alpha: 0.30,
        width: 3
    },

    {
        points: generateGraph(),
        speed: 0.18,
        alpha: 0.18,
        width: 2
    },

    {
        points: generateGraph(),
        speed: 0.12,
        alpha: 0.10,
        width: 1.5
    }

];


// ----------------------
// Floating Labels
// ----------------------

const labels = [

    "NIFTY",
    "BANKNIFTY",
    "RELIANCE",
    "INFY",
    "TCS",
    "SBIN",
    "45°",
    "90°",
    "180°",
    "+2.42%",
    "-0.84%",
    "₹2485",
    "₹915",
    "GAN"

];

const floatingLabels = [];

for (let i = 0; i < 25; i++) {

    floatingLabels.push({

        text: labels[Math.floor(Math.random() * labels.length)],

        x: Math.random() * window.innerWidth,

        y: Math.random() * window.innerHeight,

        speed: 0.15 + Math.random() * 0.25,

        size: 12 + Math.random() * 8

    });

}


// ----------------------
// Particles
// ----------------------

const particles = [];

for (let i = 0; i < 120; i++) {

    particles.push({

        x: Math.random() * width,

        y: Math.random() * height,

        r: Math.random() * 2,

        speed: 0.2 + Math.random()

    });

}



// ----------------------
// Draw Grid
// ----------------------

function drawGrid() {

    offset += 0.15;

    ctx.strokeStyle = "rgba(70,130,255,0.05)";
    ctx.lineWidth = 1;

    for (let x = -GRID_SIZE; x < width + GRID_SIZE; x += GRID_SIZE) {

        ctx.beginPath();

        ctx.moveTo(x + (offset % GRID_SIZE), 0);

        ctx.lineTo(x + (offset % GRID_SIZE), height);

        ctx.stroke();

    }

    for (let y = 0; y < height; y += GRID_SIZE) {

        ctx.beginPath();

        ctx.moveTo(0, y);

        ctx.lineTo(width, y);

        ctx.stroke();

    }

}



// ----------------------
// Draw Graphs
// ----------------------

function drawGraphs() {

    graphs.forEach(graph => {

        ctx.beginPath();

        ctx.strokeStyle = `rgba(70,170,255,${graph.alpha})`;

        ctx.lineWidth = graph.width;

        graph.points.forEach((p, index) => {

            p.x -= graph.speed;

            if (index === 0)
                ctx.moveTo(p.x, p.y);
            else
                ctx.lineTo(p.x, p.y);

        });

        ctx.stroke();

        if (graph.points[0].x < -150) {

            graph.points.shift();

            const last = graph.points[graph.points.length - 1];

            let newY = last.y + (Math.random() - 0.5) * 45;

            newY = Math.max(height * 0.15, newY);
            newY = Math.min(height * 0.85, newY);

            graph.points.push({

                x: last.x + 18,

                y: newY

            });

        }

    });

}



// ----------------------
// Draw Labels
// ----------------------

function drawLabels() {

    ctx.fillStyle = "rgba(120,170,255,0.08)";
    ctx.font = "500 16px Inter";

    floatingLabels.forEach(label => {

        label.x -= label.speed;

        if (label.x < -100) {

            label.x = width + 100;
            label.y = Math.random() * height;

        }

        ctx.font = `500 ${label.size}px Inter`;

        ctx.fillText(

            label.text,

            label.x,

            label.y

        );

    });

}



// ----------------------
// Draw Particles
// ----------------------

function drawParticles() {

    particles.forEach(p => {

        p.x -= p.speed;

        if (p.x < 0) {

            p.x = width;

            p.y = Math.random() * height;

        }

        ctx.beginPath();

        ctx.arc(

            p.x,

            p.y,

            p.r,

            0,

            Math.PI * 2

        );

        ctx.fillStyle = "rgba(120,180,255,0.25)";

        ctx.fill();

    });

}



// ----------------------
// Glow
// ----------------------

function drawGlow() {

    const gradient = ctx.createRadialGradient(

        width / 2,

        height / 2,

        50,

        width / 2,

        height / 2,

        700

    );

    gradient.addColorStop(0, "rgba(40,120,255,0.08)");

    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;

    ctx.fillRect(

        0,

        0,

        width,

        height

    );

}



// ----------------------
// Animation Loop
// ----------------------

function animate() {

    ctx.clearRect(

        0,

        0,

        width,

        height

    );

    drawGlow();

    drawGrid();

    drawGraphs();

    drawParticles();

    drawLabels();

    requestAnimationFrame(animate);

}

animate();