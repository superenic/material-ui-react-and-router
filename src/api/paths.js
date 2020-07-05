const urlBase = 'http://localhost:8019/';

export default {
  urlBase,
  openSession: {
    headers: {
      'Content-Type': 'application/json',
    },
    url: `${urlBase}oauth/token`,
    method: 'post',
    data: {
      grant_type: 'password',
      client_id: 2,
      client_secret: 'qkiMiSydcdVaeFBbhVVysg5mKQ1JYPLlvdCjB6tC',
      username: null,
      password: null,
    },
  },
  closeSession: {
    headers: {
      'Content-Type': 'application/json',
      Authorization: null,
    },
    url: `${urlBase}api/me/close_session`,
    method: 'delete',
  },
  multifactorAuthentificaionToken: {
    headers: {
      'Content-Type': 'application/json',
    },
    url: `${urlBase}api/me/enviar_verificacion`,
    method: 'post',
    data: {
      celular: null,
    },
  },
  verificarToken: {
    headers: {
      'Content-Type': 'application/json',
    },
    url: `${urlBase}api/me/verificar_cuenta`,
    method: 'post',
    data: {
      celular: null,
      clave: null,
    },
  },
  ChangePasswordWithToken: {
    url: `${urlBase}api/me/cambiar_contrasena_con_clave`,
    method: 'post',
    data: {
      clave: '',
      celular: '',
      password: '',
    },
  },
};
