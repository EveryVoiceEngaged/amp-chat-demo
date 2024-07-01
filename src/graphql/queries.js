/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getIssueGuide = /* GraphQL */ `
  query GetIssueGuide($id: ID!) {
    getIssueGuide(id: $id) {
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
export const listIssueGuides = /* GraphQL */ `
  query ListIssueGuides(
    $filter: ModelIssueGuideFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIssueGuides(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        author
        version
        status
        updatedAt
        id
        createdAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getScheduledForum = /* GraphQL */ `
  query GetScheduledForum($id: ID!) {
    getScheduledForum(id: $id) {
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
export const listScheduledForums = /* GraphQL */ `
  query ListScheduledForums(
    $filter: ModelScheduledForumFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listScheduledForums(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        forumId
        joinId
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
        messageToParticipants
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getGala = /* GraphQL */ `
  query GetGala($id: ID!) {
    getGala(id: $id) {
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
export const listGalas = /* GraphQL */ `
  query ListGalas(
    $filter: ModelGalaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGalas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        forumId
        joinId
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
        messageToParticipants
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getChat = /* GraphQL */ `
  query GetChat($id: ID!) {
    getChat(id: $id) {
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
export const listChats = /* GraphQL */ `
  query ListChats(
    $filter: ModelChatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        email
        message
        timestamp
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
