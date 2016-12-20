import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';

import {TasklistHelper, Localstore} from '../../helpers'

import TasklistTitle from './TasklistTitle'

import Task from './Task'
// import TaskForm from './TaskForm'

import TaskItem from './TaskItem'
import TasklistCompletedTasks from './TasklistCompletedTasks'



class TasklistItem extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     tasks : []
        // }

    }


    static defaultProps = {
        defaultValue : '',
        className : '',

        project_id : '',
        data : [],

        onTasklistDataUpdate : function(tasklist) {},
        onTaskDataUpdate: function(task) {},

    }

    componentWillMount() {
       // TasklistHelper.tasks(this.props.data.id).then((response)=> {
       //      this.setState({
       //          tasks : response.data
       //      })
       // });
    }

    componentDidMount() {
        // $('.takslist_tasks').sortable({
        //     connectWith:'.takslist_tasks, .comp_task_item_children',
        //     tolerance:'intersect',
        //     handle: ".fa-arrows",
        //     // placeholder: "ph"
        //     placeholder: "ui-state-highlight",

        //     // revert: true,
        //     // start: function(e, ui ){
        //     //      ui.placeholder.height(ui.helper.outerHeight());
        //     // },
        //     stop: function(ev, ui) {
        //         // console.log(ui);
        //         // var parent = ui.item.parent(".tasks-list");
        //         // // var sortOrder = parent.sortable( "toArray" );
        //         // var sortOrderData = parent.sortable( "serialize", { key: "t[]" } );
        //         // TaskHelper.updateSortOrder(sortOrderData);

        //         // // Update Task Parent
        //         // var taskId = ui.item.data('id');
        //         // var currentParenttaskId = ui.item.data('parentid');
        //         // var parentTaskId = parent.data('id');
        //         // if(currentParenttaskId!==parentTaskId) {
        //         //     // console.log(currentParenttaskId);
        //         //     // console.log(parentTaskId);
        //         //     TaskHelper.updateParent(taskId, parentTaskId);
        //         // }
                
        //     }
        // });

        // $('.tasks-list').disableSelection();

       
    }




    // renderItems(items) {
    //     return items.map((item) => {
    //         return (
    //             <Task key={item.id} data={item} />
    //         );
    //     });
    // }


    renderItems(items) {
        if(!items) return false;
        return items.map((item) => {
            if(item.parent_id || item.status=="completed") return false;
            return (
                <TaskItem key={item.id} data={item} onTaskDataUpdate={this.props.onTaskDataUpdate.bind(this)} is_template={this.props.data.is_template} />
            );
        });
    }


    render() {
        const data = this.props.data;
        if (jQuery.isEmptyObject(data)) return false;
        
        const localStoreData = Localstore.getTasklistLocalStore(data.id)
        return (
            <div className="comp_tasklist_item" id={'tl_'+data.id} data-id={data.id}>
                <TasklistTitle data={data} onTasklistDataUpdate={this.props.onTasklistDataUpdate.bind(this)} onTaskDataUpdate={this.props.onTaskDataUpdate.bind(this)} />
                <div className="content_wrapper" style={{display: localStoreData.show_tasks ? 'block' : 'none'}}>
                    <div className="takslist_tasks level-0" data-id="null">
                        { /*(this.state.tasks.length>0) ? '' : 'No Tasks Found'*/ }

                        {/*this.renderItems(this.state.tasks)*/}
                        {this.renderItems(data.tasks)}
                    </div>

                    {
                        data.is_template==false 
                        ? <TasklistCompletedTasks data={data.tasks} onTaskDataUpdate={this.props.onTaskDataUpdate.bind(this)} />
                        : ''
                    }
                    
                </div>
            </div>
        );
    }
}


export default TasklistItem;
