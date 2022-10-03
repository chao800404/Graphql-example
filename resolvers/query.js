import selectById from '../utils.js'

const Query =   {
  products: (parent , {filter} , {db})=> {
    if(filter){
      const {onSale , avgRating} = filter
      let filterProducts = [...db.products]
      if(typeof onSale === "boolean" ){
        filterProducts = db.products.filter((product)=> product.onSale === onSale)
      }

      if([0,1,2,3,4,5].includes(avgRating)){
        const reviewsRatingToMap = db.reviews.reduce((acc,cur)=> {
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
   
    return db.products
  },
  product:(parent , args , {db})=> selectById(args,db.products), 
  categories:(parent , args , {db})=> db.categories,
  category:(parent , args , {db})=> selectById(args,db.categories), 
}

export default Query