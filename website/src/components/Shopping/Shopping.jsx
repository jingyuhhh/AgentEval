import Product from "./components/Product/Product.jsx";
import Nav from "./components/Nav/Nav.jsx";
import { useParams } from "react-router-dom";
import { usePreserveQueryNavigate } from "../../hooks/useQueryNavigate.js";
import { getProducts } from "../../data/Info.js";

function Shopping() {
  const navigate = usePreserveQueryNavigate();
  const { id } = useParams();
  const products = getProducts(id);

  return (
    <div>
      <Nav />
      <div className="px-8 py-4">
        <h2 className="text-[20px] leading-snug font-bold text-[#0f1111] mb-1">
          Results
        </h2>
        <p className="text-[14px] leading-5 font-normal text-[#565959] mb-6">
          Check each product page for other buying options. Price and other
          details may vary based on product size and color.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "16px",
          }}
          className="p-2"
        >
          {products.map((item) => (
            <Product
              key={item.id}
              onClick={() => navigate(`/task/${id}/productDetail/${item.id}`)}
              product={item}
              productIndex={item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Shopping;
