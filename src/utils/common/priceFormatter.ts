const priceFormatter = (price: number) => {
  return new Intl.NumberFormat("id-ID").format(price);
};

export default priceFormatter;
