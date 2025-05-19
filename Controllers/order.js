import mongoose from "mongoose";
import Order from "../Models/Order.js"; // Ensure the correct file path & extension

/** ✅ Get All Orders (Admin) */
export const allOrders = async (req, res) => {
    try {
        // ✅ Get pagination params from query
        const limit = parseInt(req.query.limit) || 10; // Default limit: 10
        const offset = parseInt(req.query.offset) || 1; // Default page: 1
        const skip = (offset - 1) * limit;

        // ✅ Fetch total count for pagination
        const totalOrders = await Order.countDocuments();

        // ✅ Fetch orders with pagination and populate product details
        const orders = await Order.find()
            .populate({
                path: "products.product",
                select: "title description price image", // Only include necessary fields
            })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); // Sort by newest orders

        return res.status(200).json({
            msg: "All order list",
            data: {
                orders,
                pagination: {
                    totalOrders,
                    limit,
                    offset,
                    totalPages: Math.ceil(totalOrders / limit),
                    hasNextPage: offset * limit < totalOrders,
                    hasPrevPage: offset > 1,
                },
            },
        });

    } catch (error) {
        console.error("Checkout error:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

/** ✅ Get Orders for a Specific User */
// export const userOrders = async (req, res) => {
//     try {
//         const userId = req.user._id; // ✅ Get logged-in user ID

//         // ✅ Get pagination params
//         const limit = parseInt(req.query.limit) || 10;
//         const offset = parseInt(req.query.offset) || 1;
//         const skip = (offset - 1) * limit;

//         // ✅ Fetch total count of user's orders
//         const totalOrders = await Order.countDocuments({ user: userId });

//         // ✅ Fetch user's orders with pagination and product details
//         const orders = await Order.find({ user: userId })
//             .populate({
//                 path: "products.product",
//                 select: "title description price image", // Fetch only relevant details
//             })
//             .skip(skip)
//             .limit(limit)
//             .sort({ createdAt: -1 });

//         if (orders.length === 0) {
//             return res.status(404).json({ msg: "No orders found for this user." });
//         }

//         return res.status(200).json({
//             msg: "User orders list",
//             data: {
//                 orders,
//                 pagination: {
//                     totalOrders,
//                     limit,
//                     offset,
//                     totalPages: Math.ceil(totalOrders / limit),
//                     hasNextPage: offset * limit < totalOrders,
//                     hasPrevPage: offset > 1,
//                 },
//             },
//         });

//     } catch (error) {
//         console.error("User orders error:", error);
//         res.status(500).json({ msg: "Internal server error" });
//     }
// };

export const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate({
        path: "products.product",
        select: "title image price",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
