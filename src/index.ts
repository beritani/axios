import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";

class AxiosRate {
  readonly rate: number;
  private interval?: number;
  private queue: {
    config: AxiosRequestConfig;
    callback: (value: AxiosResponse<unknown, any>) => void;
    error: (value: AxiosResponse<unknown, any>) => void;
  }[] = [];

  constructor(rate: number = 2) {
    this.rate = rate;
  }

  private start() {
    if (typeof this.interval === "undefined") {
      const func = () => {
        const req = this.queue.shift();
        if (req) {
          axios(req.config).then(req.callback).catch(req.error);
        } else {
          clearInterval(this.interval!);
          this.interval = undefined;
        }
      };

      func();
      this.interval = setInterval(func, this.rate * 1000);
    }
  }

  call(config: AxiosRequestConfig): AxiosPromise {
    const promise = new Promise<AxiosResponse>((callback, error) => {
      this.queue.push({
        config,
        callback,
        error,
      });
    });

    this.start();

    return promise;
  }
}
