export default {
    servidores(state){
        return state.servidores;
    },
    hasServidores(state){
        return state.servidores  && state.servidores.length > 0;
    }
}