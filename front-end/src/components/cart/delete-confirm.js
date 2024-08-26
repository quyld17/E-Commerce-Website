import { handleDeleteCartProductAPI } from "../../api/handlers/cart";

import { handleGetCartProducts } from "./get-products";

export const handleOk = (
  deletingProduct,
  setIsModalOpen,
  setCartProducts,
  setTotal,
  setSelectedRowKeys,
  setSelectedRowKeysPrev
) => {
  if (deletingProduct) {
    handleDeleteCartProductAPI(deletingProduct.product_id)
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
  setIsModalOpen(false);
};

export const handleCancel = (setIsModalOpen) => {
  setIsModalOpen(false);
};
