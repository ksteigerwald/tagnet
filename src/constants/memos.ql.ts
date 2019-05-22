import gql from 'graphql-tag'

export const memosInsert = gql`
mutation insert_memo($objects: [memos_insert_input!]!) {
  insert_memos(objects: $objects) {
    returning {
      id
      label
      uuid
      tag_id
      TagMemo {
        label
      }
    }
  }
}`

export const memosQry = gql`
query {
    memos {
        id
        uuid
        user_id
        tag_id
        label
        created
        MemoLines(limit: 10, order_by: {created: desc}) {
            id
        }
        id,
        label,
        uuid,
        tag_id
        TagMemo {
            label
        }
    }
}
`

export const memosQryMemoLines = gql`
query {
    memos(order_by: {created: desc}) {
        id
        uuid
        user_id
        tag_id
        label
        created
        MemoLines(limit: 10, order_by: {created: desc}) {
            id
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
    MemoLines(order_by: {created: desc}) {
      id
    }
    TagMemo {
      label
    }
  }
}
`

export const memosGet = gql`
query get_memo($input: Int) {
  memos(where: {id: {_eq: $input}}) {
    id
    label
    user_id
    tag_id
    created
    uuid
    TagMemo {
      label
    }
  }
}
`

