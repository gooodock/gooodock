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