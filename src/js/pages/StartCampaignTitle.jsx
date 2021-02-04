import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { renderLog } from '../utils/logging';
import { historyPush, isCordova } from '../utils/cordovaUtils';


class StartCampaignTitle extends Component {
  render () {
    renderLog('StartCampaignTitle');  // Set LOG_RENDER_EVENTS to log all renders
    if (isCordova()) {
      console.log(`StartCampaignTitle window.location.href: ${window.location.href}`);
    }
    const { classes } = this.props;
    const mobileButtonClasses = classes.buttonDefault; // isWebApp() ? classes.buttonDefault : classes.buttonDefaultCordova;
    return (
      <div>
        <Helmet title="Start a Campaign - We Vote Campaigns" />
        <Wrapper cordova={isCordova()}>
          <OuterWrapper>
            <InnerWrapper>
              <ContentTitle>
                Write your campaign title
              </ContentTitle>
              <ContentIntroductionText>
                This is the first thing people will see about your campaign. Get their attention with a short title that focuses on what the candidate you support will do to improve people&apos;s lives.
              </ContentIntroductionText>
              <StartCampaignSectionWrapper>
                <StartCampaignSection>
                  <DesktopButtonWrapper className="u-show-desktop-tablet">
                    <DesktopButtonPanel>
                      <Button
                        classes={{ root: mobileButtonClasses }}
                        color="primary"
                        id="saveCampaignTitle"
                        onClick={() => historyPush('/')}
                        variant="contained"
                      >
                        Continue
                      </Button>
                    </DesktopButtonPanel>
                  </DesktopButtonWrapper>
                  <AdviceBoxWrapper>
                    <AdviceBox>
                      <AdviceBoxTitle>
                        Keep it short and to the point
                      </AdviceBoxTitle>
                      <AdviceBoxText>
                        Example: &quot;Sam Davis for Oakland School Board&quot;
                      </AdviceBoxText>
                      <AdviceBoxText>
                        Not: &quot;If you want to have your kids be more engaged at school, vote for Sam Davis for Oakland School Board&quot;
                      </AdviceBoxText>
                      <AdviceBoxText>
                        &nbsp;
                      </AdviceBoxText>
                      <AdviceBoxTitle>
                        Focus on the positive change
                      </AdviceBoxTitle>
                      <AdviceBoxText>
                        Example: &quot;&quot;
                      </AdviceBoxText>
                      <AdviceBoxText>
                        Not: &quot;&quot;
                      </AdviceBoxText>
                      <AdviceBoxText>
                        &nbsp;
                      </AdviceBoxText>
                      <AdviceBoxTitle>
                        Communicate Urgency
                      </AdviceBoxTitle>
                      <AdviceBoxText>
                        Example: &quot;&quot;
                      </AdviceBoxText>
                      <AdviceBoxText>
                        Not: &quot;&quot;
                      </AdviceBoxText>
                    </AdviceBox>
                  </AdviceBoxWrapper>
                </StartCampaignSection>
              </StartCampaignSectionWrapper>
            </InnerWrapper>
          </OuterWrapper>
          <MobileButtonWrapper className="u-show-mobile">
            <MobileButtonPanel>
              <Button
                classes={{ root: mobileButtonClasses }}
                color="primary"
                id="saveCampaignTitleFooter"
                onClick={() => historyPush('/')}
                variant="contained"
              >
                Continue
              </Button>
            </MobileButtonPanel>
          </MobileButtonWrapper>
        </Wrapper>
      </div>
    );
  }
}
StartCampaignTitle.propTypes = {
  classes: PropTypes.object,
};

const styles = () => ({
  buttonDefault: {
    padding: '0 12px',
    width: '100%',
    boxShadow: 'none !important',
    height: '45px !important',
  },
  buttonDefaultCordova: {
    padding: '0 12px',
    width: '100%',
    boxShadow: 'none !important',
    height: '35px !important',
  },
  buttonRoot: {
    width: 250,
  },
});

const AdviceBox = styled.div`
  margin: 25px;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: 20px;
  }
`;

const AdviceBoxText = styled.div`
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 4px;
`;

const AdviceBoxTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const AdviceBoxWrapper = styled.div`
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 20px;
`;

const ContentIntroductionText = styled.div`
  color: #555;
  font-size: 16px;
  max-width: 620px;
  text-align: left;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 16px;
  }
`;

const ContentTitle = styled.div`
  font-size: 32px;
  font-weight: 600;
  margin: 20px 0 10px 0;
  max-width: 620px;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 24px;
  }
`;

const DesktopButtonPanel = styled.div`
  background-color: #fff;
  padding: 10px 0;
  // width: 100%;
`;

const DesktopButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 30px 0 0 0;
  width: 100%;
`;

const InnerWrapper = styled.div`
`;

const MobileButtonPanel = styled.div`
  background-color: #fff;
  border-top: 1px solid #ddd;
  padding: 10px;
`;

const MobileButtonWrapper = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  display: block;
`;

const OuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 15px;
`;

const StartCampaignSection = styled.div`
  margin-bottom: 100px !important;
  max-width: 620px;
  width: 100%;
`;

const StartCampaignSectionWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
`;

export default withStyles(styles)(StartCampaignTitle);
