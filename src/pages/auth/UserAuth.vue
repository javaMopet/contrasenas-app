<template>
  <div class="container-fluid sesion py-5">
    <div class="row">
      <div class="col-md-5 mx-auto">
        <div id="first" v-if="mode === 'login'">
          <div class="myform form shadow">
            <div class="logo mb-3">
              <div
                class="col-md-12 d-flex align-self-center justify-content-center"
              >
                <i class="bi bi-lock fs-2 text-success me-3"></i>
                <h1>Login</h1>
              </div>
            </div>
            <p v-if="expiredSesion" class="text-danger">
              Terminó el tiempo de la sesión.
            </p>
            <form name="login" @submit.prevent="auth">
              <div class="form-group form-floating mb-3">
                <!-- <label for="exampleInputEmail1">Dirección de correo</label> -->
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  v-model.trim="email"
                />
                <label for="email" class="text-primary">Email</label>
              </div>
              <div class="form-group  form-floating mb-3">
                <!-- <label for="exampleInputEmail1">Contraseña</label> -->
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Password"
                  v-model.trim="password"
                />
                <label for="password" class="text-primary">Password:</label>
              </div>
              <div
                class="d-flex align-items-center text-primary"
                v-if="ingresando"
              >
                <strong>Ingresando...</strong>
                <div
                  class="spinner-border ms-auto"
                  role="status"
                  aria-hidden="true"
                ></div>
              </div>
              <p v-if="messageError.length > 0" class="text-danger mb-4">
                {{ messageError }}
              </p>

              <!-- <div class="form-group">
                <p class="text-center">
                  By signing up you accept our <a href="#">Terms Of Use</a>
                </p>
              </div> -->
              <div class="col-md-12 text-center mt-4">
                <button
                  type="submit"
                  class=" btn btn-block mybtn btn-primary tx-tfm"
                >
                  Ingresar
                </button>
              </div>
              <div class="col-md-12 ">
                <div class="login-or">
                  <hr class="hr-or" />
                  <span class="span-or">or</span>
                </div>
              </div>
              <div class="col-md-12 mb-3">
                <p class="text-center">
                  <a href="javascript:void();" class="google btn mybtn"
                    ><i class="fa fa-google-plus"> </i> Signup using Google
                  </a>
                </p>
              </div>
              <div class="form-group">
                <p class="text-center">
                  ¿No estas registrado?
                  <router-link to="/auth/signup">Registrate aquí</router-link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div id="sencond" v-else>
          <div class="myform form">
            <div class="logo mb-3">
              <div class="col-md-12 text-center">
                <h1>Registro</h1>
              </div>
              <form name="registration" @submit.prevent="auth">
                <div class="form-group">
                  <label for="exampleInputEmail1">Nombre Empleado:</label>
                  <input
                    type="text"
                    name="firstname"
                    class="form-control"
                    id="firstname"
                    aria-describedby="emailHelp"
                    placeholder="Ingresar nombre del empleado"
                    v-model="empleado.nombre"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="rol">Tipo de Empleado (Rol):</label>
                  <select
                    id="rol"
                    class="form-select"
                    v-model="empleado.rol"
                    required
                  >
                    <option value="1" selected>Administrador</option>
                    <option value="2">Usuario Final</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Cuenta de Correo:</label>
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Ingresa tu cuenta de correo"
                    v-model="empleado.login"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Contraseña:</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Ingresa una contraseña"
                    v-model="empleado.password"
                    required
                  />
                </div>

                <div
                  class="d-flex align-items-center text-primary"
                  v-if="registrandoEmpleado"
                >
                  <strong>Registrando...</strong>
                  <div
                    class="spinner-border ms-auto"
                    role="status"
                    aria-hidden="true"
                  ></div>
                </div>

                <p class="text-danger" v-if="errorMessage.length > 0">
                  {{errorMessage}}
                </p>
                <div class="col-md-12 text-center mb-3 mt-3">
                  <button
                    type="submit"
                    class=" btn btn-block mybtn btn-primary tx-tfm"
                  >
                    Registrar
                  </button>
                </div>
                <div class="col-md-12 ">
                  <div class="form-group">
                    <p class="text-center">
                      <router-link to="/auth/login"
                        >Ya tengo una cuenta?</router-link
                      >
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import 'Axios'
export default {
  data() {
    return {
      mode: "login",
      email: "",
      password: "",
      ingresando: false,
      registrandoEmpleado:false,
      empleado: {
        nombre: "",
        rol: 1,
        login: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  computed: {   
    messageError() {
      return this.errorMessage;
    },
    expiredSesion() {
      return this.$route.query.sessionExpired ? true : false;
    }
  },
  updated() {
    this.mode = this.$route.params.mode;
  },
  methods: {
    async auth() {
      
      this.errorMessage = "";
      let defaultMessage = "";
      let payload = null;
      if (this.mode === "login") {
        if (!this.validarFormLogin()) return;
        this.ingresando = true;
        defaultMessage = "Falló al intentar autenticar al usuario.";
        payload = {
          mode: this.mode,
          login: this.email,
          password: this.password,
        };
      } else if (this.mode === "signup") {
        if (!this.validarFormSignup()) return;
        this.registrandoEmpleado = true;
        defaultMessage =
          "No se pudo completar el registro del usuario, favor de intentar más tarde.";
        payload = {
          mode: this.mode,
          empleado: this.empleado,
        };
      }
      try {
        await this.$store.dispatch("auth", payload);
        this.$router.replace("/servidores");
        this.ingresando = false;
        this.registrandoEmpleado = false;
      } catch (err) {
        this.errorMessage = err.message || defaultMessage;
        this.ingresando = false;
        this.registrandoEmpleado = false;
      }
    },
    validarFormLogin() {
      if (this.email === "" || this.password.length < 6) {
        this.errorMessage =
          "Dirección de correo y contraseña requeridos. La contraseña debe ser mayor a 6 caracteres.";
        return false;
      }
      return true;
    },
    validarFormSignup() {
      if (
        this.empleado.nombre === "" ||
        this.empleado.login === "" ||
        this.empleado.password === ""
      ) {
        this.errorMessage = "Favor de completar la información requerida.";
        return false;
      }
      return true;
    },
  }  
};
</script>

<style scoped>
h1,
h2,
h3 {
  font-family: "Kaushan Script", cursive;
}
.sesion {
  background: rgba(10, 20, 30, 0.7);
}
.myform {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  padding: 1rem;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 1.1rem;
  outline: 0;
  max-width: 500px;
}
#second {
  display: none;
}
</style>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap");
</style>
