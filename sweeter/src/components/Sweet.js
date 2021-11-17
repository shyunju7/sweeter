import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import { dbService, storageService } from "../fbBase";

const Sweet = ({ sweetObject, isOwner }) => {
  const [isEditing, setEditing] = useState(false);
  const [newSweet, setNewSweet] = useState(sweetObject.text);
  const deleteSweet = async () => {
    const ok = window.confirm("Are you sure you want to delete this sweet?");

    if (ok) {
      await deleteDoc(doc(dbService, "sweets", sweetObject.id));
      await deleteObject(ref(storageService, sweetObject.attachmentUrl));
    } else {
      return;
    }
  };

  const editSweet = () => {
    setEditing((prev) => !prev);
  };

  const onChange = (e) => {
    setNewSweet(e.target.value);
  };

  const updateSweet = async () => {
    await updateDoc(doc(dbService, "sweets", sweetObject.id), {
      text: newSweet,
    });

    setEditing((prev) => !prev);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <form onSubmit={updateSweet}>
            <input
              type="text"
              value={newSweet}
              placeholder="edit sweet"
              required
              onChange={onChange}
            />
            <input type="submit" value="update" />
          </form>
          <button onClick={() => setEditing((prev) => !prev)}>cancel</button>
        </>
      ) : (
        <div>
          <h2>{sweetObject.text}</h2>
          <img
            src={sweetObject.attachmentUrl}
            width="100px"
            height="100px"
            alt="userImg"
          />
          {isOwner && (
            <>
              <button onClick={editSweet}>edit</button>
              <button onClick={deleteSweet}>delete</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Sweet;
