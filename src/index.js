document.addEventListener("DOMContentLoaded", () => {

    function addEventTodo(){
    //find the form
    //addeventlistener to submit button
    //prevent default 
    //scrip data from form
    //clear form
    //append to page 
        const form = document.getElementById('create-task-form')
        const toDoList = document.getElementById('tasks')
        form.addEventListener('submit', function(event){
            event.preventDefault()
            const formData = event.target[0].value
            const li = document.createElement('li')
            li.innerText = formData
            toDoList.append(li)
            form.reset() 
        })
    
    }
    addEventTodo()
});

