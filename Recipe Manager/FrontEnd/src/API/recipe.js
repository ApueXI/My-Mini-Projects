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

export const getRecipe = async () => {
    try {
        const response = await fetch("/api/recipe/data");
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

export const updateRecipe = async (data_to_send, id) => {
    const formData = new FormData();

    for (let key in data_to_send) {
        formData.append(key, data_to_send[key]);
    }

    try {
        const response = await fetch(`/api/recipe/update/${id}`, {
            method: "PUT",
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

export const searchRecipe = async (query) => {
    try {
        const response = await fetch(`/api/recipe/search?query=${query}`);
        const data = await response.json();

        console.log("------------------------------------");
        console.log({ response, data });
        console.log(
            `Send to the backend: ${data ? "success" : "error"} \nStatus: ${
                response.status
            } \nFrom updateRecipe`
        );
        console.log("------------------------------------");

        return data.result
    } catch (e) {
        console.error(`Error occured: ${e}`);
    }
};
