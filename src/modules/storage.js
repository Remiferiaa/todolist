
import { projList } from "./todo";


function projects() {
    document.body.addEventListener("click", function() {
            localStorage.setItem("projects", JSON.stringify(projList))
        })
}

export { projects}