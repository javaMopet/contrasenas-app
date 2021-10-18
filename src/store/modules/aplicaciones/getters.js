export default {
    aplicacionesList(state){
        return state.aplicacionesList;
    },
    hasAplicaciones(state){
        return state.aplicacionesList  && state.aplicacionesList.length > 0;
    }
}