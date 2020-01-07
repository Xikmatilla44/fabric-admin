

const state = {

    table: [],

    listStatus: ['Salom', 'Malaip'],

};
const getters = {};

const actions = {



    async PushLocalStore({commit}, payloads) {
        const  resPush = ("salom");
        commit('PushtoStore', resPush);
    },


};
const mutations = {

    PushtoStore(state, PushStatus){
        // debugger
        state.table = PushStatus;
        console.log(PushStatus);
    },

};

export const ContactModule = {

    namespaced: true,
    state,
    actions,
    mutations,
    getters


};
