class TaskList extends HTMLElement {
    constructor() {
      super();
  
      this.tasks = [];
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <div class="task-list">
          <form id="taskForm">
            <input type="text" id="taskInput" placeholder="Добавить задачу">
            <button type="submit">Добавить</button>
          </form>
          <ul id="tasks"></ul>
        </div>
      `;
    }
  
    connectedCallback() {
      this.form = this.shadowRoot.getElementById('taskForm');
      this.input = this.shadowRoot.getElementById('taskInput');
      this.taskList = this.shadowRoot.getElementById('tasks');
  
      this.form.addEventListener('submit', e => {
        e.preventDefault();
        const taskText = this.input.value.trim();
        if (taskText !== '') {
          this.tasks.push({ text: taskText, completed: false });
          this.render();
          this.input.value = '';
        }
      });
  
      this.taskList.addEventListener('click', e => {
        if (e.target.tagName === 'INPUT') {
          const index = e.target.dataset.index;
          this.tasks[index].completed = e.target.checked;
          this.render();
        } else if (e.target.tagName === 'BUTTON') {
          const index = e.target.dataset.index;
          this.tasks.splice(index, 1);
          this.render();
        }
      });
  
      this.render();
    }
  
    render() {
      this.taskList.innerHTML = '';
      this.tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.dataset.index = index;
  
        taskItem.appendChild(checkbox);
        taskItem.appendChild(document.createTextNode(task.text));
  
        if (task.completed) {
          taskItem.classList.add('completed');
        }
  
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.dataset.index = index;
        taskItem.appendChild(deleteBtn);
  
        this.taskList.appendChild(taskItem);
      });
    }
  }
  
  customElements.define('task-list', TaskList);