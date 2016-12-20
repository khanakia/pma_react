import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';

import TasklistHelper from '../../helpers/helper_tasklist.js'
import TaskTitle from './TaskTitle'



class TasklistCompletedTasks extends Component {
    constructor(props) {
        super(props)
    }


    static defaultProps = {
        defaultValue : '',
        className : '',
        
        data : [],

        onTaskDataUpdate: function(task) {},
    }

    componentWillMount() {
      
    }

    componentDidMount() {
       
    }

    showTasks(e) {
        e.preventDefault()
        jQuery(this.refs.completed_tasklist_list).toggle()

        var $target = jQuery(e.target);
        var text = ($target.text() == "Show completed tasks") ? "Hide completed tasks" : "Show completed tasks";
        $target.text(text)
    }


    renderItems1(items) {
        if (jQuery.isEmptyObject(items)) return false;

        return items.map((item) => {
            // console.info(item.id)
            if(item.status!=='completed') return false;
            return (
                <TaskTitle key={item.id} data={item} onTaskDataUpdate={this.props.onTaskDataUpdate.bind(this)} />
            );
        });
    }


    render() {
        const data = this.props.data;

        return (
            <div className="completed_tasklist_wrapper">
                <div ref="completed_tasklist_list" style={{display : "none"}}>
                    {this.renderItems1(this.props.data)}
                </div>

                <a href="#" onClick={ (e) => this.showTasks(e)}>Show completed tasks</a>
            </div>
        );
    }
}


export default TasklistCompletedTasks;
