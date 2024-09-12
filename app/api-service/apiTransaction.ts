import { ApiCore } from "./utils/api-core";
import apiProvider from "./utils/request-provider";

const url = "transactions";

// plural and single may be used for message logic if needed in the ApiCore class.
class ExtendedApiCore extends ApiCore {}

const apiTransaction = new ExtendedApiCore({
  getAll: true,
  getById: true,
  post: true,
  put: true,
  patch: true,
  remove: true,
  url: url,
});


export default apiTransaction;
