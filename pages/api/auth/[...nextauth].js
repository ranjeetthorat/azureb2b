import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";
import NextAuth, { NextAuthOptions } from 'next-auth';

const Tenant = process.env.tenant;
const PolicySignUpSignIn = "B2C_1_susi";
 const ClientID  = process.env.clientid

const options = {
providers: [
  AzureADB2CProvider({
    tenantId: Tenant,
    clientId: ClientID,
    primaryUserFlow: PolicySignUpSignIn,
    
    authorization: {
      url: 'https://example.b2clogin.com/example/b2c_1_susi/oauth2/v2.0/authorize',
      params: { 
      scope: "offline_access openid " +ClientID,
      redirect_uri: 'https://example.domain-dev.com',
   } },
   protection: ['pkce, state'],
  }),
  
],
}

const NextAuthHandler = ( req, res ) => NextAuth( req, res, options );

export default NextAuthHandler
