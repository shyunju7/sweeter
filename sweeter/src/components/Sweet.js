import React from "react";

const Sweet = ({ sweetObject, isOwner }) => {
  return (
    <div>
      <h2>{sweetObject.text}</h2>

      {isOwner && (
        <>
          <button>edit</button>
          <button>delete</button>
        </>
      )}
    </div>
  );
};

export default Sweet;
