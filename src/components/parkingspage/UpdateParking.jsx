import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ParkingService from '../service/ParkingService';

function UpdateParking() {
    const navigate = useNavigate();
    const { parkingId } = useParams();

    const [parkingData, setParkingData] = useState({
        nom: '',
        emplacement: '',
        capaciteTotale: 0,
        placesDisponibles: 0,
        status: ''
    });

    useEffect(() => {
        fetchParkingDataById(parkingId);
    }, [parkingId]);

    const fetchParkingDataById = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await ParkingService.getParkingById(id, token);
            const { nom, emplacement, capaciteTotale, placesDisponibles, status } = response;
            setParkingData({ nom, emplacement, capaciteTotale, placesDisponibles, status });
        } catch (error) {
            console.error('Error fetching parking data:', error);
        }
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setParkingData((prevParkingData) => ({
            ...prevParkingData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const confirmUpdate = window.confirm('Are you sure you want to update this parking?');
            if (confirmUpdate) {
                const token = localStorage.getItem('token');
                const res = await ParkingService.updateParking(parkingId, parkingData, token);
                console.log(res);
                // Redirect to parking management page or display a success message
                navigate("/admin/parking-management");
            }
        } catch (error) {
            console.error('Error updating parking:', error);
            alert('Error updating parking: ' + error.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Update Parking</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nom:</label>
                    <input type="text" name="nom" value={parkingData.nom} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Emplacement:</label>
                    <input type="text" name="emplacement" value={parkingData.emplacement} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Capacité Totale:</label>
                    <input type="number" name="capaciteTotale" value={parkingData.capaciteTotale} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Places Disponibles:</label>
                    <input type="number" name="placesDisponibles" value={parkingData.placesDisponibles} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Status:</label>
                    <input type="text" name="status" value={parkingData.status} onChange={handleInputChange} />
                </div>
                <button type="submit">Update Parking</button>
            </form>
        </div>
    );
}

export default UpdateParking;
