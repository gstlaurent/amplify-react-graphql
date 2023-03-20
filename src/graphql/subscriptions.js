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
      owner
      updatedAt
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
      owner
      updatedAt
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
      owner
      updatedAt
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
export const onCreateOutfitTest = /* GraphQL */ `
  subscription OnCreateOutfitTest(
    $filter: ModelSubscriptionOutfitTestFilterInput
    $owner: String
  ) {
    onCreateOutfitTest(filter: $filter, owner: $owner) {
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
export const onUpdateOutfitTest = /* GraphQL */ `
  subscription OnUpdateOutfitTest(
    $filter: ModelSubscriptionOutfitTestFilterInput
    $owner: String
  ) {
    onUpdateOutfitTest(filter: $filter, owner: $owner) {
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
export const onDeleteOutfitTest = /* GraphQL */ `
  subscription OnDeleteOutfitTest(
    $filter: ModelSubscriptionOutfitTestFilterInput
    $owner: String
  ) {
    onDeleteOutfitTest(filter: $filter, owner: $owner) {
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
export const onCreateOutfitTestArticleTest = /* GraphQL */ `
  subscription OnCreateOutfitTestArticleTest(
    $filter: ModelSubscriptionOutfitTestArticleTestFilterInput
    $owner: String
  ) {
    onCreateOutfitTestArticleTest(filter: $filter, owner: $owner) {
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
export const onUpdateOutfitTestArticleTest = /* GraphQL */ `
  subscription OnUpdateOutfitTestArticleTest(
    $filter: ModelSubscriptionOutfitTestArticleTestFilterInput
    $owner: String
  ) {
    onUpdateOutfitTestArticleTest(filter: $filter, owner: $owner) {
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
export const onDeleteOutfitTestArticleTest = /* GraphQL */ `
  subscription OnDeleteOutfitTestArticleTest(
    $filter: ModelSubscriptionOutfitTestArticleTestFilterInput
    $owner: String
  ) {
    onDeleteOutfitTestArticleTest(filter: $filter, owner: $owner) {
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
