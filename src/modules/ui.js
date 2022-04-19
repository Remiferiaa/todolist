function header() {
    const top = document.createElement("div")
    const logo = document.createElement("p")
    const addTask = document.createElement("button")
    top.setAttribute("class", "header")
    addTask.setAttribute("class", "newTask headerBtn")
    logo.innerHTML = "Todo List"
    addTask.innerHTML = "+"
    top.append(logo, addTask)
    return top
}


function sideBar() {
    const side = document.createElement("div")
    const nav = document.createElement("nav")
    const home = document.createElement("button");
    const today = document.createElement("button");
    const thisWeek = document.createElement("button");
    const projects = document.createElement("div");
    const projHeader = document.createElement("p")
    const newProj = document.createElement("button")

    side.setAttribute("class", "sideBar")
    nav.setAttribute("class", "inbox")
    home.setAttribute("class", "defaultBtn home")
    home.setAttribute("data-proj", 0)
    today.setAttribute("class", "today defaultBtn")
    today.setAttribute("data-proj", 1)
    thisWeek.setAttribute("class", "current defaultBtn")
    thisWeek.setAttribute("data-proj", 2)
    projects.setAttribute("class", "proj")
    projHeader.setAttribute("class", "text")
    newProj.setAttribute("class", "newProj defaultBtn")

    home.innerHTML = "Home";
    today.innerHTML = "Today"
    thisWeek.innerHTML = "This Week"
    projHeader.innerHTML = "Projects"
    newProj.innerHTML = "Add New Project"

    projects.append(projHeader)
    nav.append(home, today, thisWeek)
    side.append(nav, projects, newProj)
    return side
}

function details() {
    const stuffs = document.createElement("div")
    stuffs.setAttribute("class", "display")
    return stuffs
}


function site() {
    const container = document.createElement("div")
    container.setAttribute("class", "container")
    const main = document.createElement("div")
    main.setAttribute("class", "main")
    main.append(sideBar(), details())
    container.append(header(), main)
    document.body.append(container)
}

export { site }