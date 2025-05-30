"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { showToast } from "nextjs-toast-notify";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;

    if (!email) {
      showToast.error("Please enter an email address.", {
        position: "top-center",
      });
      return;
    }
    localStorage.setItem("email", email);

    document.cookie = "auth_token=dummy_user_token; path=/; Max-Age=3600";
    showToast.success("login successfully!", {
      duration: 4000,
      progress: true,
      position: "top-center",
      transition: "bounceIn",
      icon: "",
      sound: true,
    });
    router.push(callbackUrl);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 font-sans px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl font-bold text-indigo-600">RecipeApp</span>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-xl shadow-2xl border border-slate-200">
          <h1 className="text-3xl font-semibold mb-2 text-center text-slate-800">
            Welcome Back!
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="mail@example.com"
                  className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                             sm:text-sm transition-shadow duration-150 ease-in-out hover:shadow-md" // Added hover:shadow-md
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                             sm:text-sm transition-shadow duration-150 ease-in-out hover:shadow-md"
                  required
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm 
                           text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                           transition-all duration-300 ease-in-out hover:shadow-lg transform  "
              >
                Sign In
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-xs">
            <Link
              href="/"
              className="font-medium text-indigo-500 hover:text-indigo-700 hover:underline"
            >
              Back to Homepage
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
