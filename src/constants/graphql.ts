import fetch from 'unfetch'
import gql from 'graphql-tag'
import ApolloClient from 'apollo-boost'
import { createHttpLink  } from "apollo-link-http";
import * as config from '../helpers/config';
import { InMemoryCache } from "apollo-cache-inmemory";

let jsonKey: any = localStorage.getItem(config.localKey('user')) || ''
let GRAPH_QL_API = process.env.GRAPH_QL_API || 'https://hasura-velaru.herokuapp.com/v1alpha1/graphql'

//const headers = { 'x-hasura-admin-secret' : 'Winter10' }
const headers = { 'Authorization' : 'Bearer ' + jsonKey }

const link = createHttpLink({
    uri: GRAPH_QL_API,
    headers: headers
})

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    uri: GRAPH_QL_API,
    headers: headers
})


