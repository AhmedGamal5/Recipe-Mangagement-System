import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center py-20">
      <h2 className="text-4xl font-bold text-red-800 mb-4">
        Welcome to the Recipe Management System!
      </h2>
      <p className="text-lg text-gray-600">
       Ahmed Gamal Task.....
      </p>
      <div className="mt-8">
        <Link
          href="/recipes"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors duration-300"
        >
          View Recipes
        </Link>
      </div>
    </div>
  );
}
