prev_page_input = sessionStorage.getItem('input');
modal = document.getElementById("hidden_modal");
search_results = null;

section_per_page = 10
page_index = 0
start_page = true
end_page = false

text_classification = ClassifySentence(prev_page_input)

if(prev_page_input != ""){
    search_results = SearchForPaper(prev_page_input);
}
else{
    prev_page_input = "All Papers"
    search_results = Object.keys(all_papers)
}

input = document.getElementById("input");
paper_section = document.getElementById("paper_sec");

document.getElementById("results").innerHTML = `
    <p><b>Papers</b></p> - Results for: <i>${prev_page_input}</i> <br><br>
    <div><b>Text Classification:</b> ${text_classification} </div><br>
    ${search_results.length > 0 ? search_results.length + " results - " + section_per_page + " per page" : "No results found"}
`;

//FOR PAGES
function PrintPapersOnScreen(){
    paper_section.innerHTML = ""

    for (let i = page_index * section_per_page; i < section_per_page * (page_index + 1); i++) {
        paper_section.innerHTML += `
            <div style="margin-left:15px; display:inline-block;">
            <button onclick="OpenPopup()" class="paper_button">${search_results[i]}</button> <br>
                ${all_papers[search_results[i]]["professor_name"] ? "<b>Author:</b> <button class='title'>" + all_papers[search_results[i]]["professor_name"] + "</button><br>" : ""} 
                ${all_papers[search_results[i]]["authors"].length > 1 ? "<b>Co-authors:</b> " + all_papers[search_results[i]]["authors"] + "<br>" : ""} 
                ${all_papers[search_results[i]]["date"] ? "<b>Date:</b> " + all_papers[search_results[i]]["date"] + "<br>" : ""} 
                ${all_papers[search_results[i]]["citation"] ? "<b>Cited by:</b> " + all_papers[search_results[i]]["citation"] + "<br>" : ""} 
                ${all_papers[search_results[i]]["journal"] ? "<b>Journal:</b> " + all_papers[search_results[i]]["journal"] + "<br>" : ""} 
            </div> <br><br><br>
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
    PrintPapersOnScreen()
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
        PrintPapersOnScreen()
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
        PrintPapersOnScreen()
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
    prev_page_input = PreProcessSearchSentence(prev_page_input).join(" ")
    papers_titles = document.getElementsByClassName("paper_button");
    for (let i = 0; i < papers_titles.length; i++) {
        title_split = papers_titles[i].innerHTML.split(" ")
        
        for (let j = 0; j < title_split.length; j++) {
            if(prev_page_input.split(" ").includes(title_split[j].toLowerCase())){
                title_split[j] = "<b class='bold_title'>" + title_split[j] + "</b>"
            }
        }
        title_split = papers_titles[i].innerHTML = title_split.join(" ")
    }
}



clicked_profile = "";

window.onclick = e =>{
    paper_title = ""

    if(e.target.className == "title"){
        clicked_profile = e.target.innerHTML.replaceAll('<b class="bold_title">', "").replaceAll("</b>", "")
        OpenProfile(clicked_profile)
    }

    else if(e.target.className == "modal"){
        CloseProfilePopup()
    }
    
    else if(e.target.className == "paper_button"){
        paper_title = e.target.innerHTML.replaceAll('<b class="bold_title">','').replaceAll('</b>','')
    }
    else if (e.target.className == "bold_title"){
        paper_title = e.target.parentElement.innerHTML.replaceAll('<b class="bold_title">', "").replaceAll("</b>", "")
    }

    if(e.target.className == "paper_button" || e.target.className == "bold_title"){
        papertitle = document.getElementById("papertitle");
        papertitle.innerHTML = paper_title

        authors = document.getElementById("authors");
        authors.innerHTML = `<b>Authors:</b> ${all_papers[paper_title]["professor_name"]} <br><br>`

        authors = document.getElementById("co_authors");
        authors.innerHTML = `<b>Co-authors:</b> ${all_papers[paper_title]["authors"]} <br><br>`
        
        date = document.getElementById("date");
        date.innerHTML = `<b>Date:</b> ${all_papers[paper_title]["date"]} <br><br>`

        citations = document.getElementById("citations");
        citations.innerHTML = `<b>Citations:</b> ${all_papers[paper_title]["citation"]} <br><br>`

        volume = document.getElementById("volume");
        volume.innerHTML = `<b>Volume:</b> ${all_papers[paper_title]["volume"]} <br><br>`

        issue = document.getElementById("issue");
        issue.innerHTML = `<b>Issue:</b> ${all_papers[paper_title]["issue"]} <br><br>`

        pages = document.getElementById("pages");
        pages.innerHTML = `<b>Pages:</b> ${all_papers[paper_title]["pages"]} <br><br>`

        journal = document.getElementById("journal");
        journal.innerHTML = `<b>Journal:</b> ${all_papers[paper_title]["journal"]} <br><br>`

        publisher = document.getElementById("publisher");
        publisher.innerHTML = `<b>Publisher:</b> ${all_papers[paper_title]["publisher"]} <br><br>`

        description = document.getElementById("description");
        description.innerHTML = `<b>Description:</b> ${all_papers[paper_title]["description"]}`
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

function CloseProfilePopup(){
    modal.style.display = "none";
}