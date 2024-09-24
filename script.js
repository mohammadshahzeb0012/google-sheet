const headRow = document.getElementById("head-row")
const rows = 100, columns = 26;
const sno = document.getElementById("sno");
const body = document.getElementById("body");

//Creating Head Cells
for(let i = 1; i <= columns; i++)
 {
   const headCell = document.createElement("div");
   if(i >= 1)
   {
       headCell.innerText = String.fromCharCode(i+64);
       headCell.className = "col-head";
    }
    headRow.appendChild(headCell)
 }

 //Creating SNO Cells
 for(let i = 0; i < rows; i++)
 {
    const snoCell = document.createElement("div");
    snoCell.innerText = i+1;
    snoCell.className = "sno-cell"
    sno.appendChild(snoCell)
 }

//  Creating Body Cells 
 for(let i=1; i<=rows; i++)
  {
    const row = document.createElement("div");
    row.className = "row";

    for(let j = 1; j <= columns; j++)
     {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.id = `${String.fromCharCode(j+64)}${i}` // adding id in  cell
        cell.contentEditable = true;     
        cell.addEventListener("focus",onFocus) // adding focus event on individual cell
        cell.addEventListener("input",onTextChange) // 
        row.appendChild(cell)
     }
     body.appendChild(row)
  }
