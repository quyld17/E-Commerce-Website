import getMethodAPI from "../api-types/get-method-api";
import postMethodAPI from "../api-types/post-method-api";
import putMethodAPI from "../api-types/put-method-api";
import deleteMethodAPI from "../api-types/delete-method-api";
import { message } from "antd";

export function handleGetAllCartProducts() {
  return new Promise((resolve, reject) => {
    const endpoint = "/cart";

    getMethodAPI(
      endpoint,
      (data) => {
        resolve(data);
      },
      (error) => {
        reject(error);
        message.error(error);
      }
    );
  });
}

export function handleAddToCartAPI(product_id, quantity) {
  return new Promise((resolve, reject) => {
    const info = {
      product_id,
      quantity,
    };

    const endpoint = "/cart/product/addition";

    putMethodAPI(
      info,
      endpoint,
      (data) => {
        resolve(data);
      },
      (error) => {
        reject(error);
        message.error(error);
      }
    );
  });
}

export function handleAdjustCartProductQuantity(product_id, quantity) {
  return new Promise((resolve, reject) => {
    const info = {
      product_id,
      quantity,
    };

    const endpoint = "/cart/product/quantity";

    postMethodAPI(
      info,
      endpoint,
      (data) => {
        resolve(data);
      },
      (error) => {
        reject(error);
        message.error(error);
      }
    );
  });
}

export function handleDeleteCartProduct(product_id) {
  return new Promise((resolve, reject) => {
    const endpoint = `/cart/${product_id}/deletion`;

    deleteMethodAPI(
      endpoint,
      (data) => {
        resolve(data);
      },
      (error) => {
        reject(error);
        message.error(error);
      }
    );
  });
}

export function handleSelectCartProducts(selectedProducts) {
  return new Promise((resolve, reject) => {
    const endpoint = "/cart/selection";

    postMethodAPI(
      selectedProducts,
      endpoint,
      (data) => {
        resolve(data);
      },
      (error) => {
        reject(error);
        message.error(error);
      }
    );
  });
}

export function handleDeselectCartProducts(deselectedProducts) {
  return new Promise((resolve, reject) => {
    const endpoint = "/cart/deselection";

    postMethodAPI(
      deselectedProducts,
      endpoint,
      (data) => {
        resolve(data);
      },
      (error) => {
        reject(error);
        message.error(error);
      }
    );
  });
}

export function handleGetCartSelectedProducts() {
  return new Promise((resolve, reject) => {
    const endpoint = "/cart/selected-products";

    getMethodAPI(
      endpoint,
      (data) => {
        resolve(data);
      },
      (error) => {
        reject(error);
        message.error(error);
      }
    );
  });
}
