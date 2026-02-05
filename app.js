import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./appSchema.js";

//Databse connection
import { mongoose } from "mongoose";
import { Review } from "./db.js";
import { Author } from "./db.js";
import { Game } from "./db.js";

mongoose
  .connect("mongodb://localhost/gamerator")
  .then(() => console.log("connected to db..."))
  .catch((e) => console.error("Error: ", e));

//resolvers
const resolvers = {
  Query: {
    reviews: async () => await Review.find(),
    review: async (_, args) => await Review.findById(args.id),
    games: async () => await Game.find(),
    game: async (_, args) => await Game.findById(args.id),
    author: async (_, args) => await Author.findById(args.id),
    authors: async () => await Author.find(),
  },
  Review: {
    game: async (parent) => {
      return Game.findById(parent.game);
    },

    author: async (parent) => {
      return await Author.find(parent.author);
    },
  },

  Game: {
    reviews: async (parent) => {
      return await Review.find({ game: parent.id });
    },
  },

  Author: {
    reviews: async (parent) => {
      return await Review.find({ author: parent.id });
    },
  },
  Mutation: {
    addGame: async (_, args) => {
      const game = await Game.create({
        ...args.game,
      });
      return game;
    },

    updateGame: async(_, args) => {
        const updatedGame = await Game.findByIdAndUpdate(args.id, {...args.updates}, {new: true, runnValidators: true})
        return updatedGame
    },
    deleteGame: async(_, args) => {
       const deletedGame =  await Game.findByIdAndDelete(args.id)
        return deletedGame
    }
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log("Server is running");
