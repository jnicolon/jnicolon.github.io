const domElements = {
    profilePic : document.querySelector('.circle-img'),
    name : document.querySelector('.name'),
    ocupation : document.querySelector('.ocupation'),
    reviewTxt : document.querySelector('.review-txt'),

    arrows: document.querySelectorAll('.arrow'),
    arrowLeft: document.querySelector('.arrow-left'),
    arrowRight: document.querySelector('.arrow-right'),

    randomBtn: document.querySelector('.btn-random'),

    homeScreen: document.querySelector('.home-screen'),
    hsBtn: document.querySelector('.hs-btn'),
}

//A badly name array for all the reviews.

let info_array = [];

//counter to keep track of the array position
let counter = 0;

//A constructor function for new people in case I want to design a system to fetch the data.

class Person {
    constructor(profilePic, name, ocupation, reviewTxt) {
        this.profilePic = profilePic;
        this.name = name;
        this.ocupation = ocupation;
        this.reviewTxt = reviewTxt;
    }
}

//An object with all the functions I need for the 

const actions = {
    addPerson : (person) => info_array.push(person),

    changeAll : (Person) => {
        domElements.name.textContent = Person.name;
        domElements.profilePic.src = Person.profilePic ;
        domElements.ocupation.textContent = Person.ocupation ;
        domElements.reviewTxt.textContent = Person.reviewTxt;
    },

    changeName : (revName) => domElements.name.textContent = revName,
    changeImg : (revImg) => domElements.profilePic.src = revImg,
    changeOccupation : (revOc) => domElements.ocupation.textContent = revOc,
    changeReviewTxt : (revTxt) => domElements.reviewTxt.textContent = revTxt,

    arrowsOff : ()=> {
        if (counter === 0){
            domElements.arrowLeft.style.visibility ="hidden";
            domElements.arrowRight.style.visibility ="visible";
        } else if (counter > 0 && counter < info_array.length - 1) {
            domElements.arrowLeft.style.visibility ="visible";
            domElements.arrowRight.style.visibility ="visible";
        } else if (counter === info_array.length - 1) {
            domElements.arrowLeft.style.visibility ="visible";
            domElements.arrowRight.style.visibility ="hidden";
        }
    },

    alwaysChange : () => {
        let randomNum = Math.floor(Math.random() * info_array.length)
        if (randomNum !== counter) {
            actions.changeAll(info_array[randomNum])
            counter = randomNum;
        } else {
            actions.alwaysChange();
        }
    } 
};

//Hardcoding the new reviews into an array

const reviews = {

    capeluto : new Person('/img/capeluto.jpg','Federico Capeluto', 'Tanque',
    `Una vez yo lo estaba siguiendo y me meinio dejandome 
    atrapado atras de un arbol. Otra vez, wipeamos en el boss todos 
    menos el y se quedo peleando con el paladin por dos horas. 
    Me perdi el cumpleanos de mi hijo. No mein. GG.`),

    apolo : new Person('/img/apolo.jpg', 'Ignacio Lopez','Meincra',
    `No lo puedo recomendar mas. Me carrea en el overmein, 
    me carrea en el jiros. A veces tiene que suspender por la 
    senora pero lo banco porque es meincra.`),

    masita : new Person('/img/masita.jpg', 'Luis Sanguinetti', 'Troll',`Baneado.`)
}

//adding the new Person objects to an array of reviews.

actions.addPerson(reviews.capeluto);
actions.addPerson(reviews.apolo);
actions.addPerson(reviews.masita);

//Updates the first review when the page loads

actions.changeAll(info_array[counter]);

//Event listener for the arrows

domElements.arrows.forEach((arrow) => {
    arrow.addEventListener('click', (e)=>{
        
        const whatArrow = e.currentTarget.classList;
        

        if(whatArrow.contains('arrow-left')) {
            counter--
            
        } else if (whatArrow.contains('arrow-right')){
            counter++   
        }

        actions.arrowsOff();
        
        actions.changeAll(info_array[counter]);
             
    })
});



domElements.randomBtn.addEventListener('click', ()=>{
    actions.alwaysChange();
    actions.arrowsOff();
    
});

domElements.hsBtn.addEventListener('click', ()=> {
    domElements.homeScreen.style.opacity = "0";
    
    
});

domElements.homeScreen.addEventListener('transitionend', (e)=> {
domElements.homeScreen.style.display = 'none';
console.log(e)
});


