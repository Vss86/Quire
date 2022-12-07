/*
When HTML is load
*/

//Array of all the notes
let notebook_list = [
  {
    id: uuidv4(),
    title: "Add your title here",
    text_content:
      "Click here and start typing to edit your first note or click the plus sign to create new note.",
    content: [],
    favorite: false,
  },
];

let toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

let quill;

//Index of the current note
let selected = 0;

// This variable is the last focused element (title or content)
let focusedElement = null;

let showFavorite = false;

//The function loads after HTML is loaded
function onloaded() {


  //loadFontOptions();

  if (localStorage.getItem("selected") != null)
    //Check if localstorage is empty
    selected = localStorage.getItem("selected");

  if (JSON.parse(localStorage.getItem("notebook-list")) != null)
    //Check if localstorage is empty
    notebook_list = JSON.parse(localStorage.getItem("notebook-list"));

  quill = new Quill("#note-content", {
    modules: {
      toolbar: toolbarOptions
    },
    theme: "snow",
  });
  quill.on("text-change", function (delta, oldDelta, source) {
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

    if (notebook.id == null) notebook.id == uuidv4();

    if (notebook.date_created == null)
      //Check if there is a date for the note
      notebook.date_created = new Date(); //If not set the date to current date

    notebook.date_created = new Date(notebook.date_created); //Converts date from JSON to the Date format

    if(!showFavorite || notebook.favorite) {
      let fa_star = notebook.favorite ?  "fa-star" : "fa-star-o";

      //HTML for notes in the sidebar
      document.getElementById("notebook-list").innerHTML += `
          <li class="notebook-item" onclick="openNote(${i})" >
  
          <em class="creationDate" id="noteDate">${notebook.date_created.toLocaleDateString(
            [],
            {
              month: "2-digit",
              day: "2-digit",
              year: "2-digit",
            }
            
          )}
          </em>
          <div class="note-header">
          <div class="note-button-group">
              <button onclick="addFavorite('${notebook.id}')"><i class="fa ${fa_star}" aria-hidden="true" ></i></button>
              <button onclick="deleteNote('${notebook.id}')"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
            </div>
            <h2>${notebook.title}</h2>
            
          </div>
          <p>${notebook.text_content}</p>
          </li>
          `;
    }
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
  if(showFavorite)
    return;

  notebook_list.push({
    id: uuidv4(),
    title: "New title",
    text_content: "New note",
    content: {
      ops: [
        { insert: ' new note ' },
      ]
    },
    date_created: new Date(),
    favorite: false,
  });
  selected = notebook_list.length - 1;
  loadNote();
}

function deleteNote(id) {
  for(let i = 0; i < notebook_list.length; i++) {
    if(notebook_list[i].id == id) {
      let confirmed = confirm("Are you want to delete " + notebook_list[i].title + "?");
      if(confirmed) {
        notebook_list.splice(i, 1);
        loadNote();
      }
    }
  }
}

function addFavorite(id) {
  for(let i = 0; i < notebook_list.length; i++) {
    if(notebook_list[i].id == id) {
      notebook_list[i].favorite = !notebook_list[i].favorite;
      loadNote();
    }
    
  }
}

function sortFavorite() {
  showFavorite = !showFavorite;
  loadNote();
}

//Generate UUID
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

//This functions set the title to element
function changeTitle(element) {
  notebook_list[selected].title = element.value;
  loadNote();
}

//This functions set the content to element
function changeContent() {
  notebook_list[selected].text_content = quill.getText();
  notebook_list[selected].content = quill.getContents();
  loadNote();
}

function formatText() {}

//Array of all the fonts
const fonts = [
  "Arial",
  "Arial Black",
  "Comic Sans MS",
  "Courier New",
  "Georgia",
  "Impact",
  "Lobster",
  "Lora",
  "Oswald",
  "Roboto",
  "Times New Roman",
  "Verdana",
];
/*
function changeFont() {
  const fontOptions = document.getElementById("docs-font");

  if (focusedElement != null)
    focusedElement.style.fontFamily = fonts[fontOptions.selectedIndex];
  else {
    document.getElementById("note-content").style.fontFamily =
      fonts[fontOptions.selectedIndex];
  }
}

function loadFontOptions() {
  const fontOptions = document.getElementById("docs-font");
  for (let i = 0; i < fonts.length; i++) {
    fontOptions.innerHTML += `
        <option style="font-family: ${fonts[i]}">${fonts[i]}</option>
        `;
  }
}*/

function setFocusedElement(e) {
  focusedElement = e;
}
/*
function changeFontSize(event) {
  if (focusedElement != null)
    focusedElement.style.fontSize = event.value + "px";
  else {
    document.getElementById("note-content").style.fontSize = event.value + "px";
  }
}

function changeColor(event) {
  if (focusedElement != null) focusedElement.style.color = event.value;
  else {
    document.getElementById("note-content").style.color = event.value;
  }
}*/

function printDiv(divName) {
  var printContents = document.getElementById(divName).innerHTML;
  var originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;

  window.print();

  document.body.innerHTML = originalContents;
}

function imageMenu() {
  document.getElementById("myDropdown").classList.toggle("show");
}

/* 
function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
} */
