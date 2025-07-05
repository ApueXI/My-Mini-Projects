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
    const datas = await response.json();

    updateHabitTxtArea.value = "";
    habitData.value = "";
    createLoopHabit(datas);
}

// hadnles the display of streak calendar
async function fetched_Calendar(apiURL) {
    const sunday_text = document.getElementsByClassName("sunday");
    const monday_text = document.getElementsByClassName("monday");
    const tuesday_text = document.getElementsByClassName("tuesday");
    const wednesday_text = document.getElementsByClassName("wednesday");
    const thursday_text = document.getElementsByClassName("thursday");
    const friday_text = document.getElementsByClassName("friday");
    const saturday_text = document.getElementsByClassName("saturday");
    const response = await fetch(apiURL);
    const datas = await response.json();

    for (let index = 0; index < datas.length; index++) {
        datas[index].sunday == true
            ? (sunday_text[index].style.backgroundColor = "red")
            : (sunday_text[index].style.backgroundColor = "#a78bfa");

        datas[index].monday == true
            ? (monday_text[index].style.backgroundColor = "red")
            : (monday_text[index].style.backgroundColor = "#a78bfa");

        datas[index].tuesday == true
            ? (tuesday_text[index].style.backgroundColor = "red")
            : (tuesday_text[index].style.backgroundColor = "#a78bfa");

        datas[index].wednesday == true
            ? (wednesday_text[index].style.backgroundColor = "red")
            : (wednesday_text[index].style.backgroundColor = "#a78bfa");

        datas[index].thursday == true
            ? (thursday_text[index].style.backgroundColor = "red")
            : (thursday_text[index].style.backgroundColor = "#a78bfa");

        datas[index].friday == true
            ? (friday_text[index].style.backgroundColor = "red")
            : (friday_text[index].style.backgroundColor = "#a78bfa");

        datas[index].saturday == true
            ? (saturday_text[index].style.backgroundColor = "red")
            : (saturday_text[index].style.backgroundColor = "#a78bfa");
    }
}

// Handles the streak calendar to the backend
async function sendStreakData({
    // accepts these kinds of parameter and defaults to false if no given value
    streakURL,
    sundayD = false,
    mondayD = false,
    tuesdayD = false,
    wednesdayD = false,
    thursdayD = false,
    fridayD = false,
    saturdayD = false,
}) {
    const streak_to_send = {
        // The data to send in the backend
        sunday: sundayD,
        monday: mondayD,
        tuesday: tuesdayD,
        wednesday: wednesdayD,
        thursday: thursdayD,
        friday: fridayD,
        saturday: saturdayD,
    };

    const response = await fetch(streakURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(streak_to_send),
    });
    const parsedData = await response.json();

    console.log("------------------------------------");
    console.log(response);
    console.log(parsedData);
    console.log(
        `Send to the backend: ${parsedData.status} \nStatus: ${response.status} \nFrom JS File`
    );
    console.log("------------------------------------");
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
    console.log("------------------------------------");
    console.log(response);
    console.log(data);
    console.log(
        `Sent to the backend: ${data.status} \nStatus: ${response.status} \nFrom JS File`
    );
    console.log("------------------------------------");

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
    console.log("------------------------------------");
    console.log(response);
    console.log(data);
    console.log(
        `Send to the backend: ${data.status} \nStatus: ${response.status} \nFrom JS File`
    );
    console.log("------------------------------------");

    container.innerHTML = "";
    fetchData(apiURL);
}

