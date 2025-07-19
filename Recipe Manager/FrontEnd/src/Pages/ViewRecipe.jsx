import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ViewRecipe() {
    const location = useLocation();
    const { id } = useParams();

    const recipe = location.state?.recipe;
    const [loading, setLoading] = useState(!recipe);

    useEffect(() => {
        if (!recipe) setLoading(true);
        console.log(recipe);
        console.log(loading);
    }, [id]);

    return (
        <div>
            <div
                className="flex sm:justify-start justify-center bg-color-neutral-dark-text-blue 
                            px-[30px] py-[30px]"
            >
                <h1
                    className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold bg-color-primary-accent-blue
                               px-[15px] py-[15px] rounded-xl shadow-[3px_0_5px_black,-3px_0_5px_black]"
                >
                    Recipe for {recipe.title}
                </h1>
            </div>
            <div className="mt-[10vh] flex justify-center">
                <div className="bg-color-secondary-accent-blue relative w-[clamp(300px,30vw,600px)] h-[clamp(150px,60vh,600px)] rounded-e-lg">
                    <Link
                        className="absolute top-3 right-3 bg-color-primary-accent-blue px-2 py-1 rounded-xl font-bold
                                     hover:bg-[hsl(217,91%,50%)] hover:scale-120 transi"
                        to="/"
                    >
                        Go Back
                    </Link>
                    <h1
                        className="absolute bottom-3 left-3 bg-color-primary-accent-blue px-2 py-1 rounded-xl font-bold
                                     hover:bg-[hsl(217,91%,50%)] hover:scale-120 transi"
                    >
                        ID: {recipe.id}
                    </h1>
                    <h1
                        className="absolute bottom-3 right-3 bg-color-primary-accent-blue px-2 py-1 rounded-xl font-bold
                                     hover:bg-[hsl(217,91%,50%)] hover:scale-120 transi"
                    >
                        ID URL: {id}
                    </h1>

                    <h1 className="bg-white mt-16 mx-15 ">Title: {recipe.title ? "True" : "False"}</h1>
                    <h1>
                        ingredients: {recipe.ingredients ? "True" : "False"}
                    </h1>
                    <h1>
                        Instructions{recipe.instructions ? "True" : "False"}
                    </h1>
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
