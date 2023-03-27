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
      outfits {
        items {
          id
          articleId
          outfitId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
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
        outfits {
          nextToken
        }
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
        outfits {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOutfit = /* GraphQL */ `
  query GetOutfit($id: ID!) {
    getOutfit(id: $id) {
      createdAt
      owner
      season
      articles {
        items {
          id
          articleId
          outfitId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      id
      updatedAt
    }
  }
`;
export const listOutfits = /* GraphQL */ `
  query ListOutfits(
    $filter: ModelOutfitFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOutfits(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        owner
        season
        articles {
          nextToken
        }
        id
        updatedAt
      }
      nextToken
    }
  }
`;
export const outfitsByOwnerAndCreatedAt = /* GraphQL */ `
  query OutfitsByOwnerAndCreatedAt(
    $owner: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOutfitFilterInput
    $limit: Int
    $nextToken: String
  ) {
    outfitsByOwnerAndCreatedAt(
      owner: $owner
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        createdAt
        owner
        season
        articles {
          nextToken
        }
        id
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
      outfits {
        items {
          id
          articleTestId
          outfitTestId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
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
        outfits {
          nextToken
        }
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
        outfits {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOutfitTest = /* GraphQL */ `
  query GetOutfitTest($id: ID!) {
    getOutfitTest(id: $id) {
      createdAt
      owner
      season
      articles {
        items {
          id
          articleTestId
          outfitTestId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      id
      updatedAt
    }
  }
`;
export const listOutfitTests = /* GraphQL */ `
  query ListOutfitTests(
    $filter: ModelOutfitTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOutfitTests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        owner
        season
        articles {
          nextToken
        }
        id
        updatedAt
      }
      nextToken
    }
  }
`;
export const outfitTestsByOwnerAndCreatedAt = /* GraphQL */ `
  query OutfitTestsByOwnerAndCreatedAt(
    $owner: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOutfitTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    outfitTestsByOwnerAndCreatedAt(
      owner: $owner
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        createdAt
        owner
        season
        articles {
          nextToken
        }
        id
        updatedAt
      }
      nextToken
    }
  }
`;
export const getOutfitArticleJoin = /* GraphQL */ `
  query GetOutfitArticleJoin($id: ID!) {
    getOutfitArticleJoin(id: $id) {
      id
      articleId
      outfitId
      article {
        id
        image
        seasons
        usage
        createdAt
        owner
        outfits {
          nextToken
        }
        updatedAt
      }
      outfit {
        createdAt
        owner
        season
        articles {
          nextToken
        }
        id
        updatedAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listOutfitArticleJoins = /* GraphQL */ `
  query ListOutfitArticleJoins(
    $filter: ModelOutfitArticleJoinFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOutfitArticleJoins(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        articleId
        outfitId
        article {
          id
          image
          seasons
          usage
          createdAt
          owner
          updatedAt
        }
        outfit {
          createdAt
          owner
          season
          id
          updatedAt
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const outfitArticleJoinsByArticleId = /* GraphQL */ `
  query OutfitArticleJoinsByArticleId(
    $articleId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOutfitArticleJoinFilterInput
    $limit: Int
    $nextToken: String
  ) {
    outfitArticleJoinsByArticleId(
      articleId: $articleId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        articleId
        outfitId
        article {
          id
          image
          seasons
          usage
          createdAt
          owner
          updatedAt
        }
        outfit {
          createdAt
          owner
          season
          id
          updatedAt
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const outfitArticleJoinsByOutfitId = /* GraphQL */ `
  query OutfitArticleJoinsByOutfitId(
    $outfitId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOutfitArticleJoinFilterInput
    $limit: Int
    $nextToken: String
  ) {
    outfitArticleJoinsByOutfitId(
      outfitId: $outfitId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        articleId
        outfitId
        article {
          id
          image
          seasons
          usage
          createdAt
          owner
          updatedAt
        }
        outfit {
          createdAt
          owner
          season
          id
          updatedAt
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getOutfitTestArticleTest = /* GraphQL */ `
  query GetOutfitTestArticleTest($id: ID!) {
    getOutfitTestArticleTest(id: $id) {
      id
      articleTestId
      outfitTestId
      articleTest {
        id
        image
        seasons
        usage
        createdAt
        owner
        outfits {
          nextToken
        }
        updatedAt
      }
      outfitTest {
        createdAt
        owner
        season
        articles {
          nextToken
        }
        id
        updatedAt
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listOutfitTestArticleTests = /* GraphQL */ `
  query ListOutfitTestArticleTests(
    $filter: ModelOutfitTestArticleTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOutfitTestArticleTests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        articleTestId
        outfitTestId
        articleTest {
          id
          image
          seasons
          usage
          createdAt
          owner
          updatedAt
        }
        outfitTest {
          createdAt
          owner
          season
          id
          updatedAt
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const outfitTestArticleTestsByArticleTestId = /* GraphQL */ `
  query OutfitTestArticleTestsByArticleTestId(
    $articleTestId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOutfitTestArticleTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    outfitTestArticleTestsByArticleTestId(
      articleTestId: $articleTestId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        articleTestId
        outfitTestId
        articleTest {
          id
          image
          seasons
          usage
          createdAt
          owner
          updatedAt
        }
        outfitTest {
          createdAt
          owner
          season
          id
          updatedAt
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const outfitTestArticleTestsByOutfitTestId = /* GraphQL */ `
  query OutfitTestArticleTestsByOutfitTestId(
    $outfitTestId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOutfitTestArticleTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    outfitTestArticleTestsByOutfitTestId(
      outfitTestId: $outfitTestId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        articleTestId
        outfitTestId
        articleTest {
          id
          image
          seasons
          usage
          createdAt
          owner
          updatedAt
        }
        outfitTest {
          createdAt
          owner
          season
          id
          updatedAt
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
