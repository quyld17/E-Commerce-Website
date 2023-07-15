import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import NavigationBar from "../../components/navigation-bar";
import styles from "../../styles/product-detail.module.css";
import { handleGetProductDetailsAPI } from "../../api/handlers/products";
import { handleAddToCartAPI } from "../../api/handlers/cart";

import { Layout, Image, InputNumber, Button, message } from "antd";
const { Content } = Layout;

export default function ProductPage() {
  const [productDetail, setProductDetail] = useState(null);
  const [imageURLs, setImageURLs] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const productID = router.query.product_detail;

  useEffect(() => {
    if (productID) {
      handleGetProductDetailsAPI(productID)
        .then((data) => {
          setProductDetail(data);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  }, [productID]);

  useEffect(() => {
    if (
      productDetail &&
      productDetail.product_images &&
      productDetail.product_images.length > 0
    ) {
      const thumbnail = productDetail.product_images.find(
        (image) => image.is_thumbnail === 1
      );
      const otherImages = productDetail.product_images
        .filter((image) => image.is_thumbnail === 0)
        .map((image) => image.image_url);

      if (thumbnail) {
        setImageURLs([thumbnail.image_url, ...otherImages]);
      } else {
        setImageURLs(otherImages);
      }
    }
  }, [productDetail]);

  const handleQuantitySelection = (value) => {
    setQuantity(value);
  };

  const handleAddToCartClick = (id) => {
    handleAddToCartAPI(id, quantity)
      .then((data) => {
        if (data.error) {
          message.error("Add product to cart unsuccessfully! Please try again");
        } else {
          message.success("Add product to cart successfully!");
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  return (
    <Layout className={styles.layout}>
      <Head>
        {productDetail && (
          <title>{productDetail.product_detail.product_name}</title>
        )}
      </Head>
      <NavigationBar />
      <Content className={styles.mainPage}>
        <div className={styles.productField}>
          <div className={styles.productImages}>
            <div className={styles.thumbnail}>
              {imageURLs.length > 0 && (
                <Image width={400} alt="Thumbnail" src={imageURLs[0]} />
              )}
            </div>

            <div className={styles.imageList}>
              <Image.PreviewGroup
                preview={{
                  onChange: (current, prev) =>
                    console.log(
                      `current index: ${current}, prev index: ${prev}`
                    ),
                }}
              >
                {imageURLs.map((item, index) => (
                  <Image
                    key={index}
                    width={100}
                    alt={`Image ${index}`}
                    src={item}
                  />
                ))}
              </Image.PreviewGroup>
            </div>
          </div>
          <div className={styles.productInfos}>
            {productDetail && (
              <>
                <p className={styles.productName}>
                  {productDetail.product_detail.product_name}
                </p>

                <div className={styles.productPrice}>
                  <p className={styles.priceTitle}>Price:</p>

                  <p className={styles.priceNumber}>
                    {" "}
                    {Intl.NumberFormat("vi-VI", {
                      style: "currency",
                      currency: "VND",
                    }).format(productDetail.product_detail.price)}
                  </p>
                </div>

                <div className={styles.quantitySelection}>
                  <p className={styles.quantityTitle}>Quantity: </p>
                  <div className={styles.quantityInput}>
                    <InputNumber
                      min={1}
                      max={productDetail.product_detail.in_stock_quantity}
                      defaultValue={quantity}
                      value={quantity}
                      onChange={handleQuantitySelection}
                    />
                  </div>
                  <span className={styles.quantityAvailable}>
                    {" "}
                    {productDetail.product_detail.in_stock_quantity} pieces
                    available
                  </span>
                </div>

                <Button
                  type="primary"
                  size={"large"}
                  onClick={() =>
                    handleAddToCartClick(
                      productDetail.product_detail.product_id
                    )
                  }
                >
                  Add to cart
                </Button>
              </>
            )}
          </div>
        </div>
      </Content>
    </Layout>
  );
}
