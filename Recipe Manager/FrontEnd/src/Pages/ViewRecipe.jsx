import { Link, useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import { deleteRecipe } from "../API/recipe";
import { useNavigate } from "react-router-dom";
import AddRecipe from "../Component/AddRecipe";
import { updateRecipe } from "../API/recipe";

export default function ViewRecipe() {
    const location = useLocation();
    const { id } = useParams();

    const [recipe, setRecipe] = useState(location.state?.recipe);

    const [isUpdateRecipe, setIsUpdateRecipe] = useState(false);

    const updateRecipeShow = () => setIsUpdateRecipe(true);
    const updateRecipeHide = () => setIsUpdateRecipe(false);

    const navigate = useNavigate();

    const handleDeleteData = async (id) => {
        await deleteRecipe(id);
        navigate("/");
    };

    const handleUpdateData = async (formData) => {
        if (!formData.image_file) {
            formData.image_file = recipe.image_file;
        }

        await updateRecipe(formData, id);

        setRecipe((prevRecipe) => ({ ...prevRecipe, ...formData }));

        setIsUpdateRecipe(false);
    };

    return (
        <div>
            <div className="flex sm:justify-start justify-center bg-color-neutral-dark-text-blue px-[30px] py-[30px]">
                <h1 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold bg-color-primary-accent-blue px-[15px] py-[15px] rounded-xl shadow-[3px_0_5px_black,-3px_0_5px_black]">
                    Recipe for {recipe?.title}
                </h1>
            </div>
            {isUpdateRecipe && (
                <div className="relative bg-white flex justify-center items-center">
                    <AddRecipe
                        onSubmit={handleUpdateData}
                        hide={updateRecipeHide}
                        mode="edit"
                        recipe={recipe}
                    ></AddRecipe>
                </div>
            )}
            <div className="sm:mt-24 mt-14 flex justify-center">
                <div className="bg-color-secondary-accent-blue relative mx-2 w-[clamp(300px,65vw,600px)] sm:h-[clamp(200px,70vh,600px)] h-[71rem] rounded-lg sm:w-[clamp(40rem,80vw,65rem)]">
                    <Link
                        className="absolute top-3 right-3 bg-color-primary-accent-blue px-2 py-1 rounded-xl font-boldhover:bg-[hsl(217,91%,50%)] hover:scale-120 transi"
                        to="/"
                    >
                        Go Back
                    </Link>

                    <div className="bg-color-muted-gray-blue h-11/12 w-11/12 rounded-lg relative mx-auto mt-15 sm:grid sm:grid-cols-2 sm:h-10/12">
                        <div className=" flex justify-center items-center sm:p-0 py-4 mx-1">
                            <img
                                src={`/${recipe?.image_file}`}
                                alt={recipe?.title}
                                className="size-42 sm:size-110"
                            />
                        </div>
                        <div className="sm:grid grid-cols-2 viewParagraph sm:gap-3 sm:mt-7 mx-2 sm:space-y-0 space-y-5">
                            <div className="bg-color-bg-light-blue">
                                <p className="title">Ingredients: </p>
                                <p className="mx-2 whitespace-pre-wrap">
                                    {recipe?.ingredients}
                                </p>
                            </div>
                            <div className="bg-color-bg-light-blue">
                                <p className="title">Instructions: </p>
                                <p className="mx-2 whitespace-pre-wrap">
                                    {recipe?.instructions}
                                </p>
                            </div>
                        </div>
                        <div className="absolute bottom-3 w-full flex items-center justify-evenly font-bold viewBtn sm:justify-end sm:pr-5 sm:gap-5">
                            <button
                                className="bg-color-primary-accent-blue hover:scale-120 hover:bg-[hsl(217,91%,50%)] transi"
                                onClick={updateRecipeShow}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-[hsl(213,94%,78%)] hover:scale-120 hover:bg-[hsl(213,94%,48%)] transi"
                                onClick={() => {
                                    handleDeleteData(recipe.id);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------
// | [Back]                                         |
// | Recipe Title                                   |
// | [Image]                                        |
// | Ingredients (List)                             |
// | Instructions (Paragraphs/Steps)                |
// | [Edit]  [Delete]                               |
// ---------------------------------------------------
