import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      id
      title
      description
      color
      icon
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($deleteCategoryId: String!) {
    deleteCategory(id: $deleteCategoryId)
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $updateCategoryId: String!
    $data: UpdateCategoryInput!
  ) {
    updateCategory(id: $updateCategoryId, data: $data) {
      id
      title
      description
      color
      icon
      updatedAt
      user {
        id
        name
      }
    }
  }
`;
