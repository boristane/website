function randomiseStringInDOMElt(elt) {
    const chars = ['$', '%', '#', '@', '&', '(', ')', ',', '=', '*', '/'];
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const letters = elt.textContent.split('');
    let displayString = '';

    // Randomising times in milliseconds
    const randomisingTime = 40;
    const randomisingTime2 = 60;
    const randomisingTime3 = 30;

    letters.forEach((char, index) => {
        const delay1 = index * randomisingTime;
        setTimeout(() => {
            displayString += Math.random() < 0.5 ? chars[getRandomInt(0, chars.length - 1)] : char;
            elt.textContent = displayString;
        }, delay1);

        const delay2 = letters.length * randomisingTime + index * randomisingTime2;
        setTimeout(() => {
            const arr = displayString.split('');
            arr[index] = char;
            elt.textContent = arr.join('');
        }, delay2);

        const delay3 = letters.length * randomisingTime + letters.length
        * randomisingTime2 + index * randomisingTime3;
        setTimeout(() => {
            const arr = displayString.split('');
            arr[index] = char;
            displayString = arr.join('');
            elt.textContent = displayString;
        }, delay3);
    });
}

function $(s) {
    return document.getElementById(s) || document.querySelector(s);
}

function $s(s) {
    return document.querySelectorAll(s);
}

function navBar() {
    function stickyNav() {
        const stickyHeightThreshold = $('.nav-bar').offsetTop;
        const topContainer = $s('.content-container')[0];
        if (window.pageYOffset >= stickyHeightThreshold + 1) {
            $('.nav-bar').classList.add('sticky');
            $('.sub-nav').classList.add('sticky');
            topContainer.style.marginTop = stickyHeightThreshold;
        } else {
            $('.nav-bar').classList.remove('sticky');
            $('.sub-nav').classList.remove('sticky');
            topContainer.style.marginTop = 0;
        }
    }

    function openDrawerMenu() {
        const x = $('.sub-nav');
        if (x.classList.contains('responsive')) {
            x.classList.remove('responsive');
            $('.icon').classList.remove('highlighted');
            $('.menu').classList.remove('highlighted');
            $('html').classList.remove('no-scroll');
        } else {
            x.classList.add('responsive');
            $('.icon').classList.add('highlighted');
            $('.menu').classList.add('highlighted');
            $('html').classList.add('no-scroll');
        }
    }

    $s('.sub-nav .tab').forEach((tab, index) => {
        tab.addEventListener('mouseover', () => {
            $s('.sub-nav .underlined')[index].style.opacity = 1;
        });
        tab.addEventListener('mouseout', () => {
            $s('.sub-nav .underlined')[index].style.opacity = 0;
        });
    });

    $('.menu').addEventListener('mouseover', () => {
        $('.nav-bar .underlined').style.opacity = 1;
    });

    $('.menu').addEventListener('mouseout', () => {
        $('.nav-bar .underlined').style.opacity = 0;
    });

    $('.icon').addEventListener('click', openDrawerMenu);
    $('.menu').addEventListener('click', openDrawerMenu);

    window.addEventListener('scroll', stickyNav);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && $('.sub-nav').classList.contains('responsive')) {
            openDrawerMenu();
        }
    });
}

const topLeftCanvas = (p) => {
    function drawTriangle(topRight) {
        const { x, y, size } = topRight;
        p.triangle(x, y, x - size, y, x, y + size);
    }

    p.setup = () => {
        const width = document.documentElement.clientWidth / 2;
        const height = document.documentElement.clientWidth / 4;
        p.createCanvas(width, height);

        const size = 40;
        const xMax = width - 1;
        const yMax = height - size;
        const xMin = xMax - yMax;
        p.fill(254, 133, 102);
        p.stroke(255, 255, 255);
        const numTriangles = parseInt(((xMax - xMin) / size) * 6, 10);
        drawTriangle({ x: xMax, y: 0 + 2, size });
        for (let i = 0; i < numTriangles - 1; i += 1) {
            const x = (xMax - xMin) * ((i / numTriangles) ** (1 / 2)) + xMin;
            const localYMax = (yMax * (x - xMin)) / (xMax - xMin);
            const y = parseInt(Math.random() * localYMax, 10);
            const dist = ((xMax - x) ** 2) + (y ** 2);
            const transparency = 255 * (1 - dist / (((yMax) ** 2)));
            p.fill(254, 133, 102, transparency);
            drawTriangle({ x, y, size });
        }
    };
};

const helloTranslations = ['Salut !', 'Hola !', 'Hej !', 'Merhaba !', 'Привет', 'Olá !', 'Hallo !', 'Ciao !', '여보세요', 'もしもし', '你好', 'مرحبا'];

document.addEventListener('DOMContentLoaded', () => {
    function hello() {
        let workingHellos = [...helloTranslations];
        const interval = 2000;
        setInterval(() => {
            const randomIndex = Math.floor(Math.random() * workingHellos.length);
            $('hello').textContent = workingHellos[randomIndex];
            randomiseStringInDOMElt($('hello'));
            workingHellos = workingHellos.filter(elt => elt !== workingHellos[randomIndex]);
            if (workingHellos.length === 0) workingHellos = [...helloTranslations, 'Hello !'];
        }, interval);
    }

    hello();
    navBar();

    new p5(topLeftCanvas, $('.top'));

    const throttle = (type, name, obj) => {
        obj = obj || window;
        let running = false;
        const func = () => {
            if (running) { return; }
            running = true;
            requestAnimationFrame(() => {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };
    throttle('resize', 'optimizedResize');


    // handle event
    window.addEventListener('optimizedResize', () => {
        new p5(topLeftCanvas, $('.top'));
        $('defaultCanvas0').parentNode.removeChild($('canvas'));
    });
});
