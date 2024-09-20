import apiUser from "@/app/api-service/apiUser";
import CredentialsProvider from "next-auth/providers/credentials";

const otpProvider = CredentialsProvider({
  name: "OTP",
  credentials: {
    phone_number: { label: "Phone Number", type: "text" },
    code: { label: "Code", type: "text" },
  },
  async authorize(credentials: any): Promise<any | null> {

    const { phone_number, code } = credentials;
    const res = await apiUser.login({phone_number, code});
    
    const access_token = res.data.access_token;

    if (access_token) {
      return {
        access_token
      };
    }
    return null;
  },
});

export default otpProvider;