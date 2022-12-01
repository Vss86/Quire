/*
When HTML is load
*/


//Array of all the notes
let notebook_list = [
    {
        "id": uuidv4(),
        "title": "Click here to edit the title",
        "content": "Click here and start typing to edit your first note or click the plus sign to create new note.",
    }
];

let quill;

//Index of the current note
let selected = 0;


// This variable is the last focused element (title or content)
let focusedElement = null;


//The function loads after HTML is loaded
function onloaded() {
    
    loadFontOptions();

    if(localStorage.getItem("selected") != null) //Check if localstorage is empty
        selected = localStorage.getItem("selected");

    if(JSON.parse(localStorage.getItem("notebook-list")) != null) //Check if localstorage is empty
        notebook_list = JSON.parse(localStorage.getItem("notebook-list"));
    
      quill = new Quill('#note-content', {
    theme: 'snow'
  });
  quill.on('text-change', function(delta, oldDelta, source) {
    changeContent();
  });
    openNote(selected);
}

/*LoadNote function does two things:
- renders the list of all the notes
*/
function loadNote() {
    document.getElementById("notebook-list").innerHTML = "";

    
    for (let i = 0; i < notebook_list.length; i++) {
        
        const notebook = notebook_list[i];

        if(notebook.id == null)
            notebook.id == uuidv4();

        if(notebook.date_created == null) //Check if there is a date for the note
            notebook.date_created = new Date(); //If not set the date to current date

        notebook.date_created = new Date(notebook.date_created); //Converts date from JSON to the Date format

        //HTML for notes in the sidebar
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

/*
This functions opens the note
*/
function openNote(i) {
    selected = i;
    localStorage.setItem("selected", selected);

      
    document.getElementById("note-title").value = notebook_list[selected].title;
    
    console.log(notebook_list[selected].content);
    quill.setContents(notebook_list[selected].content);
    loadNote();

}

//This function creates a new empty note
function newNote() {
    notebook_list.push(
        {
            "id": uuidv4(),
            "title": "New note",
             "content":"My new note",
              "date_created": new Date(),
        });
    selected = notebook_list.length-1;
    loadNote();
}

//Generate UUID
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

//This functions set the title to element
function changeTitle(element) {
    notebook_list[selected].title = element.value;
    loadNote();

}


//This functions set the content to element
function changeContent() {
    console.log(quill.getContents());
    notebook_list[selected].content = quill.getContents();
    loadNote();
}

function formatText() {

}

//Array of all the fonts
const fonts = ["Arial", "Arial Black", "Comic Sans MS", "Courier New", "Georgia", "Impact", "Lobster", "Lora", "Oswald", "Roboto", "Times New Roman", "Verdana"];

function changeFont() {
    const fontOptions = document.getElementById("docs-font");

    if(focusedElement != null)
        focusedElement.style.fontFamily = fonts[fontOptions.selectedIndex];
    else {
        document.getElementById('note-content').style.fontFamily = fonts[fontOptions.selectedIndex];
    }
}

function loadFontOptions() {
    
    const fontOptions = document.getElementById("docs-font");
    for (let i = 0; i < fonts.length; i++) {
        fontOptions.innerHTML += `
        <option style="font-family: ${fonts[i]}">${fonts[i]}</option>
        `;
        
    }
}

function setFocusedElement(e) {
    focusedElement = e;
}

function changeFontSize(event) {
    if(focusedElement != null)
    focusedElement.style.fontSize = event.value + "px";
else {
    document.getElementById('note-content').style.fontSize = event.value + "px";
}    
}

function changeColor(event) {
    if(focusedElement != null)
        focusedElement.style.color = event.value;
    else {
        document.getElementById('note-content').style.color = event.value;
    }
}


function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}

function imageMenu(){
    document.getElementById("myDropdown").classList.toggle("show");
}
