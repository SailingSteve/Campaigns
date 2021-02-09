import { ReduceStore } from 'flux/utils';
import Dispatcher from '../components/Dispatcher/Dispatcher';

class CampaignStartStore extends ReduceStore {
  getInitialState () {
    return {
      campaignTitle: '',
      campaignTitleQueuedToSave: '',
      campaignXOwnerList: [],
      campaignXWeVoteId: '',
    };
  }

  resetState () {
    return this.getInitialState();
  }

  getCampaignTitle () {
    return this.getState().campaignTitle || '';
  }

  getCampaignTitleQueuedToSave () {
    return this.getState().campaignTitleQueuedToSave;
  }

  reduce (state, action) {
    switch (action.type) {
      case 'campaignRetrieveAsOwner':
        // console.log('CampaignStartStore campaignRetrieveAsOwner');
        return {
          ...state,
          campaignTitle: action.res.campaign_title,
          campaignXOwnerList: action.res.campaignx_owner_list,
          campaignXWeVoteId: action.res.campaignx_we_vote_id,
        };

      case 'campaignStartSave':
        // console.log('CampaignStartStore campaignStartSave');
        return {
          ...state,
          campaignTitle: action.res.campaign_title,
          campaignXOwnerList: action.res.campaignx_owner_list,
          campaignXWeVoteId: action.res.campaignx_we_vote_id,
        };

      case 'campaignTitleQueuedToSave':
        // console.log('CampaignStartStore campaignTitleQueuedToSave: ', action.payload);
        return { ...state, campaignTitleQueuedToSave: action.payload };

      default:
        return state;
    }
  }
}

export default new CampaignStartStore(Dispatcher);
