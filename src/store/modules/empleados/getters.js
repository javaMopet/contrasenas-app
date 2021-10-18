export default {
    empleadosList(state){
        return state.empleadosList;
    },
    hasEmpleados(state){
        return state.empleadosList  && state.empleadosList.length > 0;
    }
}