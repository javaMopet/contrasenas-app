<template>
  <div class="container">
    <h2 class="text-dark mt-4">Servicios</h2>
    <div class="container">
      <form @submit.prevent="guardarServicio">
        <div class="mb-3 row">
          <label class="col form-label">Servidor</label>
          <select class="form-control">
            <option value="">a</option>
          </select>
        </div>
        <div class="col">
          <label  class="col form-label">Aplicacion:</label>
          <select>
            <option value="">a</option>
          </select>
        </div>
        <button class="btn btn-outline-success" type="submit">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    guardarServicio() {},
  },
};
</script>
