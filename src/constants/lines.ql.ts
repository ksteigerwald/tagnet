import gql from 'graphql-tag'

export const linesInsert = gql`
mutation insertLine($objects: [lines_insert_input!]!) {
  insert_lines(objects: $objects) {
    returning {
      id
      memo_id
      label
      uuid
      user_id
    }
  }
}`

export const linesQry = gql`
query {
    lines {
      id,
      code,
      uuid,
      memo_id,
      label,
      created
    }
}
`

export const searchQry = gql`
query search_lines($input: String) {
	lines(
		where: {label: {_like: $input }}
	) {
      id,
      code,
      uuid,
      memo_id,
      label
	}
}
`

export const linesByMemoId = gql`
query linesByMemoId($input:Int) {
  lines(where: {memo_id: {_eq: $input }}) {
    id
    code
    label
    memo_id
    user_id
    uuid
    created
    LineMemo {
      TagMemo {
        id
      }
      label
    }
  }
}
`
export const updateLineCode = gql`
mutation update_token($id: Int, $code: String) {
  update_lines(
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