const inputData = document.querySelector(".input");
const hiddenElement = document.getElementById("hiddenElement");
const editData = document.querySelector(".input");
const taskTitle = document.getElementById('taskTitle');
const description = document.getElementById('description');
const deadline = document.getElementById('deadline');
const submitBtn = document.getElementById('submitBtn');
const task_complete = document.getElementById('task_complete');
let tasks = [];
const generateId = () => `task-${Date.now()}`;
    let TaskTitle = '';
    let Description = '';
    let Deadline = '';

    // task_complete.addEventListener("change", () => {
    //     TaskComplete = task_complete.checked ? "Yes" : "No";
    // })



    
    
    submitBtn.addEventListener("click", (event) => {
        event.preventDefault();
    
        // Update variables with input values
        TaskTitle = taskTitle.value;
        Description = description.value;
        Deadline = deadline.value;

        const taskId = generateId();
        const newTask = {id: taskId, taskTitle: TaskTitle, description: Description, deadline: Deadline, task_complete: task_complete.checked};
        
        tasks.push(newTask);

        renderTask();
    
        // Clear the input fields after submission
        taskTitle.value = "";
        description.value = "";
        deadline.value = "";
        task_complete.checked = false;
    });

    function renderTask(){
        // Update hiddenElement with task details
        hiddenElement.innerHTML = "";

        tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.className = "task";
            taskElement.id = task.id;
            taskElement.innerHTML = `
            <p><strong>Task Title:</strong> ${task.taskTitle}</p>
            <p><strong>Description:</strong> ${task.description}</p>
            <p><strong>Deadline:</strong> ${task.deadline}</p>
            <p><strong>Task Completed:</strong> ${task.task_complete ? "Yes" : "No"}</p>
        `;

        taskElement.style.backgroundColor = index % 2 === 0 ? "#f0f8ff" : "#e6e6fa";
        taskElement.style.padding = "10px"; 
        taskElement.style.marginBottom = "10px";
        
        hiddenElement.style.display = "block";
        
        // Check if the Edit button exists; if not, create it
            const hideButton = document.createElement('button');
            hideButton.textContent = "Edit";
            hideButton.style.marginRight = "10px";
        
            // Add event listener for the Edit button
            hideButton.addEventListener("click", () => {
                // Repopulate input fields with the saved task data
                taskTitle.value = task.taskTitle;
                description.value = task.description;
                deadline.value = task.deadline;
                task_complete.checked = task.task_complete;

                tasks = tasks.filter((t) => t.id !== task.id);

            // Re-render tasks
            renderTask();
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => {
            // Remove the task from the array
            tasks = tasks.filter((t) => t.id !== task.id);

            // Re-render tasks
            renderTask();
        });
        
            // Append the Edit button to the DOM
            taskElement.appendChild(hideButton);
            taskElement.appendChild(deleteButton);

            hiddenElement.appendChild(taskElement);

        })
    }
    
