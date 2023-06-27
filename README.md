# Axios Helper

Helpful wrappers for axios requests, e.g. rate limiting and max retry attempts.

## Rate Limit

Specify how many requests are allowed per second

```ts
import axios from "axios";
import { rateLimit } from "@beritani/axios";

rateLimit(axios);

axios.get("https://google.com");
```
