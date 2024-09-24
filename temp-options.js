const form = document.getElementById("options-form");
const expressionInput = document.getElementById("expression")
const activeCellElement = document.querySelector(".selected-cell");
let selectedCell = null;

const state = {};

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



function  applyCellInfoToForm(){
      if(state[selectedCell.id])
      {
        const data =state[selectedCell.id]
        for(let key in data)
        {
            if(form[key].type == "checkbox")
            {
                form[key].checked = data[key]
            }
            form[key].value = data[key]
        }
        console.log(data)
      }
      else{
        form.reset();
      }
}

function onFocus(e) {
    if(selectedCell)
    {
        selectedCell.classList.remove("active-cell")
    }
        selectedCell = e.target;
        activeCellElement.innerText = `${selectedCell.id}`
        selectedCell.classList.add("active-cell")
        applyCellInfoToForm();
    
}

function applyStylesOnSelectedCell(styles) {
    selectedCell.style.fontFamily = styles.fontFamily;
    selectedCell.style.fontSize = styles.fontSize + "px";
    selectedCell.style.fontWeight = styles.isBold ? "bold" : "normal";
    selectedCell.style.fontStyle = styles.isItalic ? "italic" : "normal";
    selectedCell.style.textDecoration = styles.isUnderlined ? "underline" : "normal"
    selectedCell.style.textAlign = styles.align;
    selectedCell.style.color = styles.textColor;
    selectedCell.style.background = styles.bgColor;
}

expressionInput.addEventListener("keyup",(e)=>{
 if(!selectedCell){
    alert("please select a cell before any evaluation")
 }else{
   
    if(e.key === "Enter"){
        try{
            let expression = expressionInput.value;
            let result = eval(`${expression}`);
            selectedCell.innerText = `${result}`;
        }
        catch(error){
            alert("please enter valid input")
        }
    }

 }
})

form.addEventListener("change", (e) => {
    console.log(":iin")
    const formData = {
        fontFamily: form.fontFamily.value,
        fontSize: form.fontSize.value,
        isBold: form.isBold.checked,
        isItalic: form.isItalic.checked,
        isUnderlined: form.isUnderlined.checked,
        align: form.align.value,
        textColor: form.textColor.value,
        bgColor: form.bgColor.value,
    }
    state[selectedCell.id] = {...formData}
    applyStylesOnSelectedCell(formData)
})