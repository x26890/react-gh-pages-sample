import { useState, useContext } from "react";
import ProductsData from "../assets/ProducstData";
import { CartContext } from "../store";

export default function Products() {
  const [state, dispatch] = useContext(CartContext);

  // 為每個商品建立本地數量狀態
  const [localQuantities, setLocalQuantities] = useState(() => {
    const initialQuantities = {};
    ProductsData.map(product => {
      initialQuantities[product.id] = 1; // 預設數量為1
    });
    return initialQuantities;
  });

  // 處理數量調整
  const handleQuantityChange = (productId, newQuantity) => {
    setLocalQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, Math.min(20, newQuantity))
    }));
  };


  const resetQuantity = (productId) => {
    setLocalQuantities(prev => ({
      ...prev,
      [productId]: 1 // 強制重置為1
    }));
  };

  return (
    <div className="row row-cols-3 g-3">
      {ProductsData.map((product) => (
        <div className="col" key={product.id}>
          <div className="card">
            <img src={product.img} className="card-img-top" alt="..." />
            <div className="card-body">
              <h6 className="card-title">
                {product.title}
                <span className="float-end">$ NT{product.price}</span>
              </h6>

              <div className="d-flex align-items-center gap-2">
                {/* - 按鈕 */}
                <button
                  className="btn btn-outline-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleQuantityChange(
                      product.id,
                      localQuantities[product.id] - 1
                    );
                  }}
                >-</button>

                {/* 數量選擇器 */}
                <select
                  className="form-select"
                  value={localQuantities[product.id]}
                  onChange={(e) => {
                    e.preventDefault();
                    handleQuantityChange(
                      product.id,
                      parseInt(e.target.value)
                    );
                  }}
                >
                  {[...Array(20)].map((_, i) => (
                    <option value={i + 1} key={i}>
                      {i + 1}
                    </option>
                  ))}
                </select>

                {/* + 按鈕 */}
                <button
                  className="btn btn-outline-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleQuantityChange(
                      product.id,
                      localQuantities[product.id] + 1
                    );
                  }}
                >+</button>
              </div>

              <p className="card-text">
                Some quick example text to build on the card title...
              </p>

              {/* 加入購物車按鈕 - 只在這裡觸發 dispatch */}
              <button
                type="button"
                className="btn btn-outline-primary w-100"
                onClick={() => {
                  const finalProduct = {
                    ...product,
                    quantity: localQuantities[product.id]
                  };

                  // 檢查是否已在購物車
                  const isInCart = state.cartList.some(
                    item => item.id === product.id
                  );

                  if (isInCart) {
                    dispatch({
                      type: 'CHANGE_CART_QUANTITY',
                      payload: finalProduct
                    });
                  } else {
                    dispatch({
                      type: 'ADD_TO_CART',
                      payload: {
                        ...product,
                        quantity: localQuantities[product.id] // 確保傳遞本地狀態
                      }
                    })
                  }
                  resetQuantity(product.id);
                }}
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
