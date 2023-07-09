import { handleAdjustCartProductQuantity } from "../api-handlers/cart";

export const handleOk = (
  deletingProduct,
  selectedProducts,
  setSelectedProducts,
  setIsModalOpen
) => {
  if (deletingProduct) {
    const updatedSelectedProducts = selectedProducts.filter(
      (product) => product.product_id !== deletingProduct.product_id
    );
    setSelectedProducts(updatedSelectedProducts);

    handleAdjustCartProductQuantity(deletingProduct.product_id, 0)
      .then(() => {
        handleGetAllCartProducts()
          .then((data) => {
            setCartProducts(data);
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
