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
      uuid,
      memo_id,
      label
	}
}
`
