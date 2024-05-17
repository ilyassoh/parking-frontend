import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClientService from '../service/ClientService';

function ClientManagementPage() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await ClientService.getAllClients(token);
      if (Array.isArray(response)) {
        setClients(response);
      } else {
        console.error('Invalid response format:', response);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const deleteClient = async (clientId) => {
    try {
      const token = localStorage.getItem('token'); 
      const confirmDelete = window.confirm('Are you sure you want to delete this client?');
      if (confirmDelete) {
        await ClientService.deleteClient(clientId, token);
        fetchClients();
      }
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  return (
    <div className="client-management-container">
      <h2>Clients Management Page</h2>
      <button className="reg-button">
        <Link to="/add-client" className="color-button">Add Client</Link>
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Age</th>
            <th>Genre</th>
            <th>Adresse</th>
            <th>Matricule</th>
            <th>Telephone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.nom}</td>
              <td>{client.email}</td>
              <td>{client.age}</td>
              <td>{client.genre}</td>
              <td>{client.adresse}</td>
              <td>{client.numeroMatricule}</td>
              <td>{client.numeroTelephone}</td>
              <td>
                <button className="delete-button" onClick={() => deleteClient(client.id)}>Delete</button>
                <button>
                  <Link to={`/update-client/${client.id}`} className="white-link">Update</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientManagementPage;
