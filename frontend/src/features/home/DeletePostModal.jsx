function DeletePostModal({ deleteBtn, deleteFn, isLoading }) {
  return (
    // <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button>
    <dialog ref={deleteBtn} id="my_modal_1" className="modal">
      <div className="modal-box rounded-md bg-gray-900">
        <h3 className="text-lg font-bold">Delete Post</h3>
        <p className="py-4">Are you sure you want to delete post?</p>
        <div className="modal-action">
          <button
            disabled={isLoading}
            onClick={() => deleteFn()}
            className="btn rounded-md bg-red-700 transition-all duration-300 hover:bg-red-600"
          >
            {!isLoading ? (
              "Delete"
            ) : (
              <span className="loading loading-spinner loading-xs"></span>
            )}
          </button>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-secondary rounded-md">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default DeletePostModal;
