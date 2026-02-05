export const typeDefs = `#graphql


type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
}

type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]
}

type Review {
    id: ID!
    content: String!
    rating: Int!
    author: Author!
    game: Game!
}

type Query {
    games(id: ID!): [Game]
    game: Game
    authors: [Author]
    author(id: ID!): Author
    review(id: ID!): Review
    reviews: [Review]
}

type Mutation{
    addReview(review: AddReview!): Review
}

input AddReview {
    content: String!
    rating: Int!
    author: ID!
    game: ID!
}

`