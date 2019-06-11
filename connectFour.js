var playerOne = prompt("Player One: Enter your name, you will be Blue.");
var playerTwo = prompt("Player Two: Enter your name, you will be Red.");
var playerOneColor = 'rgb(86, 151, 255)';
var playerTwoColor = 'rgb(237, 45, 73)';
var head3 = $('h3');
var gameOn = true;
var table = $('table tr');
 
function reportWin(rowNum, colNum){
    console.log("You won starting at this row, col");
    console.log(rowNum);
    console.log(colNum);  
}

function changeColor(rowIndex, colIndex, color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('Button').css('background-color', color);
}

function returnColor(rowIndex, colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('Button').css('background-color');
}

function checkBottom(colIndex){
    var reportedColor = returnColor(5, colIndex);
    for (var row = 5; row >= 0; row--) {
        reportedColor = returnColor(row, colIndex);
        if (reportedColor === 'rgb(35, 35, 35)')
            return row;
    }

}

function colorMatchCheck(one, two, three, four){
    return (one === two && one === three && one === four && one !== 'rgb(35, 35, 35)' && one !== undefined)
}

function horizontalWinCheck(){
    for (var row = 0; row < 6; row++){
        for (var col = 0; col < 4; col++){
            if (colorMatchCheck(returnColor(row, col), returnColor(row, col + 1), returnColor(row, col + 2), returnColor(row, col + 3))){
                console.log('Hori Win');
                reportWin(row, col);
                return true;
            }
            else{
                continue;
            }
        }
    }
}

function verticalWinCheck(){
    for (var col = 0; col < 7; col++){
        for (var row = 0; row < 3; row++){
            if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col), returnColor(row + 2, col), returnColor(row + 3, col))){
                console.log('Vert Win');
                reportWin(row, col);
                return true;
            }
            else{
                continue;
            }
        }
    }
}

function diagonalWinCheck(){
    for (var col = 0; col < 5; col++){
        for (var row = 0; row < 7; row++){
            if (colorMatchCheck(returnColor(row, col), returnColor(row + 1, col  + 1), returnColor(row + 2, col + 2), returnColor(row + 3, col + 3))) {
                console.log('Vert Win');
                reportWin(row, col);
                return true;
            }
            else if (colorMatchCheck(returnColor(row, col), returnColor(row - 1, col + 1), returnColor(row - 2, col + 2), returnColor(row - 3, col + 3))) {
                console.log('Vert Win');
                reportWin(row, col);
                return true;
            }
            else {
                continue;
            }
        }
    }
}

var currentPlayer = 1;
var currentName = playerOne;
var currentColor = playerOneColor;

head3.text(playerOne+ ", pick a column to drop in!");

$('.board button').on('click', function(){
    var col = $(this).closest('td').index();
    var bottomAvail = checkBottom(col);
    changeColor(bottomAvail, col, currentColor);

    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
        $('h1').text(currentName + ', YOU NAILED IT!');
        $('h4').html(
            '<a href="./index.html" class="d-block" style="background-color: #232323; text-align: center; text-decoration: none; color: white; padding: 10px 0px;">RESTART?</a>'
            );
        head3.fadeOut('fast');
        $('h1').css('font-size', '70px');
        $('.board button').off('click');
    }

    currentPlayer = currentPlayer * -1;
    
    if (currentPlayer === 1){
        currentName = playerOne;
        currentColor = playerOneColor;    
        head3.text(currentName + ", pick a column to drop in!");
        head3.css("background-color", currentColor);
    }
    else{
        currentName = playerTwo;
        currentColor = playerTwoColor; 
        head3.text(currentName + ", pick a column to drop in!");
        head3.css("background-color", currentColor);
    }
});
