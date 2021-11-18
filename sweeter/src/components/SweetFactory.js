import React, { useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { dbService, storageService } from "../fbBase";
import { v4 } from "uuid";
const SweetFactory = ({ userObject }) => {
  const [sweet, setSweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
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
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={sweet}
          type="text"
          placeholder="what's on your mind?"
          onChange={onChange}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="sweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="sweetImg" />
          </div>
        )}
      </form>
    </div>
  );
};

export default SweetFactory;
