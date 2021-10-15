const host = "http://localhost:3000/api/v1/servidores";

export default {
  async listarServidores(context) {
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
              ip: data1[id].attributes.ip,
            });
          }
          context.commit("addServidores", results);
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
    if (payload.mode === "Guardar") {
      method = "POST";
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

    const responseData = await response.json();

    if (!response.ok) {
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
