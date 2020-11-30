var globalData = [];
var displayType = "grid";


function modify(clicked_id) {
    let txt = document.getElementById(`modify${clicked_id}`);
    if (txt.innerHTML == "Edit" && displayType == "grid") {
        document.getElementById(`skill${clicked_id}`).readOnly = false;
        txt.innerHTML = `Save`;
    }
    else if (txt.innerHTML == "Save" && displayType == "grid") {
        document.getElementById(`skill${clicked_id}`).readOnly = true;
        globalData[clicked_id - 1].skills = document.getElementById(`skill${clicked_id}`).value.split(",");
        txt.innerHTML = `Edit`;
    }
    else if (txt.getElementsByClassName("custom-img1")[0].getAttribute("alt") == "edit" && displayType == "list") {
        document.getElementById(`skill${clicked_id}`).readOnly = false;
        txt.getElementsByClassName("custom-img1")[0].setAttribute("src", "save.png");
        txt.getElementsByClassName("custom-img1")[0].setAttribute("alt", "save");
    }
    else {
        document.getElementById(`skill${clicked_id}`).readOnly = true;
        globalData[clicked_id - 1].skills = document.getElementById(`skill${clicked_id}`).value.split(",");
        txt.getElementsByClassName("custom-img1")[0].setAttribute("src", "edit.png");
        txt.getElementsByClassName("custom-img1")[0].setAttribute("alt", "edit");
    }
}



function populateGrid() {
    var element = document.getElementById("main-container");
    element.classList.remove("list-container");
    element.classList.add("card-container");
    var grid = document.getElementsByClassName("card-container");
    let idIterator = 1;
    grid[0].innerHTML = globalData.map(item => (
        `<div class="card">
    <div class="top-row">
    <img src="${item.gender === "male" ? "male.png" : "female.png"}">
    <button class="custom-del" id="${idIterator}" onclick="deleteRecord(${idIterator})">
    <img class="custom-img" src="del.png" alt="del">
    </button>
    </div>
    <div class="text-card">
    <p class="cell"><span class="title">Name : </span>${item.name}</p>
    <p class="cell"><span class="title">Id : </span>${item.id}</p>
    <p class="cell"><span class="title">Skills : </span><input class="input-skills" type="text" id="skill${idIterator}" value="${item.skills.join(",")}" readonly></p>
    <p class="cell"><span class="title">Project : </span>${item.project}</p>
    <p class="cell"><span class="title">HCM : </span>${item.hcm}</p>
    </div>
    <div class="button-container">
        <button id="modify${idIterator}" onclick="modify(${idIterator++})">Edit</button>
    </div>
    </div>`
    )).join(``);
}

function populateList() {
    var element = document.getElementById("main-container");
    element.classList.remove("card-container");
    element.classList.add("list-container");
    var list = document.getElementsByClassName("list-container");
    let idIterator = 1;
    list[0].innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>ID</td>
                            <td>Skills</td>
                            <td>Project</td>
                            <td>HCM</td>
                            <td> </td>
                        </tr>
                     </thead>
                     <tbody id="tbody">
                     </tbody>
                 </table>`;
    document.getElementById("tbody").innerHTML += globalData.map(item => (
        `<tr>
                    <td>${item.name}</td>
                    <td>${item.id}</td>
                    <td><input class="input-skills" type="text" id="skill${idIterator}" value="${item.skills.join(",")}" readonly></td>
                    <td>${item.project}</td>
                    <td>${item.hcm}</td>
                    <td style="display:flex;"><button class="custom-del" id="modify${idIterator}" onclick="modify(${idIterator})">
                    <img class="custom-img1" src="edit.png" alt="edit">
                    </button>
                    <button class="custom-del" id="${idIterator}" onclick="deleteRecord(${idIterator++})">
    <img class="custom-img" src="del.png" alt="del">
    </button>
                    </td>
                </tr>`
    )).join(``);
}

function deleteRecord(clicked_id) {
    globalData.splice(clicked_id - 1, 1);
    if (displayType === "grid") populateGrid();
    else populateList();
}

function toggle() {
    var list_icon = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-list" fill="#fff" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
  </svg>`;
    var grid_icon = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-grid-fill" fill="#fff"
  xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd"
      d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
</svg>`;
    var element = document.getElementById("toggle");
    if (displayType === "grid") {
        populateList();
        element.innerHTML = list_icon;
        displayType = "list";
    }
    else {
        populateGrid();
        element.innerHTML = grid_icon;
        displayType = "grid";
    }
}

fetch('https://jsonblob.com/api/1b95ce7d-f723-11ea-b21d-6fe801bd8868').then(response => response.json()).then(data => {
    globalData = data;
    populateGrid();
});
