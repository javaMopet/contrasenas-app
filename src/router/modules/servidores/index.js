import PrincipalServidores from '../../../views/servidores/PrincipalServidores.vue';

const routes = [
    { path: "/servidores", component: PrincipalServidores, meta: {requiresAuth: true} },
];
export default routes;