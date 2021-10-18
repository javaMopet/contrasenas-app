export default {
    addServidor(state,payload){
        state.servidores.push(payload);
    },
    addServidores(state, payload){
        state.servidores = payload;
    },
    spliceServidor(state, payload){
        const indice = payload.indice;
        console.log(indice);
        state.servidores.splice(indice, 1);
    }
}