

const STORAGE_KEY = "taskBloomTasks";

let tasks = loadTasks();

let currentCalendarDate = new Date();

let taskToDelete = null;

let currentNotesTaskId = null;

let taskChart = null;




const dashboardSection =
    document.getElementById("dashboardSection");

const kanbanSection =
    document.getElementById("kanbanSection");

const calendarSection =
    document.getElementById("calendarSection");

const importantSection =
    document.getElementById("importantSection");


const navItems =
    document.querySelectorAll(".nav-item");


const addTaskBtn =
    document.getElementById("addTaskBtn");

const mobileAddTaskBtn =
    document.getElementById("mobileAddTaskBtn");


const searchInput =
    document.getElementById("searchInput");


/* Statistics */

const totalTasks =
    document.getElementById("totalTasks");

const todoTasks =
    document.getElementById("todoTasks");

const progressTasks =
    document.getElementById("progressTasks");

const completedTasks =
    document.getElementById("completedTasks");


/* Task columns */

const todoColumn =
    document.getElementById("todoColumn");

const progressColumn =
    document.getElementById("progressColumn");

const completedColumn =
    document.getElementById("completedColumn");


const todoCount =
    document.getElementById("todoCount");

const progressCount =
    document.getElementById("progressCount");

const completedCount =
    document.getElementById("completedCount");


/* Dashboard */

const importantTasks =
    document.getElementById("importantTasks");

const importantTaskList =
    document.getElementById("importantTaskList");

const recentTasks =
    document.getElementById("recentTasks");


/* Calendar */

const calendarGrid =
    document.getElementById("calendarGrid");

const calendarTitle =
    document.getElementById("calendarTitle");

const previousMonth =
    document.getElementById("previousMonth");

const nextMonth =
    document.getElementById("nextMonth");


/* Task modal */

const taskModal =
    document.getElementById("taskModal");

const modalTitle =
    document.getElementById("modalTitle");

const closeTaskModal =
    document.getElementById("closeTaskModal");

const cancelTask =
    document.getElementById("cancelTask");

const taskForm =
    document.getElementById("taskForm");

const taskId =
    document.getElementById("taskId");

const taskTitle =
    document.getElementById("taskTitle");

const taskDescription =
    document.getElementById("taskDescription");

const taskPriority =
    document.getElementById("taskPriority");

const taskStatus =
    document.getElementById("taskStatus");

const taskDueDate =
    document.getElementById("taskDueDate");

const taskImportant =
    document.getElementById("taskImportant");


/* Notes modal */

const notesModal =
    document.getElementById("notesModal");

const closeNotesModal =
    document.getElementById("closeNotesModal");

const notesTaskTitle =
    document.getElementById("notesTaskTitle");

const notesList =
    document.getElementById("notesList");

const noteForm =
    document.getElementById("noteForm");

const noteText =
    document.getElementById("noteText");


/* Delete modal */

const deleteModal =
    document.getElementById("deleteModal");

const cancelDelete =
    document.getElementById("cancelDelete");

const confirmDelete =
    document.getElementById("confirmDelete");


/* =========================================================
   💾 LOCAL STORAGE
========================================================= */

function loadTasks() {

    try {

        const savedTasks =
            localStorage.getItem(STORAGE_KEY);

        if (!savedTasks) {
            return [];
        }

        const parsedTasks =
            JSON.parse(savedTasks);

        if (!Array.isArray(parsedTasks)) {
            return [];
        }

        return parsedTasks;

    } catch (error) {

        console.error(
            "Could not load tasks:",
            error
        );

        return [];
    }
}


function saveTasks() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
    );

}



document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupNavigation();

        setupTaskModal();

        setupNotesModal();

        setupDeleteModal();

        setupSearch();

        setupCalendar();

        renderEverything();

    }
);



function setupNavigation() {

    navItems.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const section =
                    button.dataset.section;

                showSection(section);

            }
        );

    });

}


