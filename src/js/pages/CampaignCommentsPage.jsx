import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import AppStore from '../stores/AppStore';
import CampaignTopNavigation from '../components/Navigation/CampaignTopNavigation';
import CampaignStore from '../stores/CampaignStore';
import CampaignSupporterStore from '../stores/CampaignSupporterStore';
import { getCampaignXValuesFromIdentifiers } from '../utils/campaignUtils';
import { isCordova } from '../utils/cordovaUtils';
import OpenExternalWebSite from '../components/Widgets/OpenExternalWebSite';
import { renderLog } from '../utils/logging';

const CampaignCommentsList = React.lazy(() => import('../components/Campaign/CampaignCommentsList'));
const CampaignRetrieveController = React.lazy(() => import('../components/Campaign/CampaignRetrieveController'));


class CampaignCommentsPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      campaignSEOFriendlyPath: '',
      campaignTitle: '',
      campaignXWeVoteId: '',
      chosenWebsiteName: '',
    };
  }

  componentDidMount () {
    // console.log('CampaignCommentsPage componentDidMount');
    this.onCampaignStoreChange();
    const { match: { params } } = this.props;
    const { campaignSEOFriendlyPath, campaignXWeVoteId } = params;
    // console.log('componentDidMount campaignSEOFriendlyPath: ', campaignSEOFriendlyPath, ', campaignXWeVoteId: ', campaignXWeVoteId);
    this.onAppStoreChange();
    this.appStoreListener = AppStore.addListener(this.onAppStoreChange.bind(this));
    this.campaignStoreListener = CampaignStore.addListener(this.onCampaignStoreChange.bind(this));
    this.campaignSupporterStoreListener = CampaignSupporterStore.addListener(this.onCampaignSupporterStoreChange.bind(this));
    if (campaignSEOFriendlyPath) {
      this.setState({
        campaignSEOFriendlyPath,
      });
    } else {
      this.setState({
        campaignXWeVoteId,
      });
    }
  }

  componentWillUnmount () {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.appStoreListener.remove();
    this.campaignStoreListener.remove();
    this.campaignSupporterStoreListener.remove();
  }

  onAppStoreChange () {
    const chosenWebsiteName = AppStore.getChosenWebsiteName();
    this.setState({
      chosenWebsiteName,
    });
  }

  onCampaignStoreChange () {
    const { match: { params } } = this.props;
    const { campaignSEOFriendlyPath: campaignSEOFriendlyPathFromParams, campaignXWeVoteId: campaignXWeVoteIdFromParams } = params;
    // console.log('onCampaignStoreChange campaignSEOFriendlyPathFromParams: ', campaignSEOFriendlyPathFromParams, ', campaignXWeVoteIdFromParams: ', campaignXWeVoteIdFromParams);
    const {
      campaignSEOFriendlyPath,
      campaignTitle,
      campaignXWeVoteId,
      isBlockedByWeVote,
      isBlockedByWeVoteReason,
    } = getCampaignXValuesFromIdentifiers(campaignSEOFriendlyPathFromParams, campaignXWeVoteIdFromParams);
    if (campaignSEOFriendlyPath) {
      this.setState({
        campaignSEOFriendlyPath,
      });
    }
    if (campaignXWeVoteId) {
      const voterCanEditThisCampaign = CampaignStore.getVoterCanEditThisCampaign(campaignXWeVoteId);
      this.setState({
        campaignXWeVoteId,
        voterCanEditThisCampaign,
      });
    }
    this.setState({
      campaignTitle,
      isBlockedByWeVote,
      isBlockedByWeVoteReason,
    });
  }

  onCampaignSupporterStoreChange () {
  }

  render () {
    renderLog('CampaignCommentsPage');  // Set LOG_RENDER_EVENTS to log all renders
    if (isCordova()) {
      console.log(`CampaignCommentsPage window.location.href: ${window.location.href}`);
    }
    // const { classes } = this.props;
    const {
      campaignSEOFriendlyPath, campaignTitle, campaignXWeVoteId, chosenWebsiteName,
      isBlockedByWeVote, isBlockedByWeVoteReason, voterCanEditThisCampaign,
    } = this.state;
    // console.log('render campaignSEOFriendlyPath: ', campaignSEOFriendlyPath, ', campaignXWeVoteId: ', campaignXWeVoteId);
    const htmlTitle = `Supporter Comments, ${campaignTitle} - ${chosenWebsiteName}`;
    if (isBlockedByWeVote && !voterCanEditThisCampaign) {
      return (
        <PageWrapper cordova={isCordova()}>
          <Helmet>
            <title>{htmlTitle}</title>
          </Helmet>
          <CampaignTitleWrapper>
            <CampaignTitleText>{campaignTitle}</CampaignTitleText>
          </CampaignTitleWrapper>
          <BlockedReason>
            This campaign has been blocked by moderators from We Vote because it is currently violating our terms of service. It is only visible campaign owners. If you have any questions,
            {' '}
            <OpenExternalWebSite
              linkIdAttribute="weVoteSupport"
              url="https://help.wevote.us/hc/en-us/requests/new"
              target="_blank"
              body={<span>please contact We Vote support.</span>}
            />
            {isBlockedByWeVoteReason && (
              <>
                <br />
                <hr />
                &quot;
                {isBlockedByWeVoteReason}
                &quot;
              </>
            )}
          </BlockedReason>
        </PageWrapper>
      );
    }
    return (
      <div>
        <Suspense fallback={<span>&nbsp;</span>}>
          <CampaignRetrieveController campaignSEOFriendlyPath={campaignSEOFriendlyPath} campaignXWeVoteId={campaignXWeVoteId} />
        </Suspense>
        <Helmet title={htmlTitle} />
        <PageWrapper cordova={isCordova()}>
          <CampaignTitleWrapper>
            <CampaignTitleText>{campaignTitle}</CampaignTitleText>
          </CampaignTitleWrapper>
          {isBlockedByWeVote && (
            <BlockedReason>
              Your campaign has been blocked by moderators from We Vote. Please make any requested modifications so you are in compliance with our terms of service and
              {' '}
              <OpenExternalWebSite
                linkIdAttribute="weVoteSupport"
                url="https://help.wevote.us/hc/en-us/requests/new"
                target="_blank"
                body={<span>contact We Vote support for help.</span>}
              />
              {isBlockedByWeVoteReason && (
                <>
                  <br />
                  <hr />
                  &quot;
                  {isBlockedByWeVoteReason}
                  &quot;
                </>
              )}
            </BlockedReason>
          )}
          <CampaignTopNavigation campaignSEOFriendlyPath={campaignSEOFriendlyPath} campaignXWeVoteId={campaignXWeVoteId} />
          <CommentsSectionOuterWrapper>
            <CommentsSectionInnerWrapper>
              <PageStatement>
                Reasons for supporting
              </PageStatement>
              <PageSubStatement>
                See why others support this campaign and why it is important to them.
              </PageSubStatement>
              <CommentsListWrapper>
                <Suspense fallback={<span>&nbsp;</span>}>
                  <CampaignCommentsList campaignXWeVoteId={campaignXWeVoteId} />
                </Suspense>
              </CommentsListWrapper>
            </CommentsSectionInnerWrapper>
          </CommentsSectionOuterWrapper>
        </PageWrapper>
      </div>
    );
  }
}
CampaignCommentsPage.propTypes = {
  // classes: PropTypes.object,
  match: PropTypes.object,
};

const styles = () => ({
  buttonRoot: {
    width: 250,
  },
});

const BlockedReason = styled.div`
  background-color: #efc2c2;
  border-radius: 4px;
  color: #2e3c5d;
  font-size: 18px;
  margin: 10px;
  padding: 5px 12px;
`;

const CampaignTitleWrapper = styled.div`
  margin: 10px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
  }
`;

const CampaignTitleText = styled.h1`
  font-size: 22px;
  margin: 0;
  margin-bottom: 10px;
  min-height: 27px;
  text-align: left;
`;

const CommentsListWrapper = styled.div`
  margin: 0 0 25px 0;
`;

const CommentsSectionInnerWrapper = styled.div`
  margin: 0 15px;
  max-width: 680px;
  @media (max-width: 1005px) {
    // Switch to 15px left/right margin when auto is too small
    margin: 0 15px;
  }
`;

const CommentsSectionOuterWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PageSubStatement = styled.div`
  margin-top: 10px;
`;

const PageStatement = styled.h2`
  font-size: 22px;
  margin-top: 30px;
  text-align: left;
`;

const PageWrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
`;

export default withStyles(styles)(CampaignCommentsPage);
