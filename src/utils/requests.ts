export const Request = (endpoint: string, method: string, body?: object) => {
  try {
    if (!body)
      return fetch(`http://localhost:3000/${endpoint}`, { method: method });
    return fetch(`http://localhost:3000/${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.log(error);
  }
};

export const RequestWithToken = (
  endpoint: string,
  method: string,
  token: string,
  body?: object,
) => {
  try {
    console.log(token);
    return fetch(`http://localhost:3000/${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.log(error);
  }
};
