import { NextResponse } from 'next/server';

const DUMMY_JSON_URL = 'https://dummyjson.com/recipes';

export async function GET(request, { params }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: 'Recipe ID is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${DUMMY_JSON_URL}/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ message: `Recipe with ID ${id} not found` }, { status: 404 });
      }
      throw new Error(`Failed to fetch recipe ${id} from DummyJSON: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    if (data && data.message && data.message.includes('not found')) {
        return NextResponse.json({ message: `Recipe with ID ${id} not found` }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`[API_RECIPE_ID_GET_ERROR] ID: ${id}`, error);
    return NextResponse.json({ message: `Failed to fetch recipe with ID ${id}`, error: error.message }, { status: 500 });
  }
}
