// task-manager.js

class Task {
    constructor(id, description, priority) {
        this.id = id;
        this.description = description;
        this.priority = priority; // 1: High, 2: Medium, 3: Low
        this.completed = false;
    }
}

class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
    }

    createTask(description, priority) {
        const newTask = new Task(Date.now(), description, priority);
        this.tasks.push(newTask);
        this.saveTasks();
    }

    editTask(id, updatedDescription, updatedPriority) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.description = updatedDescription;
            task.priority = updatedPriority;
            this.saveTasks();
        }
    }

    deleteTask(id) {
        const confirmed = confirm('Are you sure you want to delete this task?');
        if (confirmed) {
            this.tasks = this.tasks.filter(task => task.id !== id);
            this.saveTasks();
        }
    }

    markTaskAsComplete(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = true;
            this.saveTasks();
        }
    }

    markTaskAsIncomplete(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = false;
            this.saveTasks();
        }
    }

    filterTasks(status) {
        return this.tasks.filter(task => task.completed === status);
    }

    sortTasks(byPriority = false) {
        return this.tasks.sort((a, b) => {
            if (byPriority) {
                return a.priority - b.priority;
            }
            return 0;
        });
    }

    showTaskStatistics() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(task => task.completed).length;
        const completionPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        return { totalTasks, completedTasks, completionPercentage };
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const tasksJson = localStorage.getItem('tasks');
        return tasksJson ? JSON.parse(tasksJson) : [];
    }
}

const taskManager = new TaskManager();

// Example Usage
// taskManager.createTask('Finish the project', 1);
// console.log(taskManager.showTaskStatistics());\n