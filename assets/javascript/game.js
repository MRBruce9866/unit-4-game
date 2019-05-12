//Html selectors;
var playerCardArray = $(".playerCard");
var opponentCardArray = $(".opponentCard");
var partyList = $("#partyList");
var characterSelector = $("#characterSelector");


//Global Variables

var characterSelectInd = 0;
var partyArray = [];





//Character Objects

var characterArray = [];

characterArray[0] = new Character('Kage', 100, 7, 5, 4, "assets/images/Kage.png", "assets/images/KagePortrait.png");
characterArray[1] = new Character('Axel', 100, 5, 8, 5, "assets/images/Axel.png", "assets/images/AxelPortrait.png");
characterArray[2] = new Character('Professor', 100, 5, 4, 6, "assets/images/Professor.png", "assets/images/ProfessorPortrait.png");
characterArray[3] = new Character('Reaper', 100, 3, 9, 6, "assets/images/Reaper.png", "assets/images/ReaperPortrait.png");
characterArray[4] = new Character('Rose', 100, 10, 2, 3, "assets/images/Rose.png", "assets/images/RosePortrait.png");
characterArray[5] = new Character('Spike', 100, 3, 3, 9, "assets/images/Spike.png", "assets/images/SpikePortrait.png");
characterArray[6] = new Character('Vanya', 100, 7, 5, 4, "assets/images/Vanya.png", "assets/images/VanyaPortrait.png");
characterArray[7] = new Character('Zero', 100, 6, 6, 6, "assets/images/Zero.png", "assets/images/ZeroPortrait.png");


//Game Object

$(document).ready(function () {

    // partyList.empty();
    cycleCharacterSelector()


    //On-Click Events


    $("#selectorBackward").on("click", function () {
        cycleCharacterSelector("left");
    });

    $("#selectorFoward").on("click", function () {
        cycleCharacterSelector("right");
    });

    $("#selectorSelect").on("click", function () {
        addPartyMember();
    })

    $("#partyList").on("click", ".removeButton", function(){

        removePartyMember(parseInt($(this).parent().attr("value")));
        $(this).parent().remove();
        console.log("clicked")
        console.log($(this).parent().attr("value"))
    });



    


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

function cycleCharacterSelector(direction = "right") {

    if (direction === "right") {
        do {
            characterSelectInd++;
            if (characterSelectInd >= characterArray.length) characterSelectInd = 0;
        } while (partyArray.includes(characterArray[characterSelectInd]))

    } else if (direction === "left") {
        do {
            characterSelectInd--;
            if (characterSelectInd < 0) characterSelectInd = characterArray.length - 1;

        } while (partyArray.includes(characterArray[characterSelectInd]));


    }

    characterSelector.children(".card").remove();
    var nextCard = getCharacterPartyCard(characterArray[characterSelectInd], true);
    characterSelector.prepend(nextCard);

}

function getCharacterPartyCard(character, selector = false) {
    var card;

    if (selector) {
        card = $("<div>").attr("class", "card");
        card.append($("<div>").attr("class", "memberName").text(character.name));
        card.append($("<div>").attr("class", "selectorImg").html("<img src = " + character.portrait + ">"));
        card.append($("<div>").attr("class", "memberStat").text("Attack: " + character.attack));
        card.append($("<div>").attr("class", "memberStat").text("Defense: " + character.defense));
        card.append($("<div>").attr("class", "memberStat").text("Speed: " + character.speed));
    } else {
        card = $("<div>").attr("class", "card");
        card.append($("<div>").attr("class", "memberName").text(character.name));
        card.append($("<div>").attr("class", "selectorImg").html("<img src = " + character.img + ">"));
        card.append($("<div>").attr("class", "memberStat").text("Attack: " + character.attack));
        card.append($("<div>").attr("class", "memberStat").text("Defense: " + character.defense));
        card.append($("<div>").attr("class", "memberStat").text("Speed: " + character.speed));
        card.append($("<button>").attr("class", "removeButton").text("X"));
    }

    return card;
}


function addPartyMember() {
    if (partyArray.length < 3) {
        partyArray.push(characterArray[characterSelectInd]);

        var card = getCharacterPartyCard(characterArray[characterSelectInd], false);
        card.attr("value", partyArray.length-1);
        partyList.append(card);
        cycleCharacterSelector("right");

        if (partyArray.length === 3) {

        }

    }
}

function removePartyMember(index) {
    partyArray.splice(index);
}