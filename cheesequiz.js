let buttons = {};
let resetButtons = {};
let tags = {};
let scoreDisplays = {};

let scores = {};
const categories = ["g", "d", "h", "a", "n", "l"];
const sides = ["l", "r"];

const supercheese = document.getElementById("supercheese");
let supercheeseSlots = {};
let supercheeseSide = null;

const incrementScore = (evt) => {
    let btn = evt.srcElement;
    while (btn.tagName !== "BUTTON") btn = btn.parentElement;
    const btnid = btn.id;

    const side = btnid.slice(btnid.length-1);
    const category = btnid.slice(btnid.length-2, btnid.length-1);

    const score = ++scores[category][side];
    scoreDisplays[category][side].innerHTML = "✅ ".repeat(score);
    if (score == 3) giveCategory(category, side);

    if (supercheeseSide) return;
    for (let cat of categories) if (scores[cat][side] === 0) return;
    giveSuperCheese(side);
}

const giveCategory = (category, side) => {
    buttons[category][side].hidden = true;
    buttons[category][side].parentElement.appendChild(tags[category].children[0]);
    buttons[category][side].parentElement.classList.add("spin");

    tags[category].innerHTML = "";
}

const giveSuperCheese = (side) => {
    supercheeseSlots[side].innerHTML = supercheese.innerHTML;
    supercheeseSlots[side].classList.add("spin");

    supercheese.innerHTML = "";
    supercheeseSide = side;
}

const resetScore = (evt) => {
    const btnid = evt.srcElement.id;
    const category = btnid.slice(btnid.length-1);

    for (let side of sides) {
        scores[category][side] = 0;
        scoreDisplays[category][side].innerHTML = "";

        buttons[category][side].hidden = false;
        buttons[category][side].parentElement.classList.remove("spin");

        tags[category].classList.remove("shake");
        setTimeout(() => { tags[category].classList.add("shake"); }, 10); // Same hack as for the timer

        let children = buttons[category][side].parentElement.childNodes;
        if (children.length > 1) {
            tags[category].appendChild(children[1]);
            delete children[1];
        }
    }

    if (supercheeseSide) returnSuperCheese();
}

const returnSuperCheese = () => {
    supercheese.innerHTML = supercheeseSlots[supercheeseSide].innerHTML;

    supercheeseSlots[supercheeseSide].innerHTML = "";
    supercheeseSlots[supercheeseSide].classList.remove("spin");
    supercheeseSide = null;
}

for (let category of categories) {
    buttons[category] = {};
    scoreDisplays[category] = {};
    scores[category] = {};  

    for (let side of sides) {
        let btn = document.getElementById(`btn-${category}${side}`);
        btn.addEventListener("click", incrementScore);
        buttons[category][side] = btn;

        scoreDisplays[category][side] = document.getElementById(`score-${category}${side}`);
        scores[category][side] = 0;
    }
    
    tags[category] = document.getElementById(`tag-${category}`);

    resetButtons[category] = document.getElementById(`reset-${category}`);
    resetButtons[category].addEventListener("click", resetScore);
}

for (let side of sides) {
    supercheeseSlots[side] = document.getElementById(`supercheese-${side}`);
}