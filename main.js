// Variables
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

// Logic


 let tasks = [];
      if (localStorage.getItem('tasks')){
     tasks = JSON.parse(localStorage.getItem('tasks'))
      }
      tasks.forEach(function (task){
          renderTask(task);
      })

 checkEmptyList();

 form.addEventListener('submit', addTask);
 tasksList.addEventListener('click', deleteTask);
 tasksList.addEventListener('click', doneTask);


 // Functions
  function addTask(event){
      event.preventDefault(); // cancel form
      // new page markup
      const taskText = taskInput.value;
      const newTask = {
          id : Date.now(),
          text : taskText,
          done : false,
          desc : null,
      }

      tasks.push(newTask);
      saveToLocalStorage();

      renderTask(newTask);

      taskInput.value = ""; // clear
      taskInput.focus(); // focus on input

      checkEmptyList();
  }


  function deleteTask(event){
    if(event.target.dataset.action === 'delete'){
        const parenNode = event.target.closest('li')
        const id = Number(parenNode.id); // getId
        const index = tasks.findIndex((task) => task.id === id);
        tasks.splice(index, 1);
        parenNode.remove();

        saveToLocalStorage();
        checkEmptyList();
    }
}

  function doneTask(event){
  if (event.target.dataset.action === 'done'){
     const parenNode = event.target.closest('li');
     const id = Number(parenNode.id);

     const task = tasks.find( (task) =>  task.id === id);
      task.done = !task.done;
      saveToLocalStorage();

     const taskTitle = parenNode.querySelector('span');
     taskTitle.classList.toggle('task-title--done');
  }
  }

  function checkEmptyList(){
      if(tasks.length === 0 ) {
          const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
                                     <img src="./img/paper.png" alt="Empty" width="48" class="mt-3">
                                     <div class="empty-list__title">No tasks left to do today, keep it up !</div>
                                    </li>
                                          `
          tasksList.insertAdjacentHTML('beforeend', emptyListHTML);
      }

      if(tasks.length > 0 ){
          const emptyListElement = document.querySelector('#emptyList');
          emptyListElement ? emptyListElement.remove() : null;
      }

  }

   function addDescForm()
      {
        const descFormHtml = `<form id="formDescription">
                             <div class="form-group">
                                <input type="text" class="form-control" id="descInput" placeholder="Write it down here" maxlength="20">
                             </div class = "form-group">
                            <button id = "saveDescription" type="button" data-action="saveDescription" className="btn btn-primary  btn-lg active">Add</button>
                            </form>`
        const time = document.querySelector('.card-2')
        time.insertAdjacentHTML('beforeend', descFormHtml);

    }


  $(document).on("click", "#description", function (event) {
      event.preventDefault();
      addDescForm();
      let dId = $(this).closest('li').attr('id');
      let list = JSON.parse(localStorage.getItem("tasks"))
      let i = findIndexOfDate(list, dId);
      $(document).on("click", "#saveDescription", function (event) {
          let descIn = $('#descInput').val()
          console.log('this is i :' + i)
      });
  })



      function saveToLocalStorage() {
          localStorage.setItem('tasks', JSON.stringify(tasks))

      }

      function renderTask(task) {
          const cssClass = task.done ? "task-title task-title--done" : "task-title" // css class
          const taskHTML = `<li id ="${task.id}"  class="list-group-item d-flex justify-content-between task-item">
                        <span class="${cssClass}">${task.text}</span>
                        <div class="task-item__buttons">
                            <button type="button" data-action="done" class="btn-action">
                                <img src="./img/tick.png" alt="Done" width="18" height="18">
                            </button>
                            <button type="button" data-action="delete" class="btn-action">
                                <img src="./img/cross.png" alt="Done" width="18" height="18">
                            </button>
                            <button type="button" id = 'description' data-action="description" class="btn-action">
                                <img src="./img/pencil_and_paper.png" alt="Done" width="18" height="18">
                            </button>   
                        </div>
                    </li>`;

          tasksList.insertAdjacentHTML('beforeend', taskHTML); // add task on page
      }



 function findIndexOfDate(list, dId) {
     const index = list.findIndex(
         (element) => element.id == dId
     );
     //return index;
     return index;
 }










