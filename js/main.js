// change site brightness
document.querySelector("#brightness").addEventListener("click", function(){
    document.querySelector("body").classList.toggle("black");
    document.querySelector("#field").classList.toggle("black");
})

// Stores status of play fields
let fieldsArray = [0,1,2,3,4,5,6,7,8];
let fieldsTemp = fieldsArray;
let gameEnd = false;

// Adds event listener to every field
document.querySelectorAll(".field").forEach((field,i) => field.addEventListener("click", async function(){
    // executes if clicked field is empty
    if ( fieldsArray.includes(i) && !gameEnd ){
        field.style.backgroundImage = "url('resources/images/x.webp')";
        await madeMove(i);
    }
}))

// Updates move of player
async function madeMove(num){
    fieldsTemp[num] = "x";

    // Disables player from making addional move until computation is over
    fieldsArray = fieldsArray.map(x => "x")

    await new Promise(resolve => setTimeout(resolve, 1000));
    // check if player won
    await evaluation();

    if ( !gameEnd ){
        await botTurn();
    }

    // updates status of fields
    fieldsArray = fieldsTemp;
}

// Bot move (random as of now)
async function botTurn(){
    // all empty id's stored in a variable
    let emptyFields = fieldsTemp.filter(x => typeof x === "number");

    // randomly picking an empty field
    let botChoice = Math.round((Math.random()* (emptyFields.length -1)));
    botChoice = emptyFields[botChoice];

    fieldsTemp[botChoice] = "o";

    // error if there is no empty field left --> tie
    try{
        document.querySelector(`#field-${botChoice + 1}`).style.backgroundImage = "url('resources/images/o.png')";
    }
    catch{
        document.querySelector("#winner").innerText = "It's a Tie!";
        gameEnd = true;
        document.querySelector("#restart").classList.remove("hide");
    }
    // check if bot won
    await evaluation();
}

async function evaluation(){
    for ( i = 0; i < 9; i+=3 )
        // checks all possible scenerios where player wins
        if ( (fieldsTemp[i] === "x" && fieldsTemp[i+1] === "x" && fieldsTemp[i+2] === "x") ||
        (fieldsTemp[i/3] === "x" && fieldsTemp[(i/3)+3] === "x" && fieldsTemp[(i/3)+6] === "x" ) ||
        (fieldsTemp[0] === "x" && fieldsTemp[4] === "x" && fieldsTemp[8] === "x") ||
        (fieldsTemp[2] === "x" && fieldsTemp[4] === "x" && fieldsTemp[6] === "x") ){
            document.querySelector("#winner").innerText = "You WIN!";
            gameEnd = true;
            document.querySelector("#restart").classList.remove("hide");
        }
        // checks all possible scenerios where bot wins
        else if ( (fieldsTemp[i] === "o" && fieldsTemp[i+1] === "o" && fieldsTemp[i+2] === "o") ||
        (fieldsTemp[i/3] === "o" && fieldsTemp[(i/3)+3] === "o" && fieldsTemp[(i/3)+6] === "o") ||
        (fieldsTemp[0] === "o" && fieldsTemp[4] === "o" && fieldsTemp[8] === "o") ||
        (fieldsTemp[2] === "o" && fieldsTemp[4] === "o" && fieldsTemp[6] === "o") ){
            document.querySelector("#winner").innerText = "You Lose!";
            gameEnd = true;
            document.querySelector("#restart").classList.remove("hide");
        }
}