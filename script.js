window.addEventListener("load", () => {
        getBoard();
        valasztoSetup();
});

var indexek = {
        0: 0,
        1: 0,
        2: 0,
        3: 1,
        4: 1,
        5: 1,
        6: 2,
        7: 2,
        8: 2
}

var szinek = {
        "0|0": "orange",
        "0|1": "brown",
        "0|2": "green",
        "1|0": "aqua",
        "1|1": "pink",
        "1|2": "gold",
        "2|0": "darkred",
        "2|1": "lightgrey",
        "2|2": "purple"
}

var kezdoTabla = [];
var megoldottTabla = [];
var valtoSzam;

async function getBoard(){
        await fetch("https://sudoku-api.vercel.app/api/dosuku")
        .then(function(datas) {
                return datas.json();
        })
        .then(function(datas) {
                for(var i = 0; i < 9; i++){
                        var sor = [];
                        var msor = [];
                        for(var j = 0; j < 9; j++){
                                var ertek = datas.newboard.grids[0].value[i][j];
                                var mertek = datas.newboard.grids[0].solution[i][j];
                                sor.push(ertek);
                                msor.push(mertek);
                                var szin = szinek[indexek[i] + "|" +  indexek[j]];
                                var ujTile = `<div class="tile${ertek == 0 ? " ures" : ""}" id="${i}${j}" style="background-color: ${szin}">${ertek == 0 ? "" : ertek}</div>`;
                                document.getElementById("tabla").innerHTML += ujTile;
                        }
                        kezdoTabla.push(sor);
                        megoldottTabla.push(msor);
                }
                var tileok = document.querySelectorAll(".tile");
                tileok.forEach(element => {
                        element.addEventListener("click", tileClick);
                });
        })
}

function valasztoSetup(){
        var k = 1;
        for(var i = 0; i < 3; i++){
                for(var j = 0; j < 3; j++){
                        document.getElementById("valaszto").innerHTML += `<div class="valasztoTile" id="${k}">${k}</div>`;
                        k++;
                }
        }
        var vTileok = document.querySelectorAll(".valasztoTile");
        vTileok.forEach(element => {
                element.addEventListener("click", valasztoClick);
        });
}

function valasztoClick(e){
        valtoSzam = e.target.id;
}

function tileClick(e){
        var tile = e.target;
        if(valtoSzam == null){
                return;
        }
        if(tile.classList.contains("ures")){
                if(parseInt(tile.innerText) == valtoSzam){
                        kezdoTabla[tile.id[0]][tile.id[1]] = 0;
                        tile.innerText = "";
                }else{
                        kezdoTabla[tile.id[0]][tile.id[1]] = valtoSzam;
                        tile.innerText = valtoSzam;
                }
        }
        
        if(winCheck()){
                alert("Sikeresen megoldottad!");
        }
}

function winCheck(){
        for(var i = 0; i < 9; i++){
                for(var j = 0; j < 9; j++){
                        if(kezdoTabla[i][j] != megoldottTabla[i][j]){
                                return false;
                        }
                }
        }
        return true;
}