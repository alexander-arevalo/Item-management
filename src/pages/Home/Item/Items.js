import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, onValue, off } from "firebase/database";
import { db } from "../../../utils/firebase-config";
import "./Items.css";

const Item = () => {
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const { uuid } = useParams();

  useEffect(() => {
    const dbRef = ref(db, `/Category/${uuid}`);

    const onDataChange = (snapshot) => {
      if (snapshot.exists()) {
        setItem(snapshot.val());
      } else {
        console.log("No data available");
      }
    };

    onValue(dbRef, onDataChange);

    return () => {
      off(dbRef, "value", onDataChange);
    };
  }, [uuid]);

  return (
    <div className="item-container">
      <div className="item-details">
        <h1>Item Details</h1>
        {item && (
          <div className="item-details-text">
            <div>
              <p>Category:</p>
              <p>Name:</p>
              <p>Size:</p>
              <p>Price:</p>
              <p>Cost:</p>
              <p>Amount In Stock:</p>
            </div>
            <div>
              <p>{item.category}</p>
              <p>{item.name}</p>
              <p>{item.size}</p>
              <p>{item.price}</p>
              <p>{item.cost}</p>
              <p>{item.amountInStock}</p>
            </div>
          </div>
        )}

        <span className="btn-container">
          <button className="btn btn-back" onClick={() => navigate("/")}>
            Back
          </button>
        </span>
      </div>
    </div>
  );
};

export default Item;
