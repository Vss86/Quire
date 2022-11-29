let notebook_list = [
    {
        "title": "Click here to edit the title",
        "content": "Click here and start typing to edit your first note or click the plus sign to create new note.",
    }
];

let selected = 0;


function onloaded() {
    loadFontOptions();
    console.log(JSON.parse(localStorage.getItem("notebook-list")));
    if(JSON.parse(localStorage.getItem("notebook-list")) != null)
        notebook_list = JSON.parse(localStorage.getItem("notebook-list"));
    
    
    openNote(0);
}

function loadNote() {
    document.getElementById("notebook-list").innerHTML = "";

    for (let i = 0; i < notebook_list.length; i++) {
        
        const notebook = notebook_list[i];
        if(notebook.date_created == null)
            notebook.date_created = new Date();
        notebook.date_created = new Date(notebook.date_created);

        document.getElementById("notebook-list").innerHTML += `
        <li class="notebook-item" onclick="openNote(${i})">
        <em class="creationDate" id="noteDate">${(notebook.date_created.toLocaleDateString([], {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit"
          }))}</em>
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
    notebook_list.push(
        {
            "title": "New note",
             "content":"My new note",
              "date_created": new Date(),
        });
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

function formatText() {
    let replacementText = "";
    console.log(notebook_list[selected].content);

    let sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            replacementText = "<strong>" + sel.toString() + "</strong>";
            range.deleteContents();
            range.insertNode(document.createTextNode(replacementText));
            changeContent(document.getElementById("note-content"));

        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        range.text = replacementText;
    }
}

const fonts = ["Arial", "Arial Black", "Comic Sans MS", "Courier New", "Georgia", "Impact", "Lobster", "Lora", "Oswald", "Roboto", "Times New Roman", "Verdana"];

function changeFont() {
    const fontOptions = document.getElementById("docs-font");
    
    const noteContent = document.getElementById('note-content');
    noteContent.style.fontFamily = fonts[fontOptions.selectedIndex];
}

function loadFontOptions() {
    
    const fontOptions = document.getElementById("docs-font");
    for (let i = 0; i < fonts.length; i++) {
        fontOptions.innerHTML += `
        <option style="font-family: ${fonts[i]}">${fonts[i]}</option>
        `;
        
    }
}

function changeFontSize(event) {
    
    const noteContent = document.getElementById('note-content');

    noteContent.style.fontSize = event.value + "px";
}


function changeColor(event) {
    
    const noteContent = document.getElementById('note-content');

    noteContent.style.color = event.value;
}

function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}

