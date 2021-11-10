import {
  AxiosRequestConfig as BaseAxiosRequestConfig,
  Axios as BaseAxios,
} from "axios";

interface AxiosRequestConfig extends BaseAxiosRequestConfig {
  rate?: number;
  //   delay?: number;
  //   retries?: number;
  //   attempt?: number;
}

export class Axios extends BaseAxios {
  readonly rate?: number;
  readonly delay?: number;
  readonly retries?: number;

  private interval?: NodeJS.Timer;

  private queue?: {
    config: AxiosRequestConfig;
    resolve: (value: any) => void;
  }[];

  constructor(config?: AxiosRequestConfig) {
    const baseConfig = { ...config };
    delete baseConfig.rate;
    // delete baseConfig.delay;
    // delete baseConfig.retries;
    // delete baseConfig.attempt;

    super(baseConfig as BaseAxiosRequestConfig);
    this.rate = config?.rate;
    // this.delay = config?.delay;
    // this.retries = config?.retries;

    if (this.rate) {
      this.addRateInterceptor();
    }
  }

  private addRateInterceptor() {
    this.queue = [];
    this.interceptors.request.use(
      (config) => {
        const promise = new Promise((resolve) => {
          this.queue?.push({
            config,
            resolve,
          });
          this.startRateInterval();
        });

        return promise;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  clearRateInterval() {
    if (this.interval) clearInterval(this.interval);
    this.interval = undefined;
  }

  private startRateInterval() {
    if (this.interval) return;

    const func = () => {
      const req = this.queue?.shift();
      if (req) {
        req.resolve(req.config);
      } else {
        this.clearRateInterval();
      }
    };

    func();
    this.interval = setInterval(func, 1000 / this.rate!);
  }
}

export default Axios;
