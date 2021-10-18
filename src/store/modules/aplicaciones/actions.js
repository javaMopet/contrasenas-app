const host = "http://localhost:3000/aplicaciones";

export default {
  async requestAplicacionesList(context) {
    const token = context.rootGetters.token;

    fetch(host, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          if (response.status === 403) {
            this.$store.dispatch("logout");
            this.$router.replace("/auth/login?sessionExpired=true");
          }
        }
      })
      .then((respuesta) => {
        if (respuesta) {
          this.isLoading = false;
          this.error = null;
          const data1 = respuesta.data;
          const results = [];
          for (const id in data1) {
            results.push({
              id: data1[id].attributes.id,
              nombre: data1[id].attributes.nombre,
              version: data1[id].attributes.version,
            });
          }
          context.commit("addAplicacionesList", results);
        } else {
          this.error = "Failed to fetch data - plase try again later";
        }
      })
      .catch((error) => {
        this.isLoading = false;
        this.error =
          "Failed to fetch data - plase try again later " + error.message;
      });
  },
  async saveOrUpdate(context, payload) {
    console.log("saving");
    var method = "";
    console.log(context.rootGetters.empleadoId)
    console.log(context.rootGetters.token)
    if (payload.mode === "Guardar") {
      method = "POST";
      payload.servidor.empleado_id = context.rootGetters.empleadoId;
      console.log(payload.servidor.nombre)
      console.log(payload.servidor.empleado_id)
    } else if (payload.mode === "Actualizar") {
      method = "PUT";
    }
    console.log(method);
    // THIS IS WHERE YOU SUBMIT DATA TO SERVER
    const response = await fetch(host, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.rootGetters.token,
      },
      body: JSON.stringify(payload),
    });

    console.log("Obteniendo el response.")
    console.log(response)
    const responseData = await response.json();
    console.log("Obteniendo el response data.")
    console.log(responseData)

    if (!response.ok) {
      console.log('throwing error')
      throw new Error(
        responseData.message ||
          "No es posible agregar el servidor. Favor de intentar mas tarde."
      );
    } else {
      const servidorCreado = {
        id: responseData.data.id,
        nombre: responseData.data.attributes.nombre,
        ip: responseData.data.attributes.ip,
      };
      context.commit("addServidor", servidorCreado);
    }
  },
};
