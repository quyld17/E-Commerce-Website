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
  if (quantity === null) {
    return;
  } else {
    const product = cartProducts.find((product) => product.product_id === id);
    if (quantity <= 0) {
      setIsModalOpen(true);
      setDeletingProduct(product);
    } else {
      handleAdjustCartProductQuantityAPI(id, quantity, product.selected)
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
}
