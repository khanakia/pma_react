import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {connectWithStore} from '../../store/index.js';
import { Link, hashHistory } from 'react-router'



class TasklistSidebar extends Component {    
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        data : [],
        project_id : ''
    }

    handleClick(e, link) {
        e.preventDefault();
        hashHistory.push(link);
    }


    render() {
        // console.info("this.props", this.props.project_id)
        const data = this.props.data;
        const project_id = this.props.project_id;
        if (jQuery.isEmptyObject(data)) return false;

        var that = this;
        return (
            <ul className="nav_project">
                <li key="all_tasks">
                    <a href="#" onClick={ (e) => this.handleClick(e, "/projects/" + project_id + "/tasklists")}>All Tasks</a>
                </li>
                {data.map(function(item){
                    return (
                        <li key={item.id}>
                            <a href="#" onClick={(e) => that.handleClick(e, "/projects/" + project_id + "/tasklists/" + item.id)}>{item.tasklist_title}</a>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default TasklistSidebar