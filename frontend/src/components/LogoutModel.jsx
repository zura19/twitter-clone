function LogoutModel({ model, logoutMutation }) {
  return (
    <dialog ref={model} id="my_modal_1" className="modal">
      <div className="modal-box rounded-md bg-gray-900">
        {/* <h3 className="text-lg font-bold"></h3> */}
        <p className="py-4 font-bold">Are you sure you want to Log out?</p>
        <div className="modal-action">
          <button
            onClick={logoutMutation}
            className="btn rounded-md border-red-600 bg-gray-900 hover:bg-red-600"
          >
            Log Out
          </button>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn rounded-md">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default LogoutModel;
