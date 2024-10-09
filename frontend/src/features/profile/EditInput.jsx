function EditInput({
  children,
  type,
  placeholder,
  value,
  onChange,
  className,
}) {
  if (placeholder === "Bio")
    return (
      <textarea
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={`input input-bordered ${placeholder === "Link" || "Profile Picture" || "Cover Picture" ? "max-w-full" : "max-w-xs"} rounded-md ${className}`}
      />
    );

  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className={`input input-bordered ${placeholder === "Link" || "Profile Picture" || "Cover Picture" ? "max-w-full" : "max-w-xs"} rounded-md ${className}`}
    />
  );
}

export default EditInput;
