window.onload = loadElements;
var modal;

function loadElements(){
    modal = document.getElementById("hidden_modal");
}


function OpenPopup(){
    modal.style.display = "block";
}

function ClosePopup(){
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}