function showSection(section) {

    /* Hide all sections */

    if (dashboardSection) {
        dashboardSection.style.display = "none";
    }

    if (kanbanSection) {
        kanbanSection.classList.remove("active");
    }

    if (calendarSection) {
        calendarSection.classList.remove("active");
    }

    if (importantSection) {
        importantSection.classList.remove("active");
    }


    /* Remove active navigation */

    navItems.forEach(function (item) {

        item.classList.remove("active");

    });


    /* Show selected section */

    if (
        section === "dashboard" &&
        dashboardSection
    ) {

        dashboardSection.style.display =
            "block";

    }


    if (
        section === "kanban" &&
        kanbanSection
    ) {

        kanbanSection.classList.add("active");

    }


    if (
        section === "calendar" &&
        calendarSection
    ) {

        calendarSection.classList.add("active");

        renderCalendar();

    }


    if (
        section === "important" &&
        importantSection
    ) {

        importantSection.classList.add("active");

        renderImportantPage();

    }


    /* Active navigation */

    const activeButton =
        document.querySelector(
            `.nav-item[data-section="${section}"]`
        );


    if (activeButton) {

        activeButton.classList.add("active");

    }


    /* Scroll to top */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}




function openAddTaskModal(dueDate = "") {

    if (!taskModal || !taskForm) {
        return;
    }


    modalTitle.textContent =
        "Add New Task 🌸";


    taskForm.reset();


    taskId.value = "";


    taskPriority.value =
        "medium";


    taskStatus.value =
        "todo";


    taskImportant.checked =
        false;


    taskDueDate.value =
        dueDate || "";


    taskModal.classList.add("show");


    setTimeout(function () {

        if (taskTitle) {
            taskTitle.focus();
        }

    }, 100);

}


window.openAddTaskModal =
    openAddTaskModal;




function openEditTaskModal(id) {

    const task =
        tasks.find(function (item) {

            return item.id === id;

        });


    if (!task) {
        return;
    }


    modalTitle.textContent =
        "Edit Task ✨";


    taskId.value =
        task.id;


    taskTitle.value =
        task.title || "";


    taskDescription.value =
        task.description || "";


    taskPriority.value =
        task.priority || "medium";


    taskStatus.value =
        task.status || "todo";


    taskDueDate.value =
        task.dueDate || "";


    taskImportant.checked =
        Boolean(task.important);


    taskModal.classList.add("show");

}



function setupTaskModal() {

    if (
        addTaskBtn &&
        taskModal &&
        taskForm
    ) {

        addTaskBtn.addEventListener(
            "click",
            function () {

                openAddTaskModal();

            }
        );

    }


    if (mobileAddTaskBtn) {

        mobileAddTaskBtn.addEventListener(
            "click",
            function () {

                openAddTaskModal();

            }
        );

    }


    if (closeTaskModal) {

        closeTaskModal.addEventListener(
            "click",
            closeTaskModalFunction
        );

    }


    if (cancelTask) {

        cancelTask.addEventListener(
            "click",
            closeTaskModalFunction
        );

    }


    if (taskModal) {

        taskModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === taskModal
                ) {

                    closeTaskModalFunction();

                }

            }
        );

    }


    if (taskForm) {

        taskForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                saveTaskFromForm();

            }
        );

    }

}


function saveTaskFromForm() {

    const title =
        taskTitle.value.trim();


    const description =
        taskDescription.value.trim();


    const priority =
        taskPriority.value;


    const status =
        taskStatus.value;


    const dueDate =
        taskDueDate.value;


    const important =
        taskImportant.checked;


    if (!title) {

        alert(
            "Please enter a task title 🌸"
        );

        return;

    }


    /* EDIT TASK */

    if (taskId.value) {

        const task =
            tasks.find(function (item) {

                return item.id === taskId.value;

            });


        if (task) {

            task.title =
                title;


            task.description =
                description;


            task.priority =
                priority;


            task.status =
                status;


            task.dueDate =
                dueDate;


            task.important =
                important;

        }

    }


    /* ADD NEW TASK */

    else {

        const newTask = {

            id:
                generateId(),

            title:
                title,

            description:
                description,

            priority:
                priority,

            status:
                status,

            dueDate:
                dueDate,

            important:
                important,

            notes:
                [],

            createdAt:
                new Date().toISOString()

        };


        tasks.unshift(newTask);

    }


    saveTasks();


    closeTaskModalFunction();


    renderEverything();

}




function closeTaskModalFunction() {

    if (taskModal) {

        taskModal.classList.remove("show");

    }


    if (taskForm) {

        taskForm.reset();

    }

}





function toggleImportant(id) {

    const task =
        tasks.find(function (item) {

            return item.id === id;

        });


    if (!task) {
        return;
    }


    task.important =
        !task.important;


    saveTasks();


    renderEverything();

}




