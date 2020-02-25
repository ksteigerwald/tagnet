import gql from 'graphql-tag'

const lineFragment = gql`
  fragment lineFeilds on lines {
    id
    code
    label
    memo_id
    user_id
    uuid
    created
    format_id
    meta
}`

export const linesInsert = gql`
mutation insertLine($objects: [lines_insert_input!]!) {
  insert_lines(objects: $objects) {
    returning {
      ...lineFeilds
    }
  }
}
${lineFragment}
`

export const linesQry = gql`
query {
    lines {
      ...lineFeilds
    }
}
${lineFragment}
`
export const linesPublicQry = gql`
query linePublicQry($memoId: Int) {
  lines(where: {memo_id: {_eq: $memoId }}) {
    ...lineFeilds
  }
}
${lineFragment}
`

export const searchQry = gql`
query search_lines($input: String) {
	lines(
		where: {label: {_like: $input }}
	) {
    ...lineFeilds
	}
}
${lineFragment}
`

export const linesByMemoId = gql`
query linesByMemoId($input: Int) {
  lines(where: {memo_id: {_eq: $input}}, order_by: {created: desc}) {
    ...lineFeilds
    LineMemo {
      TagMemo {
        id
      }
      label
    }
  }
}
${lineFragment}
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