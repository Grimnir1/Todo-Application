function one() {

    let userName = prompt(" What would you like me to call you?");
    if (userName !== null) {
        
        if (userName !== "") {
            welcomeShow.innerHTML = `
            <p>Welcome ${userName}, what task would you like to do today?</p>
            `

            const utterance = new SpeechSynthesisUtterance( 'Welcome' + userName)
            window.speechSynthesis.speak(utterance)
        }else {
            const utterance = new SpeechSynthesisUtterance( "You didn't provide a name.")
            window.speechSynthesis.speak(utterance)
            // alert("You didn't provide a name. 😕");
            welcomeShow.innerHTML = `
            <p>Welcome Nameless, what task would you like to do today?<y/p>
            `
    }
    }else{
        alert('So you are anonymous!😕')
            const utterance = new SpeechSynthesisUtterance( 'So you are anonymous')
            window.speechSynthesis.speak(utterance)
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
        taskInput.value = '';
    }
}

function saveLocalStorage() {
    localStorage.setItem('allTask', JSON.stringify(allTask));
}
function workings() {
    let show = document.getElementById("show");
    show.innerHTML = '';
    
    let taskCount = document.getElementById("taskCount");
    taskCount.textContent = `You have (${allTask.length}) tasks left.`;

    for (let i = 0; i < allTask.length; i++) {
        show.innerHTML += `
            <div id="showList">
                <div style="padding: 10px;">
                    ${i+1}.
                    I'll like to ${allTask[i].task}
                </div>
                <button style="background: none; border: none; padding: 5px;" class="" onclick='deleteitem(${i})'>✖️</button>
                <button style="background: none; border: none; padding: 5px;" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editmodal(${i})">🖋️</button>
                <button style="background: none; border: none; padding: 5px;" onclick='donBtn(${i})'>✅</button>
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
// window.onload = nam;