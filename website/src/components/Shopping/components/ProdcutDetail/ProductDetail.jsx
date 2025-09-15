import { useParams } from "react-router-dom";
import Nav from "../Nav/Nav";
import { getProducts } from "../../../../data/Info";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../store/cart";
import { useEffect, useState } from "react";
import useGlobalCountdown from "../../../../hooks/useGlobalCountdown";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ProductDetail = () => {
  const { id, productId } = useParams();
  const dispatch = useDispatch();
  const products = getProducts(id);
  const product = products.find((item) => item.id === parseInt(productId, 10));
  const [quantity, setQuantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const showScarcity = parseInt(id, 10) === 12 && product.scarcity;
  const showSocialProof = parseInt(id, 10) === 9 && product.socialProof;
  const showUrgency = parseInt(id, 10) === 15 && product.urgency;
  const showEmotion = parseInt(id, 10) === 6 && product.emotional;

  const timeLeft = showUrgency
    ? useGlobalCountdown(`product_${String(product.id)}`, 3 * 54 * 60)
    : 0;

  useEffect(() => {
    console.log(timeLeft);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-16">
          {/* 左侧：商品大图 */}
          <div className="md:col-span-5 flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-md object-contain border rounded"
            />
          </div>

          {/* 中间：商品信息 */}
          <div className="md:col-span-5 space-y-3">
            {/* <a
              href="#"
              className="text-sm font-semibold "
              // onClick={() => navigate(`/task/${id}/store/${product.store}`)}
            >
              {product.store}
            </a> */}
            <h1 className="text-2xl font-semibold text-[#0f1111]">
              {product.name}
            </h1>
            <div className="border-t my-2"></div>
            <div>
              <span className="text-3xl font-bold">${product.price}</span>
            </div>

            {/* 紧迫性 & 社会证明 */}
            {showScarcity && (
              <p className="text-[#B12704] text-base font-semibold mt-2">
                Only 3 left in stock — order soon.
              </p>
            )}
            {showSocialProof && (
              <p className="text-red-500 font-bold text-sm mt-1">
                300+ bought in the past month
              </p>
            )}
            {showUrgency && (
              <div className="flex items-center space-x-2 my-1">
                <span className="bg-[#7fda69] text-black text-xs font-semibold px-2 py-1 ">
                  Save 30%
                </span>
                <span className="text-red-600 text-sm font-semibold">
                  Deal ends in {formatTime(timeLeft)}
                </span>
              </div>
            )}
            {showEmotion && (
              <p className="text-green-600 text-base font-semibold mt-2">
                A small choice today for a healthier, happier you.
              </p>
            )}

            <div className="mt-16">
              <p className="font-semibold text-lg mb-1">Product details</p>
              <ul className="text-sm text-gray-700 list-disc pl-5">
                {product.description}
              </ul>
            </div>
          </div>

          {/* 右侧：购买栏 */}
          <div className="md:col-span-2 border rounded p-4 space-y-3">
            <p className="text-2xl font-bold">${product.price}</p>
            <p className="text-green-600 font-semibold">In Stock</p>

            <div>
              <label className="block text-sm mb-1">Quantity:</label>
              <select
                className="border rounded px-2 py-1 w-full"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
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
                fontSize: "14px",
              }}
              onClick={() => {
                for (let i = 0; i < quantity; i++) {
                  dispatch(
                    addToCart({
                      id: parseInt(productId, 10),
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    })
                  );
                }
                setSnackbarOpen(true);
              }}
            >
              Add to Cart
            </Button>
            <div className="text-sm pt-2 mt-4 border-t">
              <p className="text-blue-600 text-sm my-2">FREE Returns</p>
              <div className="grid grid-cols-2 gap-y-1">
                {/* <p className="whitespace-nowrap">Ships from</p>
                <p className="font-semibold break-words">ShopXpress</p> */}

                <p className="whitespace-nowrap">Returns</p>
                <p className="text-blue-600 break-words">
                  30-day refund/replacement
                </p>

                <p className="whitespace-nowrap">Payment</p>
                <p className="text-blue-600 break-words">Secure transaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Added to cart successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductDetail;
