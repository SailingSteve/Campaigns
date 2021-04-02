import Dispatcher from '../components/Dispatcher/Dispatcher';

export default {
  campaignListRetrieve (hostname) {
    Dispatcher.loadEndpoint('campaignListRetrieve',
      {
        hostname,
      });
  },

  campaignRetrieve (campaignWeVoteId) {
    Dispatcher.loadEndpoint('campaignRetrieve',
      {
        campaignx_we_vote_id: campaignWeVoteId,
      });
  },

  campaignRetrieveBySEOFriendlyPath (campaignSEOFriendlyPath) {
    Dispatcher.loadEndpoint('campaignRetrieve',
      {
        seo_friendly_path: campaignSEOFriendlyPath,
      });
  },
};
