
const Category = {
  products:(parent,{filter},{db})=> {
    const {id} = parent
    const categoryProducts = db.products.filter(product => product.categoryId === id)
    if(filter && typeof filter.onSale === "boolean"){
      return categoryProducts.filter(product => product.onSale === filter.onSale)
    }
    return categoryProducts 
  }
}

export default Category