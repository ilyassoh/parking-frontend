import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ParkingService from '../service/ParkingService';

function ParkingManagementPage() {
  const [parkings, setParkings] = useState([]);

  useEffect(() => {
    fetchParkings();
  }, []);

  const fetchParkings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await ParkingService.findAll(token);
      if (Array.isArray(response)) {
        setParkings(response);
      } else {
        console.error('Invalid response format:', response);
      }
    } catch (error) {
      console.error('Error fetching parkings:', error);
    }
  };

  const deleteParking = async (parkingId) => {
    try {
      const token = localStorage.getItem('token'); 
      const confirmDelete = window.confirm('Are you sure you want to delete this parking?');
      if (confirmDelete) {
        await ParkingService.deleteParking(parkingId,token);
        fetchParkings();
      }
    } catch (error) {
      console.error('Error deleting parking:', error);
    }
  };

  return (
    <div className="parking-management-container">
      <h2>Parking Management Page</h2>
      <button className='reg-button'>
        <Link to="/add-parking" className='color-button'>Add Parking</Link>
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Total Capacity</th>
            <th>Available Spaces</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parkings.map(parking => (
            <tr key={parking.id}>
              <td>{parking.id}</td>
              <td>{parking.nom}</td>
              <td>{parking.emplacement}</td>
              <td>{parking.capaciteTotale}</td>
              <td>{parking.placesDisponibles}</td>
              <td>{parking.status}</td>
              <td>
                <button className='delete-button' onClick={() => deleteParking(parking.id)}>Delete</button>
                <button>
                  <Link to={`/update-parking/${parking.id}`} className='white-link'>Update</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ParkingManagementPage;
