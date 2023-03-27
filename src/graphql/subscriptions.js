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
export const onCreateOutfit = /* GraphQL */ `
  subscription OnCreateOutfit(
    $filter: ModelSubscriptionOutfitFilterInput
    $owner: String
  ) {
    onCreateOutfit(filter: $filter, owner: $owner) {
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
export const onUpdateOutfit = /* GraphQL */ `
  subscription OnUpdateOutfit(
    $filter: ModelSubscriptionOutfitFilterInput
    $owner: String
  ) {
    onUpdateOutfit(filter: $filter, owner: $owner) {
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
export const onDeleteOutfit = /* GraphQL */ `
  subscription OnDeleteOutfit(
    $filter: ModelSubscriptionOutfitFilterInput
    $owner: String
  ) {
    onDeleteOutfit(filter: $filter, owner: $owner) {
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
export const onCreateOutfitArticleJoin = /* GraphQL */ `
  subscription OnCreateOutfitArticleJoin(
    $filter: ModelSubscriptionOutfitArticleJoinFilterInput
    $owner: String
  ) {
    onCreateOutfitArticleJoin(filter: $filter, owner: $owner) {
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
export const onUpdateOutfitArticleJoin = /* GraphQL */ `
  subscription OnUpdateOutfitArticleJoin(
    $filter: ModelSubscriptionOutfitArticleJoinFilterInput
    $owner: String
  ) {
    onUpdateOutfitArticleJoin(filter: $filter, owner: $owner) {
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
export const onDeleteOutfitArticleJoin = /* GraphQL */ `
  subscription OnDeleteOutfitArticleJoin(
    $filter: ModelSubscriptionOutfitArticleJoinFilterInput
    $owner: String
  ) {
    onDeleteOutfitArticleJoin(filter: $filter, owner: $owner) {
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
