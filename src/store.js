import Vue from 'vue';
import Vuex from 'vuex';
import iAxios from './iAxios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
  },

  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.localId;
    },
  },
  actions: {
    singup({ commit }, authData) {
      iAxios.post('/signupNewUser?key=AIzaSyAg8L_1ZcmpYdcvmJI9wy6EnxL5v04u8nU', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      })
      .then(res => {
        console.log('singup res', res);
        commit('authUser', {
          token: res.data.idToken,
          localId: res.data.localId
        });
      })
      .catch(err => console.log('singup err', err));
    },

    login({ commit }, authData) {
      iAxios.post('/verifyPassword?key=AIzaSyAg8L_1ZcmpYdcvmJI9wy6EnxL5v04u8nU', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      })
      .then(res => {
        console.log('singup res', res);
        commit('authUser', {
          token: res.data.idToken,
          localId: res.data.localId
        });
      })
      .catch(err => console.log('singup err', err));
    },
  },
  getters: {

  }
});
