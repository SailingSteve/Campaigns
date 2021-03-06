import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Close } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AppStore from '../../stores/AppStore';
import CompleteYourProfile from '../../components/Settings/CompleteYourProfile';
import { historyPush } from '../../utils/cordovaUtils';
import { renderLog } from '../../utils/logging';


class CompleteYourProfileMobile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      campaignSEOFriendlyPath: '',
      campaignXWeVoteId: '',
      pathToUseWhenProfileComplete: '',
    };
  }

  componentDidMount () {
    // console.log('CampaignDetailsPage componentDidMount');
    this.onAppStoreChange();
    this.appStoreListener = AppStore.addListener(this.onAppStoreChange.bind(this));
    const { match: { params }, setShowHeaderFooter } = this.props;
    const { campaignSEOFriendlyPath, campaignXWeVoteId } = params;
    const { becomeMember, startCampaign, supportCampaign } = this.props;
    let pathToUseWhenProfileComplete = '';
    if (becomeMember) {
      pathToUseWhenProfileComplete = '/DONATE-PATH-HERE';
    } else if (startCampaign) {
      pathToUseWhenProfileComplete = '/profile/started';
    } else if (supportCampaign && campaignSEOFriendlyPath) {
      pathToUseWhenProfileComplete = `/c/${campaignSEOFriendlyPath}/why-do-you-support`;
    } else if (supportCampaign && campaignXWeVoteId) {
      pathToUseWhenProfileComplete = `/id/${campaignXWeVoteId}/why-do-you-support`;
    }
    // console.log('componentDidMount campaignSEOFriendlyPath: ', campaignSEOFriendlyPath, ', campaignXWeVoteId: ', campaignXWeVoteId);
    this.setState({
      campaignSEOFriendlyPath,
      campaignXWeVoteId,
      pathToUseWhenProfileComplete,
    });
    setShowHeaderFooter(false);
  }

  componentWillUnmount () {
    const { setShowHeaderFooter } = this.props;
    setShowHeaderFooter(true);
    this.appStoreListener.remove();
  }

  onAppStoreChange () {
    const chosenWebsiteName = AppStore.getChosenWebsiteName();
    this.setState({
      chosenWebsiteName,
    });
  }

  cancelFunction = () => {
    // console.log('CompleteYourProfileMobile cancelFunction');
    const { becomeMember, startCampaign, supportCampaign } = this.props;
    const { campaignSEOFriendlyPath, campaignXWeVoteId } = this.state;
    if (becomeMember) {
      historyPush('/start-a-campaign-preview');
    } else if (startCampaign) {
      historyPush('/start-a-campaign-preview');
    } else if (supportCampaign && campaignSEOFriendlyPath) {
      historyPush(`/c/${campaignSEOFriendlyPath}`);
    } else if (supportCampaign && campaignXWeVoteId) {
      historyPush(`/id/${campaignXWeVoteId}`);
    }
  };

  functionToUseWhenProfileComplete = () => {
    const { pathToUseWhenProfileComplete } = this.state;
    historyPush(pathToUseWhenProfileComplete);
  }

  render () {
    renderLog('CompleteYourProfileMobile');  // Set LOG_RENDER_EVENTS to log all renders
    const { becomeMember, classes, startCampaign, supportCampaign } = this.props;
    const { campaignXWeVoteId, chosenWebsiteName } = this.state;
    let completeProfileTitle = <span>&nbsp;</span>;
    let htmlPageTitle = `Complete Your Profile - ${chosenWebsiteName}`;
    if (becomeMember) {
      completeProfileTitle = <span>becomeMember</span>;
    } else if (startCampaign) {
      completeProfileTitle = <span>Complete your profile</span>;
    } else if (supportCampaign) {
      completeProfileTitle = <span>Complete your support</span>;
      htmlPageTitle = `Complete Your Support - ${chosenWebsiteName}`;
    }
    return (
      <div>
        <Helmet title={htmlPageTitle} />
        <PageWrapper>
          <OuterWrapper>
            <InnerWrapper>
              <ContentTitle>
                {completeProfileTitle}
                <IconButton
                  aria-label="Close"
                  classes={{ root: classes.closeButton }}
                  onClick={() => { this.cancelFunction(); }}
                  id="completeYourProfileMobileClose"
                >
                  <Close />
                </IconButton>
              </ContentTitle>
              <CompleteYourProfile
                becomeMember={becomeMember}
                campaignXWeVoteId={campaignXWeVoteId}
                functionToUseWhenProfileComplete={this.functionToUseWhenProfileComplete}
                startCampaign={startCampaign}
                supportCampaign={supportCampaign}
              />
            </InnerWrapper>
          </OuterWrapper>
        </PageWrapper>
      </div>
    );
  }
}
CompleteYourProfileMobile.propTypes = {
  classes: PropTypes.object,
  becomeMember: PropTypes.bool,
  match: PropTypes.object,
  startCampaign: PropTypes.bool,
  supportCampaign: PropTypes.bool,
  setShowHeaderFooter: PropTypes.func,
};

const styles = () => ({
  buttonRoot: {
    width: 250,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

const ContentTitle = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin: 20px 15px;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 20px;
  }
`;

const InnerWrapper = styled.div`
`;

const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0;
`;

const PageWrapper = styled.div`
  margin: 0 auto;
  max-width: 480px;
`;

export default withStyles(styles)(CompleteYourProfileMobile);
