// import axios from 'axios'
export default {
  async auth(context, payload) {
    var url = "";
    var body = null;
    if (payload.mode === "login") {
      body = {
        login: payload.login,
        password: payload.password,
      };
      url = "http://localhost:3000/sesiones/create";
    } else if (payload.mode === "signup") {
      body = {
        empleado: {
          nombre: payload.empleado.nombre,
          rol: payload.empleado.rol,
          login: payload.empleado.login,
          password: payload.empleado.password,
        },
      };
      url = "http://localhost:3000/empleados";
    }
    const jsonBody = JSON.stringify(body);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonBody,
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (response.status == 401) {
          throw new Error(responseData.mensaje || "Credenciales no válidas.");
        } else if (response.status == 422) {
          throw new Error(
            responseData.mensajeError ||
              "No es posible registar el empleado. Intentar mas tarde"
          );
        }
        const error = new Error(
          responseData.mensaje ||
            "Falló al intentar registrar el empleado. favor de revisar los datos."
        );
        throw error;
      } else {
        /*
       axios.post('http://localhost:3000/empleados.json',emp)
       .then(res => console.log(res))
       .catch(error => console.log(error))
      */

        localStorage.setItem("token", responseData.token);
        localStorage.setItem("empleadoId", responseData.empleado.id);

        context.commit("setUser", {
          token: responseData.token,
          empleadoId: responseData.empleado.id,
        });
      }
    } catch (exception) {
      if (
        exception.message === "NetworkError when attempting to fetch resource."
      ) {
        throw new Error(
          "No existe conexión con el servidor de datos. Problema con la red."
        );
      }
      throw exception;
    }
  },
  logout(context) {
    context.commit("setUser", {
      token: null,
      empleadoId: null,
      tokenExpiration: null,
    });
    localStorage.setItem("token", null);
    localStorage.setItem("empleadoId", null);
  },
  tryLogin(context) {
    let token = localStorage.getItem("token");
    let empleadoId = localStorage.getItem("empleadoId");

    token = token === "null" ? null : token;
    empleadoId = empleadoId === "null" ? null : empleadoId;

    if (token && empleadoId) {
      context.commit("setUser", {
        token: token,
        empleadoId: empleadoId,
        tokenExpiration: null,
      });
    }
  },
};
