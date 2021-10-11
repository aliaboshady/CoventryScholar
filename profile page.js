profile_name = sessionStorage.getItem('profile');
input = document.getElementById("input");
profile_div = document.getElementById("profile_division");
paper_section = document.getElementById("paper_sec");
modal = document.getElementById("hidden_modal");

section_per_page = 10
page_index = 0
start_page = true
end_page = false

professor_papers = all_professors[profile_name]["papers"]

profile_div.innerHTML = `
    <img src="${all_professors[profile_name]["big_image"]}" class="profile_image">
    <div class="profile_info">
        <div class="profile_info_title">${profile_name}</div> <br>
        ${all_professors[profile_name]["description"]} <br>
        <div class="fields">
            ${all_professors[profile_name]["fields"].length > 0 ? "<b>Fields: </b>" + all_professors[profile_name]["fields"] + "<br>" : ""} 
            <b>Papers: </b> ${all_professors[profile_name]["papers"].length} <br>
            ${all_professors[profile_name]["citation"] ? "<b>Citations: </b>" + all_professors[profile_name]["citation"] + "<br>" : ""}
        </div>
        <a class='googlelink' href="${all_professors[profile_name]['link']}">Profile on Google Scholar</a>
    </div>
`;


function PrintPapersOnScreen(){
    paper_section.innerHTML = ""

    for (let i = page_index * section_per_page; i < section_per_page * (page_index + 1); i++) {
        paper_section.innerHTML += `
            <div style="margin-left:15px; display:inline-block;">
            <button onclick="OpenProfilePopup()" class="paper_button">${all_professors[profile_name]["papers"][i]}</button> <br>
                ${all_papers[all_professors[profile_name]["papers"][i]]["authors"].length > 1 ? "<b>Co-authors:</b> " + all_papers[all_professors[profile_name]["papers"][i]]["authors"] + "<br>" : ""} 
                ${all_papers[all_professors[profile_name]["papers"][i]]["date"] ? "<b>Date:</b> " + all_papers[all_professors[profile_name]["papers"][i]]["date"] + "<br>" : ""} 
                ${all_papers[all_professors[profile_name]["papers"][i]]["citation"] ? "<b>Cited by:</b> " + all_papers[all_professors[profile_name]["papers"][i]]["citation"] + "<br>" : ""} 
                ${all_papers[all_professors[profile_name]["papers"][i]]["journal"] ? "<b>Journal:</b> " + all_papers[all_professors[profile_name]["papers"][i]]["journal"] + "<br>" : ""} 
            </div> <br><br>
        `
        if(professor_papers[i] == professor_papers[professor_papers.length - 1]){
            break;
        }
    }

    document.getElementById("page_num").innerHTML = `
        Page ${page_index + 1} of ${Math.floor(professor_papers.length / section_per_page) + 1}
    `
}

PrintPapersOnScreen()

if(professor_papers.length > section_per_page){
    document.getElementById("next-but").style.opacity = 1;
    document.getElementById("next-but").style.pointerEvents = "all";
}

function GoToNextPage(){
    
    if((Math.floor(professor_papers.length / section_per_page)) > page_index){
        page_index++
        start_page = false
        PrintPapersOnScreen()
        
        document.getElementById("back-but").style.opacity = 1;
        document.getElementById("back-but").style.pointerEvents = "all";

        if((Math.floor(professor_papers.length / section_per_page)) == page_index){
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

function OpenProfilePopup(){
    modal.style.display = "block";
}

function CloseProfilePopup(){
    modal.style.display = "none";
}


window.onclick = e =>{
    
    if(e.target.className == "paper_button"){

        paper_title = e.target.innerHTML.replace('<b>','').replace('</b>','')

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
    else if(e.target.className == "modal"){
        CloseProfilePopup()
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