export let cols;
export let rows;
export function createGrid(parent){
    parent.innerHTML = ""

    let size = 50
    cols = Math.floor(parent.offsetWidth / size);
    rows = Math.floor(parent.offsetHeight / size);

    parent.setAttribute("data-totalRows",rows);
    parent.setAttribute("data-totalCols",cols);

    parent.style.setProperty("--cols",cols)
    parent.style.setProperty("--rows",rows)

    createTiles(cols*rows,parent)
};

function createTileDiv(index) {
    // create element tile
    const tile = document.createElement("div")

    // create a class {tile} for tile element & append
    tile.classList.add("tile",index)
    tile.setAttribute("data-tileindex",index)

    return tile
}

function createTiles(amount,parent) {
    Array.from(Array(amount)).map((tile,index)=>{
        parent.appendChild(createTileDiv(index))
    })
}