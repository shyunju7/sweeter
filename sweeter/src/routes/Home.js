import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Sweet from "../components/Sweet";
import SweetFactory from "../components/SweetFactory";
import { dbService } from "../fbBase";

const Home = ({ userObject }) => {
  const [sweetList, setSweetList] = useState([]);

  // snapshot - db에 변경을 알림
  useEffect(() => {
    onSnapshot(collection(dbService, "sweets"), (snapShot) => {
      const sweetArray = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSweetList(sweetArray);
    });

    return () => {
      console.log(`clean up!`);
    };
  }, []);

  return (
    <div>
      <SweetFactory userObject={userObject} />
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
