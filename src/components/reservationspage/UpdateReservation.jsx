import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReservationService from '../service/ReservationService';
import ParkingService from '../service/ParkingService';
import PlaceService from '../service/PlaceService';
import ClientService from '../service/ClientService';

function UpdateReservation() {
    const navigate = useNavigate();
    const { reservationId } = useParams();

    const [reservationData, setReservationData] = useState({
        status: '',
        placeId: '',
        parkingId: '',
        clientId: ''
    });

    const [places, setPlaces] = useState([]);
    const [parkings, setParkings] = useState([]);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetchReservationDataById(reservationId);
        fetchPlaces();
        fetchParkings();
        fetchClients();
    }, [reservationId]);

    const fetchReservationDataById = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await ReservationService.getReservationById(id, token);
            const { status, placeId, parkingId, clientId } = response;
            setReservationData({ status, placeId, parkingId, clientId });
        } catch (error) {
            console.error('Error fetching reservation data:', error);
        }
    };

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
        setReservationData((prevReservationData) => ({
            ...prevReservationData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const confirmUpdate = window.confirm('Are you sure you want to update this reservation?');
            if (confirmUpdate) {
                const token = localStorage.getItem('token');
                const res = await ReservationService.editReservation(reservationId, reservationData, token);
                console.log(res);
                navigate("/reservations");
            }
        } catch (error) {
            console.error('Error updating reservation:', error);
            alert('Error updating reservation: ' + error.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Update Reservation</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Status:</label>
                    <input 
                        type="text" 
                        name="status" 
                        value={reservationData.status} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Place:</label>
                    <select 
                        name="placeId" 
                        value={reservationData.placeId} 
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
                        value={reservationData.parkingId} 
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
                        value={reservationData.clientId} 
                        onChange={handleInputChange} 
                        required
                    >
                        <option value="">Select Client</option>
                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>{client.id} - {client.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Update Reservation</button>
            </form>
        </div>
    );
}

export default UpdateReservation;
