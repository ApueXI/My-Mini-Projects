export const sendRecipe = async (dataToSend) => {
    const formData = new FormData();

    for (let key in dataToSend) {
        formData.append(key, dataToSend[key]);
    }

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
};

export const getRecipe = async () => {
    const response = await fetch("/api/recipe/data");
    const data = await response.json();

    console.log("------------------------------------");
    console.log({ response, data });
    console.log(
        `Send to the backend: ${data ? "success" : "success"} \nStatus: ${response.status} \nFrom getRecipe`
    );
    console.log("------------------------------------");

    return data
};
