import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { lazyLoader, libraryNeedsLoading } from '../utils/lazyLoader';
import OpenExternalWebSite from '../components/Widgets/OpenExternalWebSite';
import { renderLog } from '../utils/logging';

class FAQ extends Component {
  static getProps () {
    return {};
  }

  componentDidMount () {
    const library = 'fontawesome';
    if (libraryNeedsLoading(library)) {
      lazyLoader(library)
        .then((result) => {
          console.log('lazy loader for fontawesome returned: ', result);
          // eslint-disable-next-line react/no-unused-state
          this.setState({ result }); // to force a reload
        });
    }
  }

  render () {
    renderLog('FAQ');  // Set LOG_RENDER_EVENTS to log all renders
    return (
      <div>
        <Helmet title="FAQ - WeVote.US Campaigns" />
        <PageWrapper>
          <OuterWrapper>
            <InnerWrapper>
              <ContentTitle>
                Frequently Asked Questions
              </ContentTitle>

              <br />
              <strong>What is We Vote?</strong>
              <br />
              We Vote is a nonprofit technology startup, creating a digital voter guide informed by issues you care about, and people you trust. Through our nonpartisan, open source platform, we&apos;ll help you become a better voter, up and down the ballot.
              <br />
              <br />

              <strong>How does We Vote help voters?</strong>
              <br />
              We Vote is where you view your ballot, see endorsements from your network for all
              candidates and measures, and collaborate with
              folks who share your values.
              <br />
              <br />

              <strong>Who&apos;s behind We Vote?</strong>
              <br />
              We Vote is a collaboration between two nonprofits (
              <OpenExternalWebSite
                linkIdAttribute="weVoteEducationWebsite"
                url="http://WeVoteEducation.org"
                target="_blank"
                body="www.WeVoteEducation.org"
              />
              {' '}
              - 501(c)(3) and
              {' '}
              <OpenExternalWebSite
                linkIdAttribute="weVoteUSAWebsite"
                url="http://WeVoteUSA.org"
                target="_blank"
                body="www.WeVoteUSA.org"
              />
              {' '}
              - 501(c)(4))
              based in Oakland, CA. We do not support or oppose any political candidate or party.
              We are not affiliated with WeVoteProject.org or WeVoteUSA.com.
              <br />
              <br />

              <strong>No really, who are you?</strong>
              <br />
              We Vote is a volunteer-driven movement. We
              rely on volunteers across the country who use
              their engineering, design, and other skills to build
              We Vote. We are over 100 people who have donated 9,000+ volunteer hours, including
              {' '}
              <OpenExternalWebSite
                linkIdAttribute="wevoteGithubContributors"
                url="https://github.com/WeVote"
                target="_blank"
                body="90+ contributors on GitHub."
              />
              {' '}
              We also have a
              {' '}
              <OpenExternalWebSite
                linkIdAttribute="weVoteAboutUsPage"
                url="https://WeVote.US/more/about"
                target="_blank"
                body="small team of core staff"
              />
              {' '}
              and volunteer board members.
              Please feel free to reach out to us with questions via our
              {' '}
              <OpenExternalWebSite
                linkIdAttribute="weVoteContactUsPage"
                url="https://help.wevote.us/hc/en-us/requests/new"
                target="_blank"
                body="Contact Us form."
              />
              {' '}
              Our mailing address is:
              <br />
              We Vote
              <br />
              1423 Broadway PMB 158
              <br />
              Oakland, CA 94612
              <br />
              <br />

              <strong>How does We Vote work?</strong>
              <br />
              Follow people and groups you trust to get info on candidates and ballot measures. Ask your friends
              what they think. Then take We Vote with you to
              the polls for an easy-to-use cheat sheet.
              <br />
              <br />

              <strong>Is this an app or a website?</strong>
              <br />
              We have a mobile-ready website, as well as
              {' '}
              <OpenExternalWebSite
                linkIdAttribute="weVoteIPhone"
                url="https://apps.apple.com/us/app/we-vote-voter-guide/id1347335726"
                target="_blank"
                body="iPhone"
              />
              {' '}
              and
              {' '}
              <OpenExternalWebSite
                linkIdAttribute="weVoteAndroid"
                url="https://play.google.com/store/apps/details?id=org.wevote.cordova&hl=en_US"
                target="_blank"
                body="Android"
              />
              {' '}
              apps.
              We are free and open source:
              {' '}
              <OpenExternalWebSite
                linkIdAttribute="wevoteGithub"
                url="https://github.com/WeVote"
                target="_blank"
                body="https://github.com/WeVote"
              />
              <br />
              <br />

              <strong>So who should I vote for?</strong>
              <br />
              That&apos;s up to you.
              <br />
              <br />

              <strong>Wait, what?</strong>
              <br />
              We Vote does not endorse any candidate or party.
              Our job is to help you make your own decisions,
              with help from your friends and trusted network.
              <br />
              <br />

              <strong>How does We Vote help nonprofits?</strong>
              <br />
              We provide a free place where organizations can share and promote their voter guides, including
              endorsements of candidates and
              ballot measures, and connect to new constituents.
              <br />
              <br />

              <strong>Will you sell my email address?</strong>
              <br />
              Not a chance. We Vote will not sell your email address or any other individually identifiable information.
              (We don&apos;t want our email addresses sold either!) We may sell aggregated data.
              <br />
              <br />

              <strong>What does We Vote cost?</strong>
              <br />
              It&apos;s free! If you like We Vote,
              {' '}
              <Link to="/more/donate" className="u-cursor--pointer u-link-color">please donate</Link>
              {' '}
              so we can do more to help voters.
              <br />
              <br />

              <strong>How do you make money?</strong>
              <br />
              Like most nonprofits, we take in donations from individuals and foundations. We also plan to generate
              revenues by offering premium features.
              <br />
              <br />

              <strong>How will you use my donation?</strong>
              <br />
              While most of the We Vote software is written by unpaid volunteers, we use financial donations to pay the staff
              required
              to gather and groom election data, as well as manage communications, operations, and our internship program.
              Other expenses include server costs and fees required to buy political data.
              <br />
              <br />

              <strong>How will you handle trolls?</strong>
              <br />
              Unless your name is J.R.R. Tolkien, we know how much you hate trolls. That&apos;s why on We Vote you only hear from
              people and organizations that you Friend or Follow. We Vote eliminates noise from people with radically
              different values.
              <br />
              <br />

              <strong>What&apos;s next for We Vote?</strong>
              <br />
              Better tools to let organizations promote their voter guides and
              poll their members. Tools to let candidates ask for help from their supporters.
              <br />
              <br />

              <strong>Sounds great! How can I help?</strong>
              <br />
              We couldn&apos;t do what we do without volunteers and donors. Please
              {' '}
              <OpenExternalWebSite
                linkIdAttribute="idealistOpenPositions"
                url="https://www.idealist.org/en/nonprofit/f917ce3db61a46cb8ad2b0d4e335f0af-we-vote-oakland"
                target="_blank"
                className="open-web-site open-web-site__no-right-padding"
                body="sign up to volunteer on Idealist."
              />
              <br />
              <br />
              <Link to="/" className="u-cursor--pointer u-link-color">Let&apos;s get started!</Link>
              <br />
              <br />
              <br />
            </InnerWrapper>
          </OuterWrapper>
        </PageWrapper>
      </div>
    );
  }
}

const styles = () => ({
  buttonRoot: {
    width: 250,
  },
});

const ContentTitle = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin: 20px 0;
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
  max-width: 960px;
  @media (max-width: 1005px) {
    // Switch to 15px left/right margin when auto is too small
    margin: 0 15px;
  }
`;

export default withStyles(styles)(FAQ);
