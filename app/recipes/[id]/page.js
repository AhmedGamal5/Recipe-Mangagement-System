import { notFound } from 'next/navigation';
 
import RecipeImage from '@/app/components/RecipeImage';

export async function generateStaticParams() {
  const recipeIds = ['1', '2', '3', '4', '5'];
  return recipeIds.map((id) => ({
    id: id,
  }));
}

async function getRecipe(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/recipes/${id}`, {
      cache: (parseInt(id) > 0 && parseInt(id) <= 5) ? 'force-cache' : 'no-store',
    });
    if (res.status === 404) {
      return null;
    }
    if (!res.ok) {
      throw new Error(`Failed to fetch recipe ${id}: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    return null;
  }
}

export default async function RecipePage({ params }) {
  const { id } = params;  
  const recipe = await getRecipe(id);

  if (!recipe) {
    notFound();
  }

  const formatIngredients = (ingredients) => {
    if (Array.isArray(ingredients)) return ingredients;
    if (typeof ingredients === 'string') return ingredients.split(',').map(item => item.trim());
    return [];
  };

  const ingredientsList = formatIngredients(recipe.ingredients);

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-4xl mx-auto font-sans">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 border-b pb-4">{recipe.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          {recipe.image && (
            <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-md">
              <RecipeImage
                src={recipe.image}
                alt={recipe.name}
                className="custom-image-class"  
              />
            </div>
          )}
        </div>
        <div className="space-y-4 text-gray-700">
          <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
          <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
          <p><strong>Prep Time:</strong> {recipe.prepTimeMinutes} minutes</p>
          <p><strong>Cook Time:</strong> {recipe.cookTimeMinutes} minutes</p>
          <p><strong>Servings:</strong> {recipe.servings}</p>
          <p><strong>Rating:</strong> <span className="text-yellow-500">★</span> {recipe.rating} ({recipe.reviewCount} reviews)</p>
          <p><strong>Meal Type:</strong> {recipe.mealType?.join(', ')}</p>
          <div>
            <strong>Tags:</strong>
            <div className="flex flex-wrap gap-2 mt-1">
              {recipe.tags?.map(tag => (
                <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4 text-gray-700 border-b pb-2">Ingredients</h2>
        <ul className="list-disc list-inside space-y-2 pl-4 text-gray-700">
          {ingredientsList.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-3xl font-semibold mb-4 text-gray-700 border-b pb-2">Instructions</h2>
        <ol className="list-decimal list-inside space-y-3 pl-4 text-gray-700">
          {Array.isArray(recipe.instructions)
            ? recipe.instructions.map((step, index) => <li key={index}>{step}</li>)
            : <li>{recipe.instructions}</li>
          }
        </ol>
      </div>
    </div>
  );
}
