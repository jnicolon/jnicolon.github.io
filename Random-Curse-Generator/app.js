
//Counters to turn opacity down.
let f1Opacity = 1;
let f2Opacity = 1;
let f3Opacity = 1;
let f4Opacity = 1;
let f5Opacity = 1;

//Counter for when all the flames are extinguished
let flamesCounter = 25;

//Curses Array
const curses = [
    'your poop will smell like barf',
    'acid reflux',
    'a bald spot in your anus',
    'sleepy therapists',
    'like a web toe but for your armpit',
    'wet socks',
    'someone always looking at your phone screen',
    "can't identify smell",
    'maybe your ex was right',
    'you meet a man with a ponytail',
    'the venezuelan birthday song is the regular song',
    'people think you wrote chappie',
    'all blankets are too short',
    'you meet Macarena and she is not that great',
    'remember the Alamo but the wrong one',
];

//Global for using with local storage
let curse = "";

class Functionality {
    static flamesOut(flame) {
        if (flame.id === "flame1" && f1Opacity > 0.0) {
            flamesCounter -= 1
            f1Opacity -= 0.2;
            //For some reason the opacity is not exact after 5 digits so in order to stop the flames to react to clicking I used the precision method. 
            f1Opacity = f1Opacity.toPrecision(1)
            flame.style.opacity = `${f1Opacity}`;
        } else if (flame.id === "flame2" && f2Opacity > 0.0) {
            flamesCounter -= 1
            f2Opacity -= 0.2;
            f2Opacity = f2Opacity.toPrecision(1)
            flame.style.opacity = `${f2Opacity}`;
        } else if (flame.id === "flame3" && f3Opacity > 0.0) {
            flamesCounter -= 1
            f3Opacity -= 0.2;
            f3Opacity = f3Opacity.toPrecision(1)
            flame.style.opacity = `${f3Opacity}`;
        } else if (flame.id === "flame4" && f4Opacity > 0.0) {
            flamesCounter -= 1
            f4Opacity -= 0.2;
            f4Opacity = f4Opacity.toPrecision(1)
            flame.style.opacity = `${f4Opacity}`;
        } else if (flame.id === "flame5" && f5Opacity > 0.0) {
            flamesCounter -= 1
            f5Opacity -= 0.2;
            f5Opacity = f5Opacity.toPrecision(1)
            flame.style.opacity = `${f5Opacity}`;
        };     
    };

    static checkFlames() {
        let check = setInterval(repeatCheck, 500);
        function repeatCheck() {
            if (flamesCounter === 0) {
                clearInterval(check);
                Animations.master();
            }
        }
    }

    static randomCurse() {
        let curse = '';
        let index = Math.floor(Math.random() * curses.length)
        curse = curses[index];
        return curse

    };

    static setCurseLocal(){
        window.localStorage.setItem('curse', curse);
    };

    static getCurseLocal(){
        let x = window.localStorage.getItem('curse');
        if (x !== null) {
            Animations.cursedTitleScreen();
            console.log('youve been cursed!')
        }
    };


};



class Animations {

    static title() {
        let tm = gsap.timeline();
        tm.to('#random-txt', {x:-300, y:-200, opacity:0, duration:2, ease: 'power1.in'})
          .to('#generator-txt', {x:+300, y:+200, opacity:0, delay:-1.90, duration:2, ease: 'power1.in'})
          .to('#curse-txt',{opacity:0, duration:0, delay: 0.10})
          .to('#curse-txt',{opacity:1, duration:0, delay: 0.2})
          .to('#curse-txt',{opacity:0, duration:0, delay: 0.75})
          .to('#curse-txt',{opacity:1, duration:0, delay: 0.2})
          .to('#curse-txt',{opacity:0, duration:0, delay: 0.2})
          .to('#curse-txt',{opacity:1, duration:0, delay: 0.1})
          .to('#curse-txt',{opacity:0, duration:0, delay: 0.1})
          .to('#curse-txt',{opacity:1, duration:0, delay: 0.1})
          .to('#curse-txt',{opacity:0, duration:0, delay: 0.1})
          .to('#curse-txt',{opacity:1, duration:0, delay: 0.1})
          .to('#curse-txt',{opacity:0, duration:0, delay: 0.1})
          .to('#curse-txt',{opacity:1, duration:0, delay: 0.1})
          .to('#curse-txt',{opacity:0, duration:0, delay: 0.1})
          .to('#curse-txt',{opacity:1, duration:0, delay: 0.1})
          .to('#curse-txt',{opacity:0, duration:0, delay: 0.1,onComplete: Animations.titleDisplay})
          .to('.pentagram-cont', {opacity:1, duration:2, delay:1, onStart:Animations.pentagramDisplayOn})
          .to('#flame-instructions', {duration: 1, opacity:1, delay: -1})
    }

