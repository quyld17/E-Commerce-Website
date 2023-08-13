import { handleAdjustCartProductQuantityAPI } from "@/api/handlers/cart";
import { handleGetCartProducts } from "./get-products";

export default function handleAdjustQuantity(
  id,
  quantity,
  cartProducts,
  setCartProducts,
  setTotal,
  setSelectedRowKeys,
  setSelectedRowKeysPrev,
  setIsModalOpen,
  setDeletingProduct
) {
  if (quantity === 0 || quantity === null) {
    setIsModalOpen(true);
    const product = cartProducts.find((product) => product.product_id === id);
    setDeletingProduct(product);
  } else {
    handleAdjustCartProductQuantityAPI(id, quantity)
      .then(() => {
        handleGetCartProducts(
          setCartProducts,
          setTotal,
          setSelectedRowKeys,
          setSelectedRowKeysPrev
        );
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }
}
