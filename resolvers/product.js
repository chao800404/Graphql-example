
const Product= {
  category:(parent , args , {categories})=>{
    const {categoryId} = parent
    return categories.find(category => category.id === categoryId)
  },
  review:(parent , {filter} , {reviews})=> {
    const {id} = parent
    const productReviews = reviews.filter(review => review.productId === id)
    if(filter && filter.rating){
      return productReviews.filter(({rating})=> rating >= filter.rating)
    }
    return productReviews
  }
}

export default Product