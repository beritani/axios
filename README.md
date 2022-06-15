# Axios Helper

## Rate Limit

```typescript
const axios = new Axios({
  rate: 2, // Limit of 2 calls per second
});

axios
  .get("https://google.com")
  .then((res) => console.log(res.config))
  .catch(console.error);
```
