//Html selectors;
var playerCardArray = $(".playerCard");
var opponentCardArray = $(".opponentCard");



//Global Variables



//Character Objects

var characterArray = [];

characterArray[0] = new Character('Kage', 100, 5, 5, 5, "assets/images/KagePortrait.png");
characterArray[1]  = new Character('Axel', 100, 5, 5, 5, "assets/images/AxelPortrait.png");
characterArray[2]  = new Character('Professor', 100, 5, 5, 5, "assets/images/ProfessorPortrait.png");
characterArray[3]  = new Character('Reaper', 100, 5, 5, 5, "assets/images/ReaperPortrait.png");
characterArray[4]  = new Character('Rose', 100, 5, 5, 5, "assets/images/RosePortrait.png");
characterArray[5]  = new Character('Spike', 100, 5, 5, 5, "assets/images/SpikePortrait.png");
characterArray[6]  = new Character('Vanya', 100, 5, 5, 5, "assets/images/VanyaPortrait.png");
characterArray[7]  = new Character('Zero', 100, 5, 5, 5, "assets/images/ZeroPortrait.png");


//Game Object

$(document).ready(function () {


    for (let i = 0; i < playerCardArray.length; i++) {
        
        playerCardArray.eq(i).find('img').attr('src', characterArray[i].img);
    }

    for (let i = 0; i < opponentCardArray.length; i++) {
        
        opponentCardArray.eq(i).find('img').attr('src', characterArray[i+3].img);
    }
       

});






//Functions

function Character(name, hp, att, def, spd, img, portrait) {

    //String
    this.name = name;

    // Number
    this.hitPoints = hp;
    this.attack = att;
    this.defense = def;
    this.speed = spd;

    //String (path)
    this.img = img;
    this.portrait = portrait;
}

function cycleCharacterSelector(){

}