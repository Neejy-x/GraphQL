import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import { typeDefs } from "./serverSchema.js";
//databse stuffs
import { mongoose } from "mongoose";
import {
  Game,
  Author,
  Review,
  gameSchema,
  authorSchema,
  reviewSchema,
  validate
} from "./db.js";

//database startup
mongoose
  .connect("mongodb://localhost/gamerator")
  .then(() => console.log("Database connected.."))
  .catch((e) => console.error("error connecting to DB", e.message));

const resolvers = {
  Query: {
    games: async () => await Game.find(),
    game: async (_, args) => {
      const game = await Game.findById(args.id);
      if (!game) {
        throw new GraphQLError("There is no game with the guven id", {
          extensions: {
            code: "GAME_NOT_FOUND",
          },
        });
      }
      return game;
    },
    author: async (_, args) => {
      const author = await Author.findById(args.id);
      if (!author) {
        throw new GraphQLError("There is no author with the given id", {
          extensions: {
            code: "AUTHOR_NOT_FOUND",
          },
        });
      }
      return author;
    },
    authors: async () => await Author.find(),
    review: async (_, args) => {
      const review = await Review.findById(args.id);
      if (!review) {
        throw new GraphQLError("There is no review with the given id", {
          extensions: {
            code: "REVIEW_NOT_FOUND",
          },
        });
      }
      return review;
    },
    reviews: async () => await Review.find(),
  },

  Game: {
    reviews: async (parent) => {
      return await Review.find({ game: parent.id });
    },
  },

    Author: {

        reviews: async(parent) => {
            return await Review.find({author: parent.id})
        }
    },
    Review: {

        game: async(parent) => {
            return await Game.findById(parent.game)
        },

        author: async(parent) => {
            return await Author.findById(parent.author)
        }
    },

    Mutation: {
        addReview: async(_, {review}) => {
            validate(reviewSchema, review)
            const authorExists = await Author.findById(review.author)
            if(!authorExists){
                throw new GraphQLError('Author not found', {extensions: { code: "AUTHOR_NOT_FOUND"}})
            }

            const gameExists = await Game.findById(review.game)
            if(!gameExists){
                throw new GraphQLError('Game not found', {
                    extensions: {
                        code: "GAME_NOT_FOUND"
                    }
                })
            }
            return await Review.create({
                ...review
            })

        }
    }

};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
