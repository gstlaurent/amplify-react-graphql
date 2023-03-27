export const outfitsWithArticlesByOwnerAndCreatedAt = /* GraphQL */ `
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
          items {
            id
            article {
              id
              image
              seasons
              usage
              createdAt
              owner
              updatedAt
            }
          }
          nextToken
        }
        id
        updatedAt
      }
      nextToken
    }
  }
`;


export const outfitTestsWithArticleTestsByOwnerAndCreatedAt = /* GraphQL */ `
  query OutfitTestsWithArticleTestsByOwnerAndCreatedAt(
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
          items {
            id
            articleTest {
              id
              image
              seasons
              usage
              createdAt
              owner
              updatedAt
            }
          }
          nextToken
        }
        id
        updatedAt
      }
      nextToken
    }
  }
`;
