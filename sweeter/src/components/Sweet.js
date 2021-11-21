import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useState } from "react";
import styled from "styled-components";
import { dbService, storageService } from "../fbBase";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const SweetContainer = styled.div`
  margin-bottom: 20px;
  background-color: white;
  width: 100%;
  max-width: 320px;
  padding: 8px 16px;
  border: 1px solid #d4d4d4;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 32px;
`;

const SweetText = styled.h3`
  font-size: 12px;
`;

const SweetEditContainer = styled.form`
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 5px;
`;

const SweetInput = styled.input`
  width: 100%;
  border-radius: 20px;
  border: 1px solid #c4c4c4;
  color: black;
  padding: 7px 10px !important;
  box-sizing: border-box;
  margin-bottom: 12px;
  cursor: auto;
`;

const SweetImg = styled.img`
  right: -10px;
  top: 16px;
  position: absolute;
  border-radius: 50%;
  background-color: white;
  width: 50px;
  height: 50px;
  margin-top: 10px;
  box-shadow: 2px 2px 2px #dddddd;
`;

const SweetAction = styled.div`
  position: absolute;
  right: 10px;
  top: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const Button = styled.button`
  outline: none;
  border: none;
  font-size: 14px;
`;

const Sweet = ({ sweetObject, isOwner }) => {
  const [isEditing, setEditing] = useState(false);
  const [newSweet, setNewSweet] = useState(sweetObject.text);
  const deleteSweet = async () => {
    const ok = window.confirm("Are you sure you want to delete this sweet?");

    if (ok) {
      await deleteDoc(doc(dbService, "sweets", sweetObject.id));
      if (sweetObject.attachmentUrl !== "") {
        await deleteObject(ref(storageService, sweetObject.attachmentUrl))
          .then(() => {
            alert("삭제되었습니다:(");
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
    <SweetContainer>
      {isEditing ? (
        <>
          <SweetEditContainer onSubmit={updateSweet}>
            <SweetInput
              type="text"
              value={newSweet}
              placeholder="edit sweet"
              required
              onChange={onChange}
            />
            <ButtonContainer>
              <input type="submit" value="update" className="formBtn" />
              <input
                type="button"
                onClick={() => setEditing((prev) => !prev)}
                className="formBtn cancelBtn"
                value="cancel"
              />
            </ButtonContainer>
          </SweetEditContainer>
        </>
      ) : (
        <div>
          <SweetText>{sweetObject.text}</SweetText>
          {sweetObject.attachmentUrl !== "" ? (
            <SweetImg
              src={sweetObject.attachmentUrl}
              width="100px"
              height="100px"
              alt="userImg"
            />
          ) : null}
          {isOwner && (
            <SweetAction>
              <Button onClick={editSweet}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </Button>
              <Button onClick={deleteSweet}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </SweetAction>
          )}
        </div>
      )}
    </SweetContainer>
  );
};

export default Sweet;
