import gql from 'graphql-tag'

export const memosInsert = gql`
mutation insert_memo($objects: [memos_insert_input!]!) {
  insert_memos(objects: $objects) {
    returning {
      id
      label
      uuid
      tag_id
      created
      updated
      TagMemo {
        label
      }
    }
  }
}`


export const memosQry = gql`
query {
    memos(order_by: {created: desc}) {
        id
        uuid
        user_id
        tag_id
        label
        created
        updated
        code
        autogen
        MemoLines(limit: 100, order_by: {created: desc}) {
            id,
            code
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

export const deleteMemo = gql`
  mutation delete_card($id: Int){
    delete_memos(where: {id: {_eq: $id}}) {
      affected_rows
    }
    delete_lines(where: {memo_id: {_eq: $id}}) {
      affected_rows
    }
  }`
export const memosQryMemoLines = gql`
query {
    memos(order_by: {created: desc}) {
        id
        code        
        uuid
        user_id
        tag_id
        label
        created
        updated
        autogen
        MemoLines(limit: 100, order_by: {created: desc}) {
            id
        }
        TagMemo {
            label
        }
    }
}`

export const filterMemos = gql`
query filter_memos($id: Int){ 
  memos(where: {TagMemo: {id: {_eq: $id }}}, order_by: {created: desc}) {
    id
    code
    uuid
    user_id
    tag_id
    label
    created
    updated
    autogen
    MemoLines(limit: 100, order_by: {created: desc}) {
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
    code
    label
    user_id
    tag_id
    created
    updated
    uuid
    autogen
    MemoLines {
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
    code
    label
    user_id
    tag_id
    created
    updated
    uuid
    autogen
    TagMemo {
      label
    }
  }
}
`

export const updateMemoCode = gql`
mutation update_token($id: Int, $code: String) {
  update_memos(
    where: {id: {_eq: $id}},
    _set: {
      code: $code
    }
  ) {
    affected_rows
    returning {
      id
    }
  }
}`

export const updateMemoUpdated = gql`
  mutation update_memo($id: Int, $update: timestamptz){
    update_memos(where: {id: {_eq: $id}}, _set: {updated: $update}) {
      returning {
        id
        code
        label
        user_id
        tag_id
        created
        updated
        uuid
        autogen
        TagMemo {
          label
        }
      }
    }
}`