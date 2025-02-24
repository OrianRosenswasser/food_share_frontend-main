import React, { useState } from "react";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";
import axios from "axios";

const FoodPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    expiration_date: "",
    whatsapp_link: "",
    collection_point: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const submitFoodPost = async () => {
    const csrfToken = document.querySelector(
      "[name=csrfmiddlewaretoken]"
    )?.value;

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      const response = await axios.post("/post_food/", data, {
        headers: {
          "X-CSRFToken": csrfToken,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Food post created successfully!");
      setFormData({
        title: "",
        description: "",
        quantity: "",
        expiration_date: "",
        whatsapp_link: "",
        collection_point: "",
        photo: null,
      });
    } catch (error) {
      console.error("Error creating food post:", error);
      alert("Failed to create food post. Please try again.");
    }
  };

  return (
    <form>
      <FormField
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <FormField
        type="textarea"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <FormField
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
        required
      />
      <FormField
        type="datetime-local"
        name="expiration_date"
        value={formData.expiration_date}
        onChange={handleChange}
        required
      />
      <FormField
        type="text"
        name="whatsapp_link"
        placeholder="WhatsApp Link"
        value={formData.whatsapp_link}
        onChange={handleChange}
        required
      />
      <FormField
        type="text"
        name="collection_point"
        placeholder="Collection Point"
        value={formData.collection_point}
        onChange={handleChange}
        required
      />
      <FormField
        type="file"
        name="photo"
        accept="image/*"
        onChange={handleFileChange}
      />
      <SubmitButton onClick={submitFoodPost}>Submit Post2</SubmitButton>
    </form>
  );
};

export default FoodPostForm;
