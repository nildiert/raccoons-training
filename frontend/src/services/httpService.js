// src/services/httpService.js
const baseUrl = 'http://localhost:3000';

const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 401) {
      // Token ha expirado o es inválido
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = '/login'; // Redirige al usuario a la página de inicio de sesión
    }
    throw new Error('Sesión expirada. Por favor, inicie sesión nuevamente.');
  }
  return response;
};

const headersDefault = {
  'Content-Type': 'application/json',
};

export const httpService = {
  async get(url, customHeaders = {}) {
    const response = await fetch(`${baseUrl}${url}`, {
      headers: {
        ...headersDefault,
        ...customHeaders,
        'Authorization': localStorage.getItem('token') ? localStorage.getItem('token') : '',
      },
    });
    return handleResponse(response).then(res => res.json());
  },

  async post(url, data, customHeaders = {}) {
    const headers = {
      ...headersDefault,
      ...customHeaders,
      'Authorization': localStorage.getItem('token') ? localStorage.getItem('token') : '',
    };

    const response = await fetch(`${baseUrl}${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    await handleResponse(response);

    if (url === '/login') {
      const authToken = response.headers.get('Authorization');
      const responseBody = await response.json();
      if (authToken) {
        localStorage.setItem('token', authToken);
        localStorage.setItem('userId',responseBody.id);
      }
      return responseBody;
    } else {
      return response.json();
    }

  },

  async put(url, data, customHeaders = {}) {
    const response = await fetch(`${baseUrl}${url}`, {
      method: 'PUT',
      headers: {
        ...headersDefault,
        ...customHeaders,
        'Authorization': localStorage.getItem('token') ? localStorage.getItem('token') : '',
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response).then(res => res.json());
  },

  async delete(url, data, customHeaders = {}) {
    const response = await fetch(`${baseUrl}${url}`, {
      method: 'DELETE',
      headers: {
        ...headersDefault,
        ...customHeaders,
        'Authorization': localStorage.getItem('token') ? localStorage.getItem('token') : '',
      },
    });
    return handleResponse(response).then(res => res.json());
  },

};