    static titleDisplay(){
        document.querySelectorAll('.title').forEach(title => title.style.display = "none");
    }

    static flamesDisplayOff(){
        document.querySelectorAll('.flame').forEach(flame => flame.style.display = 'none') 
    }

    static pentagramDisplay(){
        document.querySelector('.pentagram-cont').style.display = "none";
    }

    static pentagramDisplayOn(){
        document.querySelector('.pentagram-cont').style.display = "flex";
    }

    static displayCursesCont(){
        document.querySelector('.curse-cont').style.display = "flex";
    }

    //Picks a random curse and paints it.
    static displayCurse() {
        curse = Functionality.randomCurse();
        document.querySelector('.curse').textContent = `${curse}`;
    };

    //Displays each random curse with a fade in and out in the roullete.
    static cursesInOut() {
        let tl = gsap.timeline();
        tl.to('.curse', {duration: 0.25, opacity: 0, onComplete: Animations.displayCurse})
          .to('.curse', {opacity:1, duration: 0.25})
    };

    //Animation for things coming inside the pentagram
    static curseBigOut() {
        let tl = gsap.timeline();
        tl.fromTo('.curse-title', {scale: 0, y:200}, {scale: 1.2, y:20, duration:3})
        tl.fromTo('.curse', {scale: 0}, {scale: 1, duration:3, delay: -3})
    }

    //Maes the CURSE word fade in and out.
    //Not used but call it on the clear function  on cursesInterval to try
    static curseBeat() {
        let tl = gsap.timeline();
        tl.fromTo('#curse-span', {opacity:1},{opacity:0.5, duration:0.5})
          .to('#curse-span',{opacity:1, duration: 0.5})
        tl.delay(2)
        tl.repeat(-1);
    }

    //Changes the last words of "your curse will be"
    static curseIs() {
        function changeTxt(){
            document.querySelector('#is').textContent = "is...";
        }
        gsap.fromTo('curse-title', {opacity:0}, {opacity: 1, duration:1, onStart: changeTxt})
    }

  
    static cursesInterval() {
        Animations.displayCursesCont();
        Animations.curseBigOut();
        
        let rCurse = window.setInterval(Animations.cursesInOut, 500);
        function clear(){
            clearInterval(rCurse);
            Animations.curseIs();
        }
        window.setTimeout(clear, 5000);
    }

    static master(){
        let tl = gsap.timeline();
        tl.to('#flame-instructions', {duration: 1, opacity:0})
            .to("#pentagram-img", {duration: 1, opacity: 1, ease: "power3.in"})
            .to("#pentagram-img", {duration: 10, delay: -0.7, rotate: -5000, ease: "power3.in"})
            .to(".pentagram-cont", {duration: 6, delay: -6 , scale: 11, ease: "power4.in"})
            .to(".pentagram-cont", {duration: 4, delay: -3.7 , opacity: 0, ease: "power2.in", onComplete: Animations.pentagramDisplay})
            .to('.curse-cont', {duration: 5, delay: -1.5, opacity: 1, ease: "power4.out", onStart: Animations.cursesInterval, onComplete:Functionality.setCurseLocal})
    };

    static cursedTitleScreen(){
        Animations.titleDisplay();
        Animations.displayCursesCont();
        Animations.curseIs();
        document.querySelector('#flame-already-cursed').style.display = 'block';
        gsap.to('.curse-cont', {duration:3, opacity:1})
    }

};



//When you click the flames, they slowly start fading and the counter goes down.
document.querySelectorAll('.flame').forEach(flame => {
    flame.addEventListener('click', (e) => {  

        Functionality.flamesOut(e.target);
        
     });
});

//Set interval function for when all flames are extinguished
Functionality.checkFlames()

//Event listener for the animation of the title screen
document.querySelectorAll('.title').forEach(title => title.addEventListener("click", ()=> {
    Animations.title();
}));

//document.querySelectorAll('.title').forEach(title => title.removeEventListener("click", ()=> {
//        Animations.title;}));


Functionality.getCurseLocal();