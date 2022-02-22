renderer = function() {

    // console.log("hello");
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
    // console.log(bufferLength);

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

document.getElementById("button-donate").addEventListener('click', function () {
    document.getElementById("button-donate").classList.add("none")
    document.getElementById("form-donate").classList.remove("none")
})

document.getElementById("audio").addEventListener('play', renderer)

document.getElementById("play1").addEventListener('click', function (){
    if (document.getElementById("vyn1").classList.contains("animated")) {
        document.getElementById("vyn1").classList.remove("animated")
    } else document.getElementById("vyn1").classList.add("animated")
})

document.querySelectorAll(".but_group1").forEach(function (e) {
    e.addEventListener('click', function () {
        if (!document.getElementById("vyn1").classList.contains("animated")) {
            document.getElementById("vyn1").classList.add("animated")
        }
    })
})

document.querySelector(".mplayer__playlist-body").addEventListener('click', function () {
    if (!document.getElementById("vyn1").classList.contains("animated")) {
        document.getElementById("vyn1").classList.add("animated")
    }
})

document.getElementById("play2").addEventListener('click', function (){
    if (document.getElementById("vyn2").classList.contains("animated")) {
        document.getElementById("vyn2").classList.remove("animated")
    } else document.getElementById("vyn2").classList.add("animated")
})

document.querySelectorAll(".but_group2").forEach(function (e) {
    e.addEventListener('click', function () {
        if (!document.getElementById("vyn2").classList.contains("animated")) {
            document.getElementById("vyn2").classList.add("animated")
        }
    })
})

document.querySelector(".mplayer__playlist-body1").addEventListener('click', function () {
    if (!document.getElementById("vyn2").classList.contains("animated")) {
        document.getElementById("vyn2").classList.add("animated")
    }
})

document.querySelectorAll(".menu_but").forEach(function (e, index) {
    e.addEventListener('click', (ev) => {
        // console.log(ev)

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
    if (e.path.indexOf(document.querySelector(".news")) == -1 && e.path.indexOf(document.querySelector(".minis")) == -1) {
        if (e.deltaY > 0) {
            window.scrollTo({
                top: window.innerHeight * Math.round(e.view.pageYOffset / window.innerHeight + 1),
                behavior: "smooth"
            });
            document.querySelectorAll(".menu_but").forEach(function (e, i) {
                if (Math.round(window.pageYOffset / window.innerHeight) === i - 1) {
                    e.classList.add("but_active")
                } else if (i < 3) e.classList.remove("but_active")
            })
        } else {
            window.scrollTo({
                top: window.innerHeight * Math.round(e.view.pageYOffset / window.innerHeight - 1),
                behavior: "smooth"
            });
            document.querySelectorAll(".menu_but").forEach(function (e, i) {
                if (Math.round(window.pageYOffset / window.innerHeight) === i + 1) {
                    e.classList.add("but_active")
                } else if (i > 0) e.classList.remove("but_active")
            })
        }
    }
})

document.getElementById('get_news').addEventListener('click', function () {
    if (document.querySelector('.news-block').classList.contains('news-block-out')) {
        document.querySelector('.news-block').classList.remove('news-block-out')
        document.querySelector("body").removeEventListener('click', function (e) {
            if (e.path.indexOf(document.querySelector(".news-block")) == -1) {
                if (document.querySelector('.news-block').classList.contains('news-block-out')) {
                    document.querySelector('.news-block').classList.remove('news-block-out')
                }
            }
        })
    } else {
        document.querySelector('.news-block').classList.add('news-block-out')
        document.querySelector("body").addEventListener('click', function (e) {
            if (e.path.indexOf(document.querySelector(".news-block")) == -1) {
                if (document.querySelector('.news-block').classList.contains('news-block-out')) {
                    document.querySelector('.news-block').classList.remove('news-block-out')
                }
            }
        })
    }
})

document.querySelectorAll(".folder").forEach(function (e) {
    e.addEventListener('click', function (e) {
        document.querySelector('.folders').classList.add('folders-hide')
        document.querySelector('.show').classList.add('show-displays')

        fetch("img/" + e.target.parentNode.id.substr(-3) + "/data.json")
            .then(response => {
                return response.json();
            })
            .then(jsondata => {
                for (let i = 1; i <= jsondata.count; i++) {
                    let elem = document.createElement('div');
                    elem.classList.add('mini')

                    elem.style.backgroundImage = 'url("../img/' + e.target.parentNode.id.substr(-3) + '/' + i + '.webp")'
                    document.querySelector('.minis').appendChild(elem)
                }
            });

        // let dataJSON = require('../img/' + e.target.parentNode.id.substr(-3) + '/data.json')
        // let http = new XMLHttpRequest();



        // while(true) {
        //     let elem = document.createElement('div');
        //     elem.classList.add('mini')
        //
        //     http.open('HEAD', 'img/' + e.target.parentNode.id.substr(-3) + '/' + i + '.webp', false);
        //     http.send();
        //
        //     if (http.status != 404) {
        //         elem.style.backgroundImage = 'url("../img/' + e.target.parentNode.id.substr(-3) + '/' + i + '.webp")'
        //         document.querySelector('.minis').appendChild(elem)
        //         i++
        //     } else break
        // }

        document.querySelector('.cur_photo').style.backgroundImage = 'url("../img/' + e.target.parentNode.id.substr(-3) + '/' + 1 + '.webp")'
        document.querySelector('.minis').scrollLeft = 0
    })
})

document.getElementById('close-show').addEventListener('click', function () {
    document.querySelector('.folders').classList.remove('folders-hide')
    document.querySelector('.show').classList.remove('show-displays')

    document.querySelector('.minis').innerHTML = ""
})

document.getElementById('prev-photo').addEventListener('click', function () {
    let photos = document.querySelectorAll('.mini')
    let prev_i = null
    photos.forEach(function (e, i) {
        if (e.style.backgroundImage == document.querySelector('.cur_photo').style.backgroundImage) {
            prev_i = i
        }
    })

    if (prev_i && prev_i> 0) {
        document.querySelector('.cur_photo').style.backgroundImage = photos[prev_i - 1].style.backgroundImage
        // document.querySelector('.minis').scrollLeft = photos[prev_i - 1].offsetLeft
        // document.querySelector('.minis').scrollTo(photos[prev_i - 1].offsetLeft, 0)
    }
})

document.getElementById('next-photo').addEventListener('click', function () {
    let photos = document.querySelectorAll('.mini')
    let next_i = null
    photos.forEach(function (e, i) {
        if (e.style.backgroundImage == document.querySelector('.cur_photo').style.backgroundImage) {
            next_i = i + 1
        }
    })

    if (next_i && next_i < photos.length) {
        document.querySelector('.cur_photo').style.backgroundImage = photos[next_i].style.backgroundImage
        // document.querySelector('.minis').scrollLeft = photos[next_i].offsetLeft
        // document.querySelector('.minis').scrollTo(photos[next_i].offsetLeft, 0)
    }
})

document.querySelector('.minis').addEventListener('DOMNodeInserted', function (e) {
    e.target.addEventListener('click', function (e) {
        document.querySelector('.cur_photo').style.backgroundImage = e.target.style.backgroundImage
    })
})

document.querySelector(".minis")
    .addEventListener('wheel', function(event) {
        let modifier
        if (event.deltaMode == event.DOM_DELTA_PIXEL) {
            modifier = 1;
        } else if (event.deltaMode == event.DOM_DELTA_LINE) {
            modifier = parseInt(getComputedStyle(this).lineHeight);
        } else if (event.deltaMode == event.DOM_DELTA_PAGE) {
            modifier = this.clientHeight;
        }
        if (event.deltaY != 0) {
            this.scrollLeft += modifier * event.deltaY;
            event.preventDefault();
        }
    });

if(window.matchMedia("only screen and (orientation:portrait)").matches) {

    // document.getElementById("audio_source").src = "mp3/02_avtoportret_mastering.mp3"
} else document.body.style.overflow = "hidden"
