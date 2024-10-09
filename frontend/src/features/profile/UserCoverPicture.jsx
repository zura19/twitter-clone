function UserCoverPicture({ src, alt, children }) {
  if (src) {
    return (
      <div className="relative h-60 w-full overflow-hidden">
        {children}
        <img
          src={src}
          alt={alt}
          className="border border-gray-700 bg-secondary"
        />
      </div>
    );
  }

  if (!src) {
    return <div className="relative h-60 w-full bg-gray-800">{children}</div>;
  }
}

export default UserCoverPicture;
