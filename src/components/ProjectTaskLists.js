import React, { Component } from 'react';
import { Link } from 'react-router';

import TasklistItem from './project_todo/TasklistItem'
import TasklistHelper from '../helpers/helper_tasklist.js'

import PopupHelper from '../helpers/helper_popup'

import TagSelectorInput from './tag/TagSelectorInput'
import TasklistSidebar from './project_todo/TasklistSidebar'

class ProjectTasks extends Component {
    constructor(props) {
        super(props);
        this.projectId = this.props.params.projectId
    }

    componentWillMount() {
       this.props.fetchProjectTasklists(this.projectId);
    }

    componentDidMount() {
        $(".tasklists-list").sortable({
            helper: "clone",
            items: "div.comp_tasklist_item",
            update: function(ev, ui) {
                var data = $(".tasklists-list").sortable( "serialize", { key: "tl[]" } );
                TasklistHelper.updateSortOrder(data);
            }
        });
    }

    componentDidUpdate() {
        ReactDom.render(
                <div>
                    <h3>Tasklists</h3>
                    <TasklistSidebar data={this.props.projectsTasklists} project_id={this.projectId} />
                </div>,
                document.getElementById('childrenSidebar')
            );
    }


    createTasklist(e) {
        PopupHelper.showTasklistForm({onDataUpdate:this.onTasklistDataUpdate.bind(this)})
    }

    onTasklistDataUpdate() {
        this.props.fetchProjectTasklists(this.projectId)
    }


    onTaskDataUpdate() {
        this.props.fetchProjectTasklists(this.projectId);
        // this.props.fetchProjectFiles(this.projectId);   
    }
  
   
    renderList(items) {
        return items.map((item) => {
            if(item.is_template==true) return false;
            return (
                <TasklistItem data={item} key={item.id} onTasklistDataUpdate={this.onTasklistDataUpdate.bind(this)} onTaskDataUpdate={this.onTaskDataUpdate.bind(this)}  />
            );
        });
    }

    render() {
        const data = this.props.projectsTasklists;
        if (jQuery.isEmptyObject(data)) return false;

        return (
            <div>
                <div className="control-toolbar1 mb20">
                    <div className="left">
                        <span className="title">Tasks</span>
                    </div>
                    <div className="middle">
                    </div>
                    <div className="right">
                        <span className="pull-right">
                            <span className="col mr10">
                                
                            </span>
                            <span className="col icons-group">
                                <button className="btn btn-success" onClick={(e)=> this.createTasklist(e)}><i className="fa fa-plus mr10"></i>Add Tasklist</button>
                            </span>
                        </span>    
                    </div>
                </div>
                <div className="tasklists-list">
                    {this.renderList(data)}
                </div>
            </div>

        );
    }
}


export default ProjectTasks;
