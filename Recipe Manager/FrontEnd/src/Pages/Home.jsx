import "../main.css";
import { useState, useEffect } from "react";
import RecipeCard from "../Component/RecipeCard";
import AddRecipe from "../Component/AddRecipe";
import { sendRecipe, getRecipe } from "../API/recipe";

export default function Home() {
    const [dropDown, setDropDown] = useState(false);
    const [isAddRecipe, setIsAddRecipe] = useState(false);
    const [recipes, setRecipe] = useState([]);
    const [loading, setLoading] = useState(true);

    const isDropDown = () => setDropDown(!dropDown);

    const addRecipeShow = () => setIsAddRecipe(true);
    const addRecipeHide = () => setIsAddRecipe(false);

    useEffect(() => {
        const loadRecipe = async () => {
            try {
                const recipeData = await getRecipe();
                setRecipe(recipeData);
                console.info(`Data: ${recipeData ? "success" : "error"}`);
            } catch (e) {
                console.error(`No recipe from data \nError: ${e}`);
            } finally {
                console.info(`This process is complete`);
                setLoading(false);
            }
        };

        loadRecipe();
    }, []);

    const dropDownBtn = () => {
        alert(`Button has been pressed`);
    };

    const submitData = async (formData) => {
        await sendRecipe(formData);
        setIsAddRecipe(false);

        const updatedRecipe = await getRecipe();
        setRecipe(updatedRecipe);
    };

    return (
        <div className="w-full">
            <div className="flex justify-between bg-color-neutral-dark-text-blue px-[30px] py-[30px]">
                <h1 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold bg-color-primary-accent-blue px-[15px] py-[15px] rounded-xl shadow-[3px_0_5px_black,-3px_0_5px_black]">
                    Recipe Manager
                </h1>
                <button
                    onClick={addRecipeShow}
                    className="mr-[clamp(20px, 10vw, 40px)] text-[clamp(.9rem,4vw,1.6rem)] font-bold px-[10px] my-[10px] rounded-lg bg-color-secondary-accent-blue hover:bg-[hsl(213,94%,48%)] hover:scale-[1.1] transi cursor-pointer"
                >
                    Add Recipe
                </button>
            </div>
            {isAddRecipe && (
                <div className="relative bg-white flex justify-center items-center">
                    <AddRecipe
                        onSubmit={submitData}
                        hide={addRecipeHide}
                    ></AddRecipe>
                </div>
            )}
            <div className="text-black text-[1.4rem] font-bold bg-color-secondary-accent-blue py-2  my-[50px] sm:flex sm:items-center sm:gap-10 sm:pl-[50px] grid place-items-center">
                <input
                    type="text"
                    className="ring-4 focus:ring-white m-3 pl-5 w-[clamp(250px,15vw,500px)] rounded-4xl bg-[hsl(213,94%,63%)] "
                    placeholder="Seach for..."
                />
                <div className="relative w-[125px] flex justify-center items-center">
                    <button
                        onClick={isDropDown}
                        className="cursor-pointer ring-2 rounded-full px-[10px] py-[5px] bg-color-primary-accent-blue hover:bg-[hsl(217,91%,50%)] transi"
                    >
                        Filter {dropDown ? "▲" : "▼"}
                    </button>
                    {dropDown && (
                        <div className="absolute top-12 rounded-lg space-y-0.5 dropdownContainer">
                            <button onClick={dropDownBtn}>Option 1</button>
                            <button onClick={dropDownBtn}>Option 2</button>
                            <button onClick={dropDownBtn}>Option 3</button>
                        </div>
                    )}
                </div>
            </div>
            <div className="pt-[20px] mb-[100px] h-[inherit] flex flex-wrap gap-y-10 gap-x-1 pb-[30px] bg-color-primary-accent-blue text-white justify-evenly">
                {loading ? (
                    <div className="bg-black px-5 py-3 rounded-full animate-pulse">
                        Processing…
                    </div>
                ) : (
                    recipes.map((recipe) => (
                        <RecipeCard recipe={recipe} key={recipe.id} />
                    ))
                )}
                {recipes.length == 0 && !loading && (
                    <div className="bg-black px-5 py-3 rounded-full animate-pulse">
                        No recipe, Please add a recipe
                    </div>
                )}
            </div>
        </div>
    );
}

// ---------------------------------------------------
// | LOGO / Recipe Manager           [Add Recipe +]  |
// ---------------------------------------------------
// | [ Search Bar ] [ Filter Dropdown ]             |
// ---------------------------------------------------
// |  Recipe Card  |  Recipe Card  |  Recipe Card    |
// |  - Image      |  - Image      |  - Image        |
// |  - Title      |  - Title      |  - Title        |
// |  - Short Desc |  - Short Desc |  - Short Desc   |
// |  [View]       |  [View]       |  [View]         |
// ---------------------------------------------------
// | Pagination (if many recipes)                   |
// ---------------------------------------------------
