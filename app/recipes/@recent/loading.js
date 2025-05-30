export default function RecentRecipesLoading() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="p-3 border border-gray-200 rounded-md animate-pulse">
          <div className="h-5 bg-gray-300 rounded w-3/5 mb-2"></div>  
          <div className="h-4 bg-gray-300 rounded w-4/5"></div>   
        </div>
      ))}
    </div>
  );
}