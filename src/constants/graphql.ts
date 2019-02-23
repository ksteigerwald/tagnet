import fetch from 'unfetch'
import gql from 'graphql-tag'
import ApolloClient from 'apollo-boost'


let GRAPH_QL_API = process.env.GRAPH_QL_API || 'http://localhost:8080/v1alpha1/graphql'

export const apolloClient = new ApolloClient({
    uri: GRAPH_QL_API,
    fetch: fetch
})


