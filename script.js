const X_Score = document.querySelector("#PlayerX_Score")
const O_Score = document.querySelector("#PlayerO_Score")

let X_Wins = 0
let O_Wins = 0

let curr_player = "X"
let board = ['', '', '', '', '', '', '', '', '']
let game_active = true

const Win_combos = [
                    [0, 1, 2],
                    [0, 4, 8],
                    [0, 3, 6],
                    [1, 4, 7],
                    [2, 5, 8],
                    [2, 4, 6],  
                    [3, 4, 5],
                    [6, 7, 8],
                   ]
msg = document.querySelector("#message")

function makeMove(cell){
    const cell_index = Array.from(cell.parentElement.children).indexOf(cell)
    if(board[cell_index] === '' && game_active){
        board[cell_index] = curr_player

        cell.textContent = curr_player
        cell.classList.add(curr_player)
    
    if(check_Winner()){
        msg.textContent = `Player `+curr_player+` won!    `
        game_active = false
        setTimeout(function(){
            resetBoard()
        },750)
    }
     else if (board.every((cell) => cell !== '')){
        msg.textContent = 'Draw!'
        game_active = false
        setTimeout(function(){
            resetBoard()
        },750)
     }
    else{
        curr_player = curr_player === "X"?"O":"X";       

    }
    }
}

function check_Winner(){

    for(let combo of Win_combos){
        const [a,b,c] = combo

        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            if(board[a] === 'X'){
                X_Wins++
                X_Score.textContent = X_Wins
                return combo
            }
            else if(board[a] === 'O'){
                O_Wins++
                O_Score.textContent = O_Wins
                return combo
            }
            game_active = false
            return true
        }
    }
    return false
}

function resetBoard(){

    curr_player = "X"
    board = ['', '', '', '', '', '', '', '', '']
    game_active = true
    msg.textContent = ''
    document.querySelectorAll('.cell').forEach((cell) => {
        cell.textContent = ''
        cell.classList.remove('X','O')
    });
}
resetBoard()