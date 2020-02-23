import { Cognito } from '@/types'
import { AWSKinesisFirehoseProvider } from 'aws-amplify';
let aws: Cognito
if(process.env.NODE_ENV === 'development') {
  aws= {
    region: 'us-east-1',
    identityPoolId: 'us-east-1:c6af0ae2-6079-4c9f-9788-f4d778ba62de',
    userPoolId: 'us-east-1_pnCM5RURL',
    webClientId: '7e5fqb09l2c1fv2i2r2h1ilgl6',
    redirect: 'tagnet',
    domain: 'tagnet-io-prod.auth.us-east-1.amazoncognito.com' 
  }
}
else {
  aws = {
    region: 'us-east-1',
    identityPoolId: 'us-east-1:c6af0ae2-6079-4c9f-9788-f4d778ba62de',
    userPoolId: 'us-east-1_hLUDaJ2xP',
    webClientId: '7u3ci0iu99kq6hbb3ek4l9il0n',
    redirect: 'tagnet',
    domain: 'tagnet-io-dev.auth.us-east-1.amazoncognito.com' 
  }
}
export default {
  "aws_project_region": aws.region ,
  "aws_cognito_identity_pool_id": aws.identityPoolId,
  "aws_cognito_region": aws.region,
  "aws_user_pools_id": aws.userPoolId,
  "aws_user_pools_web_client_id": aws.webClientId,
  "oauth": {
  "domain": aws.domain,
  "scope": [
  "first_name",
  "last_name",
  "email",
  "openid",
  "profile",
  "aws.cognito.signin.user.admin"
  ],
  "redirectSignIn": "https://tagnet.netlify.com/login",
  "redirectSignOut": "https://tagnet.netlify.com/login",
  "responseType": "code"
  },
  "federationTarget": "COGNITO_USER_POOLS"
  };