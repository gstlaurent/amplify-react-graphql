/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createArticle = /* GraphQL */ `
  mutation CreateArticle(
    $input: CreateArticleInput!
    $condition: ModelArticleConditionInput
  ) {
    createArticle(input: $input, condition: $condition) {
      id
      image
      seasons
      usage
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateArticle = /* GraphQL */ `
  mutation UpdateArticle(
    $input: UpdateArticleInput!
    $condition: ModelArticleConditionInput
  ) {
    updateArticle(input: $input, condition: $condition) {
      id
      image
      seasons
      usage
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteArticle = /* GraphQL */ `
  mutation DeleteArticle(
    $input: DeleteArticleInput!
    $condition: ModelArticleConditionInput
  ) {
    deleteArticle(input: $input, condition: $condition) {
      id
      image
      seasons
      usage
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createArticleTest = /* GraphQL */ `
  mutation CreateArticleTest(
    $input: CreateArticleTestInput!
    $condition: ModelArticleTestConditionInput
  ) {
    createArticleTest(input: $input, condition: $condition) {
      id
      image
      seasons
      usage
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateArticleTest = /* GraphQL */ `
  mutation UpdateArticleTest(
    $input: UpdateArticleTestInput!
    $condition: ModelArticleTestConditionInput
  ) {
    updateArticleTest(input: $input, condition: $condition) {
      id
      image
      seasons
      usage
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteArticleTest = /* GraphQL */ `
  mutation DeleteArticleTest(
    $input: DeleteArticleTestInput!
    $condition: ModelArticleTestConditionInput
  ) {
    deleteArticleTest(input: $input, condition: $condition) {
      id
      image
      seasons
      usage
      owner
      createdAt
      updatedAt
    }
  }
`;
