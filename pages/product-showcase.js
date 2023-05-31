import Link from "next/link";

export default function ProductShowcase() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      <Link
        href="./product-page"
        style={{ width: "150px", height: "150px", margin: "25px" }}
      >
        This is a product!
      </Link>
    </div>
  );
}
