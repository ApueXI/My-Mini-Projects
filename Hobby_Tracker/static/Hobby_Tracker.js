// Gets DOM Elements
const addNewHabit = document.getElementById("addNewHabit");
const addHabitData = document.getElementById("addHabitData");
const updateHabitData = document.getElementById("updateHabitData");
const exitButton = document.getElementById("exitButton");
const submitData = document.getElementById("submitData");
const updateSubmit = document.getElementById("updateSubmit");
const container = document.getElementById("containerForHabbit");
const exitBtnForUpdate = document.getElementById("exitButtonForUpdate");
const confirmBtn = document.getElementById("confirmDelete");
const cancelBtn = document.getElementById("cancelDelete");
const deleteHabitData = document.getElementById("deleteHabitData");
const updateHabitTxtArea = document.getElementById("updateHabitTxtarea");
const habitData = document.getElementById("habitData");

// Displays the add a new habit
addNewHabit.addEventListener("click", () => {
    addHabitData.style.display = "flex";
    updateHabitData.style.display = "none";
    deleteHabitData.style.display = "none";
    console.log("Add form opened");
});

// Exit BUtton for add a new Habit
exitButton.addEventListener("click", () => {
    addHabitData.style.display = "none";
    console.log("Add form closed");
});

// Exit Button for the update Habit
exitBtnForUpdate.addEventListener("click", () => {
    updateHabitData.style.display = "none";
    console.log("closed update button");
});

// Submit Button for add a new habit
submitData.addEventListener("click", (e) => {
    const habitData = document.getElementById("habitData").value;

    // To prevent page refresh
    e.preventDefault();

    sendData(sendURL, habitData);
});

// Cancel Button for the Delete Button
cancelBtn.addEventListener("click", () => {
    deleteHabitData.style.display = "none";
});

// Submit the Updated Habit
updateSubmit.addEventListener("click", handleUpdateSubmit);

// Confirm the delete habit
confirmBtn.addEventListener("click", handleDeleteSubmit);

// Fetches the habit data from the backend for it then to be displayed
async function fetchData(apiURL) {
    const response = await fetch(apiURL);
    const data = await response.json();

    updateHabitTxtArea.value = "";
    habitData.value = "";
    createLoopHabit(data);
}

// Sends a new habit to the backend
async function sendData(sendURL, habitData) {
    const data_To_Send = { content: habitData };
    const response = await fetch(sendURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data_To_Send),
    });

    const data = await response.json();
    console.log(response);
    console.log(data);
    console.log(
        `Sent to the backend: ${data.status} \nStatus: ${response.status}`
    );

    addHabitData.style.display = "none";

    container.innerHTML = "";
    fetchData(apiURL);
}

// Sends an updated habit to the backend
async function updateHabit(updateURL, updatedHabitData) {
    const data_to_update = { content: updatedHabitData };
    const response = await fetch(updateURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data_to_update),
    });

    const data = await response.json();
    console.log(response);
    console.log(data);
    console.log(
        `Send to the backend: ${data.status} \nStatus: ${response.status}`
    );

    container.innerHTML = "";
    fetchData(apiURL);
}

// Sends a delete habit to the backend
async function deleteHabit(deleteURL) {
    const response = await fetch(deleteURL, {
        method: "DELETE",
    });

    const data = await response.json();
    console.log(response);
    console.log(data);
    console.log(
        `Send to the backend: ${data.status} \nStatus ${response.status}`
    );
    container.innerHTML = "";
    fetchData(apiURL);
}

