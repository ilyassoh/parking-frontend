import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParkingService from '../service/ParkingService';

function AddParkingPage() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        nom: '',
        emplacement: '',
        capaciteTotale: 0,
        placesDisponibles: 0,
        status: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await ParkingService.createParking(formData, token);
            // Clear the form fields after successful addition
            setFormData({
                nom: '',
                emplacement: '',
                capaciteTotale: 0,
                placesDisponibles: 0,
                status: ''
            });
            alert('Parking added successfully');
            navigate('/admin/parking-management');
        } catch (error) {
            console.error('Error adding parking:', error);
            alert('An error occurred while adding the parking');
        }
    };

    return (
        <div className="auth-container">
            <h2>Add Parking</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nom:</label>
                    <input type="text" name="nom" value={formData.nom} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Emplacement:</label>
                    <input type="text" name="emplacement" value={formData.emplacement} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Capacité Totale:</label>
                    <input type="number" name="capaciteTotale" value={formData.capaciteTotale} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Places Disponibles:</label>
                    <input type="number" name="placesDisponibles" value={formData.placesDisponibles} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Status:</label>
                    <input type="text" name="status" value={formData.status} onChange={handleInputChange} />
                </div>
                <button type="submit">Add Parking</button>
            </form>
        </div>
    );
}

export default AddParkingPage;
