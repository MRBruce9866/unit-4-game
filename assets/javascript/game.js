$(document).ready(function () {
    // //On-Click Events
    game.init();

    $("#selectorBackward").on("click", function () {
        game.getDisplay().cycleCharacterSelector("left");
    });

    $("#selectorForward").on("click", function () {
        game.getDisplay().cycleCharacterSelector("right");
    });

    

   

    $("#screenBackward").on("click", function () {
        game.getDisplay().cycleScreen("left");
    });

    $("#screenForward").on("click", function () {
        game.getDisplay().cycleScreen("right");
    });

});


//Functions


// function setOpponentParty() {
//     for (let i = 0; i < characterArray.length; i++) {

//         if (!partyArray.includes(characterArray[i])) {
//             opponentArray.push(characterArray[i]);
//         }

//     }
// }


// function setTokens() {
//     var pIndex = 0;
//     var oIndex = 0;


//     for (let i = 0; i < characterTokens.length; i++) {



//         if (partyArray.includes(characterArray[i])) {
//             characterTokens[i].addClass("playerToken").attr("id", "player" + pIndex);
//             pIndex++;

//         } else {
//             characterTokens[i].addClass("opponentToken").attr("id", "opponent" + oIndex);
//             oIndex++;
//         }

//         characterTokens[i].hover(function () {
//             previewWindow.append(characterCards[i]);
//         }, function () {
//             previewWindow.children(".card").remove();
//         });

//         battleWindow.append(characterTokens[i]);

//     }
// }



// function startBattle() {
//     setOpponentParty();
//     setTokens();
// }

