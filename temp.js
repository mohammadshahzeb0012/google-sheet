const headRow = document.getElementById("head-row")
const sno = document.getElementById("sno")
const body = document.querySelector(".body");

const cellCount = 26, rowCount = 100;
// creating head cells 
for(let i=1; i<=26; i++){
    const headCell = document.createElement("div");
    headCell.className = "col-head";
    headCell.innerText = `${String.fromCharCode(64+i)}`
    headRow.appendChild(headCell)
}

// creating sno 
for(let i=1; i<=rowCount; i++)
{
    const snoCell = document.createElement("div");
    snoCell.className = "sno-cell";
    snoCell.innerText = i;
    sno.append(snoCell)
}
 //creating body cell
 for(let i=1; i<=rowCount; i++){
    const cellRow = document.createElement("div");
    cellRow.className = "row"
    for(let j=1; j<=cellCount; j++)
    {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.contentEditable = true;
        cell.id = `${String.fromCharCode(64+j)}${i}`
        cell.addEventListener("focus",onFocus)
        cellRow.appendChild(cell);
    }
    body.appendChild(cellRow)
 }