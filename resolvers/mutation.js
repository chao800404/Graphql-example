import { v4 as uuid } from 'uuid'


const Mutation = {
  addCategory:(parent , {input} , {categories})=> {
    if(input){
      const {name} = input
      const newCategory = {
        id:uuid(),
        name
      }
      categories.push(newCategory)
      return newCategory
    }
  }
}

export default Mutation