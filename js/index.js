// JavaScript source code
let wl = [],
    ml = [],
    rl = [];
let first = 0,
    second = 0;
let won = 0,
    lost = 0;
let kostyl = false;

function getSlogan() {
    let slogan = generateSl();
    document.getElementById("slog").innerText = slogan;
}

function generateSl() {
    let mylist = ["Учим ударения в словах просто и безболезненно.",
        "Этот очередной (очень) полезный тест посвящается моей учительнице русского языка Нине Ильиничне, благодаря которой у меня есть возможность заниматься наукой, а не пекать торта за бесценок",
        "А вы знали, что сохранять файл с правильной кодировкой столь же важно, как и правильно ставить ударения в словах?",
        "А вот проклятым французам не надо запоминать ударения",
        "Не шевель чужой щавель",
        "А вы знали, что эта надпись меняется, если обновить страницу?\nИногда не меняется, это всё рандом",
        "Проверяем ваш музыкальный слух относительно орфоэпического словаря",
        "Орфоэпик фэйл"]
    let num = Math.floor((Math.random() * mylist.length)); // рандомное число между 0 и N после звездочки
    return mylist[num]
}

function init() {
    getLib();
    ml = wl;
    step();
}

function ale()
{
    alert("Fuck");
}

function step() {
    // Генерируем номер из списка рл, который у нас выпадет
    let i = Math.floor((Math.random() * ml.length));

    // Шаффлим последний элемент и выпавший, шоб производительнее
    let tmp = ml[ml.length - 1];
    ml[ml.length - 1] = ml[i];
    ml[i] = tmp;

    // Вытащим последний элемент из списка
    ourword = ml.pop();
    rl.push(ourword);

    // Что делать, коли у нас кончается основной список?
    if (ml.length < 25) {
        ml.push(rl.shift());
    }

    // парсим слово
    parseMe(ourword);
    
}

function parseMe(x) {
    let main = document.getElementById("main");
    if (x.ans > 9) {
        second = x.ans % 10;
        first = Math.floor(x.ans / 10);
    }
    else {
        first = x.ans % 10;
    }
    let vownum = 0;
    for (let i = 0; i < x.word.length; i++) {
        let letter = document.createElement('p');
        letter.innerText = x.word[i];
        l = x.word[i];
        if (checkVowels(l)) {
            letter.className = "ex2";
            letter.style.color = "DodgerBlue";
            vownum++;
            if (vownum == first || vownum == second) {
                letter.addEventListener("click", clickTrue);
            }
            else
            {
                letter.addEventListener("click", function (e) {
                    clickFalse(e.target);
                });
            }
            letter.id = "id" + vownum;
        }
        else {
            letter.className = "ex1";
        }
        main.appendChild(letter);
    }
}

function checkVowels(l) {
    let vowels = ["А", "У", "Е", "Ы", "О", "Э", "Я", "И", "Ю", "Ё", "ё", "у", "е", "ы", "а", "о", "э", "я", "и", "ю"];
    for (let i = 0; i < vowels.length; i++) {
        if (vowels[i] == l) return true;
    }
    return false;
}

function paint() {
    let right = "id" + first;
    document.getElementById(right).style.color = "DarkGreen";
    document.getElementById(right).style.fontWeight = "bolder";
    document.getElementById(right).style.fontSize = "larger";
    if (second != 0) {
        let right2 = "id" + second;
        document.getElementById(right2).style.color = "DarkGreen";
        document.getElementById(right2).style.fontStyle = "italic"
        document.getElementById(right2).style.fontSize = "larger";
        second = 0;
        let last = document.getElementById("main").lastChild;
        last.innerText = last.innerText + "*";
        let note = document.getElementById("note");
        note.style.display = "block";
        note.innerHTML = "Допускаются два варианта, <b>выделенный вот так</b> предпочтительнее";
    }
}

function clickTrue() {
    if (!kostyl) {
        if (second == 0) {
            setTimeout(stepFinish, 700);
        }
        else {
            setTimeout(stepFinish, 1500);
        }
        paint();
        won++;
    }
    kostyl = true;
}

