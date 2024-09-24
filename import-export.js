// const downlowdBtn = document.getElementById("downlowd")
// const upload = document.getElementById("upload")

let user = {
    name: "mohammad shahzeb",
    age: "20",
    occupation: "software enginer",
    id: 107,
}

// downlowdBtn.addEventListener("click",()=>{
//     const data = JSON.stringify(user)
//     let blob = new Blob([data], {type: "text/plain"})
//     let url = URL.createObjectURL(blob)
//     const link = document.createElement("a");
//     let userInput  = prompt("file name")
//     link.download =  userInput
//     link.href = url;
//     // link.innerText = "downlowd now"

//     document.body.append(link)
//     // console.log(url)
//     link.click()
// })
// // console.log(JSON.stringify(user))
// // 
// upload.addEventListener("change",()=>{
//     let file = upload.files[0]
//     if(file.type === "text/plain"){
//         // console.log("ok")
//         let fileReader = new FileReader();
//         fileReader.onload = function (event){
//             let n2 = JSON.stringify(event.target.result)
//             console.log(n2)
//         }
//         fileReader.readAsText(file)
//     }
//     else{
//         console.log("no")
//     }
//     // console.log(upload.files)
// })

const download = document.getElementById("download");
const upload = document.getElementById("upload");

download.addEventListener("click",(e)=>{
    const blob = new Blob([JSON.stringify(state)], { type: "application/json" });
    let url = URL.createObjectURL(blob)
    let link = document.createElement("a");
    link.href = url;
    link.download = "spreadsheet";
    link.click();
})

// upload.addEventListener("change",(e)=>{
//     let file = e.target.files[0];
//     if (file.type !== "application/json") {
//         alert("Please upload json files only");
//         return;
//     }

//     let fileReader = new FileReader();

//     fileReader.onload = function (e) {
//         let fileData = JSON.parse(e.target.result);

//         // TODO: fill all the cells of the sheet with the `fileData`
//     }

//     fileReader.readAsText(file);
// })

upload.addEventListener("change",(e)=>{
    let file = e.target.files[0];
    if (file.type !== "application/json") {
        alert("Please upload json files only");
        return;
    }

    let fileReader = new FileReader();

    fileReader.onload = function (e) {
        let fileData = JSON.parse(e.target.result);
        // console.log(fileData);
        // TODO: fill all the cells of the sheet with the `fileData`
        hii(fileData)
        importData(fileData)
    }

    fileReader.readAsText(file);
})


function importData(fileData) {
    for (let cellId in fileData) {
        const cell = document.getElementById(cellId);
        if (cell) {
            const cellInfo = fileData[cellId];
            cell.innerText = cellInfo.innerText || "";
            applyStylesToSelectedCell(cellInfo); // Apply styles to the cell
            state[cellId] = cellInfo; // Update state with imported cell data
        }
    }
}
