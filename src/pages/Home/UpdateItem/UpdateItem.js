import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ref, get, off, update } from "firebase/database";
import { db } from "../../../utils/firebase-config";
import "./UpdateItem.css";
import { useSnackbar } from "notistack";

const UpdateItem = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { uuid } = useParams();
  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    size: "",
    price: "",
    cost: "",
    amountInStock: "",
  });
  const [noSize, setNoSize] = useState(false);

  useEffect(() => {
    const dbRef = ref(db, `/Category/${uuid}`);
    const fetchData = async () => {
      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          setItem(snapshot.val());
          setFormData(snapshot.val());
          // Check if size is "No Size"
          if (snapshot.val().size === "No Size") {
            setNoSize(true);
          }
        } else {
          console.log("Item not found");
        }
      } catch (error) {
        console.error("Error fetching item:", error.message);
      }
    };

    fetchData();

    return () => {
      off(dbRef);
    };
  }, [uuid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNoSizeChange = () => {
    setNoSize((prevNoSize) => !prevNoSize);
    // Set size to "No Size" if checkbox is checked
    if (!noSize) {
      setFormData({ ...formData, size: "No Size" });
    } else {
      setFormData({ ...formData, size: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isDataChanged = Object.keys(formData).some(
      (key) => formData[key] !== item[key]
    );

    if (!isDataChanged) {
      console.log("No changes were made.");
      return;
    }

    try {
      await update(ref(db, `/Category/${uuid}`), formData);
      enqueueSnackbar("Successfully Updated", { variant: "success" });
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Error", { variant: "error" });
    }
  };

  return (
    <div className="update-item-container">
      <div className="update-item-form">
        <h1>Edit Item</h1>
        {item && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="category"
              className="input-class"
              value={formData.category}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="name"
              className="input-class"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            {!noSize && (
              <select
                name="size"
                className="select-size"
                value={formData.size}
                onChange={handleInputChange}
              >
                <option value="">Select Size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            )}
            <input
              type="number"
              name="price"
              className="input-class"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="cost"
              className="input-class"
              value={formData.cost}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="amountInStock"
              className="input-class"
              value={formData.amountInStock}
              onChange={handleInputChange}
              required
            />
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="noSizeCheckbox"
                checked={noSize}
                onChange={handleNoSizeChange}
                className="noSizeCheckbox"
              />
              <label htmlFor="noSizeCheckbox">No Size</label>
            </div>
            <div className="button-wrapper">
              <button
                type="button"
                className="btn btn-goBack"
                onClick={() => navigate("/")}
              >
                Back
              </button>
              <button type="submit" className="btn btn-update">
                Update
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateItem;
