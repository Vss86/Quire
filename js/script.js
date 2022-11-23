let notebook_list = [
    {
        "title": "Click here to edit the title",
        "content": "Click here and start typing to edit your first note or click the plus sign to create new note.",
    }
];

let selected = 0;

function onloaded() {
    console.log(JSON.parse(localStorage.getItem("notebook-list")));
    if(JSON.parse(localStorage.getItem("notebook-list")) != null)
        notebook_list = JSON.parse(localStorage.getItem("notebook-list"));
    
        console.log(notebook_list);
    
    openNote(0);
}

function loadNote() {
    document.getElementById("notebook-list").innerHTML = "";

    for (let i = 0; i < notebook_list.length; i++) {
        const notebook = notebook_list[i];
        document.getElementById("notebook-list").innerHTML += 
        `
        <li class="notebook-item" onclick="openNote(${i})">
            <h2>${notebook.title}</h2>
            <p>${notebook.content}</p>
        </li>
        `;
    }
    
    localStorage.setItem("notebook-list", JSON.stringify(notebook_list));

}

function openNote(i) {
    selected = i;
    
    document.getElementById("note-title").value = notebook_list[selected].title;

    document.getElementById("note-content").innerHTML = notebook_list[selected].content;
    loadNote();

}

function newNote() {
    notebook_list.push({"title": "New note", "content":"My new note"});
    selected = notebook_list.length-1;
    loadNote();
}

function changeTitle(event) {
    notebook_list[selected].title = event.value;
    loadNote();

}

function changeContent(event) {
    notebook_list[selected].content = event.innerText;
    loadNote();
}
