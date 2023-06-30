# Axios Helper

Helpful wrappers for axios requests, e.g. rate limiting and max retry attempts.

## Rate Limit

Specify how many requests are allowed per second

```ts
import axios from "axios";
import { rateLimit } from "@beritani/axios";

rateLimit(axios, 2); // 2 requests per second

axios.get("https://google.com");
axios.get("https://google.com");
axios.get("https://google.com");
```

## Retry on Failed Request

Retry requests, up to the specified limit, when unsuccessful status codes are returned

```ts
import axios from "axios";
import { retryFailed } from "@beritani/axios";

const maxAttempts = 3;
const successCodes = [200, 204];

retryFailed(axios, maxAttempts, successCodes);

axios.get("https://google.com");
```

## License

MIT License (MIT). Copyright (c) 2023 Sean N. (https://seann.co.uk)

See [LICENSE](/LICENSE).
