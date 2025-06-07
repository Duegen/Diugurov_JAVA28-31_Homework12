const clear_btn = document.querySelector(".clear_btn")
const add_btn = document.querySelector(".add_btn")
const clear_all_btn = document.querySelector(".clear_all_btn")
const tasks = document.querySelector(".tasks_list");
const task_text = document.querySelector("#task_text")
const radio_btns = document.querySelectorAll('input[type="radio"][name="select"]')

clear_btn.onclick = () => {
    task_text.value = "";
}

clear_all_btn.onclick = () => {
    const tasks_array = document.querySelectorAll(".tasks_list>li")
    let result = window.confirm("Do you want to delete ALL tasks?")

    if (result) {
        for (let i = 0; i < tasks_array.length; i++)
            tasks_array[i].remove();
    }
}

function add_task() {
    if (!(task_text.value)) return;

    const new_task = document.createElement("li");
    tasks.append(new_task);
    new_task.className = "task undone";
    let checked = document.querySelector('input[name="select"]:checked');
    checked.value === "radio_done" ? new_task.style.display = "none" : new_task.style.display = "flex"

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

        let checked = document.querySelector('input[name="select"]:checked');
        (this.parentElement.classList.contains("done") && checked.value === "radio_active") ||
        (this.parentElement.classList.contains("undone") && checked.value === "radio_done") ?
            this.parentElement.style.display = "none" : this.parentElement.style.display = "flex"

    })
}

add_btn.onclick = add_task;

for (let i = 0; i < radio_btns.length; i++) {
    radio_btns[i].onchange = function () {
        const tasks = document.querySelectorAll(".task")
        tasks.forEach((task) =>
            !i || (i === 1 && task.classList.contains("undone")) || (i === 2 && task.classList.contains("done")) ?
                task.style.display = "flex" : task.style.display = "none"
        )
    }
}