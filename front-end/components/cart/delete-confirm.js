import { handleDeleteCartProduct } from "../../api/handlers/cart";

import { handleGetCartProducts } from "./get-products";

export const handleOk = (
  deletingProduct,
  setIsModalOpen,
  setCartProducts,
  setTotal,
  setSelectedRowKeys
) => {
  if (deletingProduct) {
    handleDeleteCartProduct(deletingProduct.product_id)
      .then(() => {
        handleGetCartProducts(setCartProducts, setTotal, setSelectedRowKeys);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }
  setIsModalOpen(false);
};

export const handleCancel = (setIsModalOpen) => {
  setIsModalOpen(false);
};
