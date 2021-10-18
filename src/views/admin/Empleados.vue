<template>
  <div class="container">
    <h2 class="text-dark mt-4">Admin - Usuarios Registrados</h2>
    <div class="container">
      <!-- <ul class="list-untysled">
            <li v-for="empleado in empleados" :key="empleado.id">
                {{empleado.id}} -
                {{empleado.nombre}}-
                {{empleado.rol}}-
                {{empleado.login}}
            </li>
        </ul> -->
      <div class="card mb-2" v-for="empleado in empleados" :key="empleado.id">
        <div class="card-header">
          <p class="m-0 p-0 h5 text-success">
            <i class="bi bi-person-circle"></i> {{ empleado.nombre }}
          </p>
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>
              Correo electrónico: <strong> {{ empleado.login }}</strong>
            </p>
            <footer>
              <div class="d-flex justify-content-between">
                <div>
                  Tipo de usuario:
                  <cite title="Source Title">{{ empleado.rolName }}</cite>
                  <button class="btn btn-warning ms-3 text-dark" type="button">Cambiar</button>
                </div>
                <button class="btn btn-outline-danger" type="button">
                  Inhabilitar
                </button>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataLoading: false,
    };
  },
  computed: {
    empleados() {
      return this.$store.getters["empleados/empleadosList"];
    },
  },
  mounted() {
    this.isLoading = true;
    try {
      this.$store.dispatch("empleados/requestEmpleadosList");
      this.dataLoading = false;
    } catch (error) {
      console.error(error);
      this.dataLoading = false;
    }
  },
};
</script>