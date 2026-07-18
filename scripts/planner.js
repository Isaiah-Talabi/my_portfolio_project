document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const notepad = document.getElementById('notepad');
    const saveNoteBtn = document.getElementById('saveNoteBtn');

    let tasks = JSON.parse(localStorage.getItem('academic_tasks')) || [];

    if (notepad) {
        notepad.value = localStorage.getItem('academic_notes') || '';
    }

    function calculateMetrics() {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const pending = total - completed;
        const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

        document.getElementById('totalTasksCount').innerText = total;
        document.getElementById('completedTasksCount').innerText = completed;
        document.getElementById('pendingTasksCount').innerText = pending;
        document.getElementById('progressPercent').innerText = `${percent}%`;
    }

    function saveToStorage() {
        localStorage.setItem('academic_tasks', JSON.stringify(tasks));
        calculateMetrics();
    }

    function renderTasks() {
        if (!taskList) return;
        taskList.innerHTML = '';

        if (tasks.length === 0) {
            taskList.innerHTML = `<li style="text-align: center; padding: 20px; background: var(--card-bg); border-radius: 12px; opacity:0.6;">No tasks logged. Populate the planner inputs above.</li>`;
            return;
        }

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            let priorityClass = 'priority-low';
            if (task.priority === 'High') priorityClass = 'priority-high';
            if (task.priority === 'Medium') priorityClass = 'priority-medium';

            li.innerHTML = `
                <div class="task-left">
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
                    <span class="task-text">${task.name}</span>
                </div>
                <div class="task-right">
                    <span class="priority-indicator ${priorityClass}">${task.priority}</span>
                    <span class="task-date">📅 ${task.date}</span>
                    <button class="delete-btn" data-index="${index}">🗑️</button>
                </div>
            `;
            taskList.appendChild(li);
        });

        document.querySelectorAll('.task-checkbox').forEach(box => {
            box.addEventListener('change', (e) => {
                const idx = e.target.getAttribute('data-index');
                tasks[idx].completed = e.target.checked;
                saveToStorage();
                renderTasks();
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                tasks.splice(idx, 1);
                saveToStorage();
                renderTasks();
            });
        });
    }

    if (taskForm) {
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('taskName').value.trim();
            const priority = document.getElementById('taskPriority').value;
            const date = document.getElementById('taskDate').value;

            if (!name || !date) return;

            tasks.push({ name, priority, date, completed: false });
            saveToStorage();
            renderTasks();
            taskForm.reset();
        });
    }

    if (saveNoteBtn && notepad) {
        saveNoteBtn.addEventListener('click', () => {
            localStorage.setItem('academic_notes', notepad.value);
            alert("Quick thoughts saved successfully inside the system memory module.");
        });
    }

    calculateMetrics();
    renderTasks();
});