function askDeleteTask(id) {

    const task =
        tasks.find(function (item) {

            return item.id === id;

        });


    if (!task) {
        return;
    }


    taskToDelete =
        id;


    if (deleteModal) {

        deleteModal.classList.add("show");

    }

}


function setupDeleteModal() {

    if (
        cancelDelete &&
        deleteModal
    ) {

        cancelDelete.addEventListener(
            "click",
            function () {

                taskToDelete = null;

                deleteModal.classList.remove(
                    "show"
                );

            }
        );

    }


    if (
        confirmDelete &&
        deleteModal
    ) {

        confirmDelete.addEventListener(
            "click",
            function () {

                if (!taskToDelete) {
                    return;
                }


                tasks =
                    tasks.filter(function (task) {

                        return (
                            task.id !==
                            taskToDelete
                        );

                    });


                saveTasks();


                taskToDelete = null;


                deleteModal.classList.remove(
                    "show"
                );


                renderEverything();

            }
        );

    }


    if (deleteModal) {

        deleteModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    deleteModal
                ) {

                    deleteModal.classList.remove(
                        "show"
                    );

                    taskToDelete = null;

                }

            }
        );

    }

}



function openNotesModal(id) {

    const task =
        tasks.find(function (item) {

            return item.id === id;

        });


    if (!task) {
        return;
    }


    currentNotesTaskId =
        id;


    if (!Array.isArray(task.notes)) {

        task.notes = [];

    }


    if (notesTaskTitle) {

        notesTaskTitle.textContent =
            task.title;

    }


    if (noteText) {

        noteText.value = "";

    }


    renderNotes();


    if (notesModal) {

        notesModal.classList.add("show");

    }

}


function setupNotesModal() {

    if (closeNotesModal) {

        closeNotesModal.addEventListener(
            "click",
            function () {

                closeNotesModalFunction();

            }
        );

    }


    if (notesModal) {

        notesModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === notesModal
                ) {

                    closeNotesModalFunction();

                }

            }
        );

    }


    if (noteForm) {

        noteForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                addNote();

            }
        );

    }

}


function closeNotesModalFunction() {

    if (notesModal) {

        notesModal.classList.remove(
            "show"
        );

    }


    currentNotesTaskId = null;

}


function addNote() {

    if (!noteText) {
        return;
    }


    const text =
        noteText.value.trim();


    if (!text) {
        return;
    }


    const task =
        tasks.find(function (item) {

            return (
                item.id ===
                currentNotesTaskId
            );

        });


    if (!task) {
        return;
    }


    if (!Array.isArray(task.notes)) {

        task.notes = [];

    }


    task.notes.push({

        id:
            generateId(),

        text:
            text,

        createdAt:
            new Date().toISOString()

    });


    saveTasks();


    noteText.value = "";


    renderNotes();


    renderEverything();

}


function editNote(noteId) {

    const task =
        tasks.find(function (item) {

            return (
                item.id ===
                currentNotesTaskId
            );

        });


    if (
        !task ||
        !task.notes
    ) {

        return;

    }


    const note =
        task.notes.find(function (item) {

            return item.id === noteId;

        });


    if (!note) {
        return;
    }


    const newText =
        prompt(
            "Edit your note:",
            note.text
        );


    if (
        newText === null ||
        newText.trim() === ""
    ) {

        return;

    }


    note.text =
        newText.trim();


    saveTasks();


    renderNotes();

}


function deleteNote(noteId) {

    const task =
        tasks.find(function (item) {

            return (
                item.id ===
                currentNotesTaskId
            );

        });


    if (
        !task ||
        !task.notes
    ) {

        return;

    }


    const confirmed =
        confirm(
            "Delete this note? 💕"
        );


    if (!confirmed) {
        return;
    }


    task.notes =
        task.notes.filter(function (note) {

            return note.id !== noteId;

        });


    saveTasks();


    renderNotes();

}


