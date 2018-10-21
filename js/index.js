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
    canvas.style.padding = `${padding}px`;
    canvas.style.width = '100%';
    canvas.style.maxWidth = `${canvas.width}px`;
    canvas.style.border = 'dashed 1px #FE8566';
    canvas.style.borderRight = 'dashed 1px #FE8566';
    const ctx = canvas.getContext('2d');

    let count;
    let snake;
    let apple;

    function randomInt(min, max) {
        return parseInt(Math.random() * (max - min) + min, 10);
    }

    function newApplePos(c, g, s) {
        const numGridsInWidth = Math.floor(c.width / g);
        const numGridsInHeight = Math.floor(c.height / g);
        const x = randomInt(0, numGridsInWidth) * g;
        const y = randomInt(0, numGridsInHeight) * g;
        for (let i = 0; i < s.cells.length; i += 1) {
            if (s.cells[i].x === x && s.cells[i].y === y) {
                return newApplePos(c, g, s);
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
            if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
                e.preventDefault();
            }
            if (e.keyCode === 37 && snake.dx === 0) {
                snake.dx = -gridSize;
                snake.dy = 0;
            } else if (e.keyCode === 38 && snake.dy === 0) {
                snake.dy = -gridSize;
                snake.dx = 0;
            } else if (e.keyCode === 39 && snake.dx === 0) {
                snake.dx = gridSize;
                snake.dy = 0;
            } else if (e.keyCode === 40 && snake.dy === 0) {
                snake.dy = gridSize;
                snake.dx = 0;
            }
        });
    }

    initialiseGame();
    requestAnimationFrame(loop);
}

function links(container, labels, urls) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    container.appendChild(svg);
    svg.setAttribute('width', container.clientWidth);
    svg.setAttribute('height', container.clientHeight);

    // styling
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';

    function randomInt(min, max) {
        return parseInt(Math.random() * (max - min) + min, 10);
    }

    function randomColor() {
        const colors = ['#40ADA3', '#FE8566', '#D68A59', '#7851A9', '#F75394', '#FFAE42', '#EFDECD', '#A2A2D0', '#EA7E5D', '#FFBCD9', '#F0E891', '#FEFE22', '#FF8243', '#BAB86C'];
        const index = randomInt(0, colors.length - 1);
        return colors[index];
    }

    const coords = [];
    function getCoords(others) {
        let r = container.clientWidth / randomInt(5, 12);
        let cx = randomInt(r * 1.2, container.clientWidth - (r * 1.2));
        let cy = randomInt(r * 1.2, container.clientHeight - (r * 1.2));
        if (cy <= container.clientHeight / 2
            && cy >= container.clientHeight / 8
            && cx <= container.clientWidth / 1.2) {
            ({ cx, cy, r } = getCoords(others));
        }
        others.forEach((coord) => {
            if (((coord.cx - cx) ** 2) + ((coord.cy - cy) ** 2) < (1.6 * r) ** 2) {
                ({ cx, cy, r } = getCoords(others));
            }
        });
        return { cx, cy, r };
    }

    labels.forEach((label, index) => {
        const { cx, cy, r } = getCoords(coords);
        coords.push({ cx, cy, r });

        const color = randomColor();

        const a = document.createElementNS(ns, 'a');
        a.setAttribute('href', urls[index]);
        a.setAttribute('target', '_blank');

        const circle = document.createElementNS(ns, 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', r);
        circle.setAttribute('fill', color);
        circle.setAttribute('stroke', color);
        circle.setAttribute('stroke-opacity', 0.5);
        circle.setAttribute('stroke-width', r / 5);
        circle.setAttribute('fill-opacity', 0.25);

        const text = document.createElementNS(ns, 'text');
        text.setAttribute('x', cx);
        text.setAttribute('y', cy + r / 8);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('font-size', r / 2.5);
        text.classList.add('details');
        text.innerHTML = label;


        a.appendChild(circle);
        a.appendChild(text);
        svg.appendChild(a);
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
    snakeGame($('.content-container.right'));
    const labels = ['Blog', 'Lab', 'Portfolio'];
    const urls = ['./views/blog.html', './views/lab.html', './views/portfolio.html'];
    links($('.content-container.left'), labels, urls);

    function drawSVG() {
        $('.content-container.left').removeChild($('svg'));
        links($('.content-container.left'), labels, urls);
    }

    $('.content-container.left').addEventListener('click', drawSVG);
    let resizeId;

    window.addEventListener('resize', () => {
        clearTimeout(resizeId);
        resizeId = setTimeout(drawSVG, 500);
    });
});
