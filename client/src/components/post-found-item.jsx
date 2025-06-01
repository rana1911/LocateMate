import {React, useState} from "react";
import { useForm } from "react-hook-form";
import './styles/post-found-item.css';

const ReportFoundItem = () => {
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
        const response = await fetch("http://localhost:3000/post-found", {
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
        <div className="report-found-item-page">
            <div className="d-flex align-items-center justify-content-center">
                <div className="card w-100">
                    <h2 className="text-center text-white mb-4">Report Found Item</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Item Name */}
                        <div className="mb-4">
                            <label htmlFor="itemName" className="form-label fw-bold">
                                Item Name
                            </label>
                            <input
                                type="text"
                                id="itemName"
                                name="itemName"
                                className="form-control"
                                placeholder="Enter item name"
                                {...register("itemName", { required: "Item name is required" })}
                            />
                            {errors.itemName && <p className="error-message">{errors.itemName.message}</p>}  {/* Error message */}
                        </div>
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
                        {/* Location Found */}
                        <div className="mb-4">
                            <label htmlFor="foundLocation" className="form-label fw-bold">
                                Location Found
                            </label>
                            <input
                                type="text"
                                id="foundLocation"
                                name="foundLocation"
                                className="form-control"
                                placeholder="Enter location where you found the item"
                                {...register("location", { required: "Location is required" })}
                            />
                            {errors.foundLocation && <p className="error-message">{errors.foundLocation.message}</p>}  {/* Error message */}
                        </div>

                        {/* Date Found */}
                        <div className="mb-4">
                            <label htmlFor="foundDate" className="form-label fw-bold">
                                Date Found
                            </label>
                            <input
                                type="date"
                                id="foundDate"
                                name="foundDate"
                                className="form-control"
                                {...register("date", { required: "Date is required" })}
                            />
                            {errors.foundDate && <p className="error-message">{errors.foundDate.message}</p>}  {/* Error message */}
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <label htmlFor="description" className="form-label fw-bold">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                className="form-control"
                                placeholder="Provide a brief description of the item"
                                {...register("description", { required: "Description is required" })}
                            ></textarea>
                            {errors.description && <p className="error-message">{errors.description.message}</p>}  {/* Error message */}
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
                                <option value="Found">Found</option>
                            </select>
                        </div>
                        {/* Contact Info */}
                        <div className="mb-4">
                            <label htmlFor="contactInfo" className="form-label fw-bold">
                                Your Contact Information
                            </label>
                            <input
                                type="text"
                                id="contactInfo"
                                name="contactInfo"
                                className="form-control"
                                placeholder="Enter your phone number or email"
                                {...register("userContact", { required: "Contact info is required" })}
                            />
                            {errors.contactInfo && <p className="error-message">{errors.contactInfo.message}</p>}  {/* Error message */}
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="btn btn-success w-100 text-black">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReportFoundItem;
