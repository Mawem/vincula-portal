import { getToken } from "@/utils/tokenHandler";
import { ApiCore } from "./utils/api-core";
import apiProvider from "./utils/request-provider";

const url = "users";

// plural and single may be used for message logic if needed in the ApiCore class.
class ExtendedApiCore extends ApiCore {
  login!: (data: any) => Promise<any>;
  getOTP!: (phone_number: string) => Promise<any>;
  getProfile!: () => Promise<any>;
}

const apiUser = new ExtendedApiCore({
  getAll: true,
  getById: true,
  post: true,
  put: true,
  patch: true,
  remove: true,
  url: url,
});

//NOTE: patch -> update_user tiene la misma url que un post (aunque tiene diferente header), no estoy seguro como seria

apiUser.login = async (data: any) => {
  return apiProvider.post(`${url}/login`, data);
};

apiUser.getOTP = async (data: any) => {
  console.log('GET OTP request to: ', `${url}/${data}/request_otp`);
  return apiProvider.post(`${url}/${data}/request_otp`, {});
};

apiUser.getProfile = async () => {
  const token = await getToken();
  console.log('Token on api service: ', token);
  return apiProvider.getAll(`${url}/me`, '', token);
}


export default apiUser;
