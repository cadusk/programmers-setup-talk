export default class JWT {
    constructor() {
      this.user = {
        name: "",
        email: "",
      };
    }
  
    setUser(value) {
      this.user = {
        name: "Gabriel",
        email: value.email,
      };
    }
  
    getUser() {
      return this.user;
    }
  }
  
  export const JWTUtil = new JWT();
  