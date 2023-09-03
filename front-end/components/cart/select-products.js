import { handleSelectCartProductsAPI } from "../../api/handlers/cart";
import { handleGetCartProducts } from "./get-products";

export const handleSelectProducts = (
  cartProducts,
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

  const selectedProducts = newlySelectedProducts.map((key) => {
    const product = cartProducts.find((p) => p.product_id === key);
    return {
      quantity: product.quantity,
      product_id: key,
      selected: true,
    };
  });

  const deselectedProducts = newlyDeselectedProducts.map((key) => {
    const product = cartProducts.find((p) => p.product_id === key);
    return {
      quantity: product.quantity,
      product_id: key,
      selected: false,
    };
  });

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
