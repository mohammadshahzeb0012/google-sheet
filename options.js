const activeCellElement = document.querySelector(".selected-cell");
const form = document.getElementById("options-form")
const expressionInput = document.getElementById("expression");
let selectedCell = null; //initial no cell is selected

// * For every cell the data in the state object should get updated upon every form change & innerText change
const state = {};

function hii(fileData){
    for(let key in fileData){
        state[key] = fileData[key]
    }
}

const defaultState = {
    innerText: "",
    isBold: false,
    align: "left",
    isItalic: false,
    isUnderlined: false,
    fontSize: "16px",
    fontFamily: "Sans Serif",
    textColor: "#000000",
    bgColor: "#ffffff"
}

function applyCellInfoToForm() {
    // this function will sync the options inside form with the actual data of cell.
    if (state[selectedCell.id]) {
        //already edited cell
        // console.log("prev",state[selectedCell.id])
        const data = state[selectedCell.id]
        for (let key in data) {
            if (form[key].type === "checkbox") {
                form[key].checked = data[key]
            } else {
                form[key].value = data[key]
            }
        }
    } else {
        // focussed for the first time 
        //  console.log("firsttime ", defaultState)
        form.reset();
    }

}

function onFocus(e) {
    if (selectedCell) {
        selectedCell.classList.remove("active-cell") //if already any cell selected then remove active cell class
    }
    selectedCell = e.target; //selecting or targeting the cell
    activeCellElement.innerText = `${selectedCell.id}`
    selectedCell.classList.add("active-cell") //adding class name
    applyCellInfoToForm();
}
function onTextChange(e) {
    if (state[selectedCell.id]) {
        state[selectedCell.id].innerText = selectedCell.innerText
    }
    else {
        state[selectedCell.id] = { ...defaultState, innerText: selectedCell.innerText }
    }
}

function applyStylesToSelectedCell(styles) {
    //    takes styles from user and applying on selected cell 
    selectedCell.style.fontFamily = styles.fontFamily;
    selectedCell.style.fontSize = styles.fontSize + "px";
    selectedCell.style.fontWeight = styles.isBold ? "bold" : "normal";
    selectedCell.style.fontStyle = styles.isItalic ? "italic" : "normal";
    selectedCell.style.textDecoration = styles.isUnderlined ? "underline" : "normal";
    selectedCell.style.textAlign = styles.align;
    selectedCell.style.color = styles.textColor;
    selectedCell.style.background = styles.bgColor;
}

form.addEventListener("change", (e) => {
    //   if cell is not selected then show alert msg 
    if (!selectedCell) {
        alert("Please select a cell before making any change on the any options")
        form.reset()
        return;
    }

    // collecting inputa data  by user
    const formData = {
        fontFamily: form.fontFamily.value,
        fontSize: form.fontSize.value,
        isBold: form.isBold.checked,
        isItalic: form.isItalic.checked,
        isUnderlined: form.isUnderlined.checked,
        align: form.align.value,
        textColor: form.textColor.value,
        bgColor: form.bgColor.value
    }
    console.log(formData)
    state[selectedCell.id] = { ...formData, innerText: selectedCell.innerText }
    applyStylesToSelectedCell(formData)
})

expressionInput.addEventListener("keyup", (e) => {
    if (!selectedCell) {
        alert("please select a cell to apply expression evalution")
    }
    if (e.key === "Enter") {
        try {
            let expression = expressionInput.value;
            let result = eval(expression)
            selectedCell.innerText = `${result}`
        }
        catch (error) {
            alert("plase enter valid expression")
        }
    }

})