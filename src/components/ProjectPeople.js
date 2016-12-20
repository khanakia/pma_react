import React, { Component } from 'react';
import { Link } from 'react-router';

import {Auth, Util, ProjectUserHelper} from '../helpers'
import PopupHelper from '../helpers/helper_popup'


import Sidebar from './Sidebar'
import PagePanel from './PagePanel'

import ProjectUsersEditForm from './project/ProjectUsersEditForm'
import ProjectUserPermissionForm from './project/ProjectUserPermissionForm'


class ProjectPeople extends Component {
    constructor(props, context) {
        super(props, context);

        this.projectId = this.props.params.projectId
    }

    componentDidMount() {
        
       this.props.fetchProjectUsers(this.projectId);

        // ProjectUsersEditForm.showInPoup({data : {project_id : 1}})
        // ProjectUserPermissionForm.showInPoup({})

    }

    componentDidUpdate() {
        ReactDom.unmountComponentAtNode(document.getElementById('childrenSidebar'))
    }

    editProject(data, e) {
        ProjectForm.showInPoup({data})
    }

    editUserPermission(data, e) {
        ProjectUserPermissionForm.showInPoup({data})
    }

    removeUser(data, e) {
        $.confirm({
            title: '',
            content: 'Are you sure you want to remove ?',
            confirmButton: 'Yes',
            cancelButton: 'No',
            confirm: function(){
                ProjectUserHelper.delete(data.id).then((response) => {
                    this.props.fetchProjectUsers(this.projectId);
                });
            }.bind(this)
        });
    }

    filterChange(e) {
        var value = e.target.value;
        this.props.filterProjectPeopleList({
            fullname : value
        })
    }

    renderList(projectusers) {
        if(undefined==projectusers || jQuery.isEmptyObject(projectusers)) return;
        console.info(projectusers);
        return projectusers.map((projectuser) => {
            if(null==projectuser.user) return;
            return (
                <li className="list-group-item" key={projectuser.id}>
                    <div className="w100">
                        <div className="image text-center">
                            <div className="avatar d-inline-block" style={{backgroundImage: "url('" + projectuser.user.profile_image_url +"')"}}>
                            </div>
                        </div>
                        <div className="text-center">
                            <h4 className="list-group-item-heading">
                                {projectuser.user.fullname}
                                {(this.props.current_org.permissions.org_can_update || this.props.current_org.permissions.can_add_projects) ?
                                    <div className="dropdown d-inline-block">
                                        <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" role="button"><i className="fa fa-chevron-down"></i></a>
                                        <ul className="text-left dropdown-menu dropdown-menu-right">
                                            <li>
                                                <a href="javascript:void(0)" title="Remove User" onClick={(e)=> this.removeUser(projectuser,e)} ><i className="fa fa-trash"></i>Remove User</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0)" title="Edit User Permissions" onClick={(e)=> this.editUserPermission(projectuser,e)} ><i className="fa fa-cogs"></i>Edit User Permissions</a>
                                            </li>
                                        </ul>
                                    </div>
                                : null}
                            </h4>
                        </div>
                        <div className="position fs12">{projectuser.job_title}</div>
                        <div className="company fs12">{projectuser.company_title}</div>
                    </div>
                </li>
            );
        });
    }


   
    render() {
        // const data = this.props.projectUsers['id_'+this.projectId];
        const data = this.props.projectUsers;
        
        return (
            <div>
                <div className="control-toolbar1">
                    <div className="left">
                        <div className="filter-header-input-wrap">
                            <input placeholder="Find a user" className="filter-header-input" defaultValue="" onChange={(e)=>this.filterChange(e)}/>
                        </div>
                    </div>
                    <div className="middle">
                    </div>
                    <div className="right">
                        <span className="pull-right">
                            <span className="col mr10"></span>
                            <span className="col icons-group">
                                {(this.props.current_org.permissions.org_can_update || this.props.current_org.permissions.can_add_projects) ?
                                        <button className="btn btn-green-bordered" onClick={()=> PopupHelper.showProjectUsersEditForm({data : {project_id : this.projectId}})}><i className="fa fa-plus mr5"></i>Add Users to Project</button>
                                    : ''
                                }
                            </span>
                        </span>
                    </div>
                </div>
                <div className="mt20">
                    
                    <ul className="list-group-grid project-peoples">
                        {this.renderList(data)}
                    </ul>
                </div>
            </div>

        );
    }
}


export default ProjectPeople;
