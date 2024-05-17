import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/common/Navbar';
import LoginPage from './components/auth/LoginPage';
import LoginPage2 from './components/auth/LoginPage2';
import RegistrationPage from './components/auth/RegistrationPage';
import FooterComponent from './components/common/Footer';
import UserService from './components/service/UserService';
import UpdateUser from './components/userspage/UpdateUser';
import UpdateClient from  './components/clientspage/UpdateClient';
import UpdateParking from  './components/parkingspage/UpdateParking';
import UserManagementPage from './components/userspage/UserManagementPage';
import ProfilePage from './components/userspage/ProfilePage';
import ClientManagementPage from './components/clientspage/ClientManagementPage';
import AddClientsPage from './components/clientspage/AddClientsPage'; 
import ParkingManagementPage from './components/parkingspage/ParkingManagementPage';
import AddParkingPage from './components/parkingspage/AddParkingPage'; 
import PlaceManagementPage from './components/placespage/PlaceManagementPage';
import AddPlacePage from './components/placespage/AddPlacePage';
import UpdatePlace from './components/placespage/UpdatePlace';
import ReservationManagementPage from './components/reservationspage/ReservationManagementPage';
import AddReservationPage from './components/reservationspage/AddReservationPage';
import UpdateReservation from './components/reservationspage/UpdateReservation'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<LoginPage2 />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {UserService.adminOnly() && (
              <>
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/admin/user-management" element={<UserManagementPage />} />
                <Route path="/update-user/:userId" element={<UpdateUser />} />
                <Route path="/admin/client-management" element={<ClientManagementPage />} /> 
                <Route path="/add-client" element={<AddClientsPage />} /> 
                <Route path="/update-client/:clientId" element={<UpdateClient />} />
                <Route path="/admin/parking-management" element={<ParkingManagementPage />} />
                <Route path="/add-parking" element={<AddParkingPage />} /> 
                <Route path="/update-parking/:parkingId" element={<UpdateParking />} />
                <Route path="/admin/place-management" element={<PlaceManagementPage />} />
                <Route path="/add-place" element={<AddPlacePage />} /> 
                <Route path="/update-place/:placeId" element={<UpdatePlace />} />
                <Route path="/admin/reservation-management" element={<ReservationManagementPage />} />
                <Route path="/add-reservation" element={<AddReservationPage />} /> 
                <Route path="/update-reservation/:reservationId" element={<UpdateReservation />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
