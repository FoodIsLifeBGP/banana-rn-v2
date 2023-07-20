export const categoryImage = (donationCategory: string) => {
  switch (donationCategory) {
  case "Produce":
    return require("@assets/images/stock-image-produce.png");
  case "Bread":
    return require("@assets/images/stock-image-bread.png");
  case "Hot Meal":
    return require("@assets/images/stock-image-meals.png");
  case "Protein":
    return require("@assets/images/stock-image-protein.png");
  case "Dairy":
    return require("@assets/images/stock-image-dairy.png");
  default:
    return require("@assets/images/stock-image-others.png");
  }
};
