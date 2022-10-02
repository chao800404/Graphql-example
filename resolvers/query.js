import selectById from '../utils.js'

const Query =   {
  products: (parent , {filter} , {reviews,products})=> {
    if(filter){
      const {onSale , avgRating} = filter
      let filterProducts = [...products]
      if(typeof onSale === "boolean" ){
        filterProducts = products.filter((product)=> product.onSale === onSale)
      }

      if([0,1,2,3,4,5].includes(avgRating)){
        const reviewsRatingToMap = reviews.reduce((acc,cur)=> {
          if(acc[cur.productId] === undefined){
            acc[cur.productId] = {
              sumRating: 0 + cur.rating,
              quantity:1
            }          
          }else {
            acc[cur.productId].sumRating = acc[cur.productId].sumRating + cur.rating
            acc[cur.productId].quantity =  acc[cur.productId].quantity + 1
          }
          return acc
        },{})
        filterProducts = filterProducts.filter(({id})=>reviewsRatingToMap[id].sumRating / reviewsRatingToMap[id].quantity >= avgRating  )
      }
      return filterProducts
    }
   
    return products
  },
  product:(parent , args , {products})=> selectById(args,products), 
  categories:(parent , args , {categories})=> categories,
  category:(parent , args , {categories})=> selectById(args,categories), 
}

export default Query