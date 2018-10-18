import { gql } from 'apollo-server';

export const typeDefs = gql`
  # declare custom scalars
  scalar Date

  # a group chat entity
  type Group {
    id: Int! # unique id for the group
    name: String # name of the group
    users: [User!]! # users in the group
    messages: [Message!]! # messages sent to the group
    album: [Photo!]!
    length: Int!
  }

  # a user -- keep type really simple for now
  type User {
    id: Int! # unique id for the user
    email: String! # we will also require a unique email per user
    username: String! # this is the name we'll show other users
    messages: [Message!]! # messages sent by user
    groups: [Group!]! # groups the user belongs to
    friends: [User] # user's friends/contacts
    album: [Photo!]!
  }

  #union To = User | Group

  #a photo sent from a user to a group/user
  type Photo {
    id: Int!
    name: String!
    createdAt: Date!
    from: User!
    to: Group!
    comment: String
  }

  # a message sent from a user to a group
  type Message {
    id: Int! # unique id for message
    from: User! # user who sent the message
    text: String! # message text
    createdAt: Date! # when message was created
    to: Group!
  }

  # query for types
  type Query {
    # Return a user by their email or id
    user(email: String, id: Int): User
    # Return messages sent by a user via userId
    messages(userId: Int): [Message]
    # Return a group by its id
    group(id: Int): Group
    # Return a photo by its id or name
    photo(id: Int, name: String): [Photo]
  }
  schema {
    query: Query
  }
`;
export default typeDefs;