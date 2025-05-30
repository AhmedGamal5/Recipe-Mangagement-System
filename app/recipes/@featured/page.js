// app/recipes/@featured/page.js
import Link from 'next/link';

export const revalidate = 3600;

async function getFeaturedRecipes() {
  try {
    const res = await fetch('https://dummyjson.com/recipes?limit=0', { 
      next: { revalidate: 3600 } 
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch recipes from DummyJSON: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    
    if (!data.recipes || data.recipes.length === 0) {
        return [];
    }

    const sortedRecipes = [...data.recipes].sort((a, b) => b.rating - a.rating);
    return sortedRecipes.slice(0, 2);

  } catch (error) {
    console.error("Error fetching featured recipes:", error);
    return [];
  }
}

export default async function FeaturedRecipesPage() {
  const featuredRecipes = await getFeaturedRecipes();

  if (!featuredRecipes || featuredRecipes.length === 0) {
    return <p className="text-gray-600">No featured recipes available at the moment.</p>;
  }

  return (
    <div className="space-y-4">
      {featuredRecipes.map((recipe) => (
        <Link href={`/recipes/${recipe.id}`} key={recipe.id} className="block group">
          <div className="p-4 border border-gray-200 rounded-md hover:shadow-md transition-shadow duration-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-blue-600 group-hover:text-blue-800 mb-1">{recipe.name}</h3>
            <div className="flex items-center mb-1">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="text-gray-700 font-medium">{recipe.rating.toFixed(1)}</span>
              <span className="text-gray-500 text-sm ml-1">({recipe.reviews?.length || 0} reviews)</span>
            </div>
            <p className="text-sm text-gray-600 truncate">{recipe.instructions.join(' ').substring(0, 70)}...</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
