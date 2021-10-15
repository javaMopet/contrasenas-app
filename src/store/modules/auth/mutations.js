export default {
    setUser(state, payload){
        state.token = payload.token;
        state.empleadoId = payload.empleadoId;
    }
};