import { faker } from "@faker-js/faker";

function generateProducts(count = 10) {
  const products = [];

  for (let x = 0; x < count; x++) {
    const product = {
      id: faker.database.mongodbObjectId(),
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      image: "https://placehold.co/600x400",
      // discount
    };

    products.push(product);
  }

  return products;
}

export default generateProducts;
