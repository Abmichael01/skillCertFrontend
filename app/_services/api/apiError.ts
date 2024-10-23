import {toast} from "react-toastify"
import axios from "axios";

const apiError = (error: unknown) => {
    console.log(error);
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;
      console.log(data);
      for (const object in data) {
        toast.error(`${data[object] as string}`);
        console.log(error.response?.data[object]);
      }
    } 
    else {
      toast.error("An unexpected error occured");
    }

    return 
}

export default apiError
