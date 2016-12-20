import { connect } from 'react-redux'
import { fetchCompanies, filterCompanyList} from '../actions/action_company';

import {CompanyOverview} from '../components';


const filterList = (items, filterParams) => {
    return _.filter(items, function(item) {
        if(filterParams.company_title && item.company_title && item.company_title.indexOf(filterParams.company_title) === -1) {
            return false;
        }
        return true;
    })
}

const mapStateToProps = (state) => {

    return {
        current_org: state.appdata.current_org,
        // companiesList: state.companies.list,
        companiesList: filterList(state.companies.list.data, state.companies.filter_companylist_params),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchCompanies: () => {
            dispatch(fetchCompanies())
        },
        filterCompanyList: (data) => {
            dispatch(filterCompanyList(data))
        },
    }
}


const CompanyOverviewContainer = connect(mapStateToProps, mapDispatchToProps)(CompanyOverview)

export default CompanyOverviewContainer
