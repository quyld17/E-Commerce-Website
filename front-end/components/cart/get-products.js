import { handleGetAllCartProductsAPI } from "@/api/handlers/cart";

export const handleGetCartProducts = (
  setCartProducts,
  setTotal,
  setSelectedRowKeys,
  setSelectedRowKeysPrev
) => {
  handleGetAllCartProductsAPI()
    .then((data) => {
      setCartProducts(data.cart_products);
      setTotal(data.total_price);
      setSelectedRowKeys(
        data.cart_products
          .filter((product) => product.selected === 1)
          .map((product) => product.product_id)
      );
      setSelectedRowKeysPrev(
        data.cart_products
          .filter((product) => product.selected === 1)
          .map((product) => product.product_id)
      );
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};
