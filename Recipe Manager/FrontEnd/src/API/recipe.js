// Sends a fetch to the POST API
export const sendRecipe = async (dataToSend) => {
    const formData = new FormData();

    for (let key in dataToSend) {
        formData.append(key, dataToSend[key]);
    }

    try {
        const response = await fetch("/api/recipe", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();

        console.log("------------------------------------");
        console.log({ response, data });
        console.log(
            `Send to the backend: ${data.status} \nStatus: ${response.status} \nFrom sendRecipe`
        );
        console.log("------------------------------------");
    } catch (e) {
        console.error(`Error occured: ${e}`);
    }
};

// Sends a fetch to the GET API for the FrontEnd to display the data
export const getRecipe = async (sort = "asc") => {
    try {
        const response = await fetch(`/api/recipe/data?sort=${sort}`);
        const data = await response.json();

        console.log("------------------------------------");
        console.log({ response, data });
        console.log(
            `Send to the backend: ${data ? "success" : "error"} \nStatus: ${
                response.status
            } \nFrom getRecipe`
        );
        console.log("------------------------------------");

        return data;
    } catch (e) {
        console.error(`Error occured: ${e}`);
    }
};

// Sends a fetch to the GET API then delete it
export const deleteRecipe = async (id) => {
    try {
        const response = await fetch(`/api/recipe/delete/${id}`, {
            method: "DELETE",
        });

        const data = await response.json();

        console.log("------------------------------------");
        console.log({ response, data });
        console.log(
            `Send to the backend: ${data ? "success" : "error"} \nStatus: ${
                response.status
            } \nFrom deleteRecipe`
        );
        console.log("------------------------------------");
    } catch (e) {
        console.error(`Error occured: ${e}`);
    }
};

// Sends a fetch to the PATCH API to update certain data
export const updateRecipe = async (data_to_send, id) => {
    const formData = new FormData();

    for (let key in data_to_send) {
        formData.append(key, data_to_send[key]);
    }

    try {
        const response = await fetch(`/api/recipe/update/${id}`, {
            method: "PATCH",
            body: formData,
        });

        const data = await response.json();

        console.log("------------------------------------");
        console.log({ response, data });
        console.log(
            `Send to the backend: ${data ? "success" : "error"} \nStatus: ${
                response.status
            } \nFrom updateRecipe`
        );
        console.log("------------------------------------");
    } catch (e) {
        console.error(`Error occured: ${e}`);
    }
};

// Sends a fetch to the GET API so the front end can display the searched data
export const searchRecipe = async (query, sort = "asc") => {
    try {
        const response = await fetch(
            `/api/recipe/search?query=${query}&sort=${sort}`
        );
        const data = await response.json();

        console.log("------------------------------------");
        console.log({ response, data });
        console.log(
            `Send to the backend: ${data ? "success" : "error"} \nStatus: ${
                response.status
            } \nFrom updateRecipe`
        );
        console.log("------------------------------------");

        if (data.ok) {
            console.log(data.result);
            return data.result;
        } else {
            console.warn("There is no querry");
            console.warn(`Message from backend: ${data.message}`);
            return [];
        }
    } catch (e) {
        console.error(`Error occured: ${e}`);
        return [];
    }
};
