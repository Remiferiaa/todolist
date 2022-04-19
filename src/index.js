import "./style.css"
import { site } from "./modules/ui.js"
import { addProject, addTasks, displayEverything, delProj, delTask, completion, showProject } from "./modules/todo.js"
import { formLoader, taskDetails, formChange } from "./modules/forms.js"
import { isThisToday, isCurrentWeek } from "./modules/inbox.js"
import { projects} from "./modules/storage.js"

function listeners() {
    document.querySelector(".header").addEventListener("click", function (event) {
        if (event.target.classList.contains("newTask")) {
            document.getElementById("taskForm").style.display = "flex"
            document.querySelector("#projForm").style.display = "none"
            if (document.querySelector(".taskDetail") !== null) {
                document.querySelector(".closeDetail").click();
            }
        }
        if (event.target.classList.contains("cnfmTask")) {
            addTasks();
            document.getElementById("taskForm").style.display = "none"
        }
    })

    document.querySelector(".sideBar").addEventListener("click", (event) => {
        if (event.target.classList.contains("home")) {
            displayEverything(event)
        }
        if (event.target.classList.contains("today")) {
            isThisToday()
            displayEverything(event)
        }
        if (event.target.classList.contains("current")) {
            isCurrentWeek()
            displayEverything(event)
        }
        if (event.target.classList.contains("newProj")) {
            document.getElementById("projForm").style.display = "flex"
            document.getElementById("taskForm").style.display = "none"
            if (document.querySelector(".taskDetail") !== null) {
                document.querySelector(".closeDetail").click();
            }
        }
        if (event.target.classList.contains("cnfmProj")) {
            addProject()
            document.getElementById("projForm").style.display = "none"
        }
        if (event.target.classList.contains("projBtn")) {
            displayEverything(event)
        }
        if (event.target.classList.contains("projDel")) {
            delProj(event)
        }
    })

    document.querySelector(".display").addEventListener("click", function (event) {
        if (event.target.classList.contains("delTask")) {
            delTask(event)
        }
        if (event.target.classList.contains("edit")) {
            if (document.querySelector(".taskDetail") !== null) {
                document.querySelector(".closeDetail").click();
            }
            taskDetails(event)
            document.getElementById("projForm").style.display = "none"
            document.getElementById("taskForm").style.display = "none"
        }
        if (event.target.classList.contains("complete")) {
            completion(event)
        }
        if (event.target.classList.contains("cnfmChange")) {
            formChange(event)
        }
        if (event.target.classList.contains("closeDetail")) {
            event.preventDefault();
            event.target.parentNode.parentNode.remove();
        }
    })

    document.querySelectorAll(".closeProj, .cancelTask").forEach(function (btns) {
        btns.addEventListener("click", function (e) {
            e.target.parentNode.parentNode.style.display = "none"
        })
    })
}

function content() {
    site();
    formLoader();
    listeners()
    showProject()
    document.querySelector(".home").click();
}

content()
projects();

