import Link from "next/link";
import Image from "next/image";

async function getAllRecipes() {
  const apiUrl = `${
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
  }/api/recipes`;

  try {
    const res = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error(
        `[RecipesPage - Server] Failed to fetch recipes. Status: ${res.status} ${res.statusText}. Response Body: ${errorBody}`
      );
      throw new Error(
        `Failed to fetch recipes: ${res.status} ${res.statusText}. Check server logs for API errors.`
      );
    }

    const data = await res.json();
    return data.recipes || [];
  } catch (error) {
    console.error(
      "[RecipesPage - Server] Error in getAllRecipes:",
      error.message
    );
    return [];
  }
}

export default async function RecipesPage() {
  console.log(
    "[RecipesPage - Server] Rendering RecipesPage (as Server Component)"
  );
  const recipes = await getAllRecipes();

  if (!recipes || recipes.length === 0) {
    console.log(
      "[RecipesPage - Server] No recipes found or fetch failed, rendering fallback UI."
    );
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          All Recipes
        </h2>
        <p className="text-gray-600">
          No recipes found. This could be due to a fetching error or an empty
          list. Please check server logs.
        </p>
      </div>
    );
  }

  console.log(
    `[RecipesPage - Server] Successfully fetched ${recipes.length} recipes.`
  );
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 border-b pb-3">
        All Recipes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Link
            href={`/recipes/${recipe.id}`}
            key={recipe.id}
            className="block group"
            aria-label={`View details for ${recipe.name}`}
          >
            <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
              <div className="w-full h-48 relative">
                <Image
                  src={recipe.image || "/images/placeholder.jpg"}
                  alt={recipe.name || "Recipe image"}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                  priority={recipes.indexOf(recipe) < 3}
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-blue-600 group-hover:text-blue-800">
                  {recipe.name}
                </h3>
                <p className="text-gray-600 text-sm mb-1">
                  Cuisine: {recipe.cuisine || "N/A"}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  Difficulty: {recipe.difficulty || "N/A"}
                </p>
                <div className="mt-auto pt-2">
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                    View Details
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
