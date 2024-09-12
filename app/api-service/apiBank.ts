import { ApiCore } from "./utils/api-core";
import apiProvider from "./utils/request-provider";

const url = "banks";

// plural and single may be used for message logic if needed in the ApiCore class.
class ExtendedApiCore extends ApiCore {}

const apiBank = new ExtendedApiCore({
  // get: List banks registered on the platform.
  getAll: true,
  getById: true,
  post: true,
  put: true,
  patch: true,
  remove: true,
  url: url,
});

export default apiBank;
