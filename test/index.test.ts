import { Axios } from "axios";
import { rateLimit, retryFailed } from "../src";

describe("test", () => {
  // This is a bad test I know, but want to prove it works
  test("rate limit", async () => {
    const axios = new Axios({});

    rateLimit(axios, 1);

    const start = Date.now();
    await axios.get("https://google.com/");
    await axios.get("https://google.com/");
    await axios.get("https://google.com/");
    const end = Date.now();

    expect(end - start).toBeGreaterThan(2000);
  });

  test("retry failed", async () => {
    const axios = new Axios({});

    const maxAttempts = 3;
    const successCodes = [400];

    retryFailed(axios, maxAttempts, successCodes);

    const res = await axios.get("https://google.co.uk");

    expect(res.config.attempt).toEqual(maxAttempts + 1);
  });
});
