import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import NavigationBar from "../navigation-bar";
import styles from "../../styles/product-detail.module.css";
import handleProductDetailAPI from "../api-handlers/product-detail";
import { Layout, Image, Form, InputNumber, Button } from "antd";
const { Content } = Layout;

export default function ProductPage() {
  const [productDetail, setProductDetail] = useState(null);
  const [imageURLs, setImageURLs] = useState([]);
  const router = useRouter();
  const productID = router.query.product_id;

  useEffect(() => {
    if (productID) {
      handleProductDetailAPI(productID)
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

  return (
    <Layout className={styles.layout}>
      <Head>
        <title>Product Page</title>
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

                <p className={styles.productPrice}>
                  <p className={styles.priceTitle}>Price:</p>

                  <p className={styles.priceNumber}>
                    {" "}
                    {Intl.NumberFormat("vi-VI", {
                      style: "currency",
                      currency: "VND",
                    }).format(productDetail.product_detail.price)}
                  </p>
                </p>

                <div className={styles.quantitySelection}>
                  <p className={styles.quantityTitle}>Quantity: </p>
                  <div className={styles.quantityInput}>
                    <Form.Item name="input-number" noStyle>
                      <InputNumber
                        min={1}
                        max={productDetail.product_detail.in_stock_quantity}
                      />
                    </Form.Item>
                  </div>
                  <span className={styles.quantityAvailable}>
                    {" "}
                    {productDetail.product_detail.in_stock_quantity} pieces
                    available
                  </span>
                </div>

                <Button type="primary" size={"large"}>
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
