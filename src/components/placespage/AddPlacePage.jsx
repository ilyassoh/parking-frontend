import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlaceService from '../service/PlaceService';

function AddPlacePage() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        status: '',
        type: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await PlaceService.createPlace(formData, token);
            setFormData({
                status: '',
                type: ''
            });
            alert('Place added successfully');
            navigate('/admin/place-management');
        } catch (error) {
            console.error('Error adding place:', error);
            alert('An error occurred while adding the place');
        }
    };
    return (
        <div className="auth-container">
            <h2>Add Place</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Status:</label>
                    <input type="text" name="status" value={formData.status} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Type:</label>
                    <input type="text" name="type" value={formData.type} onChange={handleInputChange} required />
                </div>
                <button type="submit">Add Place</button>
            </form>
        </div>
    );
}

export default AddPlacePage;
