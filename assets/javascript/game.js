//Html selectors;
var playerCardArray = $(".playerCard");
var opponentCardArray = $(".opponentCard");


//Global Variables



//Character Objects

var characterArray = [];

characterArray[0] = new Character('Kage', 100, 5, 5, 5, "assets/images/Kage.png");
characterArray[1]  = new Character('Char2', 100, 5, 5, 5, "assets/images/char2.png");
characterArray[2]  = new Character('Char3', 100, 5, 5, 5, "assets/images/char3.png");
characterArray[3]  = new Character('Char4', 100, 5, 5, 5, "assets/images/char4.png");
characterArray[4]  = new Character('Char5', 100, 5, 5, 5, "assets/images/char5.png");
characterArray[5]  = new Character('Char6', 100, 5, 5, 5, "assets/images/char6.png");
characterArray[6]  = new Character('Char7', 100, 5, 5, 5, "assets/images/char7.png");
characterArray[7]  = new Character('Char8', 100, 5, 5, 5, "assets/images/char8.png");


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

function Character(name, hp, att, def, spd, img) {

    //String
    this.name = name;

    // Number
    this.hitPoints = hp;
    this.attack = att;
    this.defense = def;
    this.speed = spd;

    //String (path)
    this.img = img;
}