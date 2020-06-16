export default class JWT {
    constructor() {
      this.user = {
        name: "",
        email: "",
      };
    }
  
    setUser(value) {
      this.user = {
        name: "Usuário 1",
        email: value.email,
      };
    }
  
    getUser() {
      return this.user;
    }

    removeUser() {
      this.user = {}
    }
  }
  
  export const JWTUtil = new JWT();
  