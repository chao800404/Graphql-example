/** @format */

import React from "react";
import { useQuery, gql } from "@apollo/client";
import Post from "../../components/Post/Post";

const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
      published
      user {
        name
        id
        email
      }
    }
  }
`;

export default function Posts() {
  const { loading, error, data } = useQuery(GET_POSTS);

  console.log(loading, error, data);

  if (loading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;

  const { posts } = data;

  return (
    <div>
      {posts?.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          content={post.content}
          date="1111"
          user={post.user.name}
          published={post.published}
          id={post.id}
          isMyProfile={"fewifwe"}
        />
      ))}
    </div>
  );
}
