import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';

// Use Factory instance to reterive a list of deplyed campaigns
import factory from '../ethereum/factory';

import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {

  // The getInitialProps() is executed by nextjs server.
  static async getInitialProps() {
    // This access the deployed contract.
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
    // you can access this variable using this.props.campaigns
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }

// This function generates HTML page, sends it to the client browser
  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>
          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              />
            </a>
          </Link>

          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