function renderNotes() {

    const task =
        tasks.find(function (item) {

            return (
                item.id ===
                currentNotesTaskId
            );

        });


    if (!task || !notesList) {
        return;
    }


    const notes =
        Array.isArray(task.notes)
            ? task.notes
            : [];


    if (notes.length === 0) {

        notesList.innerHTML = `
            <div class="empty-message">
                No notes yet. Add your first little note 💕
            </div>
        `;

        return;

    }


    notesList.innerHTML =
        notes.map(function (note) {

            return `

                <div class="note-item">

                    <div class="note-text">
                        ${escapeHTML(note.text)}
                    </div>

                    <div class="note-date">
                        ${formatDateTime(
                            note.createdAt
                        )}
                    </div>

                    <div class="note-actions">

                        <button
                            type="button"
                            onclick="editNote('${note.id}')"
                        >
                            ✏️
                        </button>

                        <button
                            type="button"
                            onclick="deleteNote('${note.id}')"
                        >
                            🗑️
                        </button>

                    </div>

                </div>

            `;

        }).join("");

}


window.openNotesModal =
    openNotesModal;

window.editNote =
    editNote;

window.deleteNote =
    deleteNote;




function renderEverything() {

    updateStatistics();

    renderKanban();

    renderDashboardImportant();

    renderImportantPage();

    renderRecentTasks();

    renderCalendar();

    updateChart();

}




function updateStatistics() {

    const total =
        tasks.length;


    const todo =
        tasks.filter(function (task) {

            return task.status === "todo";

        }).length;


    const progress =
        tasks.filter(function (task) {

            return task.status === "progress";

        }).length;


    const completed =
        tasks.filter(function (task) {

            return task.status === "completed";

        }).length;


    if (totalTasks) {
        totalTasks.textContent = total;
    }


    if (todoTasks) {
        todoTasks.textContent = todo;
    }


    if (progressTasks) {
        progressTasks.textContent = progress;
    }


    if (completedTasks) {
        completedTasks.textContent =
            completed;
    }


    if (todoCount) {
        todoCount.textContent = todo;
    }


    if (progressCount) {
        progressCount.textContent =
            progress;
    }


    if (completedCount) {
        completedCount.textContent =
            completed;
    }

}




function getFilteredTasks() {

    if (!searchInput) {
        return tasks;
    }


    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();


    /* Empty search = show everything */

    if (!searchTerm) {
        return tasks;
    }


    return tasks.filter(function (task) {

        const title =
            (task.title || "")
                .toLowerCase();


        const description =
            (task.description || "")
                .toLowerCase();


        const priority =
            (task.priority || "")
                .toLowerCase();


        const status =
            (task.status || "")
                .toLowerCase();


        return (

            title.includes(searchTerm)

            ||

            description.includes(searchTerm)

            ||

            priority.includes(searchTerm)

            ||

            status.includes(searchTerm)

        );

    });

}




function renderKanban() {

    if (
        !todoColumn ||
        !progressColumn ||
        !completedColumn
    ) {

        return;

    }


    const filteredTasks =
        getFilteredTasks();


    todoColumn.innerHTML = "";

    progressColumn.innerHTML = "";

    completedColumn.innerHTML = "";


    const todo =
        filteredTasks.filter(function (task) {

            return task.status === "todo";

        });


    const progress =
        filteredTasks.filter(function (task) {

            return task.status === "progress";

        });


    const completed =
        filteredTasks.filter(function (task) {

            return task.status === "completed";

        });


    renderColumn(
        todoColumn,
        todo,
        "No tasks here yet 🌱"
    );


    renderColumn(
        progressColumn,
        progress,
        "Nothing in progress ✨"
    );


    renderColumn(
        completedColumn,
        completed,
        "No completed tasks yet 🌸"
    );


    setupDragAndDrop();

}


function renderColumn(
    container,
    taskArray,
    emptyText
) {

    if (!container) {
        return;
    }


    if (taskArray.length === 0) {

        container.innerHTML = `
            <div class="empty-message">
                ${emptyText}
            </div>
        `;

        return;

    }


    taskArray.forEach(function (task) {

        container.appendChild(
            createTaskCard(task)
        );

    });

}




