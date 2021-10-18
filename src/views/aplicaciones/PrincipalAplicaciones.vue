<template>
    <h1>LISTA DE APLICACIONES</h1>

    <div class="container">
        <ul>
            <li v-for="aplicacion in aplicaciones" :key="aplicacion.id">
                {{aplicacion.id}} -
                {{aplicacion.nombre}}-
                {{aplicacion.version}}       
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            dataLoading:false,
        }
    },
    computed: {
        aplicaciones(){
            return this.$store.getters['aplicaciones/aplicacionesList']
        }
    },
    mounted(){
        this.isLoading = true;
    try {
      this.$store.dispatch("aplicaciones/requestAplicacionesList");
      this.dataLoading = false;
    } catch (error) {
      console.error(error);
      this.dataLoading = false;
    }
    }
}
</script>