import { useState } from "react";
import AddPost from "./AddPost";

function UpdatePostModal({ updateBtn, postText, postImage, postID }) {
  return (
    // <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button>
    <dialog ref={updateBtn} id="my_modal_2" className="modal">
      <div className="modal-box -translate-x-11 rounded-md border border-gray-700 p-0">
        <AddPost
          postID={postID}
          postText={postText}
          postImage={postImage}
          updateSession={true}
        />
        {/* <h3 className="text-lg font-bold">Hello!</h3>
        <p className="py-4">Press ESC key or click outside to close</p> */}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default UpdatePostModal;
