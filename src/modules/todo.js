import { elDetail } from "./forms";

const newTask = (name, description, duedate, completion) => {
    return { name, description, duedate, completion }
}

const newProject = (title, content) => {
    content = [];
    return { title, content }
}

const Home = newProject("Default", "")
const Today = newProject("Default", "")
const ThisWeek = newProject("Default", "")


let projList = [Home,Today,ThisWeek];


(function () {
    if (JSON.parse(localStorage.getItem("projects")) !== null) {
        projList = JSON.parse(localStorage.getItem("projects"))
    }
    return projList
})();

function addProject() {
    let projTitle = document.getElementById("title").value
    if (projTitle == "") {
        projTitle = "New Project"
    }
    const project = newProject(projTitle, "")
    projList.push(project)
    document.getElementById("title").value = ""
    appendProj()
}

function addTasks() {
    const thisProj = projList[document.querySelector(".display>div").getAttribute("data-disProj")]
    let taskName = document.getElementById("taskTitle").value;
    let descrip = document.getElementById("taskDescrip").value;
    let deadline = document.getElementById("taskDate").value;
    if (taskName == "") {
        taskName = "New Task"
    }
    if (descrip == "") {
        descrip = "Insert something here about the task"
    }
    if (deadline == "") {
        deadline = "No Date Specified"
    }

    const task = newTask(taskName, descrip, deadline, "notCompleted");
    let i = Object.keys(thisProj.content).length

    thisProj.content[i] = task;
    document.getElementById("taskTitle").value = ""
    document.getElementById("taskDescrip").value = ""
    document.getElementById("taskDate").value = ""
    appendTask()
}

function appendProj() {
    let x = projList.length
    for (let i = x - 1; i < x; i++) {
        const hold = document.createElement("div")
        const proj = document.createElement("button");
        const del = document.createElement("button");

        elDetail(proj, { "class": "projBtn", "data-proj": i })
        elDetail(hold, { "class": "projHold" })
        del.setAttribute("class", "projDel")

        proj.innerHTML = projList[i].title;
        del.innerHTML = "X"

        hold.append(del, proj)
        document.querySelector(".proj").appendChild(hold)
    }
}

function showProject() {
    let x = projList.length
    for (let i = 3; i < x; i++) {
        const hold = document.createElement("div")
        const proj = document.createElement("button");
        const del = document.createElement("button");

        elDetail(proj, { "class": "projBtn", "data-proj": i })
        elDetail(hold, { "class": "projHold" })
        del.setAttribute("class", "projDel")

        proj.innerHTML = projList[i].title;
        del.innerHTML = "X"

        hold.append(del, proj)
        document.querySelector(".proj").appendChild(hold)
    }
}

function displayProj(event) {
    const projIndex = event.target.getAttribute("data-proj")
    const projHolder = document.createElement("div")
    const header = document.createElement("h1")

    elDetail(projHolder, { "data-disProj": projIndex, "class": "displayProject" })
    header.innerHTML = event.target.innerHTML
    projHolder.append(header)
    document.querySelector(".display").appendChild(projHolder)
}

function showTasks() {
    const projIndex = document.querySelector(".display > div").getAttribute("data-disproj")
    const currentProj = projList[projIndex]
    const index = Object.keys(currentProj.content).length
    for (let i = 0; i < index; i++) {
        const holder = document.createElement("div")
        const mark = document.createElement("button")
        const title = document.createElement("p")
        const descrip = document.createElement("p")
        const date = document.createElement("p")
        const delBtn = document.createElement("button")
        const details = document.createElement("button")

        elDetail(holder, { "data-task": i, "class": "tasks" })
        descrip.style.overflow = "hidden"
        delBtn.setAttribute("class", "delTask taskbtn")
        details.setAttribute("class", "edit taskbtn")
        mark.setAttribute("class", "complete taskbtn")

        if (currentProj.content[i].completion == "notCompleted") {
            holder.style.borderLeft = "4px solid red"
        }
        else if (currentProj.content[i].completion == "Completed") {
            holder.style.borderLeft = "4px solid green"
        }

        title.innerHTML = currentProj.content[i].name;
        descrip.innerHTML = currentProj.content[i].description;
        date.innerHTML = currentProj.content[i].duedate;
        delBtn.innerHTML = ""
        details.innerHTML = ""
        holder.append(mark, title, descrip, date, details, delBtn);
        document.querySelector("[data-disProj]").appendChild(holder)
    }
}

