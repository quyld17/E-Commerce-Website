import {
  handleDeleteCartProduct,
  handleGetAllCartProducts,
} from "../../api/handlers/cart";

export const handleOk = (
  deletingProduct,
  setIsModalOpen,
  setCartProducts,
  setTotal
) => {
  if (deletingProduct) {
    handleDeleteCartProduct(deletingProduct.product_id)
      .then(() => {
        handleGetAllCartProducts()
          .then((data) => {
            setCartProducts(data.cart_products);
            setTotal(data.total_price);
          })
          .catch((error) => {
            console.log("Error: ", error);
          });
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
