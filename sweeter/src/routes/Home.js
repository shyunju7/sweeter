import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { dbService } from "../fbBase";

const Home = ({ userObject }) => {
  const [sweet, setSweet] = useState("");
  const [sweetList, setSweetList] = useState([]);

  const getTextList = async () => {
    const querySnapshot = await getDocs(collection(dbService, "sweets"));
    querySnapshot.forEach((docs) => {
      const textObject = {
        ...docs.data(),
        id: docs.id,
      };
      setSweetList((prev) => [...prev, textObject]);
    });
  };

  useEffect(() => {
    getTextList();
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
        <div key={sweet.id}>
          <h2>{sweet.text}</h2>
        </div>
      ))}
    </div>
  );
};
export default Home;
