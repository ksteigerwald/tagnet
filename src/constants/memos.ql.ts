import gql from 'graphql-tag'

export const memosInsert = gql`
mutation insert_memo($objects: [memos_insert_input!]!) {
  insert_memos(objects: $objects) {
    returning {
      id
      label
      uuid
      tag_id
    }
  }
}`

export const memosQry = gql`
query {
    memos {
        id,
        label,
        uuid,
		tag_id
    }
}
`
