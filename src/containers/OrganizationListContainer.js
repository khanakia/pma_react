import { connect } from 'react-redux'
import { fetchOrgs, fetchOrgCurrent, filterOrgList } from '../actions/action_organization';
import {action_appdata} from '../actions';
const {fetchCurrentOrg, fetchCurrentUser} = action_appdata


import {OrganizationList} from '../components';

import OrgHelper from '../helpers/helper_org'



const filterList = (items, filterParams) => {
    return _.filter(items, function(item) {
        if(filterParams.name && item.name && item.name.indexOf(filterParams.name) === -1) {
            return false;
        }
        return true;
    })
}


const mapStateToProps = (state) => {
    // console.log(state.posts.orgsList);

    return {
        state : state,
        current_org: state.appdata.current_org,
        current_user: state.appdata.current_user,
        // orgsList: state.org.list,
        orgsList: filterList(state.org.list.data, state.org.filter_orglist_params),

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchOrgs: () => {
            // OrgHelper.index().then((response) => {
            //     dispatch(fetchOrgs(response))
            // });

            // dispatch(fetchOrgs())

            dispatch(fetchOrgs()).then((response) => {
                // dispatch(fetchOrgCurrent(response))
            });

            // dispatch(fetchOrgs()).then((response) => {
            //     !response.error ? dispatch(fetchOrgsSuccess(response.payload)) : dispatch(fetchOrgsFailure(response.payload));

            //     // setTimeout(() => dispatch({type: 'RESET_POSTS'}), 3000); 
            // });
        },

        fetchCurrentOrg: () => {
            dispatch(fetchCurrentOrg())
        },

        fetchCurrentUser: () => {
            dispatch(fetchCurrentUser()).then((response) => {
                // dispatch(fetchCurrentUser())
            })
        },

        fetchAfterLeave: () => {
            dispatch(fetchCurrentOrg()).then((response) => {
                dispatch(fetchCurrentUser())
                dispatch(fetchOrgs())
                // dispatch(fetchCurrentUser())
            })
        },


        filterOrgList: (data) => {
            dispatch(filterOrgList(data))
        },
    }
}


const OrganizationListContainer = connect(mapStateToProps, mapDispatchToProps)(OrganizationList)

export default OrganizationListContainer
