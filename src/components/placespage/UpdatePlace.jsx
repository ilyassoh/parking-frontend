import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PlaceService from '../service/PlaceService';

function UpdatePlace() {
    const navigate = useNavigate();
    const { placeId } = useParams();

    const [placeData, setPlaceData] = useState({
        status: '',
        type: ''
    });

    useEffect(() => {
        fetchPlaceDataById(placeId);
    }, [placeId]);

    const fetchPlaceDataById = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await PlaceService.getPlaceById(id, token);
            const { status, type } = response;
            setPlaceData({ status, type });
        } catch (error) {
            console.error('Error fetching place data:', error);
        }
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPlaceData((prevPlaceData) => ({
            ...prevPlaceData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const confirmUpdate = window.confirm('Are you sure you want to update this place?');
            if (confirmUpdate) {
                const token = localStorage.getItem('token');
                await PlaceService.editPlace(placeId, placeData, token);
                alert('Place updated successfully');
                navigate("/admin/place-management");
            }
        } catch (error) {
            console.error('Error updating place:', error);
            alert('An error occurred while updating the place');
        }
    };

    return (
        <div className="auth-container">
            <h2>Update Place</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Status:</label>
                    <input type="text" name="status" value={placeData.status} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Type:</label>
                    <input type="text" name="type" value={placeData.type} onChange={handleInputChange} required />
                </div>
                <button type="submit">Update Place</button>
            </form>
        </div>
    );
}

export default UpdatePlace;
