
import aws from '../helpers/aws-export';

export const USER_ACCESS_KEY = `CognitoIdentityServiceProvider.${aws.aws_user_pools_web_client_id}.LastAuthUser`

export const apiUrl = (process.env.NODE_ENV === 'production')
        ? 'http://localhost:3000'
        : 'http://localhost:3000'

export function localKey(): string | null { 
        let user: string = localStorage.getItem(USER_ACCESS_KEY)
        let tokenAccess: string = `CognitoIdentityServiceProvider.${aws.aws_user_pools_web_client_id}.${user}.idToken` 
        let token: string = localStorage.getItem(tokenAccess)
        if(!token) return null
        return token
}

//export function getUser(): any { return localStorage.getItem('TAGNET-user') }

