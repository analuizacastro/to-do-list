window.addEventListener("load", start);

var globalNames = [];
var inputName = null;

function start(){
    inputName = document.querySelector('#inputName');
    
    preventFormSubmit();
    activateInput();
    render();
}

function preventFormSubmit(){
    function handleFormSubtmit(event){
        event.preventDefault();
    }

    var form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubtmit);
}

function activateInput(){
    function insertName(newName){
        globalNames.push(newName);
        render();
    }

    function handleTyping(){
        if(event.key === 'Enter'){
            insertName(event.target.value);
        }
    }

    inputName.addEventListener('keyup', handleTyping)
    inputName.focus();
}

function render(){
    function createDeleteButton(index){
        function deleteName(index){
            globalNames.splice(index, 1)
            render();
        }

        // var button = document.createElement('button');
        // button.textContent = '✓';
        // button.classList.add('deleteButton');
        // button.addEventListener('click', deleteName);

        var icon = document.createElement('i');
        icon.classList.add('material-icons');
        icon.classList.add('md-48');
        icon.classList.add('standardColor'); 
        icon.classList.add('deleteButton');
        icon.addEventListener('click', deleteName);
        icon.textContent = 'check_circle';

        return icon;
    }
    var divNames = document.querySelector('#names');
    divNames.innerHTML = '';

    var ul = document.createElement('ul');

    for(var i = 0; i < globalNames.length; i++){
        var currentName = globalNames[i];

        var li = document.createElement('li');
        var icon = createDeleteButton(i);

        var span = document.createElement('span');
        span.textContent = currentName;



        li.appendChild(icon);
        // li.appendChild(button);
        li.appendChild(span);

        ul.appendChild(li);
    }
    divNames.appendChild(ul);
    clearInput();
}

function clearInput(){
    inputName.value = '';
    inputName.focus();
}