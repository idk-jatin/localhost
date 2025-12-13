const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    handle: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    passwordHash: {
      type: String,
    },

    authProviders: {
      github: {
        id: String,
        username: String,
      },
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    hashedRefreshToken: {
      type: String,
      default: null,
    },

    stacks: {
      type: [String],
      default: [],
    },

   location:{
    type:{
      type:String,
      enum:['Point'],
      default: 'Point'
    },
    coordinates:{ type: [Number], default: [0,0] }
   }
  },
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);

