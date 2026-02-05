export const typeDefs = `#graphql

type Game{
id: ID!
title: String!
platform: [String!]!,
reviews: [Review!]
}

type Author{
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
}

type Review{
    id: ID!
    rating: Int!
    content: String!
    author: Author
    game: Game!
}

type Query{
    reviews: [Review]
    games: [Game]
    review(id: ID!): Review
    game(id: ID!): Game
    author(id: ID!): Author
    authors: [Author]
}

type Mutation{

    addGame(game: AddGame): Game
    updateGame(id: ID!, updates: UpdateGame): Game
    deleteGame(id: ID!): Game
}
input AddGame{
    title: String!
    platform: [String!]!
}
input UpdateGame{
    title: String,
    platform: [String!]
}
`