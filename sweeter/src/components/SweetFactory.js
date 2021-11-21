import React, { useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { dbService, storageService } from "../fbBase";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const FactoryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 20px;
`;

const FactoryForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const FactoryInput = styled.input`
  flex-grow: 1;
  height: 40px;
  width: 320px;
  padding-left: 10px;
  color: white;
  border: 1px solid #04aaff;
  border-radius: 20px;
  font-weight: 500;
  font-size: 12px;
`;

const FactoryLabel = styled.label`
  color: #04aaff;
  cursor: pointer;

  span {
    margin-right: 10px;
    font-size: 12px;
  }
`;

const FactoryImage = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background-image: ${(props) => props.attachment};
`;

const SweetFactory = ({ userObject }) => {
  const [sweet, setSweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();

    if (sweet === "") {
      alert("내용을 입력해주세요!");
      return;
    }

    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObject.uid}/${v4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentUrl = await getDownloadURL(response.ref);
    }
    const newSweetObject = {
      text: sweet,
      createAt: Date.now(),
      creatorId: userObject.uid,
      attachmentUrl,
    };
    try {
      await addDoc(collection(dbService, "sweets"), newSweetObject);
      setSweet("");
      setAttachment("");
    } catch (error) {
      console.log(`ERROR:`, error);
    }
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    setSweet(value);
  };

  // file upload
  const onFileChange = (e) => {
    const {
      target: { files },
    } = e;

    const imageFile = files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    fileReader.readAsDataURL(imageFile); // reader를 사용하여 파일을 읽을 것
  };

  return (
    <FactoryForm onSubmit={onSubmit}>
      <FactoryContainer>
        <FactoryInput
          value={sweet}
          type="text"
          placeholder="what's on your mind?"
          onChange={onChange}
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </FactoryContainer>

      <FactoryLabel htmlFor="attach-file">
        <span>Add Photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </FactoryLabel>
      <input
        type="file"
        id="attach-file"
        accept="image/*"
        onChange={onFileChange}
        style={{ opacity: 0 }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <FactoryLabel>
            <FactoryImage
              src={attachment}
              width="50px"
              height="50px"
              alt="sweetImg"
              attachment={attachment}
            />
          </FactoryLabel>
        </div>
      )}
    </FactoryForm>
  );
};

export default SweetFactory;
