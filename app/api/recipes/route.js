import { NextResponse } from "next/server";

const DUMMY_JSON_URL = "https://dummyjson.com/recipes";

// GET all recipes
export async function GET(request) {
  try {
    const response = await fetch(DUMMY_JSON_URL);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch recipes from DummyJSON: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("[API_RECIPES_GET_ERROR]", error);
    return NextResponse.json(
      { message: "Failed to fetch recipes", error: error.message },
      { status: 500 }
    );
  }
}

// add a new recipe
export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.name || !body.ingredients || !body.instructions) {
      return NextResponse.json(
        { message: "Missing required fields: name, ingredients, instructions" },
        { status: 400 }
      );
    }

    const response = await fetch(`${DUMMY_JSON_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      let errorBody = {};
      try {
        errorBody = await response.json();
      } catch (parseError) {}
      console.error("[API_RECIPES_POST_DUMMYJSON_ERROR]", {
        status: response.status,
        statusText: response.statusText,
        errorBody,
      });
      throw new Error(
        `Failed to add recipe via DummyJSON: ${response.status} ${
          response.statusText
        } - ${errorBody.message || ""}`
      );
    }

    const newRecipe = await response.json();
    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error("[API_RECIPES_POST_ERROR]", error);
    return NextResponse.json(
      { message: "Failed to create recipe", error: error.message },
      { status: 500 }
    );
  }
}
