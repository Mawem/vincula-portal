import { ApiCore } from "./utils/api-core";
import apiProvider from "./utils/request-provider";
import { getToken } from "../../utils/tokenHandler";

const url = "bank_accounts";

// plural and single may be used for message logic if needed in the ApiCore class.
class ExtendedApiCore extends ApiCore {
  updateBankAccount!: (data: any, id: any) => Promise<any>;
  listBankAccounts!: () => Promise<any>;
}

const apiBankAccount = new ExtendedApiCore({
  // get: List bank accounts associated to the user.
  getAll: true,
  getById: true,
  post: true,
  put: true,
  patch: true,
  remove: true,
  url: url,
});

// Create a bank account associated to the user making the request.
apiBankAccount.updateBankAccount = async (data, id) => {
  const token = await getToken();
  console.log('Token on api service: ', token);
  // Add custom api call logic here
  return apiProvider.post(`${url}/${id}`, data, token);
};

apiBankAccount.listBankAccounts = async () => {
  const token = await getToken();
  console.log('Token on api service: ', token);
  // Add custom api call logic here
  return apiProvider.getAll(`${url}/bank_accounts`, '', token);
};

export default apiBankAccount;
