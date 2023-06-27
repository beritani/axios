import type { Axios } from "axios";

declare module "axios" {
  export interface Axios {
    // Rate Limit Requests
    rate?: number;
    queue?: {
      config: AxiosRequestConfig;
      resolve: (value: AxiosRequestConfig) => void;
    }[];
    interval?: number | NodeJS.Timer;

    // Limit Max Retries
    maxAttempts?: number;
  }

  export interface AxiosRequestConfig {
    attempt?: number;
  }
}

export const rateLimit = (axios: Axios, rate: number) => {
  axios.rate = rate;
  axios.queue = [];

  const startRateInterval = () => {
    const func = () => {
      // Get Next Request
      const req = axios.queue?.shift();
      if (req) return req.resolve(req.config);

      // Clear interval if no more requests
      if (axios.interval) clearInterval(axios.interval);
      axios.interval = undefined;
    };

    func();
    axios.interval = setInterval(func, 1000 / axios.rate!);
  };

  axios.interceptors.request.use(
    (config) => {
      const promise = new Promise<any>((resolve) => {
        axios.queue?.push({ config, resolve });
        if (!axios.interval) startRateInterval();
      });
      return promise;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
