import { mongoose } from "mongoose";
import { z } from "zod";
import { GraphQLError } from "graphql";

export const Author = mongoose.model("Author", {
  name: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

export const Game = mongoose.model("Game", {
  title: {
    type: String,
    required: true,
  },
  platform: {
    type: [String],
    required: true,
  },
});

export const Review = mongoose.model("Review", {
  content: {
    type: String,
    required: true,
  },
  rating: Number,
  author: {
    type: mongoose.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  game: {
    type: mongoose.Types.ObjectId,
    ref: "Game",
    required: true,
  },
});

export const gameSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  platform: z.array(z.string()).min(1, "Game must have at least one platform"),
});

export const authorSchema = z.object({
  name: z.string().min(3, "Author name must have at least 3 characters"),
  verified: z.boolean(),
});

export const reviewSchema = z.object({
  content: z.string(),
  rating: z
    .number()
    .min(1, "rating cannot be lower than 1")
    .max(10, "rating cannot be hgher than 10"),
  author: z.string().length(24),
  game: z.string().length(24),
});

export const validate = (schema, data) => {
  try {
    schema.parse(data);
   
  } catch (err) {
   
    throw new GraphQLError('Invalid Input', {
        extensions: {
            code: 'BAD_USER_INPUT'
        }
    });
  }
};
