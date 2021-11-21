import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sweet from "../components/Sweet";
import SweetFactory from "../components/SweetFactory";
import { authService, dbService } from "../fbBase";

const Guide = styled.p`
  opacity: 0.7;
  text-align: center;
`;

const Home = ({ userObject }) => {
  const [sweetList, setSweetList] = useState([]);

  // snapshot - db에 변경을 알림
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(dbService, "sweets"),
      (snapShot) => {
        const sweetArray = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSweetList(sweetArray);
      }
    );

    onAuthStateChanged(authService, (user) => {
      if (user == null) {
        unsubscribe();
      }
    });

    return () => {
      setSweetList([]);
    };
  }, []);

  return (
    <div className="container">
      <SweetFactory userObject={userObject} />
      {sweetList.length > 0 ? (
        sweetList.map((sweet) => (
          <Sweet
            key={sweet.id}
            sweetObject={sweet}
            isOwner={sweet.creatorId === userObject.uid}
          />
        ))
      ) : (
        <Guide>Be the first to sweet!</Guide>
      )}
    </div>
  );
};
export default Home;
