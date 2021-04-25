import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TruncateMarkup from 'react-truncate-markup';
import { withStyles } from '@material-ui/core/styles';
import CampaignOwnersList from '../CampaignSupport/CampaignOwnersList';
import CampaignStore from '../../stores/CampaignStore';
import { renderLog } from '../../utils/logging';
import { historyPush, isCordova } from '../../utils/cordovaUtils';
import { numberWithCommas } from '../../utils/textFormat';

class CampaignCardForList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      campaignX: {},
    };
  }

  componentDidMount () {
    // console.log('CampaignCardForList componentDidMount');
    this.campaignStoreListener = CampaignStore.addListener(this.onCampaignStoreChange.bind(this));
    const { campaignXWeVoteId } = this.props;
    const campaignX = CampaignStore.getCampaignXByWeVoteId(campaignXWeVoteId);
    const voterCanEditThisCampaign = CampaignStore.getVoterCanEditThisCampaign(campaignXWeVoteId);
    this.setState({
      campaignX,
      voterCanEditThisCampaign,
    });
  }

  componentWillUnmount () {
    this.campaignStoreListener.remove();
  }

  onCampaignStoreChange () {
    const { campaignXWeVoteId } = this.props;
    const campaignX = CampaignStore.getCampaignXByWeVoteId(campaignXWeVoteId);
    const voterCanEditThisCampaign = CampaignStore.getVoterCanEditThisCampaign(campaignXWeVoteId);
    this.setState({
      campaignX,
      voterCanEditThisCampaign,
    });
  }

  onCampaignClick = () => {
    const { campaignX } = this.state;
    // console.log('campaignX:', campaignX);
    if (!campaignX) {
      return null;
    }
    const {
      in_draft_mode: inDraftMode,
      seo_friendly_path: SEOFriendlyPath,
      campaignx_we_vote_id: campaignXWeVoteId,
    } = campaignX;
    if (inDraftMode) {
      historyPush('/start-a-campaign-preview');
    } else if (SEOFriendlyPath) {
      historyPush(`/c/${SEOFriendlyPath}`);
    } else {
      historyPush(`/id/${campaignXWeVoteId}`);
    }
    return null;
  }

  onCampaignEditClick = () => {
    const { campaignX } = this.state;
    // console.log('campaignX:', campaignX);
    if (!campaignX) {
      return null;
    }
    const {
      in_draft_mode: inDraftMode,
      seo_friendly_path: SEOFriendlyPath,
      campaignx_we_vote_id: campaignXWeVoteId,
    } = campaignX;
    if (inDraftMode) {
      historyPush('/start-a-campaign-preview');
    } else if (SEOFriendlyPath) {
      historyPush(`/c/${SEOFriendlyPath}/edit`);
    } else {
      historyPush(`/id/${campaignXWeVoteId}/edit`);
    }
    return null;
  }

  render () {
    renderLog('CampaignCardForList');  // Set LOG_RENDER_EVENTS to log all renders
    if (isCordova()) {
      console.log(`CampaignCardForList window.location.href: ${window.location.href}`);
    }
    const { campaignX, voterCanEditThisCampaign } = this.state;
    if (!campaignX) {
      return null;
    }
    const {
      campaign_description: campaignDescription,
      campaign_title: campaignTitle,
      campaignx_we_vote_id: campaignXWeVoteId,
      in_draft_mode: inDraftMode,
      supporters_count: supportersCount,
      visible_on_this_site: visibleOnThisSite,
      we_vote_hosted_campaign_photo_large_url: CampaignPhotoLargeUrl,
      we_vote_hosted_campaign_photo_medium_url: CampaignPhotoMediumUrl,
    } = campaignX;
    return (
      <Wrapper cordova={isCordova()}>
        <OneCampaignOuterWrapper>
          <OneCampaignInnerWrapper>
            <OneCampaignTextColumn>
              <ClickableDiv onClick={this.onCampaignClick}>
                <OneCampaignTitle>
                  {campaignTitle}
                </OneCampaignTitle>
                <OneCampaignPhotoWrapperMobile className="u-show-mobile">
                  {CampaignPhotoLargeUrl && (
                    <CampaignImage src={CampaignPhotoLargeUrl} alt="Campaign" />
                  )}
                </OneCampaignPhotoWrapperMobile>
                <SupportersCount>
                  {numberWithCommas(supportersCount)}
                  {' '}
                  {supportersCount === 1 ? 'supporter.' : 'supporters.'}
                </SupportersCount>
                <OneCampaignDescription>
                  <TruncateMarkup lines={4}>
                    <div>
                      {campaignDescription}
                    </div>
                  </TruncateMarkup>
                </OneCampaignDescription>
                <CampaignOwnersWrapper>
                  <CampaignOwnersList campaignXWeVoteId={campaignXWeVoteId} compressedMode />
                </CampaignOwnersWrapper>
              </ClickableDiv>
              {(inDraftMode || !visibleOnThisSite) && (
                <IndicatorRow>
                  {inDraftMode && (
                    <IndicatorButtonWrapper>
                      <DraftModeIndicator>
                        Draft
                      </DraftModeIndicator>
                    </IndicatorButtonWrapper>
                  )}
                  {!visibleOnThisSite && (
                    <IndicatorButtonWrapper>
                      <DraftModeIndicator>
                        <span className="u-show-mobile">
                          Not Visible
                        </span>
                        <span className="u-show-desktop-tablet">
                          Not Visible On This Site
                        </span>
                      </DraftModeIndicator>
                    </IndicatorButtonWrapper>
                  )}
                  {voterCanEditThisCampaign && (
                    <IndicatorButtonWrapper>
                      <EditCampaignIndicator onClick={this.onCampaignEditClick}>
                        <span className="u-show-mobile">
                          Edit
                        </span>
                        <span className="u-show-desktop-tablet">
                          Edit Campaign
                        </span>
                      </EditCampaignIndicator>
                    </IndicatorButtonWrapper>
                  )}
                </IndicatorRow>
              )}
            </OneCampaignTextColumn>
            <OneCampaignPhotoDesktopColumn className="u-show-desktop-tablet" onClick={this.onCampaignClick}>
              {CampaignPhotoMediumUrl && (
                <CampaignImage src={CampaignPhotoMediumUrl} alt="Campaign" />
              )}
            </OneCampaignPhotoDesktopColumn>
          </OneCampaignInnerWrapper>
        </OneCampaignOuterWrapper>
      </Wrapper>
    );
  }
}
CampaignCardForList.propTypes = {
  campaignXWeVoteId: PropTypes.string,
};

