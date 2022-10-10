/** @format */

import React from "react";
import { useParams } from "react-router";
import AddPostModal from "../../components/AddPostModal/AddPostModal";
import Post from "../../components/Post/Post";
import { useQuery, gql } from "@apollo/client";

const GET_PROFILE = gql`
  query Profile($userId: ID!) {
    profile(userId: $userId) {
      id
      user {
        posts {
          title
          id
          content
          createdAt
          published
        }
        email
        name
        id
      }
      bio
    }
  }
`;

export default function Profile() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: { userId: id },
  });

  if (loading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;

  const {
    profile: { bio, user },
  } = data;

  console.log(data);

  return (
    <div>
      <div
        style={{
          marginBottom: "2rem",
          display: "flex ",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1>{user.name}</h1>
          <p>{bio}</p>
        </div>
        <div>{"profile" ? <AddPostModal /> : null}</div>
      </div>
      <div>
        {user.posts?.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            content={post.content}
            date="1111"
            user={user.name}
            published={post.published}
            id={post.id}
            isMyProfile={"fewifwe"}
          />
        ))}
      </div>
    </div>
  );
}
