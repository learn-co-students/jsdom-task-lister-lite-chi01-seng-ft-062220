const container = document.getElementById('main-content');
const addTaskForm = document.getElementById('create-task-form');
const myTodoList = document.getElementById('tasks');

document.addEventListener("DOMContentLoaded", () => {
  priority();
  alwaysListening();
});

function priority(){
  const dropDown = document.createElement('select');
  dropDown.id = 'priority';
  let optionsObj = [
    {priority: 'high', value: 3},
    {priority: 'medium', value: 2},
    {priority: 'low', value: 1}
    ]
      optionsObj.forEach(status => {
        let option = document.createElement('option');
        option.innerText = status['priority'];
        option.value = status['value'];
        dropDown.add(option)
      })
  container.insertBefore(dropDown, myTodoList.parentNode);
}

function alwaysListening(){
  container.addEventListener('click', function(event){
    if (event.target.value === 'Create New Task'){
    // prevent refresh (preventDefault)
      event.preventDefault();
      createListItem();
      const lis = document.getElementsByTagName('li')
      // console.log(document.getElementsByTagName('li').length)
        if (lis.length > 1){
          sortedToDos(lis)
        }
    } else if (event.target.id ==='edit-btn'){
      const originalValue = event.target.previousSibling
      const originalPriority = event.target.parentNode
      editItem(event, originalValue)  
      console.log(originalPriority)
      document.querySelector('#edit-task-form').addEventListener('submit', function(event){
          event.preventDefault();
          const updatedTask = document.getElementById('edit-task-description').value
          priorityColorCoding(originalPriority)
          originalValue.textContent = updatedTask

      })
    } else if (event.target.id === 'delete-btn'){
      event.target.parentNode.remove()
    }
})
}

function createListItem(){
   // find the input field
   const entryField = document.getElementById('new-task-description');
   // save the value of the input as variable
     const newTask = `${entryField.value} `;
   // create new element and save to variable
     const newListItem = document.createElement('li');
     const deleteButton = document.createElement('button');
     const editButton = document.createElement('button');
   // add input value as innerText/textContent for new element
     newListItem.innerText = newTask;
     priorityColorCoding(newListItem)
     
     deleteButton.innerText = 'Delete Task';
     deleteButton.method = 'DELETE';
     deleteButton.id = 'delete-btn'

     editButton.innerText = 'Edit Task';
     editButton.method = 'PATCH';
     editButton.id = 'edit-btn'
   // append elements to container
     newListItem.appendChild(editButton)
     newListItem.appendChild(deleteButton)
     myTodoList.appendChild(newListItem)
     event.target.parentNode.reset()
}

function sortedToDos(lis){
  const list = [...lis]
  list.sort(function(a, b){
      return b.priority - a.priority
  }).forEach(item => {
    myTodoList.append(item)
  })
}

function editItem(event, originalValue){
  const editForm = document.createElement('form')
  editForm.id = 'edit-task-form'
  editForm.method = 'patch'
  editForm.innerHTML += `<label for="edit-task-description">Update Description:</label>
  <input type="text" id="edit-task-description" name="edit-task-description">
  <input type="submit" value="Edit Task">`
  container.insertBefore(editForm, myTodoList.parentNode.previousSibling)
  // let originalValue = event.target.previousSibling.textContent
  document.getElementById('edit-task-description').value = originalValue.textContent
}

function priorityColorCoding(item){
 item.priority = document.querySelector('#priority').value
  if (item.priority === '1'){
    item.style.color = 'green'
  } else if (item.priority === '2'){
    item.style.color = 'yellow'
  } else {
    item.style.color = 'red'
  }
}