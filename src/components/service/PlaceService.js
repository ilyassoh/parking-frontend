import axios from "axios";

class PlaceService {
    static BASE_URL = "http://localhost:1010/api/place";

    static async getAllStatus(token) {
        try {
            const response = await axios.get(`${PlaceService.BASE_URL}/status`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async findAllByType(type, token) {
        try {
            const response = await axios.get(`${PlaceService.BASE_URL}/type/${type}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getPlaceById(id, token) {
        try {
            const response = await axios.get(`${PlaceService.BASE_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    static async findAll(search, token) {
        try {
            const response = await axios.get(PlaceService.BASE_URL, {
                params: { search },
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    static async findAllByStatus(status, token) {
        try {
            const response = await axios.get(`${PlaceService.BASE_URL}/status/${status}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async getAllTypes(token) {
        try {
            const response = await axios.get(`${PlaceService.BASE_URL}/types`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async findAllPage(page, size, search, token) {
        try {
            const response = await axios.get(`${PlaceService.BASE_URL}/page`, {
                params: { page, size, search },
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async createPlace(placeData, token) {
        try {
            const response = await axios.post(PlaceService.BASE_URL, placeData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async editPlace(id, placeData, token) {
        try {
            const response = await axios.put(`${PlaceService.BASE_URL}/${id}`, placeData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async deletePlace(id, token) {
        try {
            const response = await axios.delete(`${PlaceService.BASE_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async countEmptyUnreservedPlaces(token) {
        try {
            const response = await axios.get(`${PlaceService.BASE_URL}/empty-unreserved-count`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default PlaceService;
