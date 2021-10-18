import router from '../../../router/index.js'
const host = "http://localhost:3000/api/v1/servidores/";

const getResults = (response) => {
  const responseData = response.data;
  const results = [];
  for (const id in responseData) {
    results.push({
      id: responseData[id].attributes.id,
      nombre: responseData[id].attributes.nombre,
      ip: responseData[id].attributes.ip,
    });
  }
  return results;
};

const thenResponse = (response,context) =>{
  if (response.ok) {
    return response.json();
  } else {
    if (response.status === 403) {
      context.dispatch("logout", '', { root: true }); //Se especifica que la accion es del módulo root            
      router.replace("/auth/login?sessionExpired=true");
      return;
    }
  }
};

export default {
  async listarServidores(context) {
    fetch(host, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.rootGetters.token,
      },
    }).then((response) => {
      return thenResponse(response, context);
    }).then((response) => {
      if (response) {
        context.commit("addServidores", getResults(response));
      } else {
        throw new Error('Failed to fetch data - plase try again later')
      }
    }).catch((error) => {
      this.isLoading = false;
      throw new Error(error.message)
    });
  },
  async saveOrUpdate(context, payload) {
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
  requestDelete(context, payload){
    const indice = payload.indice;
    const servidorId = payload.servidor.id;    

    console.log('indice a quitar');
    console.log(indice);

    fetch(host + servidorId, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + context.rootGetters.token,
      },
    }).then((response) => {
      if (response.ok) {
        context.commit('spliceServidor',{
          indice: indice
        });      
        // this.mandarAlertaAccionSuccess("se ha eliminado correctamente.");
      }
    });
  }
};
