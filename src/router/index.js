import { createRouter, createWebHistory } from "vue-router";

import NotFound from '../components/layout/NotFound.vue'
import PrincipalServicios from "../views/servicios/PrincipalServicios.vue";
import Inicio from "../views/Inicio.vue";


//vuex store
import store from '../store/index.js'

import AuthRoutes from './modules/auth/index.js'
import ServidoresRoutes from './modules/servidores/index.js'
import AdminRoutes from './modules/admin/index.js'
import AplicacionesRoutes from './modules/aplicaciones/index.js'

var routes = [
  { path: "/", component: Inicio },
  { path: "/servicios", component: PrincipalServicios, meta: {requiresAuth: true} },    
  { path: "/:notFound(.*)", component: NotFound },
];
routes = routes.concat(ServidoresRoutes, AuthRoutes, AdminRoutes, AplicacionesRoutes);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach(function(to, from, next)
// si el parametro no se utiliza se cambia por "underscore(_)" por convencion
router.beforeEach(function(to, _, next){
  /* console.log("guard routes...")
  console.log("RequiresAuth")
  console.log(to.meta.requiresAuth)
  console.log(store.getters.isAuthenticated)   */
  if(to.meta.requiresAuth && !store.getters.isAuthenticated){    
    next('/auth/login')
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated){
    next('/servicios?loggedIn=1')
  } else {
    next();
  }
});

export default router;
