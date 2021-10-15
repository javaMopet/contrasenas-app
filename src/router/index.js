import { createRouter, createWebHistory } from "vue-router";

import NotFound from '../components/layout/NotFound.vue'
import PrincipalServicios from "../views/servicios/PrincipalServicios.vue";
import Inicio from "../views/Inicio.vue";


//vuex store
import store from '../store/index.js'

import AuthRoutes from './modules/auth/index.js'
import ServidoresRoutes from './modules/servidores/index.js'

var routes = [
  { path: "/", component: Inicio },
  { path: "/servicios", component: PrincipalServicios, meta: {requiresAuth: true} },    
  { path: "/:notFound(.*)", component: NotFound },
];
routes = routes.concat(ServidoresRoutes, AuthRoutes);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach(function(to, from, next)
// si el parametro no se utiliza se cambia por "underscore(_)" por convencion
router.beforeEach(function(to, _, next){
  if(to.meta.requiresAuth && !store.getters.isAuthenticated){
    // next(false);
    next('/auth/login')
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated){
    next('/servicios?loggedIn=1')
  } else {
    next();
  }
});

export default router;
