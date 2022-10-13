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
          isMyProfile
          bio
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
      }
  }
`;



export default function Profile() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: { userId: id },
  });

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading</div>;

  const {
    profile: { bio, user, isMyProfile },
  } = data;

  return (
    <div>
      <div
        style={{
            display: "flex ",
            marginBottom: "2rem",
            justifyContent: "space-between",
        }}
      >
        <div>
          <h1>{user.name}</h1>
          <p>{bio}</p>
        </div>
        <div>{isMyProfile ? <AddPostModal /> : null}</div>
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
            isMyProfile={isMyProfile}
            id={post.id}
          />
        ))}
      </div>
    </div>
  );
}
