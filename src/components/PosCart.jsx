// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   increaseQty,
//   decreaseQty,
//   removeFromCart,
//   clearCart,
// } from "../store/slice/CartSlice";

// const PosCart = () => {
//   const { cartItems, taxRate } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   const subtotal = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   const tax = (subtotal * taxRate) / 100;
//   const total = subtotal + tax;

//   return (
//     <div className="w-[380px] bg-white h-screen p-4 shadow-xl fixed right-0 top-0 overflow-y-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">
//           Cart{" "}
//           <span className="text-sm text-gray-500">
//             ({cartItems.length} items)
//           </span>
//         </h2>

//         <button
//           className="text-red-500 hover:text-red-600 text-lg"
//           onClick={() => dispatch(clearCart())}
//         >
//           🗑
//         </button>
//       </div>

//       {/* CART ITEMS */}
//       {cartItems.length === 0 ? (
//         <p className="text-gray-500 mt-10 text-center">Cart is empty...</p>
//       ) : (
//         cartItems.map((item) => (
//           <div
//             key={item.sku}
//             className="flex items-center mb-4 bg-gray-50 p-3 rounded-lg shadow"
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-16 h-16 rounded object-cover"
//             />

//             <div className="ml-3 flex-1">
//               <h4 className="font-semibold">{item.name}</h4>
//               <p className="text-gray-500">PKR {item.price}</p>

//               {/* Qty buttons */}
//               <div className="flex items-center mt-2">
//                 <button
//                   className="px-3 py-1 bg-gray-200 rounded"
//                   onClick={() => dispatch(decreaseQty(item.sku))}
//                 >
//                   -
//                 </button>

//                 <span className="px-4">{item.quantity}</span>

//                 <button
//                   className="px-3 py-1 bg-gray-200 rounded"
//                   onClick={() => dispatch(increaseQty(item.sku))}
//                 >
//                   +
//                 </button>

//                 {/* delete */}
//                 <button
//                   className="ml-4 text-red-500 text-xl"
//                   onClick={() => dispatch(removeFromCart(item.sku))}
//                 >
//                   🗑
//                 </button>
//               </div>
//             </div>

//             <p className="font-semibold text-right">
//               PKR {(item.price * item.quantity).toFixed(2)}
//             </p>
//           </div>
//         ))
//       )}

//       {/* TOTAL AREA */}
//       <div className="mt-6 border-t pt-4">
//         <div className="flex justify-between text-lg">
//           <span>Subtotal:</span>
//           <span>PKR {subtotal.toFixed(2)}</span>
//         </div>

//         <div className="flex justify-between text-lg mt-1">
//           <span>Tax ({taxRate}%):</span>
//           <span>PKR {tax.toFixed(2)}</span>
//         </div>

//         <div className="flex justify-between text-xl font-bold mt-3">
//           <span>Total:</span>
//           <span>PKR {total.toFixed(2)}</span>
//         </div>
//       </div>

//       <button className="bg-green-600 w-full mt-5 py-3 text-white rounded-lg text-lg hover:bg-green-700">
//         Proceed to Checkout (F4)
//       </button>
//     </div>
//   );
// };

// export default PosCart;
