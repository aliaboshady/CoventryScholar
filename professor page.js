prev_page_input = sessionStorage.getItem('input');

search_results = null;

section_per_page = 10
page_index = 0
start_page = true
end_page = false

if(prev_page_input != ""){
    search_results = SearchForProfessor(prev_page_input);
}
else{
    prev_page_input = "All Professors"
    search_results = Object.keys(all_professors)
}

input = document.getElementById("input");
prof_section = document.getElementById("prof_sec");

document.getElementById("results").innerHTML = `
    <p><b>Professors</b></p> - Results for: <i>${prev_page_input}</i> <br><br>
    ${search_results.length > 0 ? search_results.length + " results - " + section_per_page + " per page" : "No results found"} 
`;

function PrintProfessorsOnScreen(){
    prof_section.innerHTML = ""

    for (let i = page_index * section_per_page; i < section_per_page * (page_index + 1); i++) {
        prof_section.innerHTML += `
        <div style="float:left;"><img src="${all_professors[search_results[i]]["small_image"]}" class="circle_img"></div>
		
		<div style="margin-left:15px; display:inline-block;">
        <button class="title">${search_results[i]}</button> <br>
			${all_professors[search_results[i]]["description"]} <br>
			<div class="fields">
            ${all_professors[search_results[i]]["fields"] ? "<b>Fields: </b>" + all_professors[search_results[i]]["fields"] + "<br>" : ""}
            <b>Papers: </b> ${all_professors[search_results[i]]["papers"].length} <br>
            ${all_professors[search_results[i]]["citation"] ? "<b>Citation: </b>" + all_professors[search_results[i]]["citation"] + "<br>" : ""}
		</div>
		</div><br><br>
        `
        if(search_results[i] == search_results[search_results.length - 1]){
            break;
        }
    }

    document.getElementById("page_num").innerHTML = `
        Page ${page_index + 1} of ${Math.floor(search_results.length / section_per_page) + 1}
    `
}

if(search_results.length > 0){
    PrintProfessorsOnScreen()
    HighlightSearchedWords()
}
else{
    document.getElementById("load").innerHTML = ""
}


if(search_results.length > section_per_page){
    document.getElementById("next-but").style.opacity = 1;
    document.getElementById("next-but").style.pointerEvents = "all";
}

function GoToNextPage(){
    
    if((Math.floor(search_results.length / section_per_page)) > page_index){
        page_index++
        start_page = false
        PrintProfessorsOnScreen()
        HighlightSearchedWords()
        
        document.getElementById("back-but").style.opacity = 1;
        document.getElementById("back-but").style.pointerEvents = "all";

        if((Math.floor(search_results.length / section_per_page)) == page_index){
            end_page = true
            document.getElementById("next-but").style.opacity = 0.5;
            document.getElementById("next-but").style.pointerEvents = "none";
        }
        window.scrollTo(0, 0);
    }
}

function GoToPrevPage(){
    if(page_index > 0){
        page_index--
        end_page = false
        PrintProfessorsOnScreen()
        HighlightSearchedWords()

        document.getElementById("next-but").style.opacity = 1;
        document.getElementById("next-but").style.pointerEvents = "all";

        if(page_index == 0){
            start_page = true;
            document.getElementById("back-but").style.opacity = 0.5;
            document.getElementById("back-but").style.pointerEvents = "none";
        }
        window.scrollTo(0, 0);
    }
}

function HighlightSearchedWords(){
    prev_page_input.split('').forEach(letter => {
        if(chars.includes(letter)){
            prev_page_input = prev_page_input.replace(letter, " ");
        }
    });

    prev_page_input = prev_page_input.toLowerCase()

    prof_titles = document.getElementsByClassName("title");
    for (let i = 0; i < prof_titles.length; i++) {
        title_split = prof_titles[i].innerHTML.split(" ")
        
        for (let j = 0; j < title_split.length; j++) {
            if(prev_page_input.split(" ").includes(title_split[j].toLowerCase())){
                title_split[j] = '<b class="bold_title">' + title_split[j] + "</b>"
            }
        }
        title_split = prof_titles[i].innerHTML = title_split.join(" ")
    }
}

function SearchProfessor(){
    sessionStorage.setItem("input", input.value);
    window.location.href = "professors page.html";
}

function SearchPaper(){
    sessionStorage.setItem("input", input.value);
    window.location.href = "papers page.html";
}

function OpenProfile(profile){
    sessionStorage.setItem("profile", profile);
    window.location.href = "profile page.html";
}

clicked_profile = "";

window.onclick = e =>{
    if(e.target.className == "title"){
        clicked_profile = e.target.innerHTML.replaceAll('<b class="bold_title">', "").replaceAll("</b>", "")
        OpenProfile(clicked_profile)
    }
    else if (e.target.className == "bold_title"){
        clicked_profile = e.target.parentElement.innerHTML.replaceAll('<b class="bold_title">', "").replaceAll("</b>", "")
        OpenProfile(clicked_profile)
    }
}