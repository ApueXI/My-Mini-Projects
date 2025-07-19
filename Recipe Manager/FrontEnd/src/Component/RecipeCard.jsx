import "../main.css";
import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
    return (
        <div
            className="bg-color-neutral-dark-text-blue h-[inherit] w-[clamp(300px,40vw,400px)] px-[15px] py-[20px] grid grid-cols-1 
                        place-items-center rounded-lg shadow-[3px_0_3px_black,-3px_0_3px_black]"
        >
            <h1 className="size-[3rem] bg-color-primary-accent-blue w-[95%] flex justify-center items-center font-bold rounded-lg">
                {recipe.title}
            </h1>
            <div
                className="font-bold bg-color-bg-light-blue w-[95%] grid grid-cols-1 gap-y-[10px] text-wrap 
                            whitespace-normal wrap-break-word text-black p-[10px] pb-12 mt-[10px] 
                            rounded-lg relative"
            >
                <img
                    src={`/${recipe.image_file}`}
                    className="size-fit rounded-md sm:h-60 mx-auto"
                    alt={recipe.title}
                />
                <p className="truncate">{recipe.instructions}</p>
                <Link
                    to={`/view/${recipe.id}`}
                    state={{ recipe }}
                    className="bg-color-neutral-dark-text-blue text-color-bg-light-blue absolute bottom-2 right-2 
                                px-2 py-1 rounded-lg hover:bg-[hsl(224,64%,53%)] hover:scale-110 transi"
                >
                    View
                </Link>
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
