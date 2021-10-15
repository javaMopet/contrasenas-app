import UserAuth from "../../../pages/auth/UserAuth.vue";

const routes = [
    { path: "/auth/:mode", component: UserAuth, props: true, meta:{requiresUnauth: true} },
];
export default routes;