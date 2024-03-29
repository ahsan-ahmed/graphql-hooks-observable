import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Query } from 'react-apollo';
import RepositoryList from '../Repository/index';
import Loading from '../Loading';
import ErrorMessage from '../Error';

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
{
    viewer {
      repositories(first: 5, orderBy: {direction: ASC, field: STARGAZERS}) {
        edges {
          node {
            id
            name
            url
            descriptionHTML
            primaryLanguage {
              name
            }
            owner {
              login
              url
            }
            stargazers {
              totalCount
            }
            viewerHasStarred
            watchers {
              totalCount
            }
            viewerSubscription
          }
        }
      }
    }
  }  
`;

const Profile = () => (
    <Query query={GET_REPOSITORIES_OF_CURRENT_USER}>
        {({ data, loading, error }) => {
            const { viewer } = data;
            if (error) {
                return <ErrorMessage error={error} />
            }
            if (loading || !viewer) {
                return <Loading />
            }
            return (
                <RepositoryList repositories={viewer.repositories} />
            );
        }}
    </Query>
);

export default graphql(GET_REPOSITORIES_OF_CURRENT_USER)(Profile);