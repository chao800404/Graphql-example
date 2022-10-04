export default function selectById(args , datas){
  const {id} = args
  return datas.find((data)=> data.id === id) 
}


