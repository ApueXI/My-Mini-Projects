import { useRef } from "react";

export default function AddRecipe({ hide, onSubmit, mode = "add" }) {
    // gets the Element of the ref
    const titleData = useRef(null);
    const ingredientsData = useRef(null);
    const instructionsData = useRef(null);
    const imageFileData = useRef(null);

    // submits the updated data
    // partial update, only sends the data when it is filled
    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedData = {};

        if (titleData.current.value.trim() !== "")
            updatedData.title = titleData.current.value.trim();

        if (ingredientsData.current.value.trim() !== "")
            updatedData.ingredients = ingredientsData.current.value.trim();

        if (instructionsData.current.value.trim() !== "")
            updatedData.instructions = instructionsData.current.value.trim();

        if (imageFileData.current.files?.[0])
            updatedData.image_file = imageFileData.current.files[0];

        onSubmit(updatedData);

        if (mode === "add") {
            titleData.current.value = "";
            ingredientsData.current.value = "";
            instructionsData.current.value = "";
            if (imageFileData.current) imageFileData.current.value = "";
        }
    };

    return (
        <div className="fixed z-10 h-[clamp(250px,55vh,500px)] w-[clamp(100px,80vw,500px)] top-[175px] flex justify-center items-center flex-col rounded-lg bg-[hsl(0,0%,90%)] ">
            <div className="absolute flex justify-between w-[90%] items-center top-2 px-2">
                <h1 className="px-2 inline-block py-1 text-2xl rounded-md bg-color-neutral-dark-text-blue text-color-bg-light-blue">
                    {mode == "add" ? "Add Recipe" : "Edit Recipe"}
                </h1>
                <button
                    onClick={hide}
                    className="cursor-pointer bg-color-primary-accent-blue text-color-bg-light-blue px-2 py-1 rounded-lg hover:bg-[hsl(217,91%,50%)] hover:scale-110 active:bg-[hsl(217,91%,50%)] active:scale-115 transi"
                >
                    Back
                </button>
            </div>
            <form
                className="relative bg-color-secondary-accent-blue shadow-[2px_0_5px_black,-2px_0_5px_black] w-[90%] h-[80%] mt-10 sm:py-7 px-10 rounded-xl"
                onSubmit={handleSubmit}
            >
                <div className="formContent">
                    <label htmlFor="title">Name:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        ref={titleData}
                        required={mode === "add"}
                        className="bg-white w-full sm:ml-5 font-bold"
                    />
                </div>

                <div className="formContent">
                    <label htmlFor="imgURL" className="w-[300px] line-clamp-2">
                        Upload Image (.png, .jpg )
                    </label>
                    <input
                        type="file"
                        id="imgURL"
                        name="imgURL"
                        ref={imageFileData}
                        accept="image/png, image/jpeg"
                        required={mode === "add"}
                        className="w-full bg-white px-2"
                    />
                </div>

                <div className="formContent">
                    <label htmlFor="ingredients">Ingredients:</label>
                    <textarea
                        id="ingredients"
                        name="ingredients"
                        ref={ingredientsData}
                        required={mode === "add"}
                        className="bg-white w-full sm:ml-4 rounded-sm"
                    ></textarea>
                </div>

                <div className="formContent">
                    <label htmlFor="instructions">Instructions</label>
                    <textarea
                        id="instructions"
                        name="instructions"
                        ref={instructionsData}
                        required={mode === "add"}
                        className="bg-white w-full sm:ml-4 rounded-sm"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="absolute bottom-3 right-5 font-bold bg-color-primary-accent-blue text-color-bg-light-blue px-2 py-1 rounded-lg hover:bg-[hsl(217,91%,50%)] hover:scale-110 transi cursor-pointer"
                >
                    {mode == "add" ? "Save Recipe" : "Update Recipe"}
                </button>
            </form>
        </div>
    );
}

// ---------------------------------------------------
// | [Back]                                         |
// | Recipe Form                                    |
// | - Title                                        |
// | - Image URL                                    |
// | - Ingredients (textarea or multi-field)        |
// | - Instructions (textarea)                      |
// | [Save Recipe]                                  |
// ---------------------------------------------------