const styles = (theme) => ({
  buttonRoot: {
    width: 250,
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
});

const CampaignImage = styled.img`
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 8px;
  margin-top: 8px;
  min-height: 175px;
  width: 100%;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 0;
    margin-left: 15px;
    margin-top: 0;
    min-height: 130px;
    width: 225px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    margin-top: 0;
    min-height: auto;
    width: 100%;
  }
`;

const CampaignOwnersWrapper = styled.div`
`;

const ClickableDiv = styled.div`
  cursor: pointer;
  width: 100%;
`;

const DraftModeIndicator = styled.span`
  background-color: #ccc;
  border-radius: 5px;
  font-size: 14px;
  padding: 3px 30px;
`;

const IndicatorButtonWrapper = styled.div`
  margin-right: 8px;
`;

const EditCampaignIndicator = styled.span`
  background-color: #fff;
  border: 1px solid #2e3c5d;
  border-radius: 5px;
  color: #2e3c5d;
  cursor: pointer;
  font-size: 14px;
  padding: 3px 30px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const IndicatorRow = styled.div`
  display: flex;
  justify-content: start;
  margin-top: 12px;
`;

const OneCampaignDescription = styled.div`
  font-size: 14px;
  margin: 4px 0;
`;

const OneCampaignInnerWrapper = styled.div`
  margin: 15px 0;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: flex;
    justify-content: space-between;
    margin: 15px;
  }
`;

const OneCampaignOuterWrapper = styled.div`
  border-top: 1px solid #ddd;
  margin-top: 15px;
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    border: 1px solid #ddd;
    border-radius: 5px;
  }
`;

const OneCampaignPhotoDesktopColumn = styled.div`
`;

const OneCampaignPhotoWrapperMobile = styled.div`
`;

const OneCampaignTextColumn = styled.div`
  width: 100%;
`;

const OneCampaignTitle = styled.h1`
  font-size: 18px;
  margin: 0;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-bottom: 4px;;
  }
`;

const SupportersCount = styled.div`
  color: #808080;
  font-weight: 500 !important;
  font-size: 14px;
  margin-bottom: 6px;
`;

const Wrapper = styled.div`
`;

export default withStyles(styles)(CampaignCardForList);
