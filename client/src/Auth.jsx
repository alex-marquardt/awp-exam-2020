class Auth {
  constructor(auth_api_url) {
    this.auth_api_url = auth_api_url;
  }

  async login(username, password) {
    const res = await this.fetch(this.auth_api_url, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });
    let json = await res.json();
    if ([401, 404].includes(parseInt(res.status))) {
      throw Error(json.msg);
    }
    this.setToken(json.token);
    this.setUsername(json.username);
    this.setName(json.name);
    this.setAdmin(json.admin);
    return json;
  }

  loggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("name");
    localStorage.removeItem("admin");
  }

  setToken(token) {
    localStorage.setItem("token", token);
  }

  setUsername(username) {
    localStorage.setItem("username", username);
  }

  setName(name) {
    localStorage.setItem("name", name);
  }

  setAdmin(admin) {
    localStorage.setItem("admin", admin);
  }

  getUsername() {
    return localStorage.getItem("username");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  fetch(url, options) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + this.getToken();
    }

    return fetch(url, { headers, ...options });
  }
}

export default Auth;
