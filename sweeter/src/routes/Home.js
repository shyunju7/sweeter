import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { dbService } from "../fbBase";

const Home = () => {
  const [text, setText] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(dbService, "sweets"), {
        text,
        createAt: Date.now(),
      });
      setText("");
    } catch (error) {
      console.log(`ERROR:`, error);
    }
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    setText(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={text}
          type="text"
          placeholder="what's on your mind?"
          onChange={onChange}
        />
        <input type="submit" value="sweet" />
      </form>
    </div>
  );
};
export default Home;
