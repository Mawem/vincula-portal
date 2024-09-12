import { ApiCore } from "./utils/api-core";
import apiProvider from "./utils/request-provider";
import { getToken } from "../../utils/tokenHandler";

const url = "payouts";

// plural and single may be used for message logic if needed in the ApiCore class.
class ExtendedApiCore extends ApiCore {
  getBalance!: () => Promise<any>;
  requestPayout!: (store_id: string) => Promise<any>;
}

const apiPayouts = new ExtendedApiCore({
  getAll: true,
  getById: true,
  post: true,
  put: true,
  patch: true,
  remove: true,
  url: url,
});

apiPayouts.getBalance = async () => {
  const token = await getToken();
  console.log('Token on api service: ', token);

  return apiProvider.getAll(`${url}/balances`, '', token);
}

apiPayouts.requestPayout = async (store_id: string) => {
  const token = await getToken();
  console.log('Token on api service: ', token);
  return apiProvider.post(`${url}`, {store_id}, token);
}

export default apiPayouts;
