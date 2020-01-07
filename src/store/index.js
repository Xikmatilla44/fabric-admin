import Vue from 'vue'
import Vuex from 'vuex'
import { router } from '../_helpers';
//import { userService } from '../_services';
import {http} from '../_helpers/http-common'
import { ContactModule } from "./Contact.Module";

Vue.use(Vuex)
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user, alert: { type: '', message: '' }, socket: { isConnected: false,  message: '',  reconnectError: false } }
  : { status: { loggedIn: false }, user: {}, alert: { type: '', message: '' }, socket: { isConnected: false,  message: '',  reconnectError: false } };

export default new Vuex.Store({


  namespaced: true,
  state: initialState,
  actions: {
      login({dispatch, commit}, {username, password}) {
          debugger
          commit('loginRequest', {username});
          http.post("Account/login", {username, password})
              .then(response => {
                      debugger
                      let user = response.data;
                      if (user.token) {
                          debugger
                          localStorage.setItem('user', JSON.stringify(user));
                          commit('loginSuccess', user);
                          debugger
                          router.push('/admin_ui')
                      }
                  },
                  error => {
                      debugger
                      commit('loginFailure', error);

                      console.log(error)
                      debugger
                      dispatch('error', error, {root: true});
                  })
      },
    register({ dispatch, commit }, user) {
          debugger
      commit('registerRequest', user);
      http.post("Account/register", JSON.stringify(user))
        .then(response => {
            debugger
          let user = response.data;
          commit('registerSuccess', user);
          router.push('/login');
          debugger
          setTimeout(() => {
            // display success message after route change completes
            dispatch('success', 'Registration successful', { root: true });
          })
        },
          error => {
            debugger
            commit('registerFailure', error);
            dispatch('error', error, { root: true });
          });     
    },
    logout({ commit }) {
      localStorage.removeItem('user');
      commit('logout');
    },
    success({ commit }, message) {
      commit('success', message);
    },
    error({ commit }, message) {
      commit('error', message);
    },
    clear({ commit }, message) {
      commit('success', message);
    }
  },
  mutations: {
    SOCKET_ONOPEN (state, event)  {
      Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = true
    },
    SOCKET_ONCLOSE (state)  {
      state.socket.isConnected = false
    },
    // SOCKET_ONERROR (state, event)  {
    //   //console.error(state, event)
    // },
    // default handler called for all methods
    SOCKET_ONMESSAGE (state, message)  {
      state.socket.message = message
    },
    // mutations for reconnect methods
    // SOCKET_RECONNECT(state, count) {
    //   //console.info(state, count)
    // },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
    loginRequest(state, user) {
      state.status = { loggingIn: true };
      state.user = user;
    },
    loginSuccess(state, user) {
      state.status = { loggedIn: true };
      state.user = user;
    },
    loginFailure(state) {
      state.status = {};
      state.user = {};
    },
    logout(state) {
      state.status = {};
      state.user = {};
    },
    success(state, message) {
      state.type = 'alert-success';
      state.message = message;
    },
    error(state, message) {
      state.type = 'alert-danger';
      state.message = message;
    },
    clear(state) {
      state.type = '';
      state.message = '';
    },
    registerRequest(state) {
      state.status = { registering: true };
    },
    registerSuccess(state) {
      state.status = {};
    },
    registerFailure(state) {
      state.status = {};
    }
  },
  modules: {
      ContactModule
  }
})
