import "../main.css";
import RecipeCard from "../Compnent/RecipeCard";

export default function Home() {
    return (
        <div>
            <div className="flex justify-between bg-color-neutral-dark-text-blue px-[30px] py-[30px]">
                <h1 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold bg-color-primary-accent-blue px-[15px] py-[15px] rounded-xl shadow-[3px_0_5px_black,-3px_0_5px_black]">
                    Recipe Manager
                </h1>
                <button
                    className="mr-[clamp(20px, 10vw, 40px)] text-[clamp(.9rem,4vw,1.6rem)] font-bold px-[10px] my-[10px] rounded-lg bg-color-secondary-accent-blue 
                                hover:bg-[hsl(213,94%,48%)] hover:scale-[1.1] transition-all duration-300 ease-in-out cursor-pointer"
                >
                    Add Recipe
                </button>
            </div>
            <div className="text-color-bg-light-blue text-[1.4rem] bg-color-secondary-accent-blue mt-[40px] flex gap-10 pl-[50px] font-bold ">
                <h1>Seach Bar</h1>
                <h1>Filter Dropdown</h1>
            </div>
            <div className="pt-[20px] mt-[50px] mb-[100px] h-[inherit] flex flex-wrap gap-y-10 gap-x-1 pb-[30px] bg-color-primary-accent-blue text-white justify-evenly">
                {/* Card */}
                <RecipeCard title="Adobo" shortDesc="Masarap"></RecipeCard>
                <RecipeCard title="Tinola" shortDesc="Sabaw"></RecipeCard>
                <RecipeCard title="Sinigang" shortDesc="Maasim"></RecipeCard>
                <RecipeCard title="Pares" shortDesc="Pares Mami"></RecipeCard>
                <RecipeCard title="Pares" shortDesc="Pares Mami"></RecipeCard>
                <RecipeCard title="Pares" shortDesc="Pares Mami"></RecipeCard>
                <RecipeCard title="Pares" shortDesc="Pares Mami"></RecipeCard>
                <RecipeCard title="Pares" shortDesc="Pares Mami"></RecipeCard>
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
