import { ApiCore } from "./utils/api-core";
import apiProvider from "./utils/request-provider";
import { getToken } from "../../utils/tokenHandler";
const url = "stores";


// plural and single may be used for message logic if needed in the ApiCore class.
class ExtendedApiCore extends ApiCore {
  updateStore!: (data: any, id: any) => Promise<any>;
  createStoreUser!: (data: any, id: any) => Promise<any>;
  listStoreUser!: (id: any) => Promise<any>;
  listStores!: () => Promise<any>;
  listTransactions!: (commerce: any, status: string) => Promise<any>;
  listClosedTransactions!: (commerce: any, limit: string, after: string) => Promise<any>;
}

const apiStore = new ExtendedApiCore({
  getAll: true,
  getById: true,
  post: true,
  put: true,
  patch: true,
  remove: true,
  url: url,
});

apiStore.updateStore = async (data, id) => {
  const token = await getToken();
  console.log('Token on api service: ', token);
  // Add custom api call logic here
  return apiProvider.patch(`${url}/${id}`, data, token);
};

// Create a user associated to the store.
apiStore.createStoreUser = async (data, id) => {
  const token = await getToken();
  console.log('Token on api service: ', token);
  // Add custom api call logic here
  return apiProvider.post(`${url}/${id}/users`, data, data);
};

// List the users associated to the store.
apiStore.listStoreUser = async (id) => {
  const token = await getToken();
  console.log('Token on api service: ', token);
  // Add custom api call logic here
  return apiProvider.getAll(`${url}/${id}/users`, '', token);
};

// List the users associated to the store.
apiStore.listStores = async () => {
  const token = await getToken();
  console.log('Token on api service: ', token);
  // Add custom api call logic here
  return apiProvider.getAll(`${url}`, '', token);
};

apiStore.listTransactions = async (commerce, status) => {
  const token = await getToken();
  console.log('Token on api service listing: ', token);
  // Add custom api call logic here
  return apiProvider.getAll(`${url}/${commerce}/transactions/${status}`, '', token);
}

apiStore.listClosedTransactions = async (commerce, limit, after) => {
  const token = await getToken();
  console.log('Token on api service: ', token);
  // Add custom api call logic here
  return apiProvider.getAll(`${url}/${commerce}/transactions?limit=${limit}&after=${after}`, '', token);
}

export default apiStore;