// Sends a delete habit to the backend
async function deleteHabit(deleteURL) {
    const response = await fetch(deleteURL, {
        method: "DELETE",
    });

    const data = await response.json();
    console.log("------------------------------------");
    console.log(response);
    console.log(data);
    console.log(
        `Send to the backend: ${data.status} \nStatus ${response.status} \nFrom JS File`
    );
    console.log("------------------------------------");

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
                <th class="sunday">S</th>
                <th class="monday">M</th>
                <th class="tuesday">T</th>
                <th class="wednesday">W</th>
                <th class="thursday">T</th>
                <th class="friday">F</th>
                <th class="saturday">S</th>
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
    const fullURL = `${streakURL}${data.id}`;

    let isTrueSunday = !!data.sunday;
    let isTrueMonday = !!data.monday;
    let isTrueTuesday = !!data.tuesday;
    let isTrueWednesday = !!data.wednesday;
    let isTrueThursday = !!data.thursday;
    let isTrueFriday = !!data.friday;
    let isTrueSaturday = !!data.saturday;

    const sundayBtn = div.querySelector(".sundayBtn");
    const mondayBtn = div.querySelector(".mondayBtn");
    const tuesdayBtn = div.querySelector(".tuesdayBtn");
    const wednesdayBtn = div.querySelector(".wednesdayBtn");
    const thursdayBtn = div.querySelector(".thursdayBtn");
    const fridayBtn = div.querySelector(".fridayBtn");
    const saturdayBtn = div.querySelector(".saturdayBtn");

    const updateBtn = div.querySelector(".updateBtn");
    const deleteBtn = div.querySelector(".deleteBtn");

    const sundayText = div.querySelector(".sunday");
    const mondayText = div.querySelector(".monday");
    const tuesdayText = div.querySelector(".tuesday");
    const wednesdayText = div.querySelector(".wednesday");
    const thursdayText = div.querySelector(".thursday");
    const fridayText = div.querySelector(".friday");
    const saturdayText = div.querySelector(".saturday");

    sundayBtn.addEventListener("click", () => {
        if (isTrueSunday) {
            isTrueSunday = false;
            sundayText.style.backgroundColor = "#a78bfa";
        } else {
            isTrueSunday = true;
            sundayText.style.backgroundColor = "red";
        }

        sendStreakData({ streakURL: fullURL, sundayD: isTrueSunday });
    });
    mondayBtn.addEventListener("click", () => {
        if (isTrueMonday) {
            isTrueMonday = false;
            mondayText.style.backgroundColor = "#a78bfa";
        } else {
            isTrueMonday = true;
            mondayText.style.backgroundColor = "red";
        }

        sendStreakData({ streakURL: fullURL, mondayD: isTrueMonday });
    });
    tuesdayBtn.addEventListener("click", () => {
        if (isTrueTuesday) {
            isTrueTuesday = false;
            tuesdayText.style.backgroundColor = "#a78bfa";
        } else {
            isTrueTuesday = true;
            tuesdayText.style.backgroundColor = "red";
        }

        sendStreakData({ streakURL: fullURL, tuesdayD: isTrueTuesday });
    });
    wednesdayBtn.addEventListener("click", () => {
        if (isTrueWednesday) {
            isTrueWednesday = false;
            wednesdayText.style.backgroundColor = "#a78bfa";
        } else {
            isTrueWednesday = true;
            wednesdayText.style.backgroundColor = "red";
        }

        sendStreakData({ streakURL: fullURL, wednesdayD: isTrueWednesday });
    });
    thursdayBtn.addEventListener("click", () => {
        if (isTrueThursday) {
            isTrueThursday = false;
            thursdayText.style.backgroundColor = "#a78bfa";
        } else {
            isTrueThursday = true;
            thursdayText.style.backgroundColor = "red";
        }

        sendStreakData({ streakURL: fullURL, thursdayD: isTrueThursday });
    });
    fridayBtn.addEventListener("click", () => {
        if (isTrueFriday) {
            isTrueFriday = false;
            fridayText.style.backgroundColor = "#a78bfa";
        } else {
            isTrueFriday = true;
            fridayText.style.backgroundColor = "red";
        }

        sendStreakData({ streakURL: fullURL, fridayD: isTrueFriday });
    });
    saturdayBtn.addEventListener("click", () => {
        if (isTrueSaturday) {
            isTrueSaturday = false;
            saturdayText.style.backgroundColor = "#a78bfa";
        } else {
            isTrueSaturday = true;
            saturdayText.style.backgroundColor = "red";
        }

        sendStreakData({ streakURL: fullURL, saturdayD: isTrueSaturday });
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
fetchData(apiURL);
// fetched_Calendar(apiURL);
