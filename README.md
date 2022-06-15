# Axios Helper

## Rate Limit

```typescript
import { AxiosRate } from "@beritani/axios";

axios = new AxiosRate(5); // 5 calls per second

axios.call({
  method: "get",
  url: "www.github.com",
});
```
