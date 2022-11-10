const game = (() => {

    let gameboard = []

    const addMoves = (boxNumber, mark) => {
        gameboard[boxNumber] = mark;
    }
    
    const player = (name, mark) => {
        return {name, mark}
    }

    const user = player("User", "X")
    const computer = player("Computer", "O")


    const displayControler = (() => {
        const markContainerAll = document.querySelectorAll(".markContainer")
        markContainerAll.forEach(box => {

            box.addEventListener("click", () => {
                let boxAttribute = box.getAttribute("data-boxPosition")
                let gameboardLength = Object.keys(gameboard).length

                // Añade el valor en gameboard
                if (gameboard[boxAttribute] !== undefined){return}
                // i === número máximo de jugadas. Son 9 turnos porque hay 9 casillas.
                for (let i = gameboardLength; i < 9; i++){
                    // Si la i es impar, es el turno del primer jugador y la marca es X
                    if (i % 2 !== 0){ 
                        gameboard[boxAttribute] = "X"
                        renderContent()
                        checkWin()
                        return 
                    }

                    if (i % 2 === 0){ 
                        gameboard[boxAttribute] = "O"
                        renderContent()
                        checkWin()
                        return
                    }
                }
            })
        })
    })()

    function renderContent() {
        // Select and create DOM
        const markContainerAll = document.querySelectorAll(".markContainer")
        const iconsAll = document.querySelectorAll("i");
        iconsAll.forEach(icon => {
            icon.remove();
        })

        markContainerAll.forEach(box => {
            // Get data-boxPosition from each container
            let boxAttribute = box.getAttribute("data-boxPosition")

            // Check if the box position has a value
            if (gameboard[boxAttribute] !== undefined){
                const boxPosition = document.querySelector(`[data-boxPosition="${boxAttribute}"]`)

                if(gameboard[boxAttribute] === "X"){
                    const xIcon = document.createElement("i")  
                    xIcon.classList.add("fa-solid", "fa-xmark");
                    boxPosition.appendChild(xIcon);
                }
                if(gameboard[boxAttribute] === "O"){
                    const oIcon = document.createElement("i")
                    oIcon.classList.add("fa-solid", "fa-circle")
                    boxPosition.appendChild(oIcon);
                }

            }
        })
    }
    
    function checkWin() {
        // Si toda la fila es del mismo símbolo --> box[i]1 = box[i]2 = box[i]3
        for (let i = 1; i <= 3; i++){
            let gameboardIndexes = [`box${i}1`, `box${i}2`, `box${i}3`]

            let firstColumn = gameboard[gameboardIndexes[0]]
            let secondColumn = gameboard[gameboardIndexes[1]]
            let thirdColumn =gameboard[gameboardIndexes[2]]

            
            if (secondColumn === undefined) {return}
            if (firstColumn === secondColumn && secondColumn === thirdColumn){
                return console.log("Victoria - fila")
            } else {
                // console.log(firstColumn, secondColumn, thirdColumn)
                console.log("No victoria - fila")
            }
        }

        // Si toda la columna es del mismo símbolo --> box1[i] = box2[i] = box3[i] 
        for (let i = 1; i <= 3; i++){
            let gameboardIndexes = [`box1${i}`, `box2${i}`, `box3${i}`]

            let firstRow = gameboard[gameboardIndexes[0]]
            let secondRow = gameboard[gameboardIndexes[1]]
            let thirdRow =gameboard[gameboardIndexes[2]]

            if (firstRow === secondRow && secondRow === thirdRow){
                console.log("Victoria - columna")

            } else {
                console.log("No victoria - columna")

            }
        }

        // Si las diagonales son del mismo símbolo --> box11 = box22 = box33 || box13 = box22 = box31
        if (gameboard.box22 === gameboard.box11 && gameboard.box22 === gameboard.box33){
            console.log("Victoria - diagonal")

        } else if (gameboard.box22 ===  gameboard.box13 && gameboard.box22 === gameboard.box31) {
            console.log("Victoria - diagonal")

        } else {
            console.log("No victoria - diagonal")
        }
    }
    

    return {gameboard, addMoves, player};
})();


