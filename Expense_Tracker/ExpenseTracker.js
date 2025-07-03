const showAddItem = document.getElementById("showAddItem");
const exitButton = document.getElementById("exitButton");
const addItem = document.getElementById("addItem");
const itemValue = document.getElementById("itemValue");
const expenseValue = document.getElementById("expenseValue");
const categoryValue = document.getElementById("categoryValue");
const reasonValue = document.getElementById("reasonValue");
const dateValue = document.getElementById("dateValue");
const theTableData = document.getElementById("tableData");

let isShow = false;

showAddItem.addEventListener("click", () => {
    addItem.style.display = "flex";
    isShow = true;
});

exitButton.addEventListener("click", () => {
    addItem.style.display = "none";
    isShow = false;
});

async function getExpenseData() {
    const jsonFile = await fetch("ExpenseTrackerDB.json");

    return await jsonFile.json();
}

function submitData(data) {
    isShow = false;
}
