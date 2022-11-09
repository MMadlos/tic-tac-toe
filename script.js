// You’re going to store the gameboard as an array inside of a Gameboard object, so start there! 
// Your players are also going to be stored in objects… 
// and you’re probably going to want an object to control the flow of the game itself. 

// Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.

// Store the gameboard as an array inside of a Gameboard object

const game = (() => {
    let gameboard = {
        box11: undefined,
        box12: undefined,
        box13: undefined,
        box21: undefined,
        box22: undefined,
        box23: undefined,
        box31: undefined,
        box32: undefined,
        box33: undefined,
    
    };

    // let gameboard = []

    const addMoves = (boxNumber, mark) => {
        gameboard[boxNumber] = mark;
    }

    const defaultMoves = (() => {
        addMoves("box11", "X")
        addMoves("box12", "X")
        addMoves("box13", "X")
        addMoves("box21", "X")
        addMoves("box22", "X")
        addMoves("box31", "X")
        addMoves("box33", "X")
    })()

    console.table(gameboard)
    console.table(gameboard["box11"])
    console.table(gameboard.box11)

    // let gameboard = {
    //     firstRow: [],
    //     secondRow: [],
    //     thirdRow: []
    // }

    // const addMoves = (rowPosition, columnPosition, mark) => {
    //     gameboard[rowPosition][columnPosition] = mark
    // }

    // const defaultMoves = (() => {
    //     addMoves("firstRow", "firstColumn", "X")
    //     addMoves("firstRow", "secondColumn", "X")
    //     addMoves("firstRow", "thirdColumn", "X")
    //     addMoves("secondRow", "firstColumn", "X")
    //     addMoves("thirdRow", "firstColumn", "X")
    // })()
    // console.table(gameboard)


    const player = (name, mark) => {
        return {name, mark}
    }

    const displayControler = (() => {
     
        
        
    })()

    checkWin()
    function checkWin() {
        // DINÁMICA DEL JUEGO
        // GANA:
        // - Si toda la fila es del mismo símbolo --> box[i]1 = box[i]2 = box[i]3
        for (let i = 1; i <= 3; i++){
            let gameboardIndexes = [`box${i}1`, `box${i}2`, `box${i}3`]

            let firstColumn = gameboard[gameboardIndexes[0]]
            let secondColumn = gameboard[gameboardIndexes[1]]
            let thirdColumn =gameboard[gameboardIndexes[2]]


            console.log(gameboardIndexes)
            if (firstColumn === secondColumn && secondColumn === thirdColumn){
                console.log(firstColumn, secondColumn, thirdColumn)
                console.log("Victoria - fila")
            } else {
                console.log(firstColumn, secondColumn, thirdColumn)
                console.log("No victoria - fila")
            }
        }

        // - Si toda la columna es del mismo símbolo --> box1[i] = box2[i] = box3[i] 
        for (let i = 1; i <= 3; i++){
            let gameboardIndexes = [`box1${i}`, `box2${i}`, `box3${i}`]

            let firstRow = gameboard[gameboardIndexes[0]]
            let secondRow = gameboard[gameboardIndexes[1]]
            let thirdRow =gameboard[gameboardIndexes[2]]

            console.log(gameboardIndexes)
            if (firstRow === secondRow && secondRow === thirdRow){
                console.log(firstRow, secondRow, thirdRow)
                console.log("Victoria - columna")
            } else {
                console.log(firstRow, secondRow, thirdRow)
                console.log("No victoria - columna")
            }
        }

        // - Si las diagonales son del mismo símbolo --> box11 = box22 = box33 || box13 = box22 = box31
        let middleBox = gameboard.box22
        console.log(middleBox)
        if (middleBox === gameboard.box11 && middleBox === gameboard.box33){
            console.log("Victoria - diagonal")
        } else if (middleBox ===  gameboard.box13 && middleBox === gameboard.box31) {
            console.log("Victoria - diagonal")
        } else {
            console.log("No victoria - diagonal")
        }
    }


    return {gameboard, addMoves, player};
})();


// const user = game.player("user", "X")
// const computer = game.player("computer", "O")
// console.log(user, computer)
