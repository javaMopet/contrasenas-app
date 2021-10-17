import Empleados from "../../../views/admin/Empleados.vue";

const routes = [
    { path: "/admin/Empleados", component: Empleados, meta:{requiresAuth: true} },
];
export default routes;