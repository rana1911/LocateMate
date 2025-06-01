import { useState } from "react";
import { useForm } from "react-hook-form";
import "./styles/post-lost-item.css";

const PostLostItem = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [image, setImage] = useState(null);

    // Handle image selection
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Upload image to Cloudinary
    const uploadImageToCloudinary = async () => {
        if (!image) return null;

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "LocateMate"); // Using env variable

        try {
            const response = await fetch(
                'https://api.cloudinary.com/v1_1/dajir1gdw/image/upload', // Using env variable
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();
            return data.secure_url; // Return uploaded image URL
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    // Form submission handler
    const onSubmit = async (data) => {
        console.log("Submitting form...");

        const uploadedImageUrl = await uploadImageToCloudinary();
        if (!uploadedImageUrl) {
            alert("Failed to upload image. Please try again.");
            return;
        }

        const formData = { ...data, imageUrl: uploadedImageUrl };

        // Send form data including the image URL to the backend
        const response = await fetch("http://localhost:3000/post-lost", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            console.log("Lost item posted successfully!");
        } else {
            console.error("Error posting lost item");
        }
    };

    return (
        <section className="post-lost-container">
            <div className="post-lost-card">
                <h2 className="post-lost-title">Report a Lost Item</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Item Name */}
                    <div className="post-lost-field">
                        <label className="post-lost-label">Item Name</label>
                        <input 
                            type="text" 
                            className="post-lost-input" 
                            placeholder="Enter the name of the lost item"
                            {...register("itemName", { required: "Item name is required" })}
                        />
                        {errors.itemName && <p className="error-message">{errors.itemName.message}</p>}
                    </div>

                    {/* Category */}
                    <div className="post-lost-field">
                        <label className="post-lost-label">Category</label>
                        <select 
                            className="post-lost-input" 
                            {...register("category", { required: "Please select a category" })}
                        >
                            <option value="" disabled selected>Choose category</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="jewelry">Jewelry</option>
                            <option value="documents">Documents</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.category && <p className="error-message">{errors.category.message}</p>}
                    </div>

                    {/* Description */}
                    <div className="post-lost-field">
                        <label className="post-lost-label">Description</label>
                        <textarea 
                            className="post-lost-input" 
                            rows="3" 
                            placeholder="Describe the lost item"
                            {...register("description", { required: "Description is required" })}
                        />
                        {errors.description && <p className="error-message">{errors.description.message}</p>}
                    </div>

                    {/* Location */}
                    <div className="post-lost-field">
                        <label className="post-lost-label">Location</label>
                        <input 
                            type="text" 
                            className="post-lost-input" 
                            placeholder="Enter the location"
                            {...register("location", { required: "Location is required" })}
                        />
                        {errors.location && <p className="error-message">{errors.location.message}</p>}
                    </div>

                    {/* Date */}
                    <div className="post-lost-field">
                        <label className="post-lost-label">Date</label>
                        <input 
                            type="date" 
                            className="post-lost-input" 
                            {...register("date", { required: "Date is required" })}
                        />
                        {errors.date && <p className="error-message">{errors.date.message}</p>}
                    </div>

                    {/* Image Upload */}
                    <div className="post-lost-field">
                        <label className="post-lost-label">Upload Image</label>
                        <input 
                            type="file" 
                            className="post-lost-input" 
                            onChange={handleFileChange}
                        />
                    </div>

                    {/* Status */}
                    <div className="post-lost-field">
                        <label className="post-lost-label">Status</label>
                        <select 
                            className="post-lost-input" 
                            {...register("status")}
                        >
                            <option value="Lost">Lost</option>
                        </select>
                    </div>
                    <div className="post-lost-field mb-4">
                            <label htmlFor="contactInfo" className="form-label fw-bold">
                                Your Contact Information
                            </label>
                            <input
                                type="text"
                                id="contactInfo"
                                name="contactInfo"
                                className="form-control"
                                placeholder="Enter your phone number or email"
                                style={{backgroundColor: "black"}}
                                {...register("userContact", { required: "Contact info is required" })}
                            />
                            {errors.contactInfo && <p className="error-message">{errors.contactInfo.message}</p>}  {/* Error message */}
                        </div>
                    {/* Submit Button */}
                    <button type="submit" className="post-lost-button">Post Lost Item</button>
                </form>
            </div>
        </section>
    );
};

export default PostLostItem;
