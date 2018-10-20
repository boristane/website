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

function snakeGame(container) {
    const gridSize = Math.floor(container.clientWidth / 20);

    function rounding(num, step) {
        return Math.floor(num / step) * step;
    }

    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    const padding = 3;
    canvas.style.boxSizing = 'border-box';
    canvas.width = rounding(container.clientWidth, gridSize);
    canvas.height = rounding(container.clientHeight, gridSize);
    canvas.style.paddingTop = `${padding}px`;
    canvas.style.paddingLeft = `${padding}px`;
    const ctx = canvas.getContext('2d');

    let count;
    let snake;
    let apple;

    function randomInt(min, max) {
        return parseInt(Math.random() * (max - min) + min, 10);
    }

    function newApplePos(c, g, snake) {
        const numGridsInWidth = Math.floor(c.width / g);
        const numGridsInHeight = Math.floor(c.height / g);
        const x = randomInt(0, numGridsInWidth) * g;
        const y = randomInt(0, numGridsInHeight) * g;
        for (let i = 0; i < snake.cells.length; i++) {
            if (snake.cells[i].x === x && snake.cells[i].y === y) {
                console.log('there')
                return newApplePos(c, g, snake);
            }
        }
        return { x, y };
    }

    function initialiseGame() {
        count = 0;

        snake = {
            x: 3 * gridSize,
            y: 3 * gridSize,
            dx: gridSize,
            dy: 0,
            cells: [],
            length: 4,
        };

        apple = {
            x: 8 * gridSize,
            y: 8 * gridSize,
        };
    }

    function loop() {
        requestAnimationFrame(loop);
        count += 1;
        if (count < 4) {
            return;
        }
        count = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        snake.x += snake.dx;
        snake.y += snake.dy;

        if (snake.x >= canvas.width) {
            snake.x = 0;
        } else if (snake.x < 0) {
            snake.x = canvas.width - gridSize;
        }
        if (snake.y >= canvas.height) {
            snake.y = 0;
        } else if (snake.y < 0) {
            snake.y = canvas.height - gridSize;
        }

        // add current head to snake cells
        snake.cells.unshift({ x: snake.x, y: snake.y });
        // pop the tail of the snake from cells
        if (snake.cells.length > snake.length) {
            snake.cells.pop();
        }

        ctx.fillStyle = '#FE8566';
        ctx.fillRect(apple.x, apple.y, gridSize - 1, gridSize - 1);

        ctx.fillStyle = '#40ADA3';
        snake.cells.forEach((cell, index, cells) => {
            ctx.fillRect(cell.x, cell.y, gridSize - 1, gridSize - 1);

            // Check for collision with the head
            if (index !== 0 && cells[0].x === cell.x && cells[0].y === cell.y) {
                initialiseGame();
            }
        });

        if (snake.x === apple.x && snake.y === apple.y) {
            snake.length += 1;
            const { x, y } = newApplePos(canvas, gridSize, snake);
            apple.x = x;
            apple.y = y;
        }

        // display score
        ctx.fillStyle = '#40ADA3';
        ctx.font = `${gridSize / 1.2}px monospace`;
        ctx.fillText(`${snake.length}`, snake.length <= 9 ? gridSize / 5 : 0, gridSize / 1.5);

        // keyboard event listeners
        document.addEventListener('keydown', (e) => {
            if (e.which === 37 && snake.dx === 0) {
                snake.dx = -gridSize;
                snake.dy = 0;
            } else if (e.which === 38 && snake.dy === 0) {
                snake.dy = -gridSize;
                snake.dx = 0;
            } else if (e.which === 39 && snake.dx === 0) {
                snake.dx = gridSize;
                snake.dy = 0;
            } else if (e.which === 40 && snake.dy === 0) {
                snake.dy = gridSize;
                snake.dx = 0;
            }
        });
    }

    initialiseGame();
    requestAnimationFrame(loop);
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
    snakeGame($('.content-container.right'));
});