function createTaskCard(task) {

    const card =
        document.createElement("div");


    card.className =
        "task-card";


    card.draggable =
        true;


    card.dataset.id =
        task.id;


    const priorityText =
        getPriorityText(
            task.priority
        );


    const priorityClass =
        `priority-${task.priority || "medium"}`;


    let dueDateHTML = "";


    if (task.dueDate) {

        dueDateHTML = `

            <span class="badge due-date">
                📅 ${formatDate(task.dueDate)}
            </span>

        `;

    }


    card.innerHTML = `

        <button
            class="important-star ${
                task.important
                    ? "active"
                    : ""
            }"
            type="button"
            title="Important"
        >
            ${
                task.important
                    ? "⭐"
                    : "☆"
            }
        </button>


        <div class="task-title">
            ${escapeHTML(task.title)}
        </div>


        ${
            task.description
                ? `
                    <div class="task-description">
                        ${escapeHTML(
                            task.description
                        )}
                    </div>
                  `
                : ""
        }


        <div class="task-meta">

            <span class="badge ${priorityClass}">
                ${priorityText}
            </span>

            ${dueDateHTML}

        </div>


        <div class="task-actions">

            <button
                class="edit-btn"
                type="button"
            >
                ✏️ Edit
            </button>


            <button
                class="notes-btn"
                type="button"
            >
                📝 Notes
            </button>


            <button
                class="delete-btn"
                type="button"
            >
                🗑️ Delete
            </button>

        </div>

    `;


    /* Important button */

    const star =
        card.querySelector(
            ".important-star"
        );


    if (star) {

        star.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                toggleImportant(
                    task.id
                );

            }
        );

    }


    /* Edit button */

    const editButton =
        card.querySelector(
            ".edit-btn"
        );


    if (editButton) {

        editButton.addEventListener(
            "click",
            function () {

                openEditTaskModal(
                    task.id
                );

            }
        );

    }


    /* Notes button */

    const notesButton =
        card.querySelector(
            ".notes-btn"
        );


    if (notesButton) {

        notesButton.addEventListener(
            "click",
            function () {

                openNotesModal(
                    task.id
                );

            }
        );

    }


    /* Delete button */

    const deleteButton =
        card.querySelector(
            ".delete-btn"
        );


    if (deleteButton) {

        deleteButton.addEventListener(
            "click",
            function () {

                askDeleteTask(
                    task.id
                );

            }
        );

    }


    return card;

}




function setupDragAndDrop() {

    const cards =
        document.querySelectorAll(
            "#kanbanSection .task-card"
        );


    cards.forEach(function (card) {

        card.addEventListener(
            "dragstart",
            function () {

                card.classList.add(
                    "dragging"
                );

            }
        );


        card.addEventListener(
            "dragend",
            function () {

                card.classList.remove(
                    "dragging"
                );

            }
        );

    });


    const columns =
        document.querySelectorAll(
            ".task-list"
        );


    columns.forEach(function (column) {

        column.addEventListener(
            "dragover",
            function (event) {

                event.preventDefault();

            }
        );


        column.addEventListener(
            "drop",
            function (event) {

                event.preventDefault();


                const draggedCard =
                    document.querySelector(
                        ".task-card.dragging"
                    );


                if (!draggedCard) {
                    return;
                }


                const id =
                    draggedCard.dataset.id;


                let newStatus =
                    "todo";


                if (
                    column.id ===
                    "progressColumn"
                ) {

                    newStatus =
                        "progress";

                }


                if (
                    column.id ===
                    "completedColumn"
                ) {

                    newStatus =
                        "completed";

                }


                const task =
                    tasks.find(function (item) {

                        return item.id === id;

                    });


                if (task) {

                    task.status =
                        newStatus;

                }


                saveTasks();


                renderEverything();

            }
        );

    });

}




function renderDashboardImportant() {

    if (!importantTasks) {
        return;
    }


    const important =
        getFilteredTasks().filter(
            function (task) {

                return task.important;

            }
        );


    if (important.length === 0) {

        importantTasks.innerHTML = `
            <div class="empty-message">
                No important tasks found. 💕
            </div>
        `;

        return;

    }


    importantTasks.innerHTML =
        important
            .slice(0, 4)
            .map(function (task) {

                return createMiniTaskHTML(
                    task
                );

            })
            .join("");


    attachMiniTaskEvents(
        importantTasks
    );

}




function renderImportantPage() {

    if (!importantTaskList) {
        return;
    }


    const important =
        getFilteredTasks().filter(
            function (task) {

                return task.important;

            }
        );


    if (important.length === 0) {

        importantTaskList.innerHTML = `
            <div class="empty-message">
                No important tasks found. 🌸
            </div>
        `;

        return;

    }


    importantTaskList.innerHTML =
        important
            .map(function (task) {

                return createMiniTaskHTML(
                    task
                );

            })
            .join("");


    attachMiniTaskEvents(
        importantTaskList
    );

}




