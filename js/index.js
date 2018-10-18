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
        if (window.pageYOffset >= stickyHeightThreshold + 1) {
            const topContainer = $s('.content-container')[0];
            $('.nav-bar').classList.add('sticky');
            topContainer.style.marginTop = stickyHeightThreshold;
        } else {
            $('.nav-bar').classList.remove('sticky');
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
});
