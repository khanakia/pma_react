import React, { Component } from 'react';
import { Link } from 'react-router';

import Auth from '../helpers/auth.js'

import Sidebar from './Sidebar'
import PagePanel from './PagePanel'

import ProjectForm from './project/ProjectForm'


class ProjectOverview extends Component {
    constructor(props, context) {
        super(props, context);
        this.projectId = this.props.params.projectId
        this.created_at_old =''
    }

    componentWillMount() {
       // this.props.fetchProjects();
       this.props.fetchProjectActivities(this.projectId);
    }

    printCreateAt(created_at) {
        // console.info(this.created_at_old)
        if(this.created_at_old !== created_at) {
            this.created_at_old=created_at;
            return (
                <div className="date_bar">{created_at}</div>
            );
        } else {
            this.created_at_old=created_at;
            return "";
        }
    }

    createLink(item) {
        var link = "";
        if(item.action_on=="task") {
            link = "#/projects/"+item.project_id+"/tasks/"+item.action_on_id;
        }

        if(item.action_on=="message") {
            link = "#/projects/"+item.project_id+"/messages/"+item.action_on_id;
        }

        return (
            <span><a href={link}>{item.action_on_title}</a></span>
        )
    }

    renderList(items) {
        if(undefined==items || items=="") return;
        return items.map((item) => {
            return (
                <li className="list-group-item11" key={item.id}>
                    {this.printCreateAt(item.created_at)}
                    <div className="d-table w100">
                        <div className="d-table-cell xs-d-block wp70 xs-w100">
                            <div className="userInfoBlock">
                                <div className="image d-inline-block valign-middle mr20">
                                    <div className="avatar" style={{backgroundImage: "url('" + item.profile_image_url +"')"}}>
                                    </div>
                                </div>
                                <div className="summary d-inline-block">
                                </div>
                            </div>
                        </div>
                        <div className="d-table-cell xs-d-block xs-mt20  xs-w100 valign-middle ">
                            <span className="title fw-b mr10"> {item.fullname}</span>
                            <span className="mr2">{item.activity_type} a {item.object_type}</span> on <span className="ml2">{this.createLink(item)}</span>
                        </div>

                        <div className="d-table-cell xs-d-block xs-mt20 wp100 xs-w100 valign-middle ">
                            {item.time}
                        </div>
                        
                    </div>
                </li>
            );
        });
    }

   
    render() {
        const data = this.props.projectActivities;
        return (
            <div>
               <ul className="list-group-activity">
                {this.renderList(data)}
               </ul>
            </div>

        );
    }
}


export default ProjectOverview;
