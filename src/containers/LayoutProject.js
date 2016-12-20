import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { Link, hashHistory } from 'react-router'

import {store} from '../store/index.js';
import { fetchProject, fetchProjectTasklists } from '../actions/action_project';
import { fetchTags} from '../actions/action_tag';


import Sidebar from '../components/Sidebar'
import PagePanel from '../components/PagePanel'

// import TasklistSidebar from '../components/project_todo/TasklistSidebar'

class LayoutProjectComponent extends Component {
    
    componentWillMount() {
        this.props.fetchProject(this.props.params.projectId);
        this.props.fetchProjectTasklists(this.props.params.projectId);
        this.props.fetchTags()  // Required to fetch the reason we are using it everywhere so we need to load tags data first
    }

    render() {
        // console.log("RENDERED", jQuery.isEmptyObject(this.props.projectCurrent.data));
        if (jQuery.isEmptyObject(this.props.projectCurrent)) return false;
        const data = this.props.projectCurrent;
        const project_url_suffix = "projects/"+data.id;

        return (
            <div>
                <Sidebar>
                  {data.project_title}
                   <ul className="nav_project">
                        <li><Link activeClassName="active" to={project_url_suffix + "/overview"}><i className="fa fa-line-chart"></i> Overview</Link></li>
                        <li><Link activeClassName="active" to={project_url_suffix + "/tasklists"}><i className="fa fa-tasks"></i> Tasks</Link></li>
                        <li><Link activeClassName="active" to={project_url_suffix + "/files"}><i className="fa fa-file"></i> Files</Link></li>
                        <li><Link activeClassName="active" to={project_url_suffix + "/messages"}><i className="fa fa-comments"></i> Discussions</Link></li>
                        {(this.props.current_org.permissions.org_can_update) ?
                            <li><Link activeClassName="active" to={project_url_suffix + "/people"}><i className="fa fa-users"></i> Peoples</Link></li>
                            : ''
                        }
                    </ul>

                   

                  <div id="childrenSidebar">

                  </div>
                </Sidebar>
                <PagePanel hasSidebar="true">
                    <div className="project_children pt30">
                        {this.props.children}
                    </div>
                </PagePanel>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        state : state,
        current_org: state.appdata.current_org,
        projectCurrent: state.project.current,
        projectsTasklists: state.project.tasklists,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        fetchProject: (project_id) => {
            dispatch(fetchProject(project_id)); 
        },

        fetchTags: () => {
            dispatch(fetchTags())
        },

        fetchProjectTasklists: (project_id) => {
            dispatch(fetchProjectTasklists(project_id)).then((response) => {
            });
        }
    }
}

const LayoutProjectContainer = connect(mapStateToProps, mapDispatchToProps)(LayoutProjectComponent)

export default LayoutProjectContainer
