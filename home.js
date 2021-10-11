window.onload = loadElements;
var input;

function loadElements(){
    input = document.getElementById("input");
}

function SearchProfessor(){
    //alert("Professor " + input.value);
    sessionStorage.setItem("input", input.value);
    window.location.href = "professors page.html";
}

function SearchPaper(){
    sessionStorage.setItem("input", input.value);
    window.location.href = "papers page.html";
}