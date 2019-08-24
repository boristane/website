function randomiseStringInDOMElt(elt) {
    const chars = ["$", "%", "#", "@", "&", "(", ")", ",", "=", "*", "/"];
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const letters = elt.textContent.split("");
    let displayString = "";

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
            const arr = displayString.split("");
            arr[index] = char;
            elt.textContent = arr.join("");
        }, delay2);

        const delay3 =
            letters.length * randomisingTime +
            letters.length * randomisingTime2 +
            index * randomisingTime3;
        setTimeout(() => {
            const arr = displayString.split("");
            arr[index] = char;
            displayString = arr.join("");
            elt.textContent = displayString;
        }, delay3);
    });
}

function $(s) {
    return document.getElementById(s) || document.querySelector(s);
}

const helloTranslations = [
    "Salut !",
    "Hola !",
    "Hej !",
    "Привет",
    "Olá !",
    "Hallo !",
    "Ciao !",
    "你好",
    "مرحبا"
];

document.addEventListener("DOMContentLoaded", () => {
    function hello() {
        let workingHellos = [...helloTranslations];
        const interval = 2000;
        setInterval(() => {
            const randomIndex = Math.floor(Math.random() * workingHellos.length);
            $("hello").textContent = workingHellos[randomIndex];
            randomiseStringInDOMElt($("hello"));
            workingHellos = workingHellos.filter(elt => elt !== workingHellos[randomIndex]);
            if (workingHellos.length === 0) workingHellos = [...helloTranslations, "Hello !"];
        }, interval);
    }

    hello();
});
