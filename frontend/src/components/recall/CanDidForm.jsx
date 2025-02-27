import React, { useState, useEffect } from "react";

const FormWithBackground = () => {
    const [formData, setFormData] = useState({
        category: "",
        title: "",
        eventDate: "",
        remindBefore: "",
        additionalInfo: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Process form data here
        console.log(formData);
    };

    return (

        <div className="flex flex-col items-center justify-center h-full bg-black bg-opacity-50">

            <form onSubmit={handleSubmit} className="bg-white px-8 py-4 shadow-lg w-full sm:w-96 mx-4">
                <h1 className="text-xl font-bold text-white text-center my-6">
                    <span className="text-indigo-500">Quick Remind Add Form</span>
                </h1>
                <div className="mb-4">
                    <label className="block text-lg font-semibold text-gray-700" htmlFor="category">Category:</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Select Category</option>
                        <option value="Conference">Conference</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Webinar">Webinar</option>
                        <option value="Meeting">Meeting</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-semibold text-gray-700" htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-semibold text-gray-700" htmlFor="eventDate">Event Date:</label>
                    <input
                        type="date"
                        id="eventDate"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-lg font-semibold text-gray-700" htmlFor="remindBefore">Remind Me Before:</label>
                    <select
                        id="remindBefore"
                        name="remindBefore"
                        value={formData.remindBefore}
                        onChange={handleChange}
                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">Select Reminder Time</option>
                        <option value="1 hour">1 hour</option>
                        <option value="1 day">1 day</option>
                        <option value="1 week">1 week</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block text-lg font-semibold text-gray-700" htmlFor="additionalInfo">Additional Info:</label>
                    <textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                        rows="4"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg text-lg"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FormWithBackground;
