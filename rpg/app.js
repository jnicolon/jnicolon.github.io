const form = document.getElementById('character-creation');
const characterName = document.getElementById('character-name');
const characterClass = document.getElementById('character-class')
const charactersContainer = document.getElementById('all-characters')


class character {
    constructor (name, charClass){
        this.name = name;
        this.class = charClass;
    }
}

let charactersList = [];

class UI {

    static checkInputs() {
        const nameValue = characterName.value.trim();
        const classValue = characterClass.value;
        const checkedName = Store.checkName(nameValue);

        if (nameValue === "") {
            alert("Please fill out a name")
        } else if (nameValue.length > 10) {
            alert('Your name has to be shorter than 10 characters')
        } else if (checkedName >= 0) {
            alert('That character already exists')
        } else if (classValue === "start") {
            alert('Please select a class')
        } else {
            let newCharacter = new character(nameValue, classValue);
            charactersList.push(newCharacter);
            Store.uploadCharacters();
            UI.createCharacter(nameValue, classValue);
            characterClass.value = 'start';
            characterName.value = '';
        }
    };

    

    static createCharacter(name, charClass) {
        
            const charCont = document.querySelector('.all-characters')
            const charDiv = document.createElement('div');
            charDiv.classList.add('one-character');
            charDiv.innerHTML = `
            <img src="./img/${charClass}.png" class="character-img" alt="">       
            <h3 class="character-name">${name}</h3>
            <h4 class="delete-char">Delete Character</h4>
            `;
            charCont.appendChild(charDiv);

        
    };

    static removeCharacter(element){
        if (element.classList.contains('delete-char')){
            element.parentElement.remove();
        }
    }

    static loadCharacters(){
        charactersList.forEach(character => {
            UI.createCharacter(character.name, character.class);
        });
    }


};

class Store {

    static uploadCharacters(){
        window.localStorage.setItem('characters', JSON.stringify(charactersList))
    };

    static downloadCharacters(){
        if (window.localStorage.getItem('characters')){
        charactersList = JSON.parse(window.localStorage.getItem('characters'))
        }
    }

    static checkName(name) {
        let index;
        charactersList.forEach(element => {
            if (name === element.name){
                console.log(charactersList.indexOf(element))
                index = charactersList.indexOf(element);   
            }
        })
        return index
    };

    static removeFromList(name){
        let index = Store.checkName(name);
        charactersList.splice(index, 1);
        Store.uploadCharacters();
    }

}





form.addEventListener('submit', (e)=> {
    e.preventDefault();
    UI.checkInputs();
    
});

document.querySelector('.all-characters').addEventListener("click", (e)=>{
    const name = e.target.previousElementSibling.innerText;
    Store.removeFromList(name);
    UI.removeCharacter(e.target);
});

//window.onload = window.localStorage.clear();
window.onload = alert('RPG CHARACTER CREATOR\n You must fill all the fields. \n You can not repeat a name. \n The characters stay even if you refresh the page')
window.onload = Store.downloadCharacters();
window.onload = UI.loadCharacters();