// Loops through the habit for it to be displayed
function createLoopHabit(data) {
    const fragment = document.createDocumentFragment();

    data.forEach((habit) => {
        const div = document.createElement("div");
        const titleEl = document.createElement("h3");
        const streakText = document.createElement("p");
        const table = document.createElement("table");

        div.classList.add("habits");
        titleEl.classList.add("theHabit");
        titleEl.textContent = habit.content;
        streakText.classList.add("habitStreak");
        streakText.textContent = `Streak: 0 days`;
        table.classList.add("tableContainer");

        // Then create the rest of your calendar table in DOM:
        table.innerHTML = `
            <tr>
                <th>Calendar:</th>
                <th>S</th>
                <th>M</th>
                <th>T</th>
                <th>W</th>
                <th>T</th>
                <th>F</th>
                <th>S</th>
            </tr>
            <tr class="rowButton">
                <td>
                    <button class="updateBtn">Update</button
                    ><button class="deleteBtn">Delete</button>
                </td>
                <td><button class="sundayBtn">X</button></td>
                <td><button class="mondayBtn">X</button></td>
                <td><button class="tuesdayBtn">X</button></td>
                <td><button class="wednesdayBtn">X</button></td>
                <td><button class="thursdayBtn">X</button></td>
                <td><button class="fridayBtn">X</button></td>
                <td><button class="saturdayBtn">X</button></td>
            </tr>
        `;

        // Append title first
        div.appendChild(titleEl);
        div.appendChild(streakText);
        div.appendChild(table);
        fragment.appendChild(div);

        selectButtons(div, habit);
    });

    container.appendChild(fragment);
}

// Give each button from the table row a function
function selectButtons(div, data) {
    const sundayBtn = div.querySelector(".sundayBtn");
    const mondayBtn = div.querySelector(".mondayBtn");
    const tuesdayBtn = div.querySelector(".tuesdayBtn");
    const wednesdayBtn = div.querySelector(".wednesdayBtn");
    const thursdayBtn = div.querySelector(".thursdayBtn");
    const fridayBtn = div.querySelector(".fridayBtn");
    const saturdayBtn = div.querySelector(".saturdayBtn");
    const updateBtn = div.querySelector(".updateBtn");
    const deleteBtn = div.querySelector(".deleteBtn");

    sundayBtn.addEventListener("click", () => {
        document.body.style.backgroundColor = "black";
        console.log(data.id);
    });
    mondayBtn.addEventListener("click", () => {
        document.body.style.backgroundColor = "white";
        console.log(data.id);
    });
    tuesdayBtn.addEventListener("click", () => {
        document.body.style.backgroundColor = "black";
        console.log(data.id);
    });
    wednesdayBtn.addEventListener("click", () => {
        document.body.style.backgroundColor = "white";
        console.log(data.id);
    });
    thursdayBtn.addEventListener("click", () => {
        document.body.style.backgroundColor = "black";
        console.log(data.id);
    });
    fridayBtn.addEventListener("click", () => {
        document.body.style.backgroundColor = "white";
        console.log(data.id);
    });
    saturdayBtn.addEventListener("click", () => {
        document.body.style.backgroundColor = "black";
        console.log(data.content);
    });
    updateBtn.addEventListener("click", () => {
        updateHabitData.style.display = "flex"; // show the update form
        addHabitData.style.display = "none";
        deleteHabitData.style.display = "none";

        console.log("Update Form opened");
        console.log(data.id);
        console.log("");

        // store the ID globally so the submit knows what to update
        handleUpdateSubmit.currentId = data.id;
    });
    deleteBtn.addEventListener("click", () => {
        deleteHabitData.style.display = "flex";
        updateHabitData.style.display = "none";
        addHabitData.style.display = "none";

        handleDeleteSubmit.currentId = data.id;
    });
}

// Function that updates the habit
function handleUpdateSubmit(e) {
    e.preventDefault();
    const updatedHabitData =
        document.getElementById("updateHabitTxtarea").value;
    const fullUrl = `${updateURL}${handleUpdateSubmit.currentId}`;

    updateHabitData.style.display = "none";
    console.log(`The full url: ${fullUrl}`);
    console.log(`The update submit: ${handleUpdateSubmit.currentId}`);
    console.log("");

    updateHabit(fullUrl, updatedHabitData);
}

// function that deletes the habit
function handleDeleteSubmit(e) {
    e.preventDefault();
    const fullDeleteURL = `${deleteURL}${handleDeleteSubmit.currentId}`;

    deleteHabitData.style.display = "none";
    console.log(`The Full URL: ${fullDeleteURL}`);
    console.log(`The delete submit: ${handleDeleteSubmit.currentId}`);
    console.log("");

    updateHabitTxtArea.textContent = "";
    deleteHabit(fullDeleteURL);
}

// displays the habit data
// Testing in the second branch
fetchData(apiURL);
