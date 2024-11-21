document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const updateTaskCount = () => {
        taskCount.textContent = `You have ${tasks.length} task(s) to complete.`;
    };

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';

            const span = document.createElement('span');
            span.textContent = task.text;

            const checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.checked = task.completed;
            checkBox.addEventListener('change', () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
                updateTaskCount();
            });

            li.appendChild(checkBox);
            li.appendChild(span);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
        updateTaskCount();
    };

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    });

    renderTasks();
    updateTaskCount();
});
