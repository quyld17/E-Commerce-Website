import {
  handleDeleteCartProduct,
  handleGetAllCartProducts,
} from "../api-handlers/cart";

export const handleOk = (deletingProduct, setIsModalOpen, setCartProducts) => {
  if (deletingProduct) {
    handleDeleteCartProduct(deletingProduct.product_id)
      .then(() => {
        handleGetAllCartProducts()
          .then((data) => {
            setCartProducts(data.cart_products);
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
