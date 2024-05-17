import axios from 'axios';

class ReservationService {
    static BASE_URL = "http://localhost:1010/api/reservation";

    static async getAllStatus(token) {
        try {
            const response = await axios.get(`${ReservationService.BASE_URL}/status`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getAllReservations(search, token) {
        try {
            const response = await axios.get(`${ReservationService.BASE_URL}?search=${search}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async findAllPage(page, size, search, token) {
        try {
            const response = await axios.get(`${ReservationService.BASE_URL}/page?page=${page}&size=${size}&search=${search}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getReservationsByClientId(clientId, token) {
        try {
            const response = await axios.get(`${ReservationService.BASE_URL}/client/${clientId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async createReservation(reservationData, token) {
        try {
            const response = await axios.post(ReservationService.BASE_URL, reservationData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async editReservation(id, reservationData, token) {
        try {
            const response = await axios.put(`${ReservationService.BASE_URL}/${id}`, reservationData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deleteReservation(id, token) {
        try {
            const response = await axios.delete(`${ReservationService.BASE_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default ReservationService;