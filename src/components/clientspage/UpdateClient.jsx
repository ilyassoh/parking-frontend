import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ClientService from '../service/ClientService';

function UpdateClient() {
    const navigate = useNavigate();
    const { clientId } = useParams();

    const [clientData, setClientData] = useState({
        numeroMatricule: '',
        numeroTelephone: '',
        adresse: '',
        nom: '',
        email: '',
        genre: '',
        age: 0
    });

    useEffect(() => {
        fetchClientDataById(clientId);
    }, [clientId]);

    const fetchClientDataById = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await ClientService.getClientById(id, token);
            const { numeroMatricule, numeroTelephone, adresse, nom, email, genre, age } = response;
            setClientData({ numeroMatricule, numeroTelephone, adresse, nom, email, genre, age });
        } catch (error) {
            console.error('Error fetching client data:', error);
        }
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClientData((prevClientData) => ({
            ...prevClientData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const confirmUpdate = window.confirm('Are you sure you want to update this client?');
            if (confirmUpdate) {
                const token = localStorage.getItem('token');
                const res = await ClientService.updateClient(clientId, clientData, token);
                console.log(res);
                // Redirect to profile page or display a success message
                navigate("/admin/client-management");
            }
        } catch (error) {
            console.error('Error updating client profile:', error);
            alert('Error updating client: ' + error.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Update Client</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Matricule:</label>
                    <input type="text" name="numeroMatricule" value={clientData.numeroMatricule} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Telephone:</label>
                    <input type="text" name="numeroTelephone" value={clientData.numeroTelephone} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Adresse:</label>
                    <input type="text" name="adresse" value={clientData.adresse} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Nom:</label>
                    <input type="text" name="nom" value={clientData.nom} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={clientData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Genre:</label>
                    <input type="text" name="genre" value={clientData.genre} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Age:</label>
                    <input type="number" name="age" value={clientData.age} onChange={handleInputChange} />
                </div>
                <button type="submit">Update Client</button>
            </form>
        </div>
    );
}

export default UpdateClient;
