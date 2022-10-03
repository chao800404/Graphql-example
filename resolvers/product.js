
const Product= {
  category:(parent , args , {db})=>{
    const {categoryId} = parent
    return db.categories.find(category => category.id === categoryId)
  },
  review:(parent , {filter} , {db})=> {
    const {id} = parent
    const productReviews = db.reviews.filter(review => review.productId === id)
    if(filter && filter.rating){
      return productReviews.filter(({rating})=> rating >= filter.rating)
    }
    return productReviews
  }
}

export default Product