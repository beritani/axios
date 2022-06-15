import Axios from "../src/index";

const axios = new Axios({
  rate: 1,
});

axios
  .get("https://google.com")
  .then((res) => console.log(res.config))
  .catch(console.error);
