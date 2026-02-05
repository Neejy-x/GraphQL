import { mongoose } from "mongoose";


export const Game = mongoose.model('Game', ({
    title: {
        type: String,
        required: true
    },
    platform: {
        type: [String],
        required: true
    }
}))


export const Author = mongoose.model('Author', ({
    name: {
        type: String,
        required: true,
    },

    verified: {
        type: Boolean,
        required: true,
        default: true
    }
}))


export const Review = mongoose.model('Review',({
    content: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true
    },

    author: {
        type: mongoose.Types.ObjectId,
        ref: 'Author',
        required: true
    },

    game: {
        type: mongoose.Types.ObjectId,
        ref: 'Game',
        required: true
    }
}))