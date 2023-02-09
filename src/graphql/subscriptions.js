/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote(
    $filter: ModelSubscriptionNoteFilterInput
    $owner: String
  ) {
    onCreateNote(filter: $filter, owner: $owner) {
      id
      name
      description
      image
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote(
    $filter: ModelSubscriptionNoteFilterInput
    $owner: String
  ) {
    onUpdateNote(filter: $filter, owner: $owner) {
      id
      name
      description
      image
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote(
    $filter: ModelSubscriptionNoteFilterInput
    $owner: String
  ) {
    onDeleteNote(filter: $filter, owner: $owner) {
      id
      name
      description
      image
      createdAt
      updatedAt
      owner
    }
  }
`;
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
