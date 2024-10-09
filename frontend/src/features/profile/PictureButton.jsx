function PictureButton({ children, profilePic, onClick }) {
  return (
    <button
      onClick={onClick}
      className={` ${profilePic ? "btn-circle top-6 h-6 w-6 -translate-x-[150%] p-0" : "btn-circle btn-sm mt-1 -translate-x-[120%]"} absolute left-[100%] flex items-center justify-center border-none bg-primary transition-all duration-500 hover:bg-black active:scale-75`}
    >
      {children}
    </button>
  );
}

export default PictureButton;
