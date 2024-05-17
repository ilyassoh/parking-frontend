import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReservationService from '../service/ReservationService';
import ParkingService from '../service/ParkingService';
import PlaceService from '../service/PlaceService';
import ClientService from '../service/ClientService';

function AddReservationPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        status: '',
        placeId: '',
        parkingId: '',
        clientId: ''
    });

    const [places, setPlaces] = useState([]);
    const [parkings, setParkings] = useState([]);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetchPlaces();
        fetchParkings();
        fetchClients();
    }, []);

    const fetchPlaces = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await PlaceService.findAll(token);
            setPlaces(response);
        } catch (error) {
            console.error('Error fetching places:', error);
        }
    };

    const fetchParkings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await ParkingService.findAll(token);
            setParkings(response);
        } catch (error) {
            console.error('Error fetching parkings:', error);
        }
    };

    const fetchClients = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await ClientService.getAllClients(token);
            setClients(response);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await ReservationService.createReservation(formData, token);
            setFormData({
                status: '',
                placeId: '',
                parkingId: '',
                clientId: ''
            });
            alert('Reservation added successfully');
            navigate('/reservations');
        } catch (error) {
            console.error('Error adding reservation:', error);
            alert('An error occurred while adding the reservation');
        }
    };

    return (
        <div className="auth-container">
            <h2>Add Reservation</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Status:</label>
                    <input 
                        type="text" 
                        name="status" 
                        value={formData.status} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Place:</label>
                    <select 
                        name="placeId" 
                        value={formData.placeId} 
                        onChange={handleInputChange} 
                        required
                    >
                        <option value="">Select Place</option>
                        {places.map((place) => (
                            <option key={place.id} value={place.id}>{place.id} - {place.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Parking:</label>
                    <select 
                        name="parkingId" 
                        value={formData.parkingId} 
                        onChange={handleInputChange} 
                        required
                    >
                        <option value="">Select Parking</option>
                        {parkings.map((parking) => (
                            <option key={parking.id} value={parking.id}>{parking.id} - {parking.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Client:</label>
                    <select 
                        name="clientId" 
                        value={formData.clientId} 
                        onChange={handleInputChange} 
                        required
                    >
                        <option value="">Select Client</option>
                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>{client.id} - {client.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Add Reservation</button>
            </form>
        </div>
    );
}

export default AddReservationPage;
