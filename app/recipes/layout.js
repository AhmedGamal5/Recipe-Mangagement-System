import Link from "next/link";
import { cookies } from "next/headers";
import UserNavbarDisplay from "../components/UserNavbarDisplay";

export const metadata = {
  title: "Recipe Management System",
  description: "Find and share amazing recipes!",
};

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const authToken = cookieStore.get("auth_token");
  const isAuthenticated = !!authToken;

  return (
    <>
      <header className="bg-slate-800 shadow-lg sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
              >
                RecipeApp
              </Link>
            </div>
            <div className="hidden sm:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link
                  href="/recipes"
                  className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  Recipes
                </Link>
                {isAuthenticated && (
                  <Link
                    href="/recipes/create"
                    className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                  >
                    Create Recipe
                  </Link>
                )}
                {isAuthenticated && (
                  <Link
                    href="/dashboard"
                    className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                  >
                    Dashboard
                  </Link>
                )}
                {isAuthenticated ? (
                  <UserNavbarDisplay />
                ) : (
                  <Link
                    href="/login"
                    className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
            <div className="-mr-2 flex sm:hidden">
              <button
                type="button"
                className="bg-slate-700 inline-flex items-center justify-center p-2 rounded-md text-indigo-300 hover:text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>


      <main className="container mx-auto p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-8rem-5rem)]">
        {children}
      </main>

      <footer className="bg-slate-800 border-t border-slate-700 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Recipe Management System. All
            rights reserved.
          </p>
          <p className="text-sm text-slate-500">Powered by Ahmed Gamal</p>
        </div>
      </footer>
    </>
  );
}
