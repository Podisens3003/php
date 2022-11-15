let minValue,
    maxValue,
    answerNumber,
    orderNumber,
    gameRun;

const startGameCard = document.querySelector('#startGameCard');
const minValueInput = document.querySelector('#minValueInput');
const maxValueInput = document.querySelector('#maxValueInput');
const collapseElementText = document.querySelector('#collapse > .card');
const mainCard = document.querySelector('#mainCard');

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

$('#collapse').on('show.bs.collapse', function () {
    minValueInput.disabled = true;
    maxValueInput.disabled = true;
    startGame();
})

$('#collapse').on('hidden.bs.collapse', function () {
    minValueInput.value = null;
    maxValueInput.value = null;
    startGameCard.style.display = 'none';
    mainCard.style.display = 'flex';
})

// пофикшена кнопка "Заново"
document.getElementById('btnRetry').addEventListener('click', function () {
    minValueInput.disabled = false;
    maxValueInput.disabled = false;
    startGameCard.style.display = 'flex';
    mainCard.style.display = 'none';
    startGame();
})

document.getElementById('btnOver').addEventListener('click', function () {
    if (!gameRun) return;
    if (minValue === maxValue) return getTroublePrase();

    minValue = answerNumber + 1;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber++;
    orderNumberField.innerText = orderNumber;
    estimatedAnswer(answerNumber);
})

// пофикшена кнопка "Меньше"
document.getElementById('btnLess').addEventListener('click', function () {
    if (!gameRun) return;
    if (minValue >= maxValue) return getTroublePrase();
    maxValue = answerNumber - 1;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber++;
    orderNumberField.innerText = orderNumber;
    estimatedAnswer(answerNumber);
})

//
document.getElementById('btnEqual').addEventListener('click', function () {
    if (!gameRun) return;

    const victoryPhrase = [
        `Я всегда угадываю\n\u{1F60E}`,
        `Я мастер в этой игре!\n\u{1F60E}`,
        `Это было так просто\n\u{1F973}`,
        `Можно попробовать снова\n\u{1F63C}`,
        `Угадал на изи\n\u{1F929}`
    ];
    const winningPhrase = Math.round(Math.random() * (victoryPhrase.length - 1));
    const selectedPhrase = victoryPhrase[winningPhrase];
    answerField.innerText = `${selectedPhrase}`;
    gameRun = false;
})

function startGame() {
    minValue = parseInt(minValueInput.value) || 0;
    minValue = (minValue > 999) ? 999 : minValue;
    minValue = (minValue < -999) ? -999 : minValue;

    maxValue = parseInt(maxValueInput.value) || 100;
    maxValue = (maxValue > 999) ? 999 : maxValue;
    maxValue = (maxValue < -999) ? -999 : maxValue;

    if (minValue > maxValue) {
        const swapValue = maxValue;
        maxValue = minValue;
        minValue = swapValue;
        alert('К сожалению, пришлось поменять числа местами :(');
    }

    collapseElementText.innerText =
        `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`
    answerNumber = Math.floor((minValue + maxValue) / 2);
    orderNumber = 1;
    gameRun = true;

    orderNumberField.innerText = orderNumber;
    estimatedAnswer(answerNumber);
}

function getTroublePrase() {
    const answers = [
        `Вы загадали неправильное число!\n\u{1F914}`,
        `Я сдаюсь..\n\u{1F92F}`,
        `Захотел(а) меня обмануть?\n\u{1F635}`,
        `Ты что-то перепутал(а)\n\u{1F97A}`,
        `Я не могу отгадать это чило\n\u{1F621}`
    ];
    const phraseRandom = Math.round(Math.random() * (answers.length - 1));
    const answerPhrase = answers[phraseRandom];
    answerField.innerText = answerPhrase;
    gameRun = false;
}

function estimatedAnswer(answerNumber) {
    const surmise = [
        `Вы загадали число `,
        `Скажите, это число `,
        `Да это легко! Ты загадал `,
        `Хмм... Правильно ли я полагаю, что это число `,
        `Точно! Это же число `
    ];
    const phraseOfSurmise = Math.round(Math.random() * (surmise.length - 1));
    const phrase = surmise[phraseOfSurmise];
    answerField.innerText = `${phrase} ${getReadableNumbers(answerNumber)}?`;
}

function getReadableNumbers(answerNumber) {
    if (answerNumber === 0) return '0';

    const estimatedNumber = Math.abs(answerNumber);
    const availableHundreds = ['сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];
    const availableDozens = ['десять', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
    const availableComplicatedDozens = ['одинадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
    const availableUnits = ['один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'];
    let result = [];

    const hundreds = Math.floor(estimatedNumber / 100) - 1;
    result.push(availableHundreds[hundreds]);

    let dozens = estimatedNumber % 100;

    if (dozens > 10 && dozens < 20) {
        dozens = (dozens % 10) - 1;
        result.push(availableComplicatedDozens[dozens]);
    } else {
        dozens = Math.floor(dozens / 10) - 1;
        result.push(availableDozens[dozens]);

        const units = Math.floor(estimatedNumber % 10) - 1;
        result.push(availableUnits[units]);
    }

    result = result.join(' ').trim();

    if (result.length > 20) return answerNumber;

    return answerNumber < 0 ? `минус ${result}` : result;
}