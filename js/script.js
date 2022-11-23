let notebook_list = [
    {
        "title": "test",
        "content": "Lorem ipsum",
    },
    {
        "title": "test",
        "content": "Lorem ipsum",
    },
];

let selected = 0;

function onloaded() {
    console.log(JSON.parse(localStorage.getItem("notebook-list")));
    if(JSON.parse(localStorage.getItem("notebook-list")) != null)
        notebook_list = JSON.parse(localStorage.getItem("notebook-list"));
    
        console.log(notebook_list);
    loadNote();
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

    document.getElementById("note-title").value = notebook_list[selected].title;
    document.getElementById("note-content").value = notebook_list[selected].content;

}

function openNote(i) {
    selected = i;
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
    notebook_list[selected].content= event.value;
    loadNote();
}