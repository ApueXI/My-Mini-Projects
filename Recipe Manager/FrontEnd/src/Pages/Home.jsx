import "../main.css";
import { useState, useEffect } from "react";
import RecipeCard from "../Component/RecipeCard";
import AddRecipe from "../Component/AddRecipe";
import useDebounce from "../Component/useDebounce";
import { sendRecipe, getRecipe, searchRecipe } from "../API/recipe";

export default function Home() {
    // For the Filter Button
    const [dropDown, setDropDown] = useState(false);

    // Add recipe show and hide
    const [isAddRecipe, setIsAddRecipe] = useState(false);

    // Gets the vanilla recipe from API
    const [recipes, setRecipe] = useState([]);

    const [loading, setLoading] = useState(true);

    // Receives the value of the input then puts it in the debounce
    const [query, setQuery] = useState("");

    // Gets the search recipe from the API
    const [searchedRecipes, setSearchedRecipes] = useState([]);

    const [order, setOrder] = useState("asc");

    // imported debounce
    const debouncedQuery = useDebounce(query);

    // gets the recipe from the API then load it
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

    // The search functions
    useEffect(() => {
        if (!debouncedQuery) {
            setSearchedRecipes([]);
            return;
        }

        const loadSeach = async () => {
            try {
                const searchData = await searchRecipe(debouncedQuery);
                setSearchedRecipes(searchData);
                console.info(`Data: ${searchData ? "success" : "error"}`);
            } catch (e) {
                console.error(`Error occured: ${e}`);
            }
        };

        loadSeach();
    }, [debouncedQuery]);

    // Function for the sort of vanilla recipe and searched recipe
    useEffect(() => {
        const handleSort = async () => {
            if (!debouncedQuery) {
                const sort = await getRecipe(order);
                setRecipe(sort);
            } else {
                const sort = await searchRecipe(debouncedQuery, order);
                setSearchedRecipes(sort);
            }
        };

        handleSort();
    }, [order, debouncedQuery]);

    // Toggle for the filter button
    const isDropDown = () => setDropDown(!dropDown);

    // Button for showing and hiding Add recipe
    const addRecipeShow = () => setIsAddRecipe(true);
    const addRecipeHide = () => setIsAddRecipe(false);

    const ascOrder = async () => setOrder("asc");
    const descOrder = async () => setOrder("desc");

    // if there is no searches, the diplayed value will be the vanilla. but if there is it will be the search data
    const displayedRecipes =
        debouncedQuery.length > 0 ? searchedRecipes : recipes;

    const dropDownBtn = () => {
        alert(`Button has been pressed`);
    };

    // Submtis a POST to the API
    const submitData = async (formData) => {
        await sendRecipe(formData);
        setIsAddRecipe(false);

        const updatedRecipe = await getRecipe();
        setRecipe(updatedRecipe);
    };

    return (
        <div className="w-full">
            {/* NavBar or Header */}
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

            {/* Displays the Add Recipe */}
            {isAddRecipe && (
                <div className="relative bg-white flex justify-center items-center">
                    <AddRecipe
                        onSubmit={submitData}
                        hide={addRecipeHide}
                    ></AddRecipe>
                </div>
            )}

            {/* Search bar and Filter Button */}
            <div className="text-black text-[1.4rem] font-bold bg-color-secondary-accent-blue py-2  my-[50px] sm:flex sm:items-center sm:gap-10 sm:pl-[50px] grid place-items-center">
                <input
                    type="search"
                    className="ring-4 focus:ring-white m-3 pl-5 w-[clamp(250px,15vw,500px)] rounded-4xl bg-[hsl(213,94%,63%)] "
                    placeholder="Search for..."
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                />
                <div className="relative w-[125px] flex justify-center items-center">
                    <button
                        onClick={isDropDown}
                        className="cursor-pointer ring-2 rounded-full px-[10px] py-[5px] bg-color-primary-accent-blue hover:bg-[hsl(217,91%,50%)] transi"
                    >
                        Filter {dropDown ? "▲" : "▼"}
                    </button>
                    {dropDown && (
                        <div className="absolute top-12 rounded-lg space-y-0.5 dropdownContainer z-20">
                            <button onClick={ascOrder}>Ascending</button>
                            <button onClick={descOrder}>Descending</button>
                            <button onClick={dropDownBtn}>Option 3</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Logic for the Loading, Show Recipe, No RecipeF */}
            <div className="pt-[20px] mb-[100px] h-[inherit] flex flex-wrap gap-y-10 gap-x-1 pb-[30px] bg-color-primary-accent-blue text-white justify-evenly">
                {loading ? (
                    <div className="bg-black px-5 py-3 rounded-full animate-pulse">
                        Processing…
                    </div>
                ) : displayedRecipes.length > 0 ? (
                    displayedRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))
                ) : (
                    <div className="bg-black px-5 py-3 rounded-full animate-pulse">
                        {debouncedQuery
                            ? "No recipes match your search"
                            : "No recipes yet, please add one!"}
                    </div>
                )}
            </div>
        </div>
    );
}
