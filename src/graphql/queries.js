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
      owner
      updatedAt
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
        owner
        updatedAt
      }
      nextToken
    }
  }
`;
export const articlesByOwnerAndCreatedAt = /* GraphQL */ `
  query ArticlesByOwnerAndCreatedAt(
    $owner: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelArticleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    articlesByOwnerAndCreatedAt(
      owner: $owner
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        image
        seasons
        usage
        createdAt
        owner
        updatedAt
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
      createdAt
      owner
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
        createdAt
        owner
        updatedAt
      }
      nextToken
    }
  }
`;
export const articleTestsByOwnerAndCreatedAt = /* GraphQL */ `
  query ArticleTestsByOwnerAndCreatedAt(
    $owner: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelArticleTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    articleTestsByOwnerAndCreatedAt(
      owner: $owner
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        image
        seasons
        usage
        createdAt
        owner
        updatedAt
      }
      nextToken
    }
  }
`;
