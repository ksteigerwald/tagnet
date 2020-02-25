import fetch from 'unfetch'
import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client';
import { createHttpLink  } from "apollo-link-http";
import * as config from '../helpers/config';
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from 'apollo-link-context'

let jwt_decode = require('jwt-decode')
let GRAPH_QL_API:string = 'https://hasura.tagnet.io/v1/graphql'

if(process.env.NODE_ENV === 'development') { 
  GRAPH_QL_API = 'https://hasura.dev.tagnet.io/v1/graphql'
  console.log(GRAPH_QL_API)
}
  


interface DefaultOptions {}

var isAuthenticated = (expiresAt: any):boolean => Math.round(new Date().getTime() / 1000) < expiresAt

const httpLink = createHttpLink({
    uri: GRAPH_QL_API,
})

const authLink = setContext((_, {headers} ) => {
  let token:any = config.localKey()
  if(!token) return httpLink

  //let decode = jwt_decode(token)

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        } 
    }
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


