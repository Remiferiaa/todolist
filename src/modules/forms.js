import { projList } from "./todo";

function elDetail(el, attr) {
    for (let key in attr) {
        el.setAttribute(key, attr[key])
    }
}

function projForm() {
    const projForm = document.createElement("form");
    const projTitle = document.createElement("label");
    const projTitleName = document.createElement("input");
    const projFormBtns = document.createElement("div")
    const addBtn = document.createElement("button");
    const cancelBtn = document.createElement("button");

    projTitle.setAttribute("for", "title");
    projFormBtns.setAttribute("class", "formBtns")

    elDetail(addBtn, { "type": "button", "id": "addProj", "class": "cnfmProj" })
    elDetail(cancelBtn, { "type": "button", "id": "cancelProj", "class": "closeProj" })
    elDetail(projForm, { "id": "projForm", "autocomplete": "off" });
    elDetail(projTitleName, { "type": "text", "id": "title", "name": "title", "maxlength": "45","required": "" });

    projTitle.innerHTML = "Title ";
    addBtn.innerHTML = "Add";
    cancelBtn.innerHTML = "Cancel";

    projFormBtns.append(addBtn, cancelBtn)
    projForm.append(projTitle, projTitleName, projFormBtns)
    document.querySelector(".newProj").insertAdjacentElement("afterend", projForm)
}

function taskForm() {
    const inputHolder = document.createElement("div")
    const taskForm = document.createElement("form");
    const taskTitle = document.createElement("label");
    const taskName = document.createElement("input");
    const taskDescrip = document.createElement("label");
    const taskDetails = document.createElement("input");
    const taskDate = document.createElement("label");
    const taskTime = document.createElement("input");
    const taskBtns = document.createElement("div")
    const taskAdd = document.createElement("button");
    const taskCancel = document.createElement("button");

    inputHolder.setAttribute("class", "taskInputs")
    taskTitle.setAttribute("for", "taskTitle");
    taskDescrip.setAttribute("for", "taskDescrip")
    taskDate.setAttribute("for", "taskDate")
    taskBtns.setAttribute("class", "taskformBtns")

    elDetail(taskForm, { "id": "taskForm", "autocomplete": "off" });
    elDetail(taskAdd, { "type": "button", "id": "taskAdd", "class": "cnfmTask" })
    elDetail(taskCancel, { "type": "button", "id": "taskCancel", "class": "cancelTask" })
    elDetail(taskName, { "type": "text", "id": "taskTitle", "name": "taskTitle", "required": "" });
    elDetail(taskDetails, { "id": "taskDescrip", "name": "taskDescrip", "maxlength": "45"});
    elDetail(taskTime, { "type": "date", "id": "taskDate", "name": "taskDate" })

    taskTitle.innerHTML = "Task Title ";
    taskDescrip.innerHTML = "Task Description "
    taskDate.innerHTML = "Due Date "
    taskAdd.innerHTML = "Add";
    taskCancel.innerHTML = "Cancel";

    taskBtns.append(taskAdd, taskCancel)
    inputHolder.append(taskTitle, taskName, taskDescrip, taskDetails, taskDate, taskTime)
    taskForm.append(inputHolder,taskBtns)
    document.querySelector(".header > p").insertAdjacentElement("afterend", taskForm)
    
}

function taskDetails(event) {
    const inholder = document.createElement("div")
    const currentTask = event.target.parentNode.getAttribute("data-task")
    const currentProj = event.target.parentNode.parentNode.getAttribute("data-disProj")
    const taskIndex = projList[currentProj].content[currentTask]
    const holder = document.createElement("form")
    const titleName = document.createElement("label");
    const title = document.createElement("input")
    const descripName = document.createElement("label");
    const descrip = document.createElement("input")
    const dateName = document.createElement("label");
    const date = document.createElement("input")
    const btnHold = document.createElement("div")
    const cnfm = document.createElement("button")
    const cancel = document.createElement("button")

    inholder.setAttribute("class", "newInputs")
    elDetail(holder, { "class": "taskDetail", "autocomplete": "off", "data-taskChange": currentTask })
    elDetail(titleName, { "for": "newTitle" })
    elDetail(title, { "type": "text", "id": "newTitle", "name": "newTitle", "required": "", "value": taskIndex.name })
    elDetail(descripName, { "for": "newDescrip" })
    elDetail(descrip, { "id": "newDescrip", "name": "newDescrip", "maxlength": "45"})
    elDetail(dateName, { "for": "newDeadline" })
    elDetail(date, { "type": "date", "id": "newDeadline", "name": "newDeadline", "value": taskIndex.duedate })
    elDetail(btnHold, { "class": "changeformBtns" })
    elDetail(cnfm, { "class": "cnfmChange", "type": "button" })
    elDetail(cancel, { "class": "closeDetail" })

    descrip.value = taskIndex.description
    cnfm.innerHTML = "Confirm"
    cancel.innerHTML = "Cancel"
    titleName.innerHTML = "Title "
    descripName.innerHTML = "Description "

    btnHold.append(cnfm, cancel)
    inholder.append(titleName, title, descripName, descrip, dateName, date)
    holder.append(inholder,btnHold)
    document.querySelector(".display").append(holder)

}

function formLoader() {
    taskForm()
    projForm()
}

function formChange(event) {
    const currentProj = document.querySelector(".displayProject").getAttribute("data-disproj")
    const currentTask = event.target.parentNode.parentNode.getAttribute("data-taskChange")
    let taskName = document.getElementById("newTitle").value;
    let descrip = document.getElementById("newDescrip").value;
    let deadline = document.getElementById("newDeadline").value;

    projList[currentProj].content[currentTask].name = taskName
    projList[currentProj].content[currentTask].description = descrip
    projList[currentProj].content[currentTask].duedate = deadline
    console.log(projList[currentProj].content[currentTask])
    document.querySelector(".display").innerHTML = ""
    document.querySelector(".active").classList.remove("active")
    document.querySelector(`[data-proj = "${currentProj}"`).click();
}


export { formLoader, elDetail, taskDetails, formChange }