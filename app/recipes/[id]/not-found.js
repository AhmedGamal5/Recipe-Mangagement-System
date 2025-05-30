import Link from 'next/link';

export default function RecipeNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4 bg-gray-50 rounded-lg shadow-md py-10 font-sans">
      <svg className="w-24 h-24 text-red-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01"></path> 
      </svg>
      <h1 className="text-5xl font-bold text-gray-700 mb-4">404 - Recipe Not Found</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! We couldn't find the recipe you were looking for.
      </p>
      <p className="text-gray-500 mb-8">
        It might have been removed, or the ID might be incorrect.
      </p>
      <Link href="/recipes" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out text-lg">
        Back to All Recipes
      </Link>
    </div>
  );
}
