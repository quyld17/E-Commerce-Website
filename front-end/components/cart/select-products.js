import { handleSelectCartProductsAPI } from "../../api/handlers/cart";
import { handleGetCartProducts } from "./get-products";

export const handleSelectProducts = (
  selectedRowKeys,
  selectedRowKeysPrev,
  setCartProducts,
  setTotal,
  setSelectedRowKeys,
  setSelectedRowKeysPrev
) => {
  const newlySelectedProducts = selectedRowKeys.filter(
    (key) => !selectedRowKeysPrev.includes(key)
  );
  const newlyDeselectedProducts = selectedRowKeysPrev.filter(
    (key) => !selectedRowKeys.includes(key)
  );

  setSelectedRowKeys(selectedRowKeys);
  setSelectedRowKeysPrev(selectedRowKeys);

  const selectedProducts = newlySelectedProducts.map((key) => ({
    quantity: -1,
    product_id: key,
    selected: 1,
  }));
  const deselectedProducts = newlyDeselectedProducts.map((key) => ({
    quantity: -1,
    product_id: key,
    selected: 0,
  }));

  if (selectedProducts.length !== 0) {
    handleSelectCartProductsAPI(selectedProducts)
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
  } else {
    handleSelectCartProductsAPI(deselectedProducts)
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
};
