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
      created
      format_id
      meta
    }
  }
}`

export const linesDelete = gql`
mutation deleteLine($id: Int) {
  delete_lines(where: {id: {_eq: $id}}) {
    returning {
      id
      memo_id
      label
      uuid
      user_id
      created
      format_id
      meta
    }
  }
}`

export const linesUpdate = gql`
mutation updateLine($id: Int, $label: String!) {
  update_lines(where: {id: {_eq: $id}}, _set: { label: $label } ) {
    returning {
      id
      memo_id
      label
      uuid
      user_id
      created
      format_id
      meta
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
      format_id
      meta
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
      format_id
      meta
	}
}
`

export const linesByMemoId = gql`
query linesByMemoId($input: Int) {
  lines(where: {memo_id: {_eq: $input}}, order_by: {created: desc}) {
    id
    code
    label
    memo_id
    user_id
    uuid
    created
    format_id
    meta
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

export const updateLineMeta = gql`
mutation update_meta($id: Int, $meta: jsonb ) {
  update_lines(where: {id: {_eq: $id }}, _set: {meta: $meta }) {
    affected_rows
  }
}`