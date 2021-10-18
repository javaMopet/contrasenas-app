export default {
    setUser(state, payload){
        state.token = payload.token;
        state.empleadoId = payload.empleadoId;
        state.empleadoRol = payload.empleadoRol;
        state.empleadoLogin = payload.empleadoLogin;
        state.empleadoNombre = payload.empleadoNombre;
    }
};