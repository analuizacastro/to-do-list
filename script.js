let globalNames = ['Skype with Mike', 'Walk my dog :)', 'Learn a new recipe'];
let inputName = null;
let isEditing = false;
let currentIndex = null;

window.addEventListener("load", () => {
  inputName = document.querySelector("#inputName");
  
  preventFormSubmit();
  activateInput();
  render();
});

function preventFormSubmit() {
  function handleFormSubtmit(event) {
    event.preventDefault();
  }
  
  var form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubtmit);
}

function activateInput() {
  function insertName(newName) {
  //  globalNames.push(newName);
    globalNames = [...globalNames, newName];
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
  }

  function handleTyping() {
    if (event.key === "Enter" && event.target.value.trim()!== '') {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }
      render();
      isEditing = false;
      clearInput();
    }
  }

  inputName.addEventListener("keyup", handleTyping);
  inputName.focus();
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames = globalNames.filter((_, i) => i !== index);
      render();
    }

    var icon = document.createElement("i");
    icon.classList.add("material-icons");
    icon.classList.add("md-48");
    icon.classList.add("standardColor");
    icon.classList.add("deleteButton");
    icon.addEventListener("click", deleteName);
    icon.textContent = "check_circle";
    return icon;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }

    var span = document.createElement("span");
    span.classList.add('clickable')
    span.textContent = name;
    span.addEventListener("click", editItem);

    return span;
  }

  var divNames = document.querySelector("#names");
  divNames.innerHTML = "";

  var ul = document.createElement("ul");

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement("li");
    var icon = createDeleteButton(i);
    var span = createSpan(currentName, i);

    var iconEdit = document.createElement("i");
    iconEdit.classList.add("material-icons");
    iconEdit.classList.add("dark-gray");
    iconEdit.textContent = "post_add";

    li.appendChild(icon);
    // li.appendChild(button);
    li.appendChild(span);
    li.appendChild(iconEdit);
    ul.appendChild(li);
  }
  divNames.appendChild(ul);
  clearInput();
}

const clearInput = () => {
  inputName.value = '';
  inputName.focus();
};
