<template>
  <section class="w-100 bg-dark">
    <nav
      class="
            navbar navbar-expand-lg navbar-dark
            bg-purple-dark
            navbar-sticky
          "
    >
      <div class="container-fluid">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <router-link to="/" class="nav-link text-light fw-bold"
            > <span class="logo"><i class="bi bi-key"></i> Repositorio de contraseñas</span></router-link
          >
        </ul>
        <button
          class="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#Navigation"
          aria-controls="Navigation"
          aria-expanded="false"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="Navigation">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item active" v-if="isLoggedIn">
              <!-- <a href="#" class="nav-link">Servicios</a> -->
              <router-link to="/servicios" class="nav-link"
                >Servicios</router-link
              >
            </li>
            <li class="nav-item dropdown" v-if="isLoggedIn">
              <a
                href="/Servicios"
                class="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >Administrador</a
              >
              <ul class="dropdown-menu">
                <li>
                  <router-link to="/servidores" class="dropdown-item"
                    >Servidores</router-link
                  >
                </li>
                <li>
                  <router-link to="/aplicaciones" class="dropdown-item"
                    >Aplicaciones</router-link>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a href="#Product-gallery" class="dropdown-item">Empleados</a>
                </li>
              </ul>
            </li>
            <!-- <li class="nav-item">
              <a href="#Collaborate" class="nav-link">Empleados</a>
            </li> -->
          </ul>
          <div class="d-flex">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="!isLoggedIn">
              <router-link to="/auth/login" class="nav-link">Login</router-link>
            </ul>
            <router-link
              class="btn btn-outline-light"
              to="/auth/signup"
              v-if="!isLoggedIn"
              >SignUp</router-link
            >
            <p class="nav-bar-item text-info" >{{usuarioSesion}}</p>
            <button
              class="btn btn-info text-dark"              
              type="button"
              v-if="isLoggedIn"
              @click="logout"
            >
              <i class="bi bi-box-arrow-right"></i> 
              <span style="font-size: 11px">  Salir</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </section>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/auth/login");
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    usuarioSesion(){
      return this.$store.getters.userId;
    }
  },
};
</script>
<style scoped>  
  @import url('https://fonts.googleapis.com/css2?family=Akronim&family=Ephesis&display=swap');

  .logo{
  font-family: 'Akronim', cursive;    
    font-size: 1.5rem;
    font-weight: bold;
    color: lightblue;
    }
</style>
