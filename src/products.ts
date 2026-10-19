type Product = {
  id: string;
  name: string;
  price: number;
  tags?: string[];
};

function getProductsByTag(products: Product[], tag: string): Product[] {
  return products.filter(product => product.tags?.includes(tag));
}


const hasField = (obj: unknown, field: string): boolean => {
  return typeof obj === "object" && obj !== null && field in obj;
};


type ResponseWithData = {
  json: () => { user: { name: string } };
};

async function getUserName(response: unknown): Promise<string> {

  if (hasField(response, "json")) {
    const responseWithData: ResponseWithData = response as ResponseWithData;
    const data = responseWithData.json();
    return data.user.name.toUpperCase();
  }
}