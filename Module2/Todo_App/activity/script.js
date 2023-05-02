let addTodoButton = document.querySelector(".add-todo");
let todoInput = document.querySelector(".todo-input");

// by clicking "Add" button
addTodoButton.addEventListener( "click", function() {
    addTodo();
});

// by pressing Enter key
todoInput.addEventListener( "keypress", function(e) {
    if(e.key == "Enter");
    addTodo();
});

function addTodo() {
    let todoInputValue = todoInput.value;
    if(todoInputValue) {
        console.log(todoInputValue);
        // Ater click or keypress it will empty the input box
        todoInput.value = "";
    }
}