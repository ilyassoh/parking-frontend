import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientService from '../service/ClientService';

function AddClientPage() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        numeroMatricule: '',
        numeroTelephone: '',
        adresse: '',
        nom: '',
        email: '',
        genre: '',
        age: 0
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await ClientService.createClient(formData, token);
            // Clear the form fields after successful registration
            setFormData({
                numeroMatricule: '',
                numeroTelephone: '',
                adresse: '',
                nom: '',
                email: '',
                genre: '',
                age: 0
            });
            alert('Client added successfully');
            navigate('/admin/client-management');

        } catch (error) {
            console.error('Error adding client:', error);
            alert('An error occurred while adding the client');
        }
    };

    return (
        <div className="auth-container">
            <h2>Add Client</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Matricule:</label>
                    <input type="text" name="numeroMatricule" value={formData.numeroMatricule} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Telephone:</label>
                    <input type="text" name="numeroTelephone" value={formData.numeroTelephone} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Adresse:</label>
                    <input type="text" name="adresse" value={formData.adresse} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Nom:</label>
                    <input type="text" name="nom" value={formData.nom} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Genre:</label>
                    <input type="text" name="genre" value={formData.genre} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Age:</label>
                    <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
                </div>
                <button type="submit">Add Client</button>
            </form>
        </div>
    );
}

export default AddClientPage;
