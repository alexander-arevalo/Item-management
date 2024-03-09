import React, { useState } from "react";
import "./AddItem.css";
import { set, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { db } from "../../utils/firebase-config";
import { useSnackbar } from "notistack";

const AddItems = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    size: "",
    price: "",
    cost: "",
    amountInStock: "",
  });
  const [noSize, setNoSize] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSizeChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, size: value });
  };

  const handleNoSize = () => {
    setNoSize((prevNoSize) => !prevNoSize);
    if (!noSize) {
      setFormData({ ...formData, size: "No Size" });
    } else {
      setFormData({ ...formData, size: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputs = ["category", "name", "price", "cost", "amountInStock"];
    const requiredFields = inputs;
    const missingFields = requiredFields.filter(
      (field) => !formData[field].trim()
    );

    if (missingFields.length > 0) {
      const formattedFields = missingFields.map((field) => {
        return field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (s) => s.toUpperCase());
      });
      setFormError(
        `Please fill out the following fields: ${formattedFields.join(", ")}.`
      );
      return;
    }
    if (noSize) {
      setFormData({ ...formData, size: "No Size" });
    }

    try {
      setIsSubmitting(true);
      const uuid = uid();
      await set(ref(db, `/Category/${uuid}`), {
        ...formData,
        uuid: uuid,
      });

      setFormData({
        category: "",
        name: "",
        size: "",
        price: "",
        cost: "",
        amountInStock: "",
      });
      setIsVisible(false);
      enqueueSnackbar("Successfully Added Item", { variant: "success" });
      navigate(`/home/${uuid}`);
    } catch (error) {
      enqueueSnackbar("Error Adding Item", { variant: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setFormError("");
    setFormData({
      category: "",
      name: "",
      size: "",
      price: "",
      cost: "",
      amountInStock: "",
    });
    setNoSize(false);
  };

  return (
    <div className="home-content">
      <h1 className="home-title"> Manage Your Items</h1>
      {!isVisible && (
        <button className="btn-add" onClick={() => setIsVisible(true)}>
          Click here to add Items
        </button>
      )}

      {isVisible && (
        <div className="form-wrapper form-visible">
          <form>
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="input-class"
              value={formData.category}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input-class"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <select
              // className="select-size"
              className="input-class"
              value={noSize ? "" : formData.size}
              onChange={handleSizeChange}
              disabled={noSize}
            >
              <option value="">Select Size {noSize && "(optional)"}</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>

            <input
              type="number"
              name="price"
              placeholder="Price"
              className="input-class"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="cost"
              placeholder="Cost"
              className="input-class"
              value={formData.cost}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="amountInStock"
              placeholder="Amount In Stock"
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
                onChange={handleNoSize}
              />
              <label htmlFor="noSizeCheckbox">No Size</label>
            </div>
            <div className="button-wrapper">
              <button className="btn-cancel" onClick={handleClose}>
                Cancel
              </button>
              <button
                className="btn-submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
            {formError && <p className="form-error">{formError}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default AddItems;
