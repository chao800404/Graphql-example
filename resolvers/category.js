
const Category = {
  products:(parent,{filter},{products})=> {
    const {id} = parent
    const categoryProducts = products.filter(product => product.categoryId === id)
    if(filter && typeof filter.onSale === "boolean"){
      return categoryProducts.filter(product => product.onSale === filter.onSale)
    }
    return categoryProducts 
  }
}

export default Category