function clickFalse(x) {
    x.style.color = "DarkRed";
    if (!kostyl) {
        lost++;
        if (second == 0) {
            setTimeout(stepFinish, 1200);
        }
        else {
            setTimeout(stepFinish, 1900);
        }
        paint();
    }
    kostyl = true;
}

function stepFinish() {
    let main = document.getElementById("main");
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
    kostyl = false;
    document.getElementById("winrate").innerText = won + "/" + lost;
    let a = won / (won + lost) * 100;
    let b = lost / (won + lost) * 100;
    document.getElementById("bar_succ").style.width = a + "%";
    document.getElementById("bar_dan").style.width = b + "%";
    judge();
    let note = document.getElementById("note");
    note.style.display = "none";
    step();
}

function judge() {
    let verdict = document.getElementById("res");
    if (won + lost < 2) {
        if (lost == 1) verdict.innerText = "Хорошенькое начало";
        if (won == 1) verdict.innerText = "Так держать!";
    }
    if (won + lost >= 2 && won + lost < 10) {
        let a = won / (won + lost);
        if (a > 0.8) verdict.innerText = "Неплохо подготовились!";
        if (a > 0.6 && a <= 0.8) verdict.innerText = "Держите марку";
        if (a > 0.4 && a <= 0.6) verdict.innerText = "Хмм, наверное, вы ещё разминаетесь";
        if (a > 0.2 && a <= 0.4) verdict.innerText = "Нет, ну конечно, могло быть и хуже";
        if (a <= 0.2) verdict.innerText = "Чего это с вами сегодня?";
    }
    if (won + lost >= 10) {
        let a = won / (won + lost);
        if (a > 0.99) verdict.innerText = "Вы Боженька.";
        if (a > 0.94 && a <= 0.99) verdict.innerText = "Вы красавчик.";
        if (a > 0.90 && a <= 0.94) verdict.innerText = "Вы, несомненно, разбираетесь в ударениях";
        if (a > 0.85 && a <= 0.90) verdict.innerText = "Вам, сударь, нелегко оконфузиться в ударениях";
        if (a > 0.80 && a <= 0.85) verdict.innerText = "Вы большой молодец и в подавляющем большинстве ситуаций впросак не попадёте";
        if (a > 0.75 && a <= 0.80) verdict.innerText = "Вы молодец и в большинстве ситуаций не сядете в лужу";
        if (a > 0.70 && a <= 0.75) verdict.innerText = "В целом вы определённо разбираетесь в постановке ударений, хотя отдельные случаи всё же стоит подучить";
        if (a > 0.65 && a <= 0.70) verdict.innerText = "Признавайтесь, учили стишки-запоминалки?";
        if (a > 0.60 && a <= 0.65) verdict.innerText = "Вы, в принципе, разбираетесь в ударениях";
        if (a > 0.55 && a <= 0.60) verdict.innerText = "Уже неплохо, но есть куда расти!";
        if (a > 0.50 && a <= 0.55) verdict.innerText = "Ну хотя бы больше половины.";
        if (a > 0.45 && a <= 0.50) verdict.innerText = "Поднапрягитесь и одолейте перевал.";
        if (a > 0.40 && a <= 0.45) verdict.innerText = "Вы можете лучше";
        if (a > 0.35 && a <= 0.40) verdict.innerText = "На самом деле, это довольно сложные случаи";
        if (a > 0.30 && a <= 0.35) verdict.innerText = "Давайте, думайте лучше";
        if (a > 0.25 && a <= 0.30) verdict.innerText = "Может, вы не коренной носитель языка?"; 
        if (a > 0.20 && a <= 0.25) verdict.innerText = "Вы не настолько безграмотный, я в вас верю";
        if (a > 0.15 && a <= 0.20) verdict.innerText = "Может, вам стоит полистать словарь?";
        if (a > 0.10 && a <= 0.15) verdict.innerText = "Идите и учите.";
        if (a > 0.05 && a <= 0.10) verdict.innerText = "Я начинаю думать, что вы специально.";
        if (a > 0.01 && a <= 0.05) verdict.innerText = "Вы — образец безграмотности.";
        if (a <= 0.01) verdict.innerText = "Нет ну столько заданий провалить это тоже надо постараться. Я восхищаюсь вашим упорством.";
    }
}