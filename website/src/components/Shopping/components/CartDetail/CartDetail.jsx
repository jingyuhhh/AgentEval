import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Nav from "../Nav/Nav";
import { usePreserveQueryNavigate } from "../../../../hooks/useQueryNavigate";
import { addToCart } from "../../../../store/cart";
import { useParams } from "react-router-dom";

const CartDetail = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = usePreserveQueryNavigate();
  const { id } = useParams();
  const [selectedItems, setSelectedItems] = useState(
    items.reduce((acc, item) => ({ ...acc, [item.id]: true }), {})
  );

  useEffect(() => {
    setSelectedItems((prev) => {
      const updated = { ...prev };
      items.forEach((item) => {
        if (!(item.id in updated)) {
          updated[item.id] = true;
        }
      });
      return updated;
    });
  }, [items]);

  const addedRef = useRef(false);

  useEffect(() => {
    if (id === "3" && items.length > 0 && !addedRef.current) {
      const hasExtra = items.some((item) => !!item.extra);
      if (!hasExtra) {
        const lastItem = items[items.length - 1];
        dispatch(
          addToCart({
            id: 1000,
            name: lastItem.name,
            price: lastItem.price,
            image: lastItem.image,
            extra: "Deliver every: 6 weeks",
          })
        );
        addedRef.current = true; // 标记已加过
      }
    }
  }, [id, items, dispatch]);

  const total = items
    .filter((item) => selectedItems[item.id])
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalItems = items
    .filter((item) => selectedItems[item.id])
    .reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Nav />
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <h1 className="text-2xl font-semibold text-[#0f1111] mb-2">
              Shopping Cart
            </h1>
            <div className="border-t"></div>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex py-4 border-b items-start space-x-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-contain border rounded"
                />
                <div className="flex-1">
                  <p className="text-lg text-[#0f1111] font-medium">
                    {item.name}
                  </p>
                  <p className="text-green-600 text-sm font-semibold">
                    In Stock
                  </p>

                  <div className="flex items-center space-x-2 mt-4">
                    <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
                      <IconButton
                        size="small"
                        onClick={() =>
                          dispatch({
                            type: "cart/decreaseQuantity",
                            payload: { id: item.id },
                          })
                        }
                        className="!p-1"
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <span className="mx-2 text-base font-semibold w-6 text-center select-none">
                        {item.quantity}
                      </span>
                      <IconButton
                        size="small"
                        onClick={() =>
                          dispatch(
                            addToCart({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              image: item.image,
                            })
                          )
                        }
                        className="!p-1"
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">${item.price}</div>
                  {item.extra && <p className="text-base mt-1">{item.extra}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* 右侧结算框 */}
          <div className="md:col-span-4 mt-16">
            <div className="border rounded p-4 space-y-3 shadow-sm">
              <p className="text-lg">
                Subtotal ({totalItems} items):{" "}
                <span className="font-bold">${total.toFixed(2)}</span>
              </p>
              <Button
                variant="contained"
                fullWidth
                style={{
                  backgroundColor: "#ffd814",
                  color: "#000",
                  borderRadius: "9999px",
                  border: "1px solid #fcd200",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "16px",
                  padding: "10px 0",
                }}
                onClick={() =>
                  navigate(`/task/${id}/checkout`, {
                    state: {
                      selectedItems: items.filter(
                        (item) => selectedItems[item.id]
                      ),
                    },
                  })
                }
              >
                Proceed to checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetail;
