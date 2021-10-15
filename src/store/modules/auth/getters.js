export default {
    userId(state){
        return state.userId;
    },
    token(state){
        return state.token;
    },
    isAuthenticated(state){        
        return !!state.token; //Con la doble marca de exclamacion convertimos a booleano
    }
};