<template>
  <div class="card cotainer w-50">
    <div class="card-header">Agregar servidor</div>
    <div class="card-body">
      <!-- <div class="card card-head mt-"></div> -->
      <form
        class="form-wrap container mt-2"
        @submit.prevent="saveOrUpdateServidor"
      >
        <div>
          <div class="form-group">
            <label for="name" class="form-label"
              >Nombre Servidor: {{ servidor.indice }} - {{ servidor.id }}</label
            >
            <!-- v-bind:value="nombreProp" -->
            <input
              id="name"
              v-model="servidor.nombre"
              v-bind:class="{
                'form-control': true,
                'is-invalid': !validNombre() && nombreBlured,
              }"
              v-on:blur="nombreBlured = true"
            />
            <div class="invalid-feedback">
              Favor de ingresar el nombre del servidor.
            </div>
          </div>
          <div class="form-group mb-2">
            <label for="ip">Ip:</label>
            <input
              v-model="servidor.ip"
              v-bind:class="{
                'form-control': true,
                'is-invalid': !validIp() && ipBlured,
              }"
              v-on:blur="ipBlured = true"
            />
            <div class="invalid-feedback">
              Favor de ingresar la ip del servidor.
            </div>
          </div>
          <div class="container d-flex justify-content-center">
            <button
              class="btn btn-success me-2"
              type="button"
              @click="nuevo"
              v-if="servidor.id"
            >
              Nuevo
            </button>
            <button type="submit" class="btn btn btn-primary">
              {{ mode }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<!--end form-wrapper-->

<script>
export default {
  data() {
    return {
      servidor: {
        indice: null,
        id: null,
        nombre: null,
        ip: null,
      },
      nombreBlured: false,
      ipBlured: false,
    };
  },
  watch: {
    servidorId(value) {
      this.servidor.id = value;
      this.servidor.indice = this.servidorIndice;
      this.servidor.nombre = this.servidorNombre;
      this.servidor.ip = this.servidorIp;
    },
  },
  computed: {
    mode() {
      const mode = this.servidor.id
        ? this.servidor.id > 0
          ? "Actualizar"
          : "Guardar"
        : "Guardar";
      return mode;
    },
  },
  emits: ["savedServidor"],
  props: ["servidorNombre", "servidorId", "servidorIp", "servidorIndice"],
  methods: {
    async saveOrUpdateServidor() {
      this.validate();
      if (this.valid) {
        try {
          await this.$store.dispatch("servidores/saveOrUpdate", { servidor: this.servidor, mode: this.mode });
          this.submitted = true;
          this.$emit("savedServidor", {
            codigoError: 0,
            mensaje: " se ha guardado exitosamente.",            
          });
          console.log('no Se llega a ningun error');
          this.reiniciarServidor();
        } catch (error) {
          this.$emit("savedServidor",{
            codigoError: 1,
            mensaje: error.message
          });
        }
      }
    },
    nuevo() {
      this.servidor.indice = null;
      this.servidor.id = null;
      this.servidor.nombre = null;
      this.servidor.ip = null;
    },
    reiniciarServidor() {
      this.servidor.id = null;
      this.servidor.nombre = null;
      this.servidor.ip = null;
      this.ipBlured = false;
    },
    validate() {
      this.emailBlured = true;
      this.valid = true;
      this.nombreBlured = true;
      if (!this.validNombre()) {
        this.valid = false;
      }
      this.ipBlured = true;
      if (!this.validIp()) {
        this.valid = false;
      }
    },
    validNombre() {
      return !(this.servidor.nombre === "");
    },
    validIp() {
      var reg = /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/gi;
      return reg.test(this.servidor.ip);
    },
  },
};
</script>
