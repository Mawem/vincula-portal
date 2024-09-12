import apiProvider from "./request-provider";

interface ApiCoreOptions {
  url: string;
  getAll?: boolean;
  getById?: boolean;
  post?: boolean;
  put?: boolean;
  patch?: boolean;
  remove?: boolean;
}

export class ApiCore {

  constructor(options: ApiCoreOptions) {
    if (options.getAll) {
      this.getAll = (query?: string, token?: string | null) => {
        return apiProvider
          .getAll(options.url, query, token)
          .then((response) => response.data);
      };
    }

    if (options.getById) {
      this.getSingle = (id: number, token?: string | null) => {
        return apiProvider.getById(options.url, id, token);
      };
    }

    if (options.post) {
      this.post = (model: any, token?: string | null) => {
        return apiProvider.post(options.url, model, token);
      };
    }

    if (options.put) {
      this.put = (model: any, token?: string | null) => {
        return apiProvider.put(options.url, model, token);
      };
    }

    if (options.patch) {
      this.patch = (model: any, token?: string | null) => {
        return apiProvider.patch(options.url, model, token);
      };
    }

    if (options.remove) {
      this.remove = (id: number, token?: string | null) => {
        return apiProvider.remove(options.url, id, token);
      };
    }
  }

  getAll?: (queryParams?: string, token?: string | null) => Promise<any>;
  getSingle?: (id: number, token?: string | null) => Promise<any>;
  post?: (model: any, token?: string | null) => Promise<any>;
  put?: (model: any, token?: string | null) => Promise<any>;
  patch?: (model: any, token?: string | null) => Promise<any>;
  remove?: (id: number, token?: string | null) => Promise<any>;
}
