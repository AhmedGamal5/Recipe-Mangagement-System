import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getRecipeTags() {
  try {
    const res = await fetch('https://dummyjson.com/recipes/tags');
    
    if (!res.ok) {
      throw new Error(`Failed to fetch recipe tags from DummyJSON: ${res.status} ${res.statusText}`);
    }
    const tags = await res.json();
    
    return tags.slice(0, 6); 

  } catch (error) {
    console.error("Error fetching recipe tags:", error);
    return [];
  }
}

export default async function TagsPage() {
  const tags = await getRecipeTags();

  if (!tags || tags.length === 0) {
    return <p className="text-gray-600">No recipe tags available.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link 
          href={`/recipes/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`} 
          key={tag}
          className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-full text-sm transition-colors duration-200"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
