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
      owner
      updatedAt
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
      owner
      updatedAt
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
      owner
      updatedAt
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
export const createOutfitTest = /* GraphQL */ `
  mutation CreateOutfitTest(
    $input: CreateOutfitTestInput!
    $condition: ModelOutfitTestConditionInput
  ) {
    createOutfitTest(input: $input, condition: $condition) {
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
export const updateOutfitTest = /* GraphQL */ `
  mutation UpdateOutfitTest(
    $input: UpdateOutfitTestInput!
    $condition: ModelOutfitTestConditionInput
  ) {
    updateOutfitTest(input: $input, condition: $condition) {
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
export const deleteOutfitTest = /* GraphQL */ `
  mutation DeleteOutfitTest(
    $input: DeleteOutfitTestInput!
    $condition: ModelOutfitTestConditionInput
  ) {
    deleteOutfitTest(input: $input, condition: $condition) {
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
export const createOutfitTestArticleTest = /* GraphQL */ `
  mutation CreateOutfitTestArticleTest(
    $input: CreateOutfitTestArticleTestInput!
    $condition: ModelOutfitTestArticleTestConditionInput
  ) {
    createOutfitTestArticleTest(input: $input, condition: $condition) {
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
export const updateOutfitTestArticleTest = /* GraphQL */ `
  mutation UpdateOutfitTestArticleTest(
    $input: UpdateOutfitTestArticleTestInput!
    $condition: ModelOutfitTestArticleTestConditionInput
  ) {
    updateOutfitTestArticleTest(input: $input, condition: $condition) {
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
export const deleteOutfitTestArticleTest = /* GraphQL */ `
  mutation DeleteOutfitTestArticleTest(
    $input: DeleteOutfitTestArticleTestInput!
    $condition: ModelOutfitTestArticleTestConditionInput
  ) {
    deleteOutfitTestArticleTest(input: $input, condition: $condition) {
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
