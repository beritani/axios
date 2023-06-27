import axios from "axios";
import { rateLimit } from "../src";

describe("test", () => {
  // This is a bad test I know, but want to prove it works
  test("rate limit", async () => {
    rateLimit(axios, 1);

    const start = Date.now();
    await axios.get("https://google.com/");
    await axios.get("https://google.com/");
    await axios.get("https://google.com/");
    const end = Date.now();

    expect(end - start).toBeGreaterThan(2000);
  });
});
