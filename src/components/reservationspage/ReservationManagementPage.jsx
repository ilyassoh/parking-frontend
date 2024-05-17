import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReservationService from '../service/ReservationService';

function ReservationManagementPage() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await ReservationService.getAllReservations('', token);
            if (Array.isArray(response)) {
                setReservations(response);
            } else {
                console.error('Invalid response format:', response);
            }
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    const deleteReservation = async (reservationId) => {
        try {
            const token = localStorage.getItem('token');
            const confirmDelete = window.confirm('Are you sure you want to delete this reservation?');
            if (confirmDelete) {
                await ReservationService.deleteReservation(reservationId, token);
                fetchReservations();
            }
        } catch (error) {
            console.error('Error deleting reservation:', error);
        }
    };

    return (
        <div className="reservation-management-container">
            <h2>Reservations Management Page</h2>
            <button className='reg-button'>
                <Link to="/add-reservation" className='color-button'>Add Reservation</Link>
            </button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date Entrée</th>
                        <th>Date Sortie</th>
                        <th>Status</th>
                        <th>Place ID</th>
                        <th>Parking ID</th>
                        <th>Client ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map(reservation => (
                        <tr key={reservation.id}>
                            <td>{reservation.id}</td>
                            <td>{reservation.date_entree}</td>
                            <td>{reservation.date_sortie}</td>
                            <td>{reservation.status}</td>
                            <td>{reservation.placeId}</td> {/* Afficher l'ID de la place */}
                            <td>{reservation.parkingId}</td> {/* Afficher l'ID du parking */}
                            <td>{reservation.clientId}</td> {/* Afficher l'ID du client */}
                            <td>
                                <button className='delete-button' onClick={() => deleteReservation(reservation.id)}>Delete</button>
                                <button>
                                    <Link to={`/update-reservation/${reservation.id}`} className='white-link'>Update</Link>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReservationManagementPage;

