import PrincipalAplicaciones from '../../../views/aplicaciones/PrincipalAplicaciones.vue'

const routes = [
    { path: "/aplicaciones", component: PrincipalAplicaciones, meta: {requiresAuth: true} },
];
export default routes;