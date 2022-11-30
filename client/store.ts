import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    filter: null, // Username to filter shown freets by (null = show all)
    freets: [], // All freets created in the app
    comments: [], // Added
    likes: [],
    favorites: [],
    username: null, // Username of the logged in user
    userId: null,
    alerts: {} ,// global success/error messages encountered during submissions to non-visible forms
  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    setLikes(state, likes){
      state.likes = likes;
    },
    updateFilter(state, filter) {
      /**
       * Update the stored freets filter to the specified one.
       * @param filter - Username of the user to fitler freets by
       */
      state.filter = filter;
    },
    updateFreets(state, freets) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.freets = freets;
    },
    updateLikes(state, likes) {
      state.likes = likes;
    },
    async refreshFreets(state) {
      /**
       * Request the server for the currently available freets.
       */
      const url = state.filter ? `/api/users/${state.filter}/freets` : '/api/freets';
      const res = await fetch(url).then(async r => r.json());
      state.freets = res;
    },
    addFavorite(state,my_dict) {
      //console.log({"name":my_dict["name"],"url":my_dict["url"]});
      //console.log("Byeeeee")
      state.favorites.push({"name": my_dict["name"], "url": my_dict["url"] })
      console.log(state.favorites);

    },
    // it's okay to have any type
    removeFavorite(state, favorite) {
      console.log("NOOOOOOOO");
      state.favorites = state.favorites.filter((t) => t !== favorite);
    },
    async refreshLikes(state) {
      // Will do something on itt
    },
    setUserId(state,userId) {
      state.userId = userId;

    }

  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
