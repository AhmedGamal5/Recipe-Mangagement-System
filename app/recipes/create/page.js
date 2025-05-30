'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateRecipePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',  
    instructions: '',  
    prepTimeMinutes: '',
    cookTimeMinutes: '',
    servings: '',
    difficulty: 'Easy',  
    cuisine: '',
    tags: '',  
    userId: 5, 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage('');

    if (!formData.name || !formData.ingredients || !formData.instructions) {
      setError('Name, Ingredients, and Instructions are required.');
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        ingredients: formData.ingredients.split(',').map(item => item.trim()).filter(item => item),
        instructions: formData.instructions.split('\n').map(item => item.trim()).filter(item => item), // Assuming instructions per line
        tags: formData.tags.split(',').map(item => item.trim()).filter(item => item),
        prepTimeMinutes: parseInt(formData.prepTimeMinutes, 10) || 0,
        cookTimeMinutes: parseInt(formData.cookTimeMinutes, 10) || 0,
        servings: parseInt(formData.servings, 10) || 0,
      };

      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to create recipe. Status: ${response.status}`);
      }

      const newRecipe = await response.json();
      setSuccessMessage(`Recipe "${newRecipe.name}" created successfully! Redirecting...`);
      
      setFormData({
        name: '', ingredients: '', instructions: '', prepTimeMinutes: '',
        cookTimeMinutes: '', servings: '', difficulty: 'Easy', cuisine: '', tags: '', userId: 5,
      });

      setTimeout(() => {
        router.push('/recipes');
      }, 2000);

    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl font-sans my-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Create New Recipe</h1>
      
      {successMessage && (
        <div className="mb-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Recipe Name</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>

        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">Ingredients (comma-separated)</label>
          <textarea name="ingredients" id="ingredients" value={formData.ingredients} onChange={handleChange} rows="3" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </div>

        <div>
          <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Instructions (one step per line)</label>
          <textarea name="instructions" id="instructions" value={formData.instructions} onChange={handleChange} rows="5" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="prepTimeMinutes" className="block text-sm font-medium text-gray-700">Prep Time (minutes)</label>
            <input type="number" name="prepTimeMinutes" id="prepTimeMinutes" value={formData.prepTimeMinutes} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="cookTimeMinutes" className="block text-sm font-medium text-gray-700">Cook Time (minutes)</label>
            <input type="number" name="cookTimeMinutes" id="cookTimeMinutes" value={formData.cookTimeMinutes} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="servings" className="block text-sm font-medium text-gray-700">Servings</label>
            <input type="number" name="servings" id="servings" value={formData.servings} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">Difficulty</label>
            <select name="difficulty" id="difficulty" value={formData.difficulty} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700">Cuisine Type</label>
          <input type="text" name="cuisine" id="cuisine" value={formData.cuisine} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
          <input type="text" name="tags" id="tags" value={formData.tags} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
        </div>

        <div>
          <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400">
            {isSubmitting ? 'Submitting...' : 'Create Recipe'}
          </button>
        </div>
      </form>
    </div>
  );
}
