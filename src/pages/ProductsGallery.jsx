import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

function ProductsGallery() {
  return (
    <Container className="pt-5">
      {/* Row -> no. of included columns */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col key={idx}>
            {/* Col -> how much from the grid (12col) */}
            <ProductCard
              product={{
                title: "nproduct",
                price: 50,
                description: "sdom ewkghr jkg",
              }}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductsGallery;
