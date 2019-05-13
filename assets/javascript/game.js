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
var characterCards = [];

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
    buildCharacterCards();
    cycleCharacterSelector("right");
    $("#continueButton").toggle();


    //On-Click Events


    $("#selectorBackward").on("click", function () {
        cycleCharacterSelector("left");
    });

    $("#selectorFoward").on("click", function () {
        cycleCharacterSelector("right");
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

    var card = characterCards[characterSelectInd];
    card.bind("click", function(){ 
        $(this).unbind();
        addPartyMember()
    });
    characterSelector.prepend(card);

}


function buildCharacterCards() {
    for (let i = 0; i < characterArray.length; i++) {

        characterCards[i] = getCharacterCard(characterArray[i]);

    }
}

function getCharacterCard(character, party) {
    var card = $("<div>").attr("class", "card");
    card.append($("<div>").attr("class", "memberName").text(character.name));
    card.append($("<div>").attr("class", "memberImg").html("<img src = " + character.portrait + ">"));
    card.append($("<div>").attr("class", "memberStat").text("Attack: " + character.attack));
    card.append($("<div>").attr("class", "memberStat").text("Defense: " + character.defense));
    card.append($("<div>").attr("class", "memberStat").text("Speed: " + character.speed));
    return card;
}


function addPartyMember() {
    if (partyArray.length < 3) {
        partyArray.push(characterArray[characterSelectInd]);

        var card = characterCards[characterSelectInd];
        card.attr("value", partyArray.length - 1);

        card.bind("click", function () {
            removePartyMember(parseInt($(this).attr("value")));
            $(this).remove();
            $(this).unbind();
        });

        partyList.append(card);
        cycleCharacterSelector("right");

        if (partyArray.length === 3) {
            toggleContinueButton();
        }

    }
}

function removePartyMember(index) {

    if (partyArray.length > 1) {
        partyArray.splice(index, 1);
    } else {
        partyArray.length = 0;
    }


    console.log(partyArray.length);

    if ($("#continueButton").is(":visible")) {
        toggleContinueButton();
    }

}

function toggleContinueButton() {
    $("#continueButton").toggle();
}