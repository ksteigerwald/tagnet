import gql from 'graphql-tag'

export const factsInsert = gql`
mutation insertFact($objects: [facts_insert_input!]!) {
  insert_facts(objects: $objects) {
    returning {
      id
      memo_id
      line_id
      search
      user_id
      created
    }
  }
}`

export const factsQry = gql`
query {
    facts {
      id
      memo_id
      line_id
      search
      user_id
      created
    }
}
`