function ProfileSkeleton() {
  return (
    <div>
      <div className="flex h-[60px] items-center gap-8 border-b border-gray-700 px-6">
        <div className="skeleton h-8 w-8 rounded-full bg-gray-800"></div>
        <div>
          <div className="skeleton mb-1 h-4 w-24 rounded-full bg-gray-800"></div>
          <div className="skeleton h-4 w-16 rounded-full bg-gray-800"></div>
        </div>
      </div>
      <div className="skeleton h-60 w-full bg-gray-800"></div>
      <div className="flex items-center gap-4">
        <div className="mx-6 flex w-full flex-col gap-1">
          <div className="skeleton absolute h-32 w-32 shrink-0 -translate-y-1/2 rounded-full bg-gray-800"></div>
          <div className="skeleton ml-auto mt-4 h-7 w-20 rounded-full bg-gray-800"></div>
        </div>
      </div>
      <div className="mt-10 space-y-1 px-6 font-bold">
        <div className="skeleton h-6 w-32 rounded-full bg-gray-800"></div>
        <div className="skeleton h-4 w-16 rounded-full bg-gray-800"></div>
        <div className="w-128 skeleton h-5 rounded-full bg-gray-800"></div>

        <div className="flex items-center gap-4 pt-4">
          <div className="skeleton h-4 w-64 rounded-full bg-gray-800"></div>
          <div className="skeleton h-4 w-32 rounded-full bg-gray-800"></div>
        </div>
        <div className="flex items-center gap-6 pt-4">
          <div className="skeleton h-3 w-24 rounded-full bg-gray-800"></div>
          <div className="skeleton h-3 w-24 rounded-full bg-gray-800"></div>
        </div>
      </div>
      <div className="sticky top-0 mt-5 flex h-[60px] items-center justify-between border-b border-gray-700 bg-[rgba(0,0,0,0.5)] px-40 py-4">
        <div className="skeleton h-6 w-16 rounded-full bg-gray-800"></div>
        <div className="skeleton h-6 w-16 rounded-full bg-gray-800"></div>
      </div>
    </div>
  );
}

export default ProfileSkeleton;
