import gql from 'graphql-tag'

export const linesInsert = gql`
mutation insert_memo($objects: [lines_insert_input!]!) {
  insert_lines(objects: $objects) {
    returning {
      id
      uuid
      memo_id
      label
      logged
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
      logged
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
      label,
      logged
	}
}
`
