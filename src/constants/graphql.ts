import fetch from 'unfetch'
import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client';
import { createHttpLink  } from "apollo-link-http";
import * as config from '../helpers/config';
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from 'apollo-link-context'
let jwt_decode = require('jwt-decode')

let GRAPH_QL_API = process.env.GRAPH_QL_API || 'https://hasura-velaru.herokuapp.com/v1alpha1/graphql'

var isAuthenticated = (expiresAt: any) => new Date().getTime() < expiresAt

//const headers = { 'x-hasura-admin-secret' : 'Winter10' }
//const headers = { 'Authorization' : 'Bearer ' + jsonKey }
const authLink = setContext((_, {headers} ) => {
    let token: any = localStorage.getItem(config.localKey('user')) || ''
    let decode = jwt_decode(token)
    if(!isAuthenticated) 
        window.location = '/logout'
    //console.log(decode)
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        } 
    }
})
const httpLink = createHttpLink({
    uri: GRAPH_QL_API,
})

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})


