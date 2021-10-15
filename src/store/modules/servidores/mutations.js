export default {
    addServidor(state,payload){
        state.servidores.push(payload);
    },
    addServidores(state, payload){
        state.servidores = payload;
    }

}