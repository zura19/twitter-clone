import AddCommentForm from "./AddCommentForm";

function UpdateCommentModal({ modelOpen, comment, commentID, postID }) {
  return (
    <>
      <dialog ref={modelOpen} id="my_modal_2" className="modal">
        <div className="modal-box modal-middle -translate-x-10 rounded-lg border border-gray-700 bg-black">
          <h3 className="mb-2 text-lg font-bold">Update comment</h3>
          <AddCommentForm
            commentID={commentID}
            comment={comment}
            postID={postID}
            editingSession={true}
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="">Close</button>
        </form>
      </dialog>
    </>
  );
}

export default UpdateCommentModal;
