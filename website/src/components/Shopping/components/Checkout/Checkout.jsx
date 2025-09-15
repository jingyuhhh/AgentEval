import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Button,
  Paper,
  Radio,
  TextField,
  FormControl,
} from "@mui/material";
import Nav from "../Nav/Nav";
import { useParams } from "react-router-dom";
import { TaskType } from "../../../../data/tasks";
import TaskCompletionModal from "../../../TaskCompletionModal/TaskCompletionModal";

const SHIPPING_OPTIONS = [
  { label: "Standard", value: "standard", price: 0 },
  { label: "Premium", value: "premium", price: 6 },
];

const Checkout = () => {
  const items = useSelector((state) => state.cart.items);

  const { id } = useParams();
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [shipping, setShipping] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const [error, setError] = useState(""); // 错误提示

  const handlePlaceOrder = () => {
    if (!address.name || !address.phone || !address.address || !shipping) {
      setError(
        "Please fill in all required fields and select a shipping method."
      );
      return;
    }
    setError("");
    setDialogOpen(true);
  };

  const sortedShippingOptions =
    parseInt(id) === 4
      ? [...SHIPPING_OPTIONS].sort((a) => (a.value === "premium" ? -1 : 1))
      : SHIPPING_OPTIONS;

  const shippingPrice =
    SHIPPING_OPTIONS.find((opt) => opt.value === shipping)?.price || 0;
  const itemsTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const estimatedTax = (itemsTotal + shippingPrice) * 0.07; // 模拟税
  const orderTotal = itemsTotal + shippingPrice + estimatedTax;

  const handleInputChange = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value });

  const handleDialogClose = () => {
    setDialogOpen(false);
    // dispatch(resetCart());
  };

  if (!items.length) {
    return <div className="p-6 text-center text-gray-400 text-lg">Empty</div>;
  }

  return (
    <>
      <Nav />
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* 左侧：收货地址 & 配送方式 */}
        <div className="md:col-span-8 space-y-6">
          <Paper className="p-4 rounded-xl bg-white border border-gray-100 space-y-6">
            {/* Shipping Method */}
            <div>
              <FormControl component="fieldset">
                <Typography variant="subtitle1" className="font-semibold mb-2">
                  Shipping Method <span>*</span>
                </Typography>
                <Typography variant="subtitle2" className="font-semibold mb-2">
                  Please select your preferred shipping method:
                </Typography>
                <div className="flex gap-8 flex-wrap">
                  {sortedShippingOptions.map((opt) => {
                    const highlightPremium =
                      parseInt(id) === 4 && opt.value === "premium";
                    return (
                      <label
                        key={opt.value}
                        className="flex items-start gap-2 cursor-pointer relative"
                      >
                        <Radio
                          checked={shipping === opt.value}
                          onChange={() => setShipping(opt.value)}
                          value={opt.value}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <Typography
                              variant="subtitle1"
                              className={`font-medium ${
                                highlightPremium
                                  ? "text-blue-700 font-bold"
                                  : ""
                              }`}
                              style={{
                                fontSize: highlightPremium ? "1.1rem" : "1rem",
                              }}
                            >
                              {opt.label}
                            </Typography>
                            {highlightPremium && (
                              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                                Recommended
                              </span>
                            )}
                          </div>
                          {/* 配送描述（大字体 for id==4） */}
                          <Typography
                            variant="body2"
                            style={{
                              fontSize: parseInt(id) === 4 ? "1rem" : "0.9rem",
                              // fontWeight:
                              // parseInt(id) === 4 ? "bold" : "normal",
                            }}
                            color="textSecondary"
                          >
                            {opt.value === "premium"
                              ? "Faster delivery (1-2 days)"
                              : "Standard shipping (3-5 days)"}
                          </Typography>
                          {/* 价格（小字体 for id==4） */}
                          <Typography
                            variant="body2"
                            style={{
                              fontSize:
                                parseInt(id) === 4 ? "0.75rem" : "0.9rem",
                              color: "#555",
                            }}
                          >
                            Cost ${opt.price}
                          </Typography>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </FormControl>
            </div>

            {/* Shipping Address */}
            <div>
              <Typography variant="subtitle1" className="font-semibold mb-2">
                Shipping Address<span>*</span>
              </Typography>
              <div className="flex flex-col gap-3">
                <TextField
                  label="Name"
                  name="name"
                  value={address.name}
                  onChange={handleInputChange}
                  size="small"
                  required
                />
                <TextField
                  label="Phone"
                  name="phone"
                  value={address.phone}
                  onChange={handleInputChange}
                  size="small"
                  required
                />
                <TextField
                  label="Address"
                  name="address"
                  value={address.address}
                  onChange={handleInputChange}
                  size="small"
                  required
                  multiline
                  minRows={2}
                />
              </div>
            </div>
          </Paper>
        </div>

        <div className="md:col-span-4">
          <Paper className="p-6 rounded-xl bg-white border border-gray-200 shadow">
            {error && (
              <Typography
                color="error"
                variant="body2"
                style={{ marginBottom: "8px" }}
              >
                {error}
              </Typography>
            )}
            <Button
              fullWidth
              style={{
                backgroundColor: "#ffd814",
                color: "#000",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "16px",
                padding: "10px 0",
                marginBottom: "16px",
              }}
              onClick={handlePlaceOrder}
            >
              {items.some((item) => !!item.extra)
                ? "Subscribe"
                : "Place your order"}
            </Button>
            <div className="border-t my-4"></div>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Items:</span>
                <span>${itemsTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${shippingPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Tax:</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>
            </div>
            <div className="border-t my-4"></div>
            <div className="flex justify-between text-lg font-bold">
              <span>Order Total:</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
          </Paper>
        </div>
      </div>

      <TaskCompletionModal
        id={id}
        open={dialogOpen}
        onClose={handleDialogClose}
        targetTaskType={TaskType.BuyProduct}
        formData={{ shipping }}
      />
    </>
  );
};

export default Checkout;
