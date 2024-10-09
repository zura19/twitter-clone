import EditProfileForm from "./EditProfileForm";

function EditProfileModal({
  modal,
  editUser,
  editProfilePic,
  editCoverPic,
  reset,
}) {
  // const modal = useRef(null);

  // modal.current.showModal();

  return (
    <dialog id="my_modal_2" ref={modal} className="modal">
      <div className="modal-box rounded-md">
        <h3 className="text-lg font-bold">Update Profile</h3>
        <EditProfileForm
          reset={reset}
          editUser={editUser}
          editProfilePic={editProfilePic}
          editCoverPic={editCoverPic}
        />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={reset} className="">
          close
        </button>
      </form>
    </dialog>
  );
}

export default EditProfileModal;
