/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateIssueGuide = /* GraphQL */ `
  subscription OnCreateIssueGuide(
    $filter: ModelSubscriptionIssueGuideFilterInput
  ) {
    onCreateIssueGuide(filter: $filter) {
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
export const onUpdateIssueGuide = /* GraphQL */ `
  subscription OnUpdateIssueGuide(
    $filter: ModelSubscriptionIssueGuideFilterInput
  ) {
    onUpdateIssueGuide(filter: $filter) {
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
export const onDeleteIssueGuide = /* GraphQL */ `
  subscription OnDeleteIssueGuide(
    $filter: ModelSubscriptionIssueGuideFilterInput
  ) {
    onDeleteIssueGuide(filter: $filter) {
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
export const onCreateScheduledForum = /* GraphQL */ `
  subscription OnCreateScheduledForum(
    $filter: ModelSubscriptionScheduledForumFilterInput
  ) {
    onCreateScheduledForum(filter: $filter) {
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
export const onUpdateScheduledForum = /* GraphQL */ `
  subscription OnUpdateScheduledForum(
    $filter: ModelSubscriptionScheduledForumFilterInput
  ) {
    onUpdateScheduledForum(filter: $filter) {
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
export const onDeleteScheduledForum = /* GraphQL */ `
  subscription OnDeleteScheduledForum(
    $filter: ModelSubscriptionScheduledForumFilterInput
  ) {
    onDeleteScheduledForum(filter: $filter) {
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
export const onCreateGala = /* GraphQL */ `
  subscription OnCreateGala($filter: ModelSubscriptionGalaFilterInput) {
    onCreateGala(filter: $filter) {
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
export const onUpdateGala = /* GraphQL */ `
  subscription OnUpdateGala($filter: ModelSubscriptionGalaFilterInput) {
    onUpdateGala(filter: $filter) {
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
export const onDeleteGala = /* GraphQL */ `
  subscription OnDeleteGala($filter: ModelSubscriptionGalaFilterInput) {
    onDeleteGala(filter: $filter) {
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
export const onCreateChat = /* GraphQL */ `
  subscription OnCreateChat($filter: ModelSubscriptionChatFilterInput) {
    onCreateChat(filter: $filter) {
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
export const onUpdateChat = /* GraphQL */ `
  subscription OnUpdateChat($filter: ModelSubscriptionChatFilterInput) {
    onUpdateChat(filter: $filter) {
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
export const onDeleteChat = /* GraphQL */ `
  subscription OnDeleteChat($filter: ModelSubscriptionChatFilterInput) {
    onDeleteChat(filter: $filter) {
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
export const onCreateUserPresence = /* GraphQL */ `
  subscription OnCreateUserPresence(
    $filter: ModelSubscriptionUserPresenceFilterInput
  ) {
    onCreateUserPresence(filter: $filter) {
      id
      email
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUserPresence = /* GraphQL */ `
  subscription OnUpdateUserPresence(
    $filter: ModelSubscriptionUserPresenceFilterInput
  ) {
    onUpdateUserPresence(filter: $filter) {
      id
      email
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUserPresence = /* GraphQL */ `
  subscription OnDeleteUserPresence(
    $filter: ModelSubscriptionUserPresenceFilterInput
  ) {
    onDeleteUserPresence(filter: $filter) {
      id
      email
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
