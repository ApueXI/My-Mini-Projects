import "../main.css";

export default function RecipeCard({
    title = "Default",
    shortDesc = "Delish",
}) {
    return (
        <div
            className="bg-color-neutral-dark-text-blue h-[inherit] w-[clamp(300px,40vw,400px)] px-[15px] py-[20px] grid grid-cols-1 
                        place-items-center rounded-lg shadow-[3px_0_3px_black,-3px_0_3px_black]"
        >
            <h1 className="size-[3rem] bg-color-primary-accent-blue w-[95%] flex justify-center items-center font-bold rounded-lg">
                Recipe Card
            </h1>
            <div
                className="font-bold bg-white w-[95%] grid grid-cols-1 gap-y-[10px] text-wrap whitespace-normal wrap-break-word 
                         text-black p-[10px] mt-[10px] rounded-lg"
            >
                <p>Placeholder Image </p>
                <p>{title}</p>
                <p>{shortDesc}</p>
                <p>View</p>
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
