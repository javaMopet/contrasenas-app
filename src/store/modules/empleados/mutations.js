export default {
    addEmpleado(state,payload){
        state.empleadosList.push(payload);
    },
    addEmpleadosList(state, payload){
        state.empleadosList = payload;
    }

}