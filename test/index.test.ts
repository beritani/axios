import Axios from "../src/axios";

const axios = new Axios({
  rate: 1,
});

axios
  .get("https://google.com")
  .then((res) => console.log(res.config))
  .catch(console.error);
