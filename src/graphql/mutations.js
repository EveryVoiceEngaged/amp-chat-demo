/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createIssueGuide = /* GraphQL */ `
  mutation CreateIssueGuide(
    $input: CreateIssueGuideInput!
    $condition: ModelIssueGuideConditionInput
  ) {
    createIssueGuide(input: $input, condition: $condition) {
      issue {
        title
        description
        presentationUrl
        documentUrl
        exitUrl
        __typename
      }
      options {
        title
        description
        presentationUrl
        __typename
      }
      author
      version
      status
      updatedAt
      id
      createdAt
      __typename
    }
  }
`;
export const updateIssueGuide = /* GraphQL */ `
  mutation UpdateIssueGuide(
    $input: UpdateIssueGuideInput!
    $condition: ModelIssueGuideConditionInput
  ) {
    updateIssueGuide(input: $input, condition: $condition) {
      issue {
        title
        description
        presentationUrl
        documentUrl
        exitUrl
        __typename
      }
      options {
        title
        description
        presentationUrl
        __typename
      }
      author
      version
      status
      updatedAt
      id
      createdAt
      __typename
    }
  }
`;
export const deleteIssueGuide = /* GraphQL */ `
  mutation DeleteIssueGuide(
    $input: DeleteIssueGuideInput!
    $condition: ModelIssueGuideConditionInput
  ) {
    deleteIssueGuide(input: $input, condition: $condition) {
      issue {
        title
        description
        presentationUrl
        documentUrl
        exitUrl
        __typename
      }
      options {
        title
        description
        presentationUrl
        __typename
      }
      author
      version
      status
      updatedAt
      id
      createdAt
      __typename
    }
  }
`;
export const createScheduledForum = /* GraphQL */ `
  mutation CreateScheduledForum(
    $input: CreateScheduledForumInput!
    $condition: ModelScheduledForumConditionInput
  ) {
    createScheduledForum(input: $input, condition: $condition) {
      forumId
      joinId
      issueGuide {
        author
        version
        status
        updatedAt
        id
        createdAt
        __typename
      }
      title
      startDate
      moderator
      requireAuthentication
      guestList
      blacklist
      eventCategory
      lobbyOpenTime
      informedConsent
      demographicQuestions
      forumReport
      exitUrl
      exitUrlParameters {
        name
        value
        __typename
      }
      messageToParticipants
      chat {
        email
        message
        timestamp
        id
        createdAt
        updatedAt
        __typename
      }
      participants {
        name
        email
        role
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateScheduledForum = /* GraphQL */ `
  mutation UpdateScheduledForum(
    $input: UpdateScheduledForumInput!
    $condition: ModelScheduledForumConditionInput
  ) {
    updateScheduledForum(input: $input, condition: $condition) {
      forumId
      joinId
      issueGuide {
        author
        version
        status
        updatedAt
        id
        createdAt
        __typename
      }
      title
      startDate
      moderator
      requireAuthentication
      guestList
      blacklist
      eventCategory
      lobbyOpenTime
      informedConsent
      demographicQuestions
      forumReport
      exitUrl
      exitUrlParameters {
        name
        value
        __typename
      }
      messageToParticipants
      chat {
        email
        message
        timestamp
        id
        createdAt
        updatedAt
        __typename
      }
      participants {
        name
        email
        role
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteScheduledForum = /* GraphQL */ `
  mutation DeleteScheduledForum(
    $input: DeleteScheduledForumInput!
    $condition: ModelScheduledForumConditionInput
  ) {
    deleteScheduledForum(input: $input, condition: $condition) {
      forumId
      joinId
      issueGuide {
        author
        version
        status
        updatedAt
        id
        createdAt
        __typename
      }
      title
      startDate
      moderator
      requireAuthentication
      guestList
      blacklist
      eventCategory
      lobbyOpenTime
      informedConsent
      demographicQuestions
      forumReport
      exitUrl
      exitUrlParameters {
        name
        value
        __typename
      }
      messageToParticipants
      chat {
        email
        message
        timestamp
        id
        createdAt
        updatedAt
        __typename
      }
      participants {
        name
        email
        role
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createGala = /* GraphQL */ `
  mutation CreateGala(
    $input: CreateGalaInput!
    $condition: ModelGalaConditionInput
  ) {
    createGala(input: $input, condition: $condition) {
      forumId
      joinId
      issueGuide {
        author
        version
        status
        updatedAt
        id
        createdAt
        __typename
      }
      title
      startDate
      endDate
      moderators
      requireAuthentication
      guestList
      blacklist
      eventCategory
      numberOfParticipants
      repeatedParticipation
      totalParticipants
      informedConsent
      demographicQuestions
      forumReport
      futureForumsUrl
      exitUrl
      exitUrlParameters {
        name
        value
        __typename
      }
      messageToParticipants
      chat {
        email
        message
        timestamp
        id
        createdAt
        updatedAt
        __typename
      }
      participants {
        name
        email
        role
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateGala = /* GraphQL */ `
  mutation UpdateGala(
    $input: UpdateGalaInput!
    $condition: ModelGalaConditionInput
  ) {
    updateGala(input: $input, condition: $condition) {
      forumId
      joinId
      issueGuide {
        author
        version
        status
        updatedAt
        id
        createdAt
        __typename
      }
      title
      startDate
      endDate
      moderators
      requireAuthentication
      guestList
      blacklist
      eventCategory
      numberOfParticipants
      repeatedParticipation
      totalParticipants
      informedConsent
      demographicQuestions
      forumReport
      futureForumsUrl
      exitUrl
      exitUrlParameters {
        name
        value
        __typename
      }
      messageToParticipants
      chat {
        email
        message
        timestamp
        id
        createdAt
        updatedAt
        __typename
      }
      participants {
        name
        email
        role
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteGala = /* GraphQL */ `
  mutation DeleteGala(
    $input: DeleteGalaInput!
    $condition: ModelGalaConditionInput
  ) {
    deleteGala(input: $input, condition: $condition) {
      forumId
      joinId
      issueGuide {
        author
        version
        status
        updatedAt
        id
        createdAt
        __typename
      }
      title
      startDate
      endDate
      moderators
      requireAuthentication
      guestList
      blacklist
      eventCategory
      numberOfParticipants
      repeatedParticipation
      totalParticipants
      informedConsent
      demographicQuestions
      forumReport
      futureForumsUrl
      exitUrl
      exitUrlParameters {
        name
        value
        __typename
      }
      messageToParticipants
      chat {
        email
        message
        timestamp
        id
        createdAt
        updatedAt
        __typename
      }
      participants {
        name
        email
        role
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createChat = /* GraphQL */ `
  mutation CreateChat(
    $input: CreateChatInput!
    $condition: ModelChatConditionInput
  ) {
    createChat(input: $input, condition: $condition) {
      sender {
        name
        email
        role
        __typename
      }
      email
      message
      timestamp
      recipient {
        name
        email
        role
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateChat = /* GraphQL */ `
  mutation UpdateChat(
    $input: UpdateChatInput!
    $condition: ModelChatConditionInput
  ) {
    updateChat(input: $input, condition: $condition) {
      sender {
        name
        email
        role
        __typename
      }
      email
      message
      timestamp
      recipient {
        name
        email
        role
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteChat = /* GraphQL */ `
  mutation DeleteChat(
    $input: DeleteChatInput!
    $condition: ModelChatConditionInput
  ) {
    deleteChat(input: $input, condition: $condition) {
      sender {
        name
        email
        role
        __typename
      }
      email
      message
      timestamp
      recipient {
        name
        email
        role
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;