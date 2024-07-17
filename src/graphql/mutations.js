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
        id
        message
        email
        timestamp
        isPublic
        recipient
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
        id
        message
        email
        timestamp
        isPublic
        recipient
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
        id
        message
        email
        timestamp
        isPublic
        recipient
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
        id
        message
        email
        timestamp
        isPublic
        recipient
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
        id
        message
        email
        timestamp
        isPublic
        recipient
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
        id
        message
        email
        timestamp
        isPublic
        recipient
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
      id
      message
      email
      timestamp
      isPublic
      recipient
      reactions {
        nextToken
        __typename
      }
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
      id
      message
      email
      timestamp
      isPublic
      recipient
      reactions {
        nextToken
        __typename
      }
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
      id
      message
      email
      timestamp
      isPublic
      recipient
      reactions {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createReaction = /* GraphQL */ `
  mutation CreateReaction(
    $input: CreateReactionInput!
    $condition: ModelReactionConditionInput
  ) {
    createReaction(input: $input, condition: $condition) {
      id
      emoji
      count
      chat {
        id
        message
        email
        timestamp
        isPublic
        recipient
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      chatReactionsId
      __typename
    }
  }
`;
export const updateReaction = /* GraphQL */ `
  mutation UpdateReaction(
    $input: UpdateReactionInput!
    $condition: ModelReactionConditionInput
  ) {
    updateReaction(input: $input, condition: $condition) {
      id
      emoji
      count
      chat {
        id
        message
        email
        timestamp
        isPublic
        recipient
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      chatReactionsId
      __typename
    }
  }
`;
export const deleteReaction = /* GraphQL */ `
  mutation DeleteReaction(
    $input: DeleteReactionInput!
    $condition: ModelReactionConditionInput
  ) {
    deleteReaction(input: $input, condition: $condition) {
      id
      emoji
      count
      chat {
        id
        message
        email
        timestamp
        isPublic
        recipient
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      chatReactionsId
      __typename
    }
  }
`;
export const createUserPresence = /* GraphQL */ `
  mutation CreateUserPresence(
    $input: CreateUserPresenceInput!
    $condition: ModelUserPresenceConditionInput
  ) {
    createUserPresence(input: $input, condition: $condition) {
      id
      email
      status
      lastActiveTimestamp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUserPresence = /* GraphQL */ `
  mutation UpdateUserPresence(
    $input: UpdateUserPresenceInput!
    $condition: ModelUserPresenceConditionInput
  ) {
    updateUserPresence(input: $input, condition: $condition) {
      id
      email
      status
      lastActiveTimestamp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUserPresence = /* GraphQL */ `
  mutation DeleteUserPresence(
    $input: DeleteUserPresenceInput!
    $condition: ModelUserPresenceConditionInput
  ) {
    deleteUserPresence(input: $input, condition: $condition) {
      id
      email
      status
      lastActiveTimestamp
      createdAt
      updatedAt
      __typename
    }
  }
`;
