import gql from 'graphql-tag'

export const tagsQry = gql`
query {
    tags {
        id,
        code,
        label
    }
}
`
