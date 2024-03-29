import { request, gql } from 'graphql-request'
import { GraphQLClient} from 'graphql-request'

const graphqlAPI = 'https://api-us-east-1.hygraph.com/v2/ckxdo4ysf4b6b01xib2gbde9i/master'

export const getPosts = async () => {
  const graphQLClient = new GraphQLClient(graphqlAPI)
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            summary {
              raw
            }
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result = await graphQLClient.request(query)

  return result.postsConnection.edges
}

export const getCategories = async () => {
  const graphQLClient = new GraphQLClient(graphqlAPI)
  const query = gql`
    query GetGategories {
      categories {
        name
        slug
      }
    }
  `

  const result = await graphQLClient.request(query)

  return result.categories
}

export const getPostDetails = async (slug) => {
  const graphQLClient = new GraphQLClient(graphqlAPI)
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featuredImage {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        summary {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `

  const result = await graphQLClient.request(query, { slug })

  return result.post
}

export const getSimilarPosts = async (categories, slug) => {
  const graphQLClient = new GraphQLClient(graphqlAPI)
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await graphQLClient.request(query, { slug, categories })

  return result.posts
}

export const getAdjacentPosts = async (createdAt, slug) => {
  const graphQLClient = new GraphQLClient(graphqlAPI)
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
      next: posts(
        first: 1
        orderBy: createdAt_ASC
        where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous: posts(
        first: 1
        orderBy: createdAt_DESC
        where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `

  const result = await graphQLClient.request(query, { slug, createdAt })

  return { next: result.next[0], previous: result.previous[0] }
}

export const getCategoryPost = async (slug) => {
  const graphQLClient = new GraphQLClient(graphqlAPI)
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            summary {
              raw
            }
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result = await graphQLClient.request(query, { slug })

  return result.postsConnection.edges
}

export const getFeaturedPosts = async () => {
  const graphQLClient = new GraphQLClient(graphqlAPI)
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `

  const result = await graphQLClient.request(query)

  return result.posts
}

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })

  return result.json()
}

export const getComments = async (slug) => {
  const graphQLClient = new GraphQLClient(graphqlAPI)
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `

  const result = await graphQLClient.request(query, { slug })

  return result.comments
}

export const getRecentPosts = async () => {
  const graphQLClient = new GraphQLClient(graphqlAPI)
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await graphQLClient.request(query)

  return result.posts
}
