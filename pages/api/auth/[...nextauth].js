import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";
import NextAuth, { NextAuthOptions } from 'next-auth';

const Tenant = process.env.tenant;
const PolicySignUpSignIn = "B2C_1_susi";
 const ClientID  = process.env.clientid

const options = {
providers: [
  AzureADB2CProvider({
    tenantId: Tenant,
    idToken: true,
    clientId: ClientID,
    primaryUserFlow: PolicySignUpSignIn,
    clientSecret: '',
    client: {
      token_endpoint_auth_method:"none",
    },
    wellKnown: `https://tenantname.b2clogin.com/example.domain-dev.com/b2c_1_susi/v2.0/.well-known/openid-configuration`,
    authorization: {
      params: { 
      scope: "offline_access openid " +ClientID,
      redirect_uri: 'https://example.domain-dev.com',
   } },
   protection: ['pkce, state'],
  }),
  
],
 debug: true,
}

const NextAuthHandler = ( req, res ) => NextAuth( req, res, options );

export default NextAuthHandler
