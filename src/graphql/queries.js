/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getArticle = /* GraphQL */ `
  query GetArticle($id: ID!) {
    getArticle(id: $id) {
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
export const listArticles = /* GraphQL */ `
  query ListArticles(
    $filter: ModelArticleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listArticles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        image
        seasons
        usage
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getArticleTest = /* GraphQL */ `
  query GetArticleTest($id: ID!) {
    getArticleTest(id: $id) {
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
export const listArticleTests = /* GraphQL */ `
  query ListArticleTests(
    $filter: ModelArticleTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listArticleTests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        image
        seasons
        usage
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
