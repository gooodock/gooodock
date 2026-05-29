const API = 'http://localhost:8080/api/notification';

export const notificationApi = {
  getPost: async() => {
    const res = await fetch(API, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
      credentials: 'include',
    });

    return res.json();
  }
}

export const notificationReadApi = {
  setPost: async(notificationIdx, readYn) => {
    const res = await fetch(API, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: 'include',
      body: JSON.stringify({notificationIdx: notificationIdx, readYn: readYn }),
    });

    return res.json();
  }
}