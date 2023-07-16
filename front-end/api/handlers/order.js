import postMethodAPI from "../methods/post-method-api";

export function handleCreateOrder(paymentMethod) {
  return new Promise((resolve, reject) => {
    const info = {
      payment_method: paymentMethod,
    };

    const endpoint = "/order";

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
