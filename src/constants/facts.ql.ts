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
  facts(limit: 10, order_by: {created: desc}) {
    id
    memo_id
    search
    line_id
    FactMemo {
      label
      tag_id
      code
      TagMemo {
        label
      }
    }
    FactLine {
      code
      label
    }
  }
}
`