import gql from 'graphql-tag'

export const usersQury = gql`
query {
  users {
    user_id
    is_onboard
    id
    first_name
    email
    created
  }
}
`

export const userNew = gql`
mutation new_user($fname: String) {
  insert_users(objects: {first_name: $fname}) {
    returning {
      created
      first_name
      id
      is_onboard
      user_id
    }
  }
}
`
