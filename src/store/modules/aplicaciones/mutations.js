export default {
    addAplicacion(state,payload){
        state.aplicacionesList.push(payload);
    },
    addAplicacionesList(state, payload){
        state.aplicacionesList = payload;
    }

}