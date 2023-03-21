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