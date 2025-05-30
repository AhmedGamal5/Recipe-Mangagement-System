import Link from 'next/link';

export default function DashboardPage() {
 
  

  return (
    <div className="min-h-[calc(100vh-10rem)] py-8 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-800">Welcome back !</h1>
        <p className="mt-2 text-lg text-slate-600">Here's your recipe dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-700 mb-2">Create a New Recipe</h2>
          <p className="text-slate-500 mb-4 text-sm">Share your culinary masterpieces with the world.</p>
          <Link
            href="/recipes/create"
            className="inline-block mt-2 px-5 py-2.5 bg-indigo-500 text-white font-medium text-sm rounded-lg hover:bg-indigo-600 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Add Recipe
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
           <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v11.494m0 0A7.5 7.5 0 0019.5 12H4.5c0-1.03.194-2.006.55-2.892A7.514 7.514 0 0112 6.253z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-700 mb-2">Explore Recipes</h2>
          <p className="text-slate-500 mb-4 text-sm">Discover new favorites from our growing collection.</p>
          <Link
            href="/recipes"
            className="inline-block mt-2 px-5 py-2.5 bg-green-500 text-white font-medium text-sm rounded-lg hover:bg-green-600 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Browse All
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
           <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-700 mb-2">My Profile</h2>
          <p className="text-slate-500 mb-4 text-sm">View and update your account details and preferences.</p>
          <button
            disabled  
            className="inline-block mt-2 px-5 py-2.5 bg-sky-500 text-white font-medium text-sm rounded-lg hover:bg-sky-600 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            View Profile (Soon)
          </button>
        </div>

      </div>

    </div>
  );
}
