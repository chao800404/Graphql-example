import React from "react";
import "./Post.css";
import { useMutation , gql } from "@apollo/client";


const MUATION_PUBLIC = gql`
  mutation Mutation($postId: ID!, $published: Boolean!) {
    postPublish(postId: $postId, published: $published) {
      userErrors {
        message
      }
      post {
        published
        id
        title
        content
      }
    }
  }
`

export default function Post({
  title,
  content,
  date,
  user,
  published,
  id,
  isMyProfile,
}) {
  const formattedDate = new Date(Number(date));
  const [ mutationFunction , {data , loading ,error} ] = useMutation(MUATION_PUBLIC)
  const startRef = React.useRef(false)
  const [toggle , setToggle] = React.useState(published)

  React.useEffect(()=> {
    if(startRef.current === true){
      const mutation = async()=> {
        return await mutationFunction({variables:{postId:id , published:toggle}})
      }
      mutation().then(()=> startRef.current = false)
    }
  },[startRef , toggle])



  return (
    <div
      className="Post"
      style={ toggle === false ? { backgroundColor: "hotpink" } : {}}
    >
      {(
        <p className="Post__publish" onClick={() => {
          setToggle(!toggle)
          startRef.current = true

        }}>
          {isMyProfile && toggle === false  ? "unpublished":"publish"}
        </p>
      )}
      <div className="Post__header-container">
        <h2>{title}</h2>
        <h4>
          Created At {`${formattedDate}`.split(" ").splice(0, 3).join(" ")}
          {user}
        </h4>
      </div>
      <p>{content}</p>
    </div>
  );
}
