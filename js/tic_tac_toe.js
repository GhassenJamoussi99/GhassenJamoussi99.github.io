//Utilities
const states = document.querySelector("#text-status")
let activeGame = true
let activePlayer = "X"
let gameState = ["", "", "", "", "", "", "", "", ""]

// Defining Win Conditions
const winConditions = [
    //Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //Diagonals
    [0, 4, 8],
    [2, 4, 6]
]


//Messages
const win = () => `Player ${activePlayer} wins the game`
const tie = () => `It's a tie, play again`
const turn = () => `It's player ${activePlayer}'s turn`

//Printing the player's turn
states.innerHTML = turn()


// Setup event listeners
document.querySelectorAll(".grid-item").forEach(cell => cell.addEventListener("click", manageClicks))
document.querySelector("#replay").addEventListener("click", replay)

/**
 * This functions manages clicks on the cells
 */
function manageClicks() {
    // Get index number
    const indexGrid = parseInt(this.dataset.index)
    console.log(indexGrid)

    //Write in the cell, only when it's empty
    if (gameState[indexGrid-1] == "" && activeGame) {
        // We write the symbol of the active player in the grid
        gameState[indexGrid-1] = activePlayer
        this.innerHTML = activePlayer
        // Check if one of the players have won
        verify()
    }

}

function verify() {
    let turnWon = false
    console.log(gameState)

    // Check all of the conditions
    for (let cond of winConditions) {
        // get the 3 cases of winConditions after every loop
        let val1 = gameState[cond[0]]
        let val2 = gameState[cond[1]]
        let val3 = gameState[cond[2]]

        // If one of the cells are empty
        if (val1 === "" || val2 === "" || val3 === "") {
            continue
        }

        // If all the 3 cells are the same
        if (val1 === val2 && val2 === val3) {
            turnWon = true
            break
        }
    }

    // If one of the 2 players have won
    if (turnWon) {
        states.innerHTML = win()
        activeGame = false
        return
    }

    // If all the cells are filled
    if (!gameState.includes("")) {
        states.innerHTML = tie()
        activeGame = false
        return
    }

    // Change player's turn
    if (activePlayer == "X")
        activePlayer = "O"
    else
        activePlayer = "X"

    states.innerHTML = turn()
}

/**
 * This function resets the game
 */
 function replay(){
    activePlayer = "X"
    activeGame = true
    gameState = ["", "", "", "", "", "", "", "", ""]
    states.innerHTML = turn()
    document.querySelectorAll(".grid-item").forEach(cell => cell.innerHTML = "")
}