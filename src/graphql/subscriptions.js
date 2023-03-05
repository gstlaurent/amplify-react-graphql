/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateArticle = /* GraphQL */ `
  subscription OnCreateArticle(
    $filter: ModelSubscriptionArticleFilterInput
    $owner: String
  ) {
    onCreateArticle(filter: $filter, owner: $owner) {
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
export const onUpdateArticle = /* GraphQL */ `
  subscription OnUpdateArticle(
    $filter: ModelSubscriptionArticleFilterInput
    $owner: String
  ) {
    onUpdateArticle(filter: $filter, owner: $owner) {
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
export const onDeleteArticle = /* GraphQL */ `
  subscription OnDeleteArticle(
    $filter: ModelSubscriptionArticleFilterInput
    $owner: String
  ) {
    onDeleteArticle(filter: $filter, owner: $owner) {
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
export const onCreateArticleTest = /* GraphQL */ `
  subscription OnCreateArticleTest(
    $filter: ModelSubscriptionArticleTestFilterInput
    $owner: String
  ) {
    onCreateArticleTest(filter: $filter, owner: $owner) {
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
export const onUpdateArticleTest = /* GraphQL */ `
  subscription OnUpdateArticleTest(
    $filter: ModelSubscriptionArticleTestFilterInput
    $owner: String
  ) {
    onUpdateArticleTest(filter: $filter, owner: $owner) {
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
export const onDeleteArticleTest = /* GraphQL */ `
  subscription OnDeleteArticleTest(
    $filter: ModelSubscriptionArticleTestFilterInput
    $owner: String
  ) {
    onDeleteArticleTest(filter: $filter, owner: $owner) {
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
