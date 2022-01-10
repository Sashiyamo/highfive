renderer = function() {

    console.log("hello");
    let audio = document.getElementById("audio");
    audio.load();
    audio.play();
    let context = new AudioContext();
    let src = context.createMediaElementSource(audio);
    let analyser = context.createAnalyser();

    let canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    let bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    let dataArray = new Uint8Array(bufferLength);

    let WIDTH = canvas.width;
    let HEIGHT = canvas.height;

    let barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    function renderFrame() {
        requestAnimationFrame(renderFrame);

        x = 0;

        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = "#1a1a1a";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

            let r = barHeight + (25 * (i/bufferLength));
            let g = 250 * (i/bufferLength);
            let b = 50;

            ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }
    }

    audio.play();
    renderFrame();
    document.getElementById("audio").removeEventListener('play', renderer)
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".menu_but")[Math.round(window.pageYOffset / window.innerHeight)].classList.add("but_active")
})

document.getElementById("audio").addEventListener('play', renderer)

document.getElementById("play1").addEventListener('click', function (){
    if (document.getElementById("vyn1").classList.contains("animated")) {
        document.getElementById("vyn1").classList.remove("animated")
    } else document.getElementById("vyn1").classList.add("animated")
})

document.getElementById("play2").addEventListener('click', function (){
    if (document.getElementById("vyn2").classList.contains("animated")) {
        document.getElementById("vyn2").classList.remove("animated")
    } else document.getElementById("vyn2").classList.add("animated")
})

document.querySelectorAll(".menu_but").forEach(function (e, index) {
    e.addEventListener('click', (ev) => {
        console.log(ev)

        window.scrollTo({
            top: window.innerHeight * index,
            behavior: "smooth"
        });

        let i = 0
        while (i < 3) {
            let arr = document.querySelectorAll(".menu_but")
            if (arr[i].classList.contains("but_active")) {
                arr[i].classList.remove("but_active")
                ev.path[0].classList.add("but_active")
                break
            }
            i++
        }
    })
})

document.querySelector(".page").addEventListener("wheel", function (e) {
    // console.log(e)
    if (e.deltaY > 0) {
        window.scrollTo({
            top: e.view.pageYOffset + window.innerHeight,
            behavior: "smooth"
        });
        let i = 0
        while (i < 3) {
            let arr = document.querySelectorAll(".menu_but")
            if (arr[i].classList.contains("but_active")) {
                if (i !== 2) {
                    arr[i].classList.remove("but_active")
                    arr[++i].classList.add("but_active")
                    break
                }
            }
            i++
        }
    } else {
        window.scrollTo({
            top: e.view.pageYOffset - window.innerHeight,
            behavior: "smooth"
        });
        document.querySelectorAll(".menu_but").forEach(function (e, i) {
            if (e.classList.contains("but_active")) {
                if (i !== 0) {
                    e.classList.remove("but_active")
                    document.querySelectorAll(".menu_but")[--i].classList.add("but_active")
                }
            }
        })
    }
})

if(window.matchMedia("only screen and (orientation:portrait)").matches) {
    document.getElementById("audio_source").src = "mp3/02_avtoportret_mastering.mp3"
} else document.body.style.overflow = "hidden"
