import { gql } from 'apollo-server';

export const typeDefs = gql`
  # declare custom scalars
  scalar Date
  # a group chat entity
  type Group {
    id: Int! # unique id for the group
    name: String # name of the group
    users: [User!]! # users in the group
    GroupMessage: [GroupMessage!]! # messages sent to the group
    album: [Photo!]!
  }
  # a user -- keep type really simple for now
  type User {
    id: Int! # unique id for the user
    email: String! # we will also require a unique email per user
    username: String! # this is the name we'll show other users
    UserMessage: [UserMessage!]! # messages sent by user
    GroupMessage: [GroupMessage!]!
    groups: [Group!]! # groups the user belongs to
    friends: [User] # user's friends/contacts
    album: [Photo!]!
  }

  union to = User | Group

  type Photo {
    id: Int!
    name: String!
    createdAt: Date!
    from: User!
    to: to
  }

  #type PhotoUser implements Photo {
  # id: Int!
  #name: String!
  #createdAt: Date!
  #from: User!
  #to: User | Group

  #}

  #type PhotoGroup implements Photo {
  #  id: Int!
  # name: String!
  # createdAt: Date!
  # from: User!
  # to: Group!
  # }

  interface Message {
    id: Int! # unique id for message
    from: User! # user who sent the message
    text: String! # message text
    createdAt: Date! # when message was created
  }
  # a message sent from a user to a group
  type GroupMessage implements Message {
    id: Int! # unique id for message
    to: Group! # group message was sent in
    from: User! # user who sent the message
    text: String! # message text
    createdAt: Date! # when message was created
  }
  type UserMessage implements Message {
    id: Int! # unique id for message
    to: User! # group message was sent in
    from: User! # user who sent the message
    text: String! # message text
    createdAt: Date! # when message was created
  }
  # query for types
  type Query {
    # Return a user by their email or id
    user(email: String, id: Int): User
    # Return messages sent by a user via userId
    # Return messages sent to a group via groupId
    groupmessages(groupId: Int): [GroupMessage]
    usermessages(userId: Int): [UserMessage]
    # Return photos sent by a user via id
    # Return photos sent to a group via id
    photo(userId: Int, groupId: Int): [Photo]
    search: [to]
    # Return a group by its id
    group(id: Int!): Group
  }
  schema {
    query: Query
  }
`;
export default typeDefs;
