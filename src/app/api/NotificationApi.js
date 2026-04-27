const API = 'http://localhost:4000/notification';

export const notificationApi = {
  getPost: async() => {
    const res = await fetch(API, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    });

    return res.json();
  }
}

export const notificationReadApi = {
  setPost: async(id, read) => {
    const readAPI = API + `/${id}`;
    const res = await fetch(readAPI, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ read: read }),
    });

    return res.json();
  }
}