var testArray = [];

addToArray(20);

function addToArray(num) {
    for (let i = 0; i < num; i++) {

        var col = getRandomCol();

        testArray.push(col);

    }
}

function getRandomCol() {
    var ltrs = '0123456789ABCDEF';
    var color = '#';

    for (let i = 0; i < 6; i++) {
        color += ltrs.charAt( Math.floor(Math.random() * 16));
    }

    console.log(color);
    return color;
}

function updateTurnOrder() {
    var turnOrder = $(".turnOrder");
    

    for (let i = 0; i < turnOrder.length; i++) {

        
        $(turnOrder[i]).css("background-color", testArray[i]);

    }

    
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