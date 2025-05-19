// // import mongoose from "mongoose";

// // const categorySchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: true,
// //     trim: true,
// //   },
// //   logo: {
// //     type: String,
// //     required: true, // Image URL or file path
// //   },
// // }, {
// //   timestamps: true, // Automatically manage createdAt and updatedAt
// // });

// // export default mongoose.model('Category', categorySchema);
// // 


// import mongoose from "mongoose";

// const categorySchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     image: { 
//       type: String, 
//       required: true,
//       validate: {
//         validator: function(v) {
//           return /^uploads\/category\/.+\.(jpg|jpeg|png|gif)$/.test(v); // Example regex for file path validation
//         },
//         message: props => `${props.value} is not a valid logo path!`
//       }
//     },
//     products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
//   },
//   { timestamps: true }
// );


// export default mongoose.model("Category", categorySchema);
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String, // Store the image filename or path
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;
