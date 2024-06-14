// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    buildings: [],
    roomDetails: {}
  },
  mutations: {
    SET_BUILDINGS(state, buildings) {
      state.buildings = buildings;
    },
    SET_ROOM_DETAILS(state, { roomId, details }) {
      Vue.set(state.roomDetails, roomId, details);
    }
  },
  actions: {
    async fetchBuildings({ commit }) {
      try {
        const response = await axios.get('https://api-developers.spinalcom.com/api/v1/geographicContext/space');
        commit('SET_BUILDINGS', response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchRoomDetails({ commit }, roomId) {
      try {
        const response = await axios.get(`https://api-developers.spinalcom.com/api/v1/room/${roomId}/control_endpoint_list`);
        // Filter the endpoints to find Occupation type
        const occupationEndpoint = response.data[0].endpoints.find(endpoint => endpoint.type === 'Occupation');
        const occupation = occupationEndpoint ? occupationEndpoint.currentValue : false;
        commit('SET_ROOM_DETAILS', { roomId, details: { occupation } });
      } catch (error) {
        console.error(error);
      }
    }
  },
  getters: {
    getRoomDetails: (state) => (roomId) => {
      return state.roomDetails[roomId] || {};
    }
  }
});
