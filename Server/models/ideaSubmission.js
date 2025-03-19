import mongoose from "mongoose";
import validator from "validator"; 

const IdeaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    media: [{ type: String, required: true }], // Array for images/videos
    problemStatement: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    technology: { type: [String]}, // Array of technologies
    referenceLinks: {
      type: [String],
      validate: {
        validator: function (links) {
          return links.every(link => /^https?:\/\/.+$/.test(link)); // Checks if each link is a valid URL
        },
        message: "One or more reference links are invalid URLs."
      }
    },
    approved: { type: Boolean, default: false },
    feasibilityScore: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    aiSuggestions: { type: String },
    userObject: { type: String, required: true }, 
  },
  { timestamps: true }
);

export default mongoose.model("Idea", IdeaSchema);
