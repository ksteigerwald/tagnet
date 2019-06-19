import fetch from 'unfetch'
import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client';
import { createHttpLink  } from "apollo-link-http";
import * as config from '../helpers/config';
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from 'apollo-link-context'
let jwt_decode = require('jwt-decode')

let GRAPH_QL_API = process.env.GRAPH_QL_API || 'https://hasura-velaru.herokuapp.com/v1/graphql'

interface DefaultOptions {}

var isAuthenticated = (expiresAt: any):boolean => Math.round(new Date().getTime() / 1000) < expiresAt

const authLink = setContext((_, {headers} ) => {
    let token: any = localStorage.getItem(config.localKey('user')) || ''
    let decode = jwt_decode(token)
    //console.log(isAuthenticated(decode.exp), decode.exp, Math.round(new Date().getTime() / 1000) )
    if(isAuthenticated(decode.exp) === false) 
        window.location.href = '/logout'

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

const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions
})


