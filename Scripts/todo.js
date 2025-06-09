const clear_btn = document.querySelector(".clear_btn")
const add_btn = document.querySelector(".add_btn")
const clear_all_btn = document.querySelector(".clear_all_btn")
const tasks = document.querySelector(".tasks_list");
const task_text = document.querySelector("#task_text")
const radio_btns = document.querySelectorAll('input[type="radio"][name="select"]')
const not_found = document.querySelector(".not_found")

clear_btn.onclick = () => {
    task_text.value = "";
}

clear_all_btn.onclick = () => {
    let result = window.confirm("Do you want to delete ALL tasks?");

    if (result) {
        while(tasks.childNodes.length)
            tasks.childNodes[0].remove()
    }
    not_found.style.display = "block";
    document.querySelector("#radio_all").checked = true;
}

function add_task() {
    if (!(task_text.value)) return;

    const new_task = document.createElement("li");
    tasks.append(new_task);
    new_task.className = "task undone";
    let checked = document.querySelector('input[name="select"]:checked');
    checked.value === "radio_done" ? new_task.style.display = "none" : new_task.style.display = "flex"
    if(checked.value === "radio_active" || checked.value === "radio_all") not_found.style.display = "none"

    const new_task_check = document.createElement("input")
    new_task_check.type = "checkbox";
    new_task_check.className = "check";
    new_task.append(new_task_check);

    const new_task_text = document.createElement("p");
    new_task.append(new_task_text);
    new_task_text.innerHTML = task_text.value;

    const new_task_close = document.createElement("img")
    new_task_close.className = "img_close"
    new_task_close.src = "./Styles/Images/icon_close.png"
    new_task.append(new_task_close);
    task_text.value = "";

    new_task_close.addEventListener("click", function () {
        this.parentElement.remove()

        const tasks_done = document.querySelectorAll(".done")
        const tasks_undone = document.querySelectorAll(".undone")
        const checked = document.querySelector('input[name="select"]:checked');

        (checked.value === "radio_all" && (!tasks_done.length || !tasks_undone.length)) || (!tasks_undone.length && checked.value === "radio_active") ||
        (!tasks_done.length && checked.value === "radio_done")
            ? not_found.style.display = "block" : not_found.style.display = "none";
    })
    new_task_close.addEventListener("mouseover", function () {
        this.parentElement.classList.add("border")
    })
    new_task_close.addEventListener("mouseout", function () {
        this.parentElement.classList.remove("border")
    })
    new_task_check.addEventListener("change", function () {
        this.parentElement.children[1].classList.toggle("text_through");
        this.parentElement.classList.toggle("done");
        this.parentElement.classList.toggle("undone");

        const checked = document.querySelector('input[name="select"]:checked');
        (this.parentElement.classList.contains("done") && checked.value === "radio_active") ||
        (this.parentElement.classList.contains("undone") && checked.value === "radio_done") ?
            this.parentElement.style.display = "none" : this.parentElement.style.display = "flex"

        const tasks_done = document.querySelectorAll(".done");
        const tasks_undone = document.querySelectorAll(".undone");

        (!tasks_done.length && checked.value === "radio_done") || (!tasks_undone.length && checked.value === "radio_active") ?
            not_found.style.display = "block" : not_found.style.display = "none";
    })
}

add_btn.onclick = add_task;

for (let i = 0; i < radio_btns.length; i++) {
    radio_btns[i].onchange = function () {
        const tasks_done = document.querySelectorAll(".done");
        const tasks_undone = document.querySelectorAll(".undone");

        (!i && (tasks_done.length || tasks_undone.length)) ||
        (i === 1 && tasks_undone.length) || (i === 2 && tasks_done.length) ?
            not_found.style.display = "none" : not_found.style.display = "block"

        tasks.childNodes.forEach((task) =>
            !i || (i === 1 && task.classList.contains("undone")) || (i === 2 && task.classList.contains("done")) ?
                task.style.display = "flex" : task.style.display = "none"
        )
    }
}