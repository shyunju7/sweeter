import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Sweet from "../components/Sweet";
import { dbService } from "../fbBase";

const Home = ({ userObject }) => {
  const [sweet, setSweet] = useState("");
  const [sweetList, setSweetList] = useState([]);

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
    try {
      await addDoc(collection(dbService, "sweets"), {
        text: sweet,
        createAt: Date.now(),
        creatorId: userObject.uid,
      });
      setSweet("");
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
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={sweet}
          type="text"
          placeholder="what's on your mind?"
          onChange={onChange}
        />
        <input type="submit" value="sweet" />
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
