 // Variables
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');


  // Logic
 form.addEventListener('submit', addTask);
 tasksList.addEventListener('click', deleteTask);
 tasksList.addEventListener('click', doneTask);
 tasksList.addEventListener('click', addDescForm);


 // Functions
  function addTask(event){
      event.preventDefault(); // cancel form
      const taskText = taskInput.value; // Text input
      // new page markup
      const taskHTML = `<li class="list-group-item d-flex justify-content-between task-item">
                        <span class="task-title">${taskText}</span>
                        <div class="task-item__buttons">
                            <button type="button" data-action="done" class="btn-action">
                                <img src="./img/tick.png" alt="Done" width="18" height="18">
                            </button>
                            <button type="button" data-action="delete" class="btn-action">
                                <img src="./img/cross.png" alt="Done" width="18" height="18">
                            </button>
                            <button type="button" data-action="description" class="btn-action">
                                <img src="./img/pencil_and_paper.png" alt="Done" width="18" height="18">
                            </button>   
                        </div>
                    </li>`;

      tasksList.insertAdjacentHTML('beforeend', taskHTML); // add task on page
      taskInput.value = ""; // clear
      taskInput.focus(); // focus on input
      if(tasksList.children.length > 1 ){
          emptyList.classList.add('none');

      }
  }
  function deleteTask(event){
    if(event.target.dataset.action === 'delete'){
        const parentNode = event.target.closest('li')
        parentNode.remove();
    }
    if (tasksList.children.length === 1){
        emptyList.classList.remove('none');
    }

}
  function doneTask(event){
  if (event.target.dataset.action === 'done'){
     const parentNode = event.target.closest('li');
     const taskTitle = parentNode.querySelector('span');
     taskTitle.classList.toggle('task-title--done');
  }
  }

   function addDescForm(event){
      if(event.target.dataset.action === 'description'){
          const descHtml = `<form id="formDescription" onSubmit="addDescription()">
                             <div className="form-group">
                                <input type="text" className="form-control" id="descInput" placeholder="Write it down here" required>
                                <small id="descriptionText" className="form-text text-muted"></small>
                             </div>
                            <button type="submit" className="btn btn-primary  btn-lg active">Add</button>
                            </form>`
          tasksList.insertAdjacentHTML('beforeend', descHtml);
      }
 }


 function addDescription(event) {

      let descInput = document.getElementById("descInput").value;
      const newDescription = document.createElement('small');
      newDescription.innerHTML = descInput;
      tasksList.appendChild(newDescription);

 }











