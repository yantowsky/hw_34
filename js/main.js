const inputText = document.querySelector(".add-note__write");
console.log(inputText);
const btnAddText = document.querySelector(".add-note__btn-add");
console.log(btnAddText);
const listNote = document.querySelector(".list-note");
console.log(listNote);

function getRendItemNote() {
    listNote.innerHTML = "";
    for (let i = 0; i < localStorage.length; i++) {
        let itemNote = document.createElement("div");
        itemNote.classList.add("list-note__item");
        itemNote.setAttribute("id", localStorage.key(i));

        let btnEditNote = document.createElement("div");
        btnEditNote.classList.add("list-note__btn-edit");
        btnEditNote.setAttribute("id", `edit-${localStorage.key(i)}`);
        btnEditNote.innerText = String.fromCodePoint(128221);

        let btnDelNote = document.createElement("div");
        btnDelNote.classList.add("list-note__btn-del");
        btnDelNote.setAttribute("id", `del-${localStorage.key(i)}`);
        btnDelNote.innerText = String.fromCodePoint(10060);

        let itemNoteText = document.createElement("p");
        itemNoteText.classList.add("list-note__text");
        itemNoteText.setAttribute("id", `text-${localStorage.key(i)}`);
        itemNoteText.innerText = localStorage.getItem(localStorage.key(i));

        itemNote.appendChild(btnEditNote);
        itemNote.appendChild(itemNoteText);
        itemNote.appendChild(btnDelNote);

        listNote.appendChild(itemNote);

    }
    getDelNoteLocStr();
    getEditNoteLocStr();
}
getRendItemNote();

let textNote = "";
let flagEditBtn = 0;

function getAddNote() {
    btnAddText.addEventListener("click", function () {
        textNote = inputText.value;
        (textNote !== "") ?
            (flagEditBtn = 0,
                getSaveNoteLocStr(),
                getRendItemNote())
            :
            alert("Неможливо створити пусту нотаткуй");
        inputText.value = "";
    })
}
getAddNote();

let numForNameKey = 1;

function getSaveNoteLocStr() {
    if (!localStorage.getItem(`note${numForNameKey}`)) {
        localStorage.setItem(`note${numForNameKey}`, `${textNote}`);

    } else if (localStorage.getItem(`note${numForNameKey}`)) {
        numForNameKey++;
        getSaveNoteLocStr();
    }
}

function getDelNoteLocStr() {
    let btnDelNote = document.querySelectorAll(".list-note__btn-del");
    console.log(btnDelNote);
    btnDelNote.forEach(element => {
        element.addEventListener("click", function () {
            flagEditBtn = 0;
            localStorage.removeItem((element.id).slice(4));
            getRendItemNote();
        })
    });
}
let textEdit = "";

function getEditNoteLocStr() {
    let btnEditNote = document.querySelectorAll(".list-note__btn-edit")
    console.log(btnEditNote);
    btnEditNote.forEach(element => {
        element.addEventListener("click", function () {
            getStatBtnEditNote(element);
            let editTextNote = document.createElement('input');
            editTextNote.setAttribute("id", `input-${(element.id).slice(5)}`);
            editTextNote.setAttribute("class", "list-note__input");
            editTextNote.setAttribute("type", "text");
            editTextNote.setAttribute("placeholder", String.fromCodePoint(128394));

            if (element.textContent === String.fromCodePoint(10004) && flagEditBtn === 1) {
                let textListNote = document.getElementById(`text-${(element.id).slice(5)}`);
                console.log(textListNote);
                textEdit = localStorage.getItem((element.id).slice(5));

                editTextNote.value = textEdit;
                textListNote.replaceWith(editTextNote);

            } else if (element.textContent === String.fromCodePoint(128221) && flagEditBtn === 0) {
                let editTextNote = document.getElementById(`input-${(element.id).slice(5)}`);
                console.log(editTextNote);
                textEdit = editTextNote.value;
                (textEdit !== "") ?
                    (localStorage.setItem((element.id).slice(5), `${textEdit}`),
                        editTextNote.remove()) :
                    alert("Неможливо створити пусту нотаткуй");
                getRendItemNote();
            }
        })

    })
}

function getStatBtnEditNote(element) {
    let itemListNote = document.getElementById((element.id).slice(5));
    console.log(itemListNote);
    let textListNote = document.getElementById(`text-${(element.id).slice(5)}`);
    console.log(textListNote);
    if (element.textContent === String.fromCodePoint(128221) && flagEditBtn === 0) {
        flagEditBtn = 1;
        textListNote.style.backgroundColor = "#FFF";
        itemListNote.style.backgroundColor = "#FFF";
        element.innerText = String.fromCodePoint(10004);
    } else if (element.textContent === String.fromCodePoint(10004) && flagEditBtn === 1) {
        flagEditBtn = 0;
        element.innerText = String.fromCodePoint(128221);
    } else {
        flagEditBtn = 1;
    }
}