function appendTask() {
    const projIndex = document.querySelector(".display > div").getAttribute("data-disproj")
    const currentProj = projList[projIndex]
    const index = Object.keys(currentProj.content).length
    for (let i = index - 1; i < index; i++) {
        const holder = document.createElement("div")
        const mark = document.createElement("button")
        const title = document.createElement("p")
        const descrip = document.createElement("p")
        const date = document.createElement("p")
        const delBtn = document.createElement("button")
        const details = document.createElement("button")

        elDetail(holder, { "data-task": i, "class": "tasks" })
        descrip.setAttribute("class", "taskDescription")
        delBtn.setAttribute("class", "delTask")
        details.setAttribute("class", "edit")
        mark.setAttribute("class", "complete")

        if (currentProj.content[i].completion == "notCompleted") {
            holder.style.borderLeft = "4px solid red"
        }
        else if (currentProj.content[i].completion == "Completed") {
            holder.style.borderLeft = "4px solid green"
        }

        title.innerHTML = currentProj.content[i].name;
        descrip.innerHTML = currentProj.content[i].description;
        date.innerHTML = currentProj.content[i].duedate;
        delBtn.innerHTML = ""
        details.innerHTML = ""
        holder.append(mark, title, descrip, date, details, delBtn);
        document.querySelector("[data-disProj]").appendChild(holder)
    }
}

function displayEverything(event) {
    if (!(event.target.classList.contains("active"))) {
        document.querySelector(".display").innerHTML = "";
        displayProj(event)
        showTasks()
    }
    statChange(event)
}

function delProj(event) {
    event.target.parentNode.remove();
    const currentProj = event.target.nextSibling.getAttribute("data-proj")
    projList.splice(currentProj, 1)
    document.querySelectorAll(".projHold > [data-proj]").forEach(function (proj) {
        proj.removeAttribute("data-proj")
    })
    updateProj()
}

function delTask(event) {
    const currentTask = event.target.parentNode.getAttribute("data-task")
    const currentProj = event.target.parentNode.parentNode.getAttribute("data-disProj")
    event.target.parentNode.remove();
    projList[currentProj].content.splice(currentTask, 1)
    document.querySelectorAll("[data-task]").forEach(function (task) {
        task.removeAttribute("data-task")
    })
    updateTask()
}

function updateProj() {
    let i = 3;
    document.querySelectorAll(".projBtn").forEach(function (proj) {
        proj.setAttribute("data-proj", i)
        i = i + 1
    })
}

function updateTask() {
    let i = 0;
    document.querySelectorAll(".tasks").forEach(function (task) {
        task.setAttribute("data-task", i)
        i = i + 1;
    })
}

function statChange(event) {
    document.querySelectorAll("[data-proj]").forEach(function (item) {
        item.classList.remove("active")
    })
    event.target.classList.add("active")
}

function completion(event) {
    const currentTask = event.target.parentNode.getAttribute("data-task")
    const currentProj = event.target.parentNode.parentNode.getAttribute("data-disProj")
    let index = projList[currentProj].content[currentTask].completion
    if (index == "notCompleted") {
        projList[currentProj].content[currentTask].completion = "Completed"
        event.target.parentNode.style.borderLeft = "4px solid green"
    }
    if (index == "Completed") {
        projList[currentProj].content[currentTask].completion = "notCompleted"
        event.target.parentNode.style.borderLeft = "4px solid red"
    }
}


export { projList, addProject, addTasks, displayEverything, delProj, delTask, completion, showProject }
