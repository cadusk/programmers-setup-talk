import  { toast } from 'react-toastify'

export default class Toasty {

  constructor() {
    toast.configure();
    this.configurations = {
      position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
    }
  }
     successNotify(message) {
        toast.success(message, this.configurations);
      }
    
     errorNotify(message) {
        toast.error(message, this.configurations);
      }

}

export const ToastyUtil = new Toasty();
