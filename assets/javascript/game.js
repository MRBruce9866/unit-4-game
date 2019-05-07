var testArray = [];

addToArray(50);
updateTurnOrder();

function addToArray(num) {
    for (let i = 0; i < num; i++) {

        var character = "char" + (Math.floor(Math.random() * 8) + 1) + ".png"

        testArray.push(character);

    }
}


function updateTurnOrder() {
    var turnOrder = $(".turnOrder");
    

    for (let i = 0; i < turnOrder.length; i++) {

        
        $(turnOrder[i]).attr("src", "assets/images/" + testArray[i]);

    }

    
}

$('.playerCard').on('click', function(){

    var movePan = $(this).children('#moveSelectPanel');

    if(movePan.is(":hidden")){
        movePan.slideDown();
    }else{
        movePan.slideUp();
    }

});

$('.gameCard').on('mouseenter', function(){

    $(this).addClass("activeCard");
    
});


$('.gameCard').on('mouseleave', function(){

    $(this).removeClass("activeCard");

});





function getMoveSelect(){

    var moveSelectDiv = $('<div>');
    var move1 = $('<div>');
    var move2 = $('<div>');
    var move3 = $('<div>');

    moveSelectDiv.attr('id', 'moveSelectPanel');
    move1.attr('class', 'moveButton').attr('id', 'move1').text("ATTACK");
    move2.attr('class', 'moveButton').attr('id', 'move2').text("BUFF");
    move3.attr('class', 'moveButton').attr('id', 'move3').text("DEFEND");

    $(moveSelectDiv).append(move1);
    $(moveSelectDiv).append(move2);
    $(moveSelectDiv).append(move3);

    return moveSelectDiv;
}



$(document).ready(function () {

    $(document).keydown(function (objEvent) {

        var key;

        if (objEvent == null) {
            key = event.key;
        } else {
            key = objEvent.key;
        }

        key = key.toUpperCase();


        switch (key) {
            case "ENTER":

                testArray.shift();
                updateTurnOrder();

                break;

            case "R":
                updateTurnOrder();
                break;

            default:


                break;
        }




    });

});