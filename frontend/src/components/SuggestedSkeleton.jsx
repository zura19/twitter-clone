function SuggestedSkeleton() {
  return (
    <div className="flex min-h-14 flex-col px-1 py-2">
      <div className="flex items-center gap-4">
        <div className="skeleton h-8 w-8 shrink-0 rounded-full bg-gray-900"></div>
        <div className="flex flex-col gap-1">
          <div className="skeleton h-4 w-16 rounded-full bg-gray-900"></div>
          <div className="skeleton h-4 w-12 rounded-full bg-gray-900"></div>
        </div>
        <div className="skeleton ml-auto h-6 w-20 rounded-full bg-gray-900"></div>
      </div>
      {/* <div className="skeleton h-32 w-full"></div> */}
    </div>
  );
}

export default SuggestedSkeleton;
