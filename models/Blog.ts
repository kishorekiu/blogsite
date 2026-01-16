import mongoose, { Document, Model, Schema } from "mongoose";

export interface IBlog extends Document {
  title: string;
  description: string;
  author: mongoose.Types.ObjectId | any;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
