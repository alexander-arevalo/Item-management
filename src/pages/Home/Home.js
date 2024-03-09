import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ref, onValue, off, remove } from "firebase/database";
import { db } from "../../utils/firebase-config";
import "./Home.css";
import { useSnackbar } from "notistack";
import ConfirmationDialog from "../../components/Modal/ConfirmationModal";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

  useEffect(() => {
    console.log(
      "Firebase Database URL:",
      process.env.REACT_APP_FIREBASE_DATABASE_URL
    );

    console.log(process.env.REACT_APP_FIREBASE_API_KEY);

    const dbCategoriesRef = ref(db, "/Category");

    const fetchCategories = () => {
      onValue(dbCategoriesRef, (snapshot) => {
        const categoriesData = snapshot.val();
        if (categoriesData) {
          const categoriesArray = Object.entries(categoriesData).map(
            ([uuid, category]) => ({
              uuid,
              ...category,
            })
          );
          setCategories(categoriesArray);
        } else {
          console.log("No categories available");
        }
      });
    };

    fetchCategories();

    return () => {
      off(dbCategoriesRef);
    };
  }, []);

  const handleViewItems = (uuid) => {
    navigate(`/home/${uuid}`);
  };

  const handleEditCategory = (uuid) => {
    navigate(`/home/${uuid}/edit`);
  };

  const handleDeleteCategory = async (uuid) => {
    setDeleteCategoryId(uuid);
  };

  const confirmDeleteCategory = async () => {
    try {
      await remove(ref(db, `/Category/${deleteCategoryId}`));
      setCategories(
        categories.filter((category) => category.uuid !== deleteCategoryId)
      );
    } catch (error) {
      enqueueSnackbar("Error", { variant: "error" });
    }
    setDeleteCategoryId(null);
  };

  const cancelDeleteCategory = () => {
    setDeleteCategoryId(null);
  };

  return (
    <div className="added-item-list">
      <h1>All Categories</h1>
      {categories.length === 0 ? (
        <div className="initial-value">
          <p>No categories available</p>
          <button
            className="btn btn-create"
            onClick={() => navigate("/AddItems")}
          >
            Create Now?
          </button>
        </div>
      ) : (
        <ol>
          {categories.map((category, index) => (
            <li key={index}>
              <div className="category-box">
                <div className="category">{category.category}</div>
                <div className="category-name">{category.name}</div>
                <div className="category-actions">
                  <button
                    onClick={() => handleViewItems(category.uuid)}
                    className="btn btn-view"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEditCategory(category.uuid)}
                    className="btn btn-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.uuid)}
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
      {deleteCategoryId && (
        <ConfirmationDialog
          message={`Are you sure you want to delete this ${
            categories.find((cat) => cat.uuid === deleteCategoryId)?.name
          } category?`}
          onConfirm={confirmDeleteCategory}
          onCancel={cancelDeleteCategory}
        />
      )}
    </div>
  );
};

export default Home;
