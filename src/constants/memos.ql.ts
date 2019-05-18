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

export const memosQryMemoLines = gql`
query {
    memos(order_by: {created: asc}) {
        id
        uuid
        user_id
        tag_id
        label
        created
        MemoLines(limit: 10, order_by: {created: desc}) {
            id
            created
            label
            memo_id
            uuid
        }
        TagMemo {
            label
        }
    }
}`

export const memosSearch = gql`
query search_memos($input:String){
  memos(where: {_or:[{label: {_like: $input }}, {MemoLines:{label:{_like:$input}}}]}) {
    id
    label
    user_id
    tag_id
    created
    uuid
    MemoLines(limit: 10, order_by: {created: desc}) {
      label
      id
      memo_id
      user_id
      created
    }
    TagMemo {
      label
    }
  }
}
`