var  game = {
    characterArray: [],
    user: "",
    opponent: "",
    display: "",

    init:  function () {
        user = new game.Player();
        opponent = new game.Player();

        display = new game.Display();
        display.buildScreenArray();
        display.displayScreen(0);
        game.buildCharacters();

    },


    Display: function () {
        this.partyList = $("#partyList");
        this.characterSelector = $("#characterSelector");
        this.battleWindow = $("#battleWindow");
        this.previewWindow = $("#previewWindow");
        this.screenArray = [];
        this.screenIndex = 0;
        this.characterSelectInd = 0;
        this.characterCards = [];
        this.characterTokens = [];


        this.buildScreenArray = function () {
            this.screenArray = $(".screen");
            this.screenArray.hide();
            this.screenArray.eq(this.screenIndex).show();
        }

        this.cycleScreen = function (direction) {
            this.screenArray.eq(this.screenIndex).hide();
            if (direction === "left") {
                this.screenIndex--;
                if (this.screenIndex < 0) this.screenIndex = this.screenArray.length - 1;
            } else if (direction === "right") {
                this.screenIndex++;
                if (this.screenIndex >= this.screenArray.length) this.screenIndex = 0;
            }
            this.displayScreen(this.screenIndex);
        }

        this.displayScreen = function (index) {

            this.screenIndex = index;

            switch (this.screenIndex) {
                case 0:
                    $("#screenBackward").hide();
                    $("#screenForward").show();

                    // clearGame();

                    break;

                case 1:
                    $("#screenBackward").show();

                    if (user.party.length === 3) {
                        $("#screenForward").show();
                    } else {
                        $("#screenForward").hide();
                    }

                    this.cycleCharacterSelector("right");


                    break;

                case 2:

                    $("#screenBackward").hide();
                    $("#screenForward").hide();
                    startBattle();

                    break;

                case 3:

                    break;

                default:
                    break;
            }


            $("#headerTitle").text(this.screenArray.eq(this.screenIndex).attr("tValue"));

            this.screenArray.eq(this.screenIndex).show();
        }

        this.cycleCharacterSelector = function (direction = "right") {

            if (direction === "right") {
                do {
                    this.characterSelectInd++;
                    if (this.characterSelectInd >= game.characterArray.length) this.characterSelectInd = 0;
                } while (user.party.includes(game.characterArray[this.characterSelectInd]))

            } else if (direction === "left") {
                do {
                    this.characterSelectInd--;
                    if (this.characterSelectInd < 0) this.characterSelectInd = game.characterArray.length - 1;

                } while (user.party.includes(game.characterArray[this.characterSelectInd]));


            }

            this.characterSelector.children(".card").remove();

            var card = this.characterCards[this.characterSelectInd];
            card.bind("click", function () {
                if (user.party.length < 3) {
                    $(this).unbind();
                    user.addPartyMember(game.characterArray[this.characterSelectInd]);
                    
                }
            });
            this.characterSelector.prepend(card);

        }

        this.buildCharacterCards = function () {
            for (let i = 0; i < game.characterArray.length; i++) {
        
                this.characterCards[i] = this.getCharacterCard(game.characterArray[i]);
        
            }
        }
        
        this.buildCharacterTokens = function () {
            for (let i = 0; i < game.characterArray.length; i++) {
        
                this.characterTokens[i] = this.getCharacterToken(game.characterArray[i]);
        
            }
        }

        this.getCharacterToken = function(character) {
            var token = $("<div>").attr("class", "token").html("<img src = " + character.img + ">");
            return token;
        }
        
        
        
        this.getCharacterCard = function(character) {
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

        this.addPartyMember = function() {


            var card = this.characterCards[this.characterSelectInd];
            card.attr("value", this.characterSelectInd);
        
            card.bind("click", function () {
                user.removePartyMember(parseInt($(this).attr("value")));
                $(this).remove();
                $(this).unbind();
            });
        
            this.partyList.append(card);
            this.cycleCharacterSelector("right");
        
            if (user.party.length === 3) {
                $("#screenForward").show();
            }
        
        }

        this.removePartyMember = function(index) {
            $("#screenForward").hide();
        
            if (user.party.includes(game.characterArray[index])) {
                user.party.splice(user.party.indexOf(game.characterArray[index]), 1);
            }
    
        
        }


    },

    Player: function () {
        this.party = [];
        this.selectingAlly = false;
        this.selectingOpponent = false

        this.addPartyMember = function (character) {
            this.party.push(character);
            display.addPartyMember()
            console.log(this.party);
        }

        this.removePartyMember = function (character) {
            if (this.party.includes(character)) {
                this.party.splice(this.party.indexOf(character), 1);
            }
            display.removePartyMember();
            console.log(this.party);
        }
    },

    Character: function (name, hp, mana, att, def, mAtt, mDef, img, portrait) {

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
    },

    buildCharacters: function () {
        game.characterArray[0] = new game.Character('Kage', 100, 50, 100, 100, 100, 100, "assets/images/Kage.png", "assets/images/KagePortrait.png");
        game.characterArray[1] = new game.Character('Axel', 100, 100, 100, 100, 100, 100, "assets/images/Axel.png", "assets/images/AxelPortrait.png");
        game.characterArray[2] = new game.Character('Professor X', 100, 100, 100, 100, 100, 100, "assets/images/Professor.png", "assets/images/ProfessorPortrait.png");
        game.characterArray[3] = new game.Character('Reaper', 100, 100, 100, 100, 100, 100, "assets/images/Reaper.png", "assets/images/ReaperPortrait.png");
        game.characterArray[4] = new game.Character('Rose', 100, 100, 100, 100, 100, 100, "assets/images/Rose.png", "assets/images/RosePortrait.png");
        game.characterArray[5] = new game.Character('Spike', 100, 100, 100, 100, 100, 100, "assets/images/Spike.png", "assets/images/SpikePortrait.png");
        game.characterArray[6] = new game.Character('Vanya', 100, 100, 100, 100, 100, 100, "assets/images/Vanya.png", "assets/images/VanyaPortrait.png");
        game.characterArray[7] = new game.Character('Zero', 100, 100, 100, 100, 100, 100, "assets/images/Zero.png", "assets/images/ZeroPortrait.png");

        display.buildCharacterCards();
        display.buildCharacterTokens();
    },


    getDisplay: function(){
        return display;
    }

};