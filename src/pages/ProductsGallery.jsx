import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import generateProducts from "../utils/generate-products";

const productsList = generateProducts(30);
function ProductsGallery() {
  return (
    <Container className="pt-5">
      {/* Row -> no. of included columns */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {productsList.map((item, idx) => (
          <Col key={idx}>
            {/* Col -> how much from the grid (12col) */}
            <ProductCard product={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductsGallery;
