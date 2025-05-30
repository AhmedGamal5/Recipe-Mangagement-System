'use client';

export default function Error({ error }) {
  console.error(error);
  return (
    <div className="text-center text-red-500 p-10">
      Failed to load recipes. Please try again later.
    </div>
  );
}
