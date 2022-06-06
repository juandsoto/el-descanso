import axios from "axios";
import { makeUseAxios } from "axios-hooks";

const useAxios = makeUseAxios({
  axios: axios.create({ baseURL: "https://eldescanso.herokuapp.com" }),
});

export default useAxios;
