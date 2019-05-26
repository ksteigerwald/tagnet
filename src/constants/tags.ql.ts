import gql from 'graphql-tag'

export const tagsQry = gql`
query {
    tags {
        id,
        label
        code
        created
    }
}
`

