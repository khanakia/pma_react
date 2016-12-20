import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';

import CompanyForm from './org/CompanyForm'

import {Auth, Util, CompanyHelper} from '../helpers'
import PopupHelper from '../helpers/helper_popup'
import {API_URL_UPLOAD_COMPANY_LOGO} from '../config.js'


import {Sidebar, PagePanel} from './'
import {Badge, CommandBar, List, DropdownMenu} from '../fm'

class CompanyOverview extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchCompanies();
        // let { dispatch } = this.props
        // console.log(dispatch);

    }


    editCompany(data) {
        PopupHelper.showCompanyForm({data, is_new : false})
    }


    deleteCompany(company_id) {
        $.confirm({
            title: '',
            content: 'Are you sure you want to remove ?',
            confirmButton: 'Yes',
            cancelButton: 'No',
            confirm: function(){
                CompanyHelper.delete(company_id).then((response) => {
                    this.props.fetchCompanies();
                });
            }.bind(this)
        });
    }

    uploadLogo(item) {
        PopupHelper.showUploadImageControl({uploadUrl:API_URL_UPLOAD_COMPANY_LOGO, object_type: 'company', object_id: item.id, image: item.company_logo_url})
    }

    filterChange(e) {
        var value = e.target.value;
        // console.log(value);
        this.props.filterCompanyList({
            company_title : value
        })
    }


    renderTable(items) {
        
        if(undefined===items) return false;
        return items.map((item) => {
        
            const dropdownMenuItems = [
                {
                    key: 'edit_org',
                    value: 'Edit Company',
                    iconClass: 'fa fa-sitemap',
                    isVisible : this.props.current_org.permissions.org_can_update,
                    onClick: () => {
                        this.editCompany(item)
                    }
                },

                {
                    key: 'delete_company',
                    value: 'Delete Company',
                    iconClass: 'fa fa-trash',
                    isVisible : (!item.is_default && this.props.current_org.permissions.org_can_update),
                    onClick: () => {
                        this.deleteCompany(item.id)
                    }
                },

                {
                    key: 'upload_logo',
                    value: 'Upload Logo',
                    iconClass: 'fa fa-upload',
                    isVisible : true,
                    onClick: () => {
                        this.uploadLogo(item)
                    }
                },
               
                
            ];

            return (
                <tr className="" key={item.id}>
                    <td className="wp50">
                        <div className="userInfoBlock">
                            <div className="image d-inline-block valign-middle mr20">
                                <div className="avatar" style={{backgroundImage: "url('" + item.company_logo_url + "')"}}>
                                </div>
                            </div>
                        </div>
                    </td>

                    <td>
                        {item.company_title}
                        <Badge title="Default" isVisible={item.is_default && item.created_by_user_id==Auth.getUserID()} />
                    </td>

                    <td>
                        { item.company_website ?
                            <span className="d-block fs12 mb5"><i className="fa fa-link w10p mr10"></i><a href={"mailto:"+item.company_website}>{item.company_website}</a></span>
                            : ''
                        }

                        { item.company_email ?
                            <span className="d-block fs12 mb5"><i className="fa fa-envelope w10p mr10"></i><a href={"mailto:"+item.company_email}>{item.company_email}</a></span>
                            : ''
                        }
                    </td>

                    <td>
                        { item.company_phone ?
                            <span className="d-block fs12 mb5"><i className="fa fa-phone w10p fs14 mr10"></i>{item.company_phone}</span>
                            : ''
                        }    
                        
                        { item.company_fax ?
                            <span className="d-block fs12 mb5"><i className="fa fa-fax w10p mr10"></i>{item.company_fax}</span>
                            : ''
                        }
                    </td>

                    <td>
                        <h4 className="list-group-item-heading">
                            <span className="d-block fs12 mb5 lh-15p">
                            {item.company_address_line1 ? <span>{item.company_address_line1}<br/></span> : ''}
                            {item.company_address_line2 ? <span>{item.company_address_line2}<br/></span> : ''}
                            {item.company_city ? <span>{item.company_city} {item.company_zipcode} {item.company_state} <br/></span> : ''}
                            {item.company_country}
                            </span>
                        </h4>
                    </td>

                    <td className="w2">
                        <DropdownMenu items={dropdownMenuItems} />
                    </td>
                </tr>    
            );
        });
    }


    render() {
        const data = this.props.companiesList;
        const commandBarItems = [
            {
                key: 'btn1',
                value: 'New',
                iconClass: 'fa fa-plus',
                isVisible : true,
                onClick: function() {
                    PopupHelper.showCompanyForm({})
                }
            },
        ];

        return (
            <div>
                <PagePanel>
                    
                    <CommandBar items={commandBarItems} />

                    <div className="mt20 container-fluid">
                        <h2 className="h2-light">Company</h2>
                        <table className="table1 table-odrive" >
                            <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Website / Email</th>
                                <th>Phone / Fas</th>
                                <th>Address</th>
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


export default CompanyOverview;
