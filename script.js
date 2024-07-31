function one() {
    let userName = prompt(" What would you like me to call you?");
    if (userName !== null) {
        
        if (userName !== "") {
            welcomeShow.innerHTML = `
            <p>Welcome ${userName}, what task would you like to do today?</p>
            `
        }else {
            alert("You didn't provide a name. 😕");
    }
    }else{
        alert('So you are anonymous!😕')
    }
}


let allTask = JSON.parse(localStorage.getItem('allTask')) || [];

function inputTask() {
    let taskInput = document.getElementById("addTask")

    let task = taskInput.value

    if (task == ''){
        alert('Please enter a a task!')
    } else{
        let taskValue = {task};
        
        allTask.push(taskValue)
        saveLocalStorage();
        workings();
        console.log(allTask);
    }
}

function saveLocalStorage() {
    localStorage.setItem('allTask', JSON.stringify(allTask));
}
function workings() {
    let show = document.getElementById("show");
    show.innerHTML = '';
    
    let taskCount = document.getElementById("taskCount");
    taskCount.textContent = `You have ${allTask.length} tasks.`;

    for (let i = 0; i < allTask.length; i++) {
        show.innerHTML += `
            <div id="showList">
                <div style="padding: 10px;">
                    ${i+1}.
                    I'll like to ${allTask[i].task}
                </div>
                <button class="btn btn-danger" onclick='deleteitem(${i})'>Delete</button>
                <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editmodal(${i})">Edit</button>
                <button class="btn btn-success" onclick='donBtn(${i})'>Done</button>
            </div>
        `;
    }
}
function deleteitem(index) {
    console.log(index);
    let confamu = confirm("Are you sure you want to delete?")
    if (confamu == true) {
        allTask.splice(index, 1)
        saveLocalStorage();
        workings();
    }   
}
function donBtn(index) {
    console.log(index);
    let confamu = confirm("Are you are done with the task?")
    if (confamu == true) {
        allTask.splice(index, 1)
        saveLocalStorage();
        workings();
    } 
}


function editmodal(index) {
    let selectedTask = allTask[index];
    let taskEdit = document.getElementById("taskEdit");

    taskEdit.value = selectedTask.task;
    document.getElementById("editIndex").value = index;
}

function editItem() {
    let taskEdit = document.getElementById("taskEdit");
    let editIndex = document.getElementById("editIndex").value;


    allTask[editIndex].task = taskEdit.value;

    saveLocalStorage();
    workings();

}

// function displayTaskCount() {
//     let taskCount = document.getElementById("taskCount");
//     taskCount.textContent = `You have ${allTask.length} tasks.`;

// }
// // window.onload = displayTaskCount;