export default function LoadingTags() {
  return (
    <div className="flex flex-wrap gap-2">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 animate-pulse px-3 py-1 rounded-full text-sm"
          style={{
            width: `${Math.floor(Math.random() * (100 - 60 + 1)) + 60}px`,
            height: "28px",
          }}
        >
          &nbsp;
        </div>
      ))}
    </div>
  );
}