function renderRecentTasks() {

    if (!recentTasks) {
        return;
    }


    const filteredTasks =
        getFilteredTasks();


    if (filteredTasks.length === 0) {

        recentTasks.innerHTML = `
            <div class="empty-message">
                No tasks found. Try another search 🌷
            </div>
        `;

        return;

    }


    const recent =
        [...filteredTasks]
            .sort(function (a, b) {

                return (
                    new Date(
                        b.createdAt || 0
                    )
                    -
                    new Date(
                        a.createdAt || 0
                    )
                );

            })
            .slice(0, 5);


    recentTasks.innerHTML =
        recent
            .map(function (task) {

                return createMiniTaskHTML(
                    task
                );

            })
            .join("");


    attachMiniTaskEvents(
        recentTasks
    );

}




function createMiniTaskHTML(task) {

    return `

        <div
            class="task-card"
            data-id="${task.id}"
        >

            <button
                class="important-star ${
                    task.important
                        ? "active"
                        : ""
                }"
                type="button"
            >
                ${
                    task.important
                        ? "⭐"
                        : "☆"
                }
            </button>


            <div class="task-title">
                ${escapeHTML(task.title)}
            </div>


            ${
                task.description
                    ? `
                        <div class="task-description">
                            ${escapeHTML(
                                task.description
                            )}
                        </div>
                      `
                    : ""
            }


            <div class="task-meta">

                <span
                    class="badge priority-${
                        task.priority || "medium"
                    }"
                >
                    ${getPriorityText(
                        task.priority
                    )}
                </span>


                ${
                    task.dueDate
                        ? `
                            <span class="badge due-date">
                                📅 ${formatDate(
                                    task.dueDate
                                )}
                            </span>
                          `
                        : ""
                }

            </div>


            <div class="task-actions">

                <button
                    class="edit-btn"
                    type="button"
                >
                    ✏️ Edit
                </button>


                <button
                    class="notes-btn"
                    type="button"
                >
                    📝 Notes
                </button>


                <button
                    class="delete-btn"
                    type="button"
                >
                    🗑️ Delete
                </button>

            </div>

        </div>

    `;

}




function attachMiniTaskEvents(container) {

    if (!container) {
        return;
    }


    container
        .querySelectorAll(".task-card")
        .forEach(function (card) {

            const id =
                card.dataset.id;


            const star =
                card.querySelector(
                    ".important-star"
                );


            const edit =
                card.querySelector(
                    ".edit-btn"
                );


            const notes =
                card.querySelector(
                    ".notes-btn"
                );


            const deleteButton =
                card.querySelector(
                    ".delete-btn"
                );


            if (star) {

                star.addEventListener(
                    "click",
                    function () {

                        toggleImportant(id);

                    }
                );

            }


            if (edit) {

                edit.addEventListener(
                    "click",
                    function () {

                        openEditTaskModal(id);

                    }
                );

            }


            if (notes) {

                notes.addEventListener(
                    "click",
                    function () {

                        openNotesModal(id);

                    }
                );

            }


            if (deleteButton) {

                deleteButton.addEventListener(
                    "click",
                    function () {

                        askDeleteTask(id);

                    }
                );

            }

        });

}




function setupCalendar() {

    if (previousMonth) {

        previousMonth.addEventListener(
            "click",
            function () {

                currentCalendarDate.setMonth(
                    currentCalendarDate.getMonth() - 1
                );


                renderCalendar();

            }
        );

    }


    if (nextMonth) {

        nextMonth.addEventListener(
            "click",
            function () {

                currentCalendarDate.setMonth(
                    currentCalendarDate.getMonth() + 1
                );


                renderCalendar();

            }
        );

    }

}




