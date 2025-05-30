import Link from 'next/link';
import { Suspense } from 'react';
import RecentRecipesLoading from './loading'; 

async function getRecentRecipes() {
  try {
    const res = await fetch('https://dummyjson.com/recipes?limit=10&sortBy=id&order=desc', {
      cache: 'no-store',  
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch recipes for recent slot: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    
    if (!data.recipes) {
        return [];
    }
    return data.recipes.slice(0, 3);  

  } catch (error) {
    console.error("Error fetching recent recipes:", error);
    return []; 
  }
}

async function RecentRecipesList() {
  const recentRecipes = await getRecentRecipes();

  if (!recentRecipes || recentRecipes.length === 0) {
    return <p className="text-gray-600">No recent recipes to display.</p>;
  }

  return (
    <div className="space-y-3">
      {recentRecipes.map((recipe) => (
        <Link href={`/recipes/${recipe.id}`} key={recipe.id} className="block group">
          <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors duration-200">
            <h4 className="text-md font-medium text-indigo-600 group-hover:text-indigo-800">{recipe.name}</h4>
            <p className="text-xs text-gray-500">Cuisine: {recipe.cuisine} - Rating: {recipe.rating} ★</p>
          </div>
        </Link>
      ))}
    </div>
  );
}


export default function RecentRecipesSlot() {
  return (
    <Suspense fallback={<RecentRecipesLoading />}>
      <RecentRecipesList />
    </Suspense>
  );
}
