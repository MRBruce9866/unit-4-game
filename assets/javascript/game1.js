//Html selectors;
var partyList = $("#partyList");
var characterSelector = $("#characterSelector");
var battleWindow = $("#battleWindow");
var previewWindow = $("#previewWindow");


//Global Variables

var characterSelectInd = 0;
var partyArray = [];
var opponentArray = [];
var characterCards = [];
var characterTokens = [];

var screenArray = [];
var screenIndex = 0;

var selectingAlly = false;
var selectingOpponent = false;





//Character Objects
var characterArray = [];
characterArray[0] = new Character('Kage', 100, 50, 100, 100, 100, 100, "assets/images/Kage.png", "assets/images/KagePortrait.png");
characterArray[1] = new Character('Axel', 100, 100, 100, 100, 100, 100, "assets/images/Axel.png", "assets/images/AxelPortrait.png");
characterArray[2] = new Character('Professor X', 100, 100, 100, 100, 100, 100, "assets/images/Professor.png", "assets/images/ProfessorPortrait.png");
characterArray[3] = new Character('Reaper', 100, 100, 100, 100, 100, 100, "assets/images/Reaper.png", "assets/images/ReaperPortrait.png");
characterArray[4] = new Character('Rose', 100, 100, 100, 100, 100, 100, "assets/images/Rose.png", "assets/images/RosePortrait.png");
characterArray[5] = new Character('Spike', 100, 100, 100, 100, 100, 100, "assets/images/Spike.png", "assets/images/SpikePortrait.png");
characterArray[6] = new Character('Vanya', 100, 100, 100, 100, 100, 100, "assets/images/Vanya.png", "assets/images/VanyaPortrait.png");
characterArray[7] = new Character('Zero', 100, 100, 100, 100, 100, 100, "assets/images/Zero.png", "assets/images/ZeroPortrait.png");



//Player Objects



$(document).ready(function () {
    buildCharacterCards();
    buildCharacterTokens();
    cycleCharacterSelector("right");
    buildScreenArray();
    displayScreen(screenIndex);

    //On-Click Events


    $("#selectorBackward").on("click", function () {
        cycleCharacterSelector("left");
    });

    $("#selectorForward").on("click", function () {
        cycleCharacterSelector("right");
    });

    $("#screenBackward").on("click", function () {
        cycleScreen("left");
    });

    $("#screenForward").on("click", function () {
        cycleScreen("right");
    });

});


//Functions

function buildScreenArray() {
    screenArray = $(".screen");
    screenArray.hide();
    screenArray.eq(screenIndex).show();
}

function cycleScreen(direction) {
    screenArray.eq(screenIndex).hide();
    if (direction === "left") {
        screenIndex--;
        if (screenIndex < 0) screenIndex = screenArray.length - 1;
    } else if (direction === "right") {
        screenIndex++;
        if (screenIndex >= screenArray.length) screenIndex = 0;
    }


    displayScreen(screenIndex);

}

function displayScreen(index) {

    screenIndex = index;

    switch (screenIndex) {
        case 0:
            $("#screenBackward").hide();
            $("#screenForward").show();

            // clearGame();

            break;

        case 1:
            $("#screenBackward").show();

            if (partyArray.length === 3) {
                $("#screenForward").show();
            } else {
                $("#screenForward").hide();
            }


            break;

        case 2:

            $("#screenBackward").hide();
            $("#screenForward").hide();
            startBattle();

            console.log(partyArray);
            console.log(opponentArray);

            break;

        case 3:

            break;

        default:
            break;
    }


    $("#headerTitle").text(screenArray.eq(screenIndex).attr("tValue"));

    screenArray.eq(screenIndex).show();
}

function Character(name, hp, mana, att, def, mAtt, mDef, img, portrait) {

    //String
    this.name = name;

    // Number
    this.health = hp;
    this.mana = mana;
    this.attack = att;
    this.defense = def;
    this.magicAttack = mAtt;
    this.magicDefense = mDef;

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
    card.bind("click", function () {
        if (partyArray.length < 3) {
            $(this).unbind();
            addPartyMember()
        }
    });
    characterSelector.prepend(card);

}


function buildCharacterCards() {
    for (let i = 0; i < characterArray.length; i++) {

        characterCards[i] = getCharacterCard(characterArray[i]);

    }
}

function buildCharacterTokens() {
    for (let i = 0; i < characterArray.length; i++) {

        characterTokens[i] = getCharacterToken(characterArray[i]);

    }
}

function getCharacterToken(character) {
    var token = $("<div>").attr("class", "token").html("<img src = " + character.img + ">");
    return token;
}



function getCharacterCard(character) {
    var card = $("<div>").attr("class", "card");
    card.append($("<div>").attr("class", "memberName").text(character.name));
    card.append($("<div>").attr("class", "memberImg").html("<img src = " + character.portrait + ">"));
    card.append($("<div>").attr("class", "memberStat memberHealth").text("HEALTH: " + character.health));
    card.append($("<div>").attr("class", "memberStat memberMana").text("MANA: " + character.mana));
    card.append($("<div>").attr("class", "memberStat memberAttack").text("ATTACK " + character.attack));
    card.append($("<div>").attr("class", "memberStat memberDefense").text("DEFENSE " + character.defense));
    card.append($("<div>").attr("class", "memberStat memberMagicAttack").text("MAG.ATT " + character.magicAttack));
    card.append($("<div>").attr("class", "memberStat memberMagicDefense").text("MAG.DEF " + character.magicDefense));

    return card;
}


function addPartyMember() {

    partyArray.push(characterArray[characterSelectInd]);

    var card = characterCards[characterSelectInd];
    card.attr("value", characterSelectInd);

    card.bind("click", function () {
        removePartyMember(parseInt($(this).attr("value")));
        $(this).remove();
        $(this).unbind();
    });

    partyList.append(card);
    cycleCharacterSelector("right");

    if (partyArray.length === 3) {
        $("#screenForward").show();
    }

    console.log(partyArray.length);
    console.log(partyArray);
}

function removePartyMember(index) {
    $("#screenForward").hide();

    if (partyArray.includes(characterArray[index])) {
        partyArray.splice(partyArray.indexOf(characterArray[index]), 1);
    }

    console.log(partyArray.length);
    console.log(partyArray);


}

function setOpponentParty() {
    for (let i = 0; i < characterArray.length; i++) {

        if (!partyArray.includes(characterArray[i])) {
            opponentArray.push(characterArray[i]);
        }

    }
}


function setTokens() {
    var pIndex = 0;
    var oIndex = 0;


    for (let i = 0; i < characterTokens.length; i++) {



        if (partyArray.includes(characterArray[i])) {
            characterTokens[i].addClass("playerToken").attr("id", "player" + pIndex);
            pIndex++;

        } else {
            characterTokens[i].addClass("opponentToken").attr("id", "opponent" + oIndex);
            oIndex++;
        }

        characterTokens[i].hover(function () {
            previewWindow.append(characterCards[i]);
        }, function () {
            previewWindow.children(".card").remove();
        });

        battleWindow.append(characterTokens[i]);

    }
}



function startBattle() {
    setOpponentParty();
    setTokens();
}

// function Game() {
//     this.display = new Display();
//     this.user = new Player();
//     this.opponent = new Player();
//     this.characterArray = buildCharacters();


//     this.Display = function () {

//     }

//     this.Player = function () {
//         this.party = [];
//         this.addPartyMember = function (character) {
//             this.party.push(character);
//         }

//         this.removePartyMember = function (character) {
//             if (party.includes(character)) {
//                 party.splice(party.indexOf(character), 1);
//             }
//         }
//     }



// }

