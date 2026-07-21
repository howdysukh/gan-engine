const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

let width;
let height;
let time = 0;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function drawGrid() {

    ctx.strokeStyle = "rgba(255,255,255,0.035)";
    ctx.lineWidth = 1;

    const size = 50;

    for (let x = 0; x < width; x += size) {

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();

    }

    for (let y = 0; y < height; y += size) {

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();

    }

}

function drawGlow() {

    const gradient = ctx.createRadialGradient(
        width * .5,
        height * .25,
        0,
        width * .5,
        height * .25,
        500
    );

    gradient.addColorStop(0, "rgba(59,130,246,.18)");
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;
    ctx.fillRect(0,0,width,height);

}

function drawGraph() {

    ctx.beginPath();

    ctx.lineWidth = 3;

    ctx.strokeStyle = "#3B82F6";

    const amplitude = 80;

    const offset = height * .45;

    for(let x=0;x<=width;x+=8){

        const y =
            offset
            +
            Math.sin((x*0.008)+time)*55
            +
            Math.sin((x*0.002))*35;

        if(x===0){

            ctx.moveTo(x,y);

        }else{

            ctx.lineTo(x,y);

        }

    }

    ctx.shadowBlur = 25;
    ctx.shadowColor="#3B82F6";

    ctx.stroke();

    ctx.shadowBlur=0;

}

function animate(){

    time += .01;

    ctx.clearRect(0,0,width,height);

    drawGlow();

    drawGrid();

    drawGraph();

    requestAnimationFrame(animate);

}

animate();