const game = (() => {

    let gameboard = []

    const addMoves = (boxNumber, mark) => {
        gameboard[boxNumber] = mark;
    }
    
    // const player = (name, mark) => {
    //     return {name, mark}
    // }

    // const user = player("User", "X")
    // const computer = player("Computer", "O")

    const displayControler = (() => {
        const markContainerAll = document.querySelectorAll(".markContainer")
        markContainerAll.forEach(box => {
            box.addEventListener("click", () => {
                // Delete p element
                let boxParagraph = box.querySelector("p")
                if(boxParagraph) {boxParagraph.remove()}

                let boxAttribute = box.getAttribute("data-boxPosition")
                let gameboardLength = Object.keys(gameboard).length

                if (gameboard[boxAttribute] !== undefined){return}
                
                // i === número máximo de jugadas. Son 9 turnos porque hay 9 casillas.
                for (let i = gameboardLength; i < 9; i++){
                    if (i === 8) {return showMessage("empate")}

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
                showMessage("fila")

                const boxContainers = document.querySelectorAll(".board > .markContainer")
                boxContainers.forEach(box => {
                    let boxAttribute = box.getAttribute("data-boxPosition")
                    if (boxAttribute !== firstIndex && boxAttribute !== secondIndex && boxAttribute !== thirdIndex) {
                        box.classList.add("opacity")
                    }
                })

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
        // Check si son undefined las diagonales --> return

        let hasSameValueFirstDiagonal = gameboard.box11 === gameboard.box22 && gameboard.box22 === gameboard.box33
        let areUndefinedFirstDiagonal = gameboard.box11 === undefined && gameboard.box22 === undefined && gameboard.box33 === undefined
        
        let hasSameValueSecondDiagonal = gameboard.box13 === gameboard.box22 && gameboard.box22 === gameboard.box31
        let areUndefinedSecondDiagonal = gameboard.box13 === undefined && gameboard.box22 === undefined && gameboard.box31 === undefined


        if (hasSameValueFirstDiagonal && !areUndefinedFirstDiagonal || hasSameValueSecondDiagonal && !areUndefinedSecondDiagonal){
            showMessage("diagonal")

            // const boxContainers = document.querySelectorAll(".board > .markContainer")
            // boxContainers.forEach(box => {
            //     let boxAttribute = box.getAttribute("data-boxPosition")
            //     if (boxAttribute !== gameboard.box11 && boxAttribute !== gameboard.box22 && boxAttribute !== gameboard.box33 || boxAttribute !== gameboard.box13 && boxAttribute !== gameboard.box22 && boxAttribute !== gameboard.box32 ) {
            //         box.classList.add("opacity")
            //     }
            // })
        }
    }

    function resetGame() {
        gameboard = []
        renderContent();
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
    

    return {gameboard, addMoves};
})();


