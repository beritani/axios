# Axios Helper

Helpful wrappers for axios requests, e.g. rate limiting and max retry attempts.

## Rate Limit

Specify how many requests are allowed per second

```ts
import axios from "axios";
import { rateLimit } from "@beritani/axios";

rateLimit(axios, 2); // 2 requests per second

axios.get("https://google.com");
```

## License

MIT License (MIT). Copyright (c) 2023 Sean N. (https://seann.co.uk)

See [LICENSE](/LICENSE).
