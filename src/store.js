import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import iAxios from './iAxios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null,
  },

  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.localId;
    },

    storeUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    singup({ commit, dispatch }, authData) {
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
        dispatch('storeUser', authData);
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
        console.log('login res', res);
        commit('authUser', {
          token: res.data.idToken,
          localId: res.data.localId
        });
      })
      .catch(err => console.log('login err', err));
    },

    storeUser({ commit, state }, userData) {
      if (!state.idToken) {
        return;
      }
      axios.post(`/users.json?auth=${state.idToken}`, userData)
        .then(res => console.log('storeUser', res))
        .catch(err => console.log('storeUser', err));
    },

    fetchUser({ commit, state }) {
      if (!state.idToken) {
        return;
      }
      axios.get(`/users.json?auth=${state.idToken}`)
        .then(res => {
          const { data } = res;
          const users = Object.keys(data).map(key => {
            const user = data[key];
            user.id = key;
            return user;
          });
          console.log('users', users);
          commit('storeUser', users[0]);
        })
        .catch(err => {
          console.log(err);
          alert('get users error');
        });
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  }
});