function renderCalendar() {

    if (!calendarGrid) {
        return;
    }


    const year =
        currentCalendarDate.getFullYear();


    const month =
        currentCalendarDate.getMonth();


    const monthName =
        currentCalendarDate.toLocaleString(
            "en-US",
            {
                month: "long",
                year: "numeric"
            }
        );


    if (calendarTitle) {

        calendarTitle.textContent =
            monthName;

    }


    calendarGrid.innerHTML = "";


    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    /* Empty spaces */

    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "calendar-day empty";


        calendarGrid.appendChild(
            empty
        );

    }


    /* Calendar days */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const dayElement =
            document.createElement(
                "div"
            );


        dayElement.className =
            "calendar-day";


        const dateString =
            makeDateString(
                year,
                month,
                day
            );


        /* Today */

        if (
            dateString ===
            getTodayString()
        ) {

            dayElement.classList.add(
                "today"
            );

        }


        dayElement.innerHTML = `
            <span>${day}</span>
        `;


        /* Tasks on this date */

        const dateTasks =
            tasks.filter(function (task) {

                return (
                    task.dueDate ===
                    dateString
                );

            });


        dateTasks.forEach(
            function (task) {

                const taskElement =
                    document.createElement(
                        "div"
                    );


                taskElement.className =
                    "calendar-task";


                taskElement.textContent =
                    task.title;


                taskElement.title =
                    "Click to edit";


                taskElement.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();


                        openEditTaskModal(
                            task.id
                        );

                    }
                );


                dayElement.appendChild(
                    taskElement
                );

            }
        );


        

        dayElement.addEventListener(
            "click",
            function () {

                openAddTaskModal(
                    dateString
                );

            }
        );


        calendarGrid.appendChild(
            dayElement
        );

    }

}




function makeDateString(
    year,
    month,
    day
) {

    return (
        year +
        "-" +
        String(month + 1).padStart(
            2,
            "0"
        ) +
        "-" +
        String(day).padStart(
            2,
            "0"
        )
    );

}




function getTodayString() {

    const today =
        new Date();


    return makeDateString(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

}




function setupSearch() {

    if (!searchInput) {
        return;
    }


    searchInput.addEventListener(
        "input",
        function () {

            renderEverything();

        }
    );

}




function updateChart() {

    const canvas =
        document.getElementById(
            "taskChart"
        );


    if (!canvas) {
        return;
    }


    if (
        typeof Chart ===
        "undefined"
    ) {

        console.warn(
            "Chart.js was not loaded."
        );

        return;

    }


    const todo =
        tasks.filter(function (task) {

            return task.status === "todo";

        }).length;


    const progress =
        tasks.filter(function (task) {

            return task.status === "progress";

        }).length;


    const completed =
        tasks.filter(function (task) {

            return task.status === "completed";

        }).length;


    if (taskChart) {

        taskChart.destroy();

    }


    taskChart =
        new Chart(
            canvas.getContext("2d"),
            {

                type:
                    "doughnut",


                data: {

                    labels: [
                        "To Do",
                        "In Progress",
                        "Completed"
                    ],


                    datasets: [

                        {

                            data: [
                                todo,
                                progress,
                                completed
                            ],


                            backgroundColor: [
                                "#ff9fc0",
                                "#b796e6",
                                "#8bd5a5"
                            ],


                            borderColor: [
                                "#ffffff",
                                "#ffffff",
                                "#ffffff"
                            ],


                            borderWidth:
                                3

                        }

                    ]

                },


                options: {

                    responsive:
                        true,


                    maintainAspectRatio:
                        false,


                    cutout:
                        "65%",


                    plugins: {

                        legend: {

                            position:
                                "bottom",


                            labels: {

                                usePointStyle:
                                    true,


                                padding:
                                    15,


                                font: {

                                    family:
                                        "Quicksand",


                                    size:
                                        11

                                }

                            }

                        }

                    }

                }

            }
        );

}




function generateId() {

    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substring(2, 8)
    );

}


function getPriorityText(priority) {

    if (
        priority ===
        "low"
    ) {

        return "🌱 Low";

    }


    if (
        priority ===
        "high"
    ) {

        return "💖 High";

    }


    return "🌷 Medium";

}


function formatDate(dateString) {

    if (!dateString) {
        return "";
    }


    const parts =
        dateString.split("-");


    if (parts.length !== 3) {
        return dateString;
    }


    const date =
        new Date(
            Number(parts[0]),
            Number(parts[1]) - 1,
            Number(parts[2])
        );


    return date.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function formatDateTime(dateString) {

    if (!dateString) {
        return "";
    }


    const date =
        new Date(dateString);


    return date.toLocaleString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}




function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value == null
            ? ""
            : String(value);


    return div.innerHTML;

}




window.openEditTaskModal =
    openEditTaskModal;


window.toggleImportant =
    toggleImportant;


window.askDeleteTask =
    askDeleteTask;




if ("serviceWorker" in navigator) {

    window.addEventListener("load", function () {

        navigator.serviceWorker
            .register("./sw.js")
            .then(function () {

                console.log(
                    "🌸 TaskBloom app is ready!"
                );

            })
            .catch(function (error) {

                console.error(
                    "Service Worker registration failed:",
                    error
                );

            });

    });

}