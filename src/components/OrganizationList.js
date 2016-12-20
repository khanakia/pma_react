import React, { Component } from 'react';
import { Link } from 'react-router';

import OrgForm from './org/OrgForm'

import * as Helper from '../helpers'
import PopupHelper from '../helpers/helper_popup'

import { Auth, Util, OrgHelper } from '../helpers'

import {Sidebar, PagePanel} from './'
import {Badge, CommandBar, List, DropdownMenu} from '../fm'

class OrganizationList extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        // console.log(Auth.getOrgID());
        this.props.fetchOrgs();
        // let { dispatch } = this.props
        // dispatch({type: 'RESET_POSTS'});
        // this.props.dispatch({type: 'REMOVE'});
        // Helper.Auth.updateCurrentOrg()
    }

    onDataUpdate(data) {
        console.log('onDataUpdate', data);
    }

    editOrg(data) {
        PopupHelper.showOrgForm({data, is_new: false})
    }

    switchOrg(org_id) {
        OrgHelper.switchOrg(org_id).then((response) => {
            Auth.login(response.data.token)
            this.props.fetchCurrentOrg()
        });
    }

    setDefault(org_id) {        
        OrgHelper.setDefault(org_id).then((response) => {
            // Auth.login(response.data.token)
            // this.props.fetchCurrentOrg()
            this.props.fetchCurrentUser()
        });
        
    }

    leaveOrg(org_id) {
        OrgHelper.leaveOrg(org_id).then((response) => {

        Auth.login(response.data.token)
        this.props.fetchAfterLeave()
        // if(org_id==this.props.current_user.org_default_id)
            // this.props.fetchCurrentOrg().then((response)=>{
            //     this.props.fetchOrgs()
            // })
        });
    }

    filterChange(e) {
        var value = e.target.value;
        console.log(value);
        this.props.filterOrgList({
            name : value
        })
    }


    renderTable(orgs) {
        
        if(undefined===orgs) return false;
        return orgs.map((org) => {
        
            const dropdownMenuItems = [
                {
                    key: 'edit_org',
                    value: 'Edit Organization',
                    iconClass: 'fa fa-sitemap',
                    isVisible : org.permissions.org_can_update,
                    onClick: () => {
                        this.editOrg(org)
                    }
                },
                {
                    key: 'leave_org',
                    value: 'Leave Organization',
                    iconClass: 'fa fa-gear',
                    isVisible : (org.created_by_user_id!==this.props.current_user.id),
                    onClick: () => {
                        this.leaveOrg(org.id)
                    }
                },
                {
                    key: 'set_default',
                    value: 'Set as Default',
                    iconClass: 'fa fa-gear',
                    isVisible : true,
                    onClick: () => {
                        this.setDefault(org.id)
                    }
                },
                {
                    key: 'set_current',
                    value: 'Set as Current',
                    iconClass: 'fa fa-gear',
                    isVisible : true,
                    onClick: () => {
                        this.switchOrg(org.id)
                    }
                },
                
            ];

            return (
                <tr className="" key={org.id}>
                    <td>
                        {org.name}
                    </td>

                    <td>
                        <div className="badges">
                            <Badge title="Owner" isVisible={org.created_by_user_id==Auth.getUserID()} />
                            <Badge title="Admin" isVisible={org.permissions.is_admin} />
                            <Badge title="Default" isVisible={org.id==this.props.current_user.org_default_id} />
                            <Badge title="Personal" isVisible={org.created_by_user_id==Auth.getUserID() && org.is_personal} />
                        </div>
                    </td>
                    <td className="w2">
                        <DropdownMenu items={dropdownMenuItems} />
                    </td>
                </tr>    
            );
        });
    }



    render() {
        const data = this.props.orgsList;
        const commandBarItems = [
            {
                key: 'btn1',
                value: 'New',
                iconClass: 'fa fa-plus',
                isVisible : true,
                onClick: function() {
                    PopupHelper.showOrgForm({})
                }
            },
        ];

        return (
            <div>
            
                <PagePanel>
                    
                    <CommandBar items={commandBarItems} />

                    <div className="mt20 container-fluid">
                        <h2 className="h2-light">Organizations</h2>
                        <table className="table1 table-odrive" >
                            <thead>
                            <tr>
                                <th>Organization</th>
                                <th>Tags</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderTable(data)}
                            </tbody>
                        </table>
                       
                    </div>


                </PagePanel>
            </div>

        );
    }
}


export default OrganizationList;
