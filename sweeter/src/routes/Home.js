import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { ref, uploadString } from "firebase/storage";
import React, { useEffect, useState } from "react";
import Sweet from "../components/Sweet";
import { dbService, storageService } from "../fbBase";
import { v4 } from "uuid";
const Home = ({ userObject }) => {
  const [sweet, setSweet] = useState("");
  const [sweetList, setSweetList] = useState([]);
  const [attachment, setAttachment] = useState();
  // snapshot - db에 변경을 알림
  useEffect(() => {
    onSnapshot(collection(dbService, "sweets"), (snapShot) => {
      const sweetArray = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSweetList(sweetArray);
    });
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    const fileRef = ref(storageService, `${userObject.uid}/${v4()}`);
    console.log(fileRef);
    const response = await uploadString(fileRef, attachment, "data_url");
    console.log(response);
    // try {
    //   await addDoc(collection(dbService, "sweets"), {
    //     text: sweet,
    //     createAt: Date.now(),
    //     creatorId: userObject.uid,
    //   });
    //   setSweet("");
    // } catch (error) {
    //   console.log(`ERROR:`, error);
    // }
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

      {sweetList.map((sweet) => (
        <Sweet
          key={sweet.id}
          sweetObject={sweet}
          isOwner={sweet.creatorId === userObject.uid}
        />
      ))}
    </div>
  );
};
export default Home;
