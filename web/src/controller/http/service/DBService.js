import axios from '../../../axios.js'

export default class DBService {
  static async getAllClients() {
    return axios.get('/clients');
  }

  static async getClient(id) {
    return axios.get(`/clients/${id}`);
  }

  static async getRentedServices(id) {
    return axios.get(`/service/${id}`);
  }

  static async addNewClient(client) {
    return axios.post(`/clients`, client);
  }

  static async deleteClient(id) {
    return axios.delete(`/clients/${id}`);
  }

  static async addService(service) {
    return axios.post(`/service`, service);
  }

  static async updateClient(client) {
    return axios.put(`/clients`, client);
  }
}
