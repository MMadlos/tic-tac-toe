const gameboard = []

const game = (() => {

    const getGameboard = () => console.table(gameboard)
    const addMoves = (boxNumber, mark) => {
        gameboard[boxNumber] = mark
        renderContent();
    }

    const resetGame = () => {
        gameboard = []
        renderContent();
    }

    const displayControler = (() => {
        const markContainerAll = document.querySelectorAll(".markContainer")
        markContainerAll.forEach(box => {
            box.addEventListener("click", () => {
                gameDynamics(box)
                renderContent()
                checkWin()
            })
        })
    })()

    function gameDynamics(element) {
        // Delete p element
        let boxParagraph = element.querySelector("p")
        if(boxParagraph) {boxParagraph.remove()}

        let boxAttribute = element.getAttribute("data-boxPosition")
        let gameboardLength = Object.keys(gameboard).length

        if (gameboard[boxAttribute] !== undefined){return}

        // i === número máximo de jugadas. Son 9 turnos porque hay 9 casillas.
        for (let i = gameboardLength; i < 9; i++){
            if (i === 8) {
                const boxContainers = document.querySelector(".board")
                boxContainers.classList.add("opacity")
                
                showMessage("empate")

                return gameboard[boxAttribute] = "X"
            }

            // Si la i es impar, es el turno del primer jugador y la marca es X
            if (i % 2 !== 0) {return gameboard[boxAttribute] = "X"}
            if (i % 2 === 0) {return gameboard[boxAttribute] = "O"}
        }
    }

    function renderContent() {
        // Delete existing icons
        const iconsAll = document.querySelectorAll("i");
        iconsAll.forEach(icon => { icon.remove() })

        // Select and create DOM
        const markContainerAll = document.querySelectorAll(".markContainer")
        markContainerAll.forEach(box => {
            const boxAttribute = box.getAttribute("data-boxPosition")
            const boxPosition = document.querySelector(`[data-boxPosition="${boxAttribute}"]`)
            const xIcon = document.createElement("i")  
            const oIcon = document.createElement("i")

            xIcon.classList.add("fa-solid", "fa-xmark");
            oIcon.classList.add("fa-solid", "fa-circle")

            if (gameboard[boxAttribute] === undefined) {return}
            if (gameboard[boxAttribute] === "X") { boxPosition.appendChild(xIcon) }
            if (gameboard[boxAttribute] === "O") { boxPosition.appendChild(oIcon) }
        })

    }
    
    function checkWin() {
        // Si toda la fila es del mismo símbolo --> box[i]1 = box[i]2 = box[i]3
        for (let i = 1; i <= 3; i++){
            let gameboardIndexes = [`box${i}1`, `box${i}2`, `box${i}3`]
            let [firstIndex, secondIndex, thirdIndex] = gameboardIndexes

            let firstColumn = gameboard[firstIndex]
            let secondColumn = gameboard[secondIndex]
            let thirdColumn =gameboard[thirdIndex]

            // Check if all 3 are the same and if they are undefined
            let haveSameValue = firstColumn === secondColumn && secondColumn === thirdColumn;
            let areUndefined = firstColumn === undefined && secondColumn === undefined && thirdColumn === undefined;
            
            
            if (haveSameValue && !areUndefined ) {              
                const boxContainers = document.querySelectorAll(".board > .markContainer")
                boxContainers.forEach(box => {
                    let boxAttribute = box.getAttribute("data-boxPosition")
                    if (boxAttribute !== firstIndex && boxAttribute !== secondIndex && boxAttribute !== thirdIndex) {
                        box.classList.add("opacity")
                    }
                })

                showMessage("fila")
                return
            }
        }

        // Si toda la columna es del mismo símbolo --> box1[i] = box2[i] = box3[i] 
        for (let i = 1; i <= 3; i++){
            let gameboardIndexes = [`box1${i}`, `box2${i}`, `box3${i}`]
            let [firstIndex, secondIndex, thirdIndex] = gameboardIndexes


            let firstRow = gameboard[firstIndex]
            let secondRow = gameboard[secondIndex]
            let thirdRow =gameboard[thirdIndex]

            // Check if all 3 are the same and if they are undefined
            let haveSameValue = firstRow === secondRow && secondRow === thirdRow;
            let areUndefined = firstRow === undefined && secondRow === undefined && thirdRow === undefined;

            if (haveSameValue && !areUndefined) {
                showMessage("columna")
            
                const boxContainers = document.querySelectorAll(".board > .markContainer")
                boxContainers.forEach(box => {
                    let boxAttribute = box.getAttribute("data-boxPosition")
                    if (boxAttribute !== firstIndex && boxAttribute !== secondIndex && boxAttribute !== thirdIndex) {
                        box.classList.add("opacity")
                    }
                })
            }
        }

        // Si las diagonales son del mismo símbolo --> box11 = box22 = box33 || box13 = box22 = box31

        let firstDiagonalArray = [gameboard.box11, gameboard.box22, gameboard.box33]
        let secondDiagonalArray = [gameboard.box13, gameboard.box22, gameboard.box31]

        function checkIfAllValuesAreUndefined(array) {
            if (array[0] === undefined && array[1] === undefined && array[2] === undefined) {return true}
            return false
        }

        function checkIfAllValuesAreEqual(array) {
            if (checkIfAllValuesAreUndefined(array)) {return false}
            if (array[0] === array[1] && array[1] === array[2]) {return true}
            return false;
        }

        

        let areSameValuesFirstDiagonal = checkIfAllValuesAreEqual(firstDiagonalArray)
        let areSameValuesSecondDiagonal = checkIfAllValuesAreEqual(secondDiagonalArray)

        if (areSameValuesFirstDiagonal || areSameValuesSecondDiagonal) {
            showMessage("diagonal")

            const boxContainers = document.querySelectorAll(".board > .markContainer")
            boxContainers.forEach(box => {
                let boxAttribute = box.getAttribute("data-boxPosition")
                if (areSameValuesFirstDiagonal){
                    if (boxAttribute !== "box11" && boxAttribute !== "box22" && boxAttribute !== "box33") {
                        box.classList.add("opacity")
                    }
                } else {
                    if (boxAttribute !== "box13" && boxAttribute !== "box22" && boxAttribute !== "box31") {
                        box.classList.add("opacity")
                    }
                }
            })
        }
    }


    function showMessage(jugada) {
        let message = document.getElementById("message");
        message.classList.remove("inactive")
        switch(jugada){
            case "empate": 
                message.textContent = "Empate!!"
                break;
            case "diagonal":
                message.textContent = "Has ganado con una diagonal"
                break;
            case "columna":
                message.textContent = "Has ganado con una columna"
                break;
            case "fila":
                message.textContent = "Has ganado con una fila"
                break;
        }
    }
    

    return {getGameboard, addMoves, resetGame};
})();


