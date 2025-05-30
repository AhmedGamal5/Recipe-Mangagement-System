export default function LoadingFeaturedRecipes() {
  return (
    <div className="space-y-4">
      {[...Array(2)].map((_, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-md bg-gray-50 animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div> 
          <div className="flex items-center mb-2">
            <div className="h-5 w-5 bg-gray-300 rounded-full mr-1"></div> 
            <div className="h-5 bg-gray-300 rounded w-1/4"></div> 
          </div>
          <div className="h-4 bg-gray-300 rounded w-full mb-1"></div> 
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>   
        </div>
      ))}
    </div>
  );
}
