import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link, hashHistory } from 'react-router'

import {connectWithStore} from '../../store/index.js';


import { Auth,  TasklistHelper, TaskHelper, Localstore } from '../../helpers'
import PopupHelper from '../../helpers/helper_popup'



import {store} from '../../store/index.js';
import { fetchProjectTasklists, fetchProjectTasklist, fetchProjectTask } from '../../actions/action_project';

import { ROOT_URL, API_URL, OBJECT_TYPE_TASK } from '../../config'

import TagAddButton from '../tag/TagAddButton';
import TagItemTitleMultiple from '../tag/TagItemTitleMultiple';


class TaskTitle extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        onDataUpdate: function(item) {},
        defaultValue : '',
        className : '',

        project_id : '',
        data : [],

        is_pageSingleTask : false,

        onTaskDataUpdate: function(task) {},
        is_template : false,


    }



    componentWillMount() {

    }

    componentDidMount() {
        
    }

    editTask(e, data) {
        PopupHelper.showTaskForm({data, tasklist_id:this.props.data.tasklist_id, is_new: false, is_template: this.props.is_template, onDataUpdate: this.props.onTaskDataUpdate.bind(this) })
    }

    deleteTask(e, data) {
        $.confirm({
            title: '',
            content: 'Are you sure you want to remove ?',
            confirmButton: 'Yes',
            cancelButton: 'No',
            confirm: function(){
                TaskHelper.delete(data.id).then((response) => {
                    this.props.onTaskDataUpdate()
                });
            }.bind(this)
        });
    }

    showSubtasks(e, item) {
        e.preventDefault()
        var $target = jQuery(e.target).parents('.comp_task_title').next('.comp_task_item_children');
        jQuery(e.target).parents('.comp_task_title').next('.comp_task_item_children').toggle();
        // localStorage.setItem('task_'+item.id, JSON.stringify({
        //     show_subtasks :  !$target.is(':hidden')
        // }));

        Localstore.setTaskLocalStore(item.id, {
            show_subtasks : !$target.is(':hidden')
        })

        // console.info(TaskHelper.getLocalStore(item.id))
    }

    addSubTask(e, item) {
        jQuery(e.target).parents('.comp_task_title').next('.comp_task_item_children').show().toggleClass('active');
    }

    addSubTaskForm(e, data) {
        PopupHelper.showTaskForm({tasklist_id:data.tasklist_id, parent_id:data.id, onDataUpdate: this.props.onTaskDataUpdate.bind(this) })
    }

    showTask(e, item) {
        var url = 'projects/'+this.props.project_id+'/tasks/'+item.id;
        hashHistory.push(url)
    }

    addComment(e, data) {
        PopupHelper.showCommentForm({object_type:OBJECT_TYPE_TASK, object_id:data.id})
    }


    fetchDataTag() {
        this.props.fetchProjectTasklists(this.props.project_id);
        this.props.fetchProjectTasklist(this.props.data.tasklist_id)
        this.props.fetchProjectTask(this.props.data.id);
    }

    changeTaskStatus(e, item_id) {
        const status = (jQuery(e.target).is(":checked"))

        TaskHelper.updateStatus({id: item_id, status }).then((response) => {
            console.log(response)
            // this.fetchDataTag()
            this.props.onTaskDataUpdate()
        })
    }


    renderAssignedUsers(users) {
        if(undefined==users) return false;
        return users.map((item) => {
            return (
                <span key={item.id} className="ml5 label label-skyblue">
                    {item.fullname}
                </span>
            )
        });
    }

    render() {
        const item = this.props.data
        // console.info(this.localData())
        
        if (jQuery.isEmptyObject(item)) return false;
        // console.info(item.id, item.status)
        return (
            <div className={"comp_task_title " + this.props.className}>
                <a href="#" className="mr10 dragHandle"><i className="fa fa-arrows"></i></a>
                <div className="d-table inner w100">
                
                    <div className="d-table-cell xs-d-block wp20 xs-w100 valign-middle">
                        <div>
                            {
                                this.props.is_template==false 
                                ? <span> <input id={ "checkbox-" + item.id } className="checkbox-custom" name="checkbox-group" type="checkbox" 
                                    onChange={(e) => {this.changeTaskStatus(e, item.id)}} defaultChecked={item.status=='completed'} />
                                <label htmlFor={ "checkbox-" + item.id } className="checkbox-custom-label"></label> </span>
                                : ''
                            }
                        </div>
                    </div>
                    <div className="d-table-cell xs-d-block xs-w100 valign-middle">
                            {item.id}
                            <div className="d-inline-block">
                            {
                                this.props.is_template==false 
                                ? <Link data-id={item.id} to={'projects/'+this.props.project_id+'/tasks/'+item.id}>{item.task_title}</Link>
                                : item.task_title
                            }
                                
                            </div>
                            {this.renderAssignedUsers(item.task_users)}

                            { item.priority!=='none' && item.priority && item.priority!==null
                                ? <span className={'mx10 priority_'+item.priority} title={item.priority}><i className="fa fa-exclamation-circle"></i></span>
                                : ''
                            }

                            { item.progress 
                                ? <span>{item.progress}%</span>
                                : ''
                            }
                            <span className="ml20">
                                <TagItemTitleMultiple data={item.tag_items} fetchData={this.fetchDataTag.bind(this)} />
                            </span>

                            
                    </div>
                    
                    <div className="d-table-cell xs-d-block valign-middle text-right">
                        <span className="icons-group light">
                            <a className="badge mr5" href="#" onClick={(e)=> this.showSubtasks(e, item)}>
                                {(item.childrens.length)}
                            </a>
                            <button className="btn btn-plain" title="Show SubTasks" onClick={(e)=> this.addSubTask(e, item)} ><i className="fa fa-indent"></i></button>
                            <button className="btn btn-plain" title="Add SubTask" onClick={(e)=> this.addSubTaskForm(e, item)} ><i className="fa fa-plus"></i></button>

                            { 
                              /*this.props.is_pageSingleTask==false
                              ? <span> 
                                <button className="btn btn-plain" title="View Single Page" onClick={(e)=> this.showTask(e, item)} ><i className="fa fa-external-link"></i></button>
                                <button className="btn btn-plain" title="Add Comment" onClick={(e)=> this.addComment(e, item)} ><i className="fa fa-comment"></i></button>
                                </span>
                              : ''  */
                            }
                            <button className="btn btn-plain" title="Edit Task Details" onClick={(e)=> this.editTask(e, item)} ><i className="fa fa-pencil"></i></button>
                            
                            <TagAddButton object_type={OBJECT_TYPE_TASK} object_id={item.id} fetchData={this.fetchDataTag.bind(this)} strip_tags={item.tags} />
                            <button className="btn btn-plain" title="Delete File" onClick={(e)=> this.deleteTask(e, item)} ><i className="fa fa-trash"></i></button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}


// export default TaskTitle;




const mapStateToProps = (state) => {
    
    return {
        state : state,
        current_org: state.appdata.current_org,  // FETCH_APPDATA_CURRENTORG
        projectCurrent : state.project.current,  // FETCH_PROJECT_CURRENT 
        project_id : state.project.current.id
        
    };
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        dispatch,
        fetchProjectTasklists: (project_id) => {
            dispatch(fetchProjectTasklists(project_id))
        },

        fetchProjectTasklist: (tasklist_id) => {
            dispatch(fetchProjectTasklist(tasklist_id))
        },

        fetchProjectTask: (id) => {
            dispatch(fetchProjectTask(id))
        }
    }
}

const TaskTitleContainer = connectWithStore(TaskTitle, mapStateToProps, mapDispatchToProps)

export default TaskTitleContainer
