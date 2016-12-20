import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link, hashHistory } from 'react-router'

import { OBJECT_TYPE_MESSAGE } from '../config.js'

import { Auth, ProjectMessageHelper } from '../helpers'
import PopupHelper from '../helpers/helper_popup'

// import CommentList from './project/CommentList'
// import CommentForm from './project/CommentForm'
import CommentForm from './stateless/CommentForm'
import CommentList from './stateless/CommentList'

class ProjectMessage extends Component {
    constructor(props) {
        super(props);

        this.projectId = this.props.params.projectId
        this.messageId = this.props.params.messageId

    }

    componentWillMount() {
        this.props.fetchProjectMessage(this.messageId)
        this.props.fetchProjectUsers(this.props.params.projectId)
        this.props.fetchComments(this.props.params.projectId, OBJECT_TYPE_MESSAGE, this.props.params.messageId)
        this.props.fetchCategoriesTypeMessage(this.props.params.projectId)
    }

    componentDidUpdate() {
       
    }


    editMessage(e, data) {
        e.preventDefault()

        console.log(data)
        
        PopupHelper.showProjectMessageForm({ 
            project_id: this.props.params.projectId,
            id: data.id,
            message_title: data.message_title,
            message_body: data.message_body, 
            projectUsers: this.props.projectUsers,
            selectedUsers: data.notify_users,
            categoryList: this.props.categoryList ,
            selectedCategories: data.categories,
            onMessageUpdate: this.onMessageUpdate.bind(this),
            is_new: false, 
        })
    }
   
    onMessageUpdate() {
        this.props.fetchProjectMessage(this.props.params.messageId);
        this.props.fetchProjectUsers(this.props.params.projectId)
        this.props.fetchComments(this.props.params.projectId, OBJECT_TYPE_MESSAGE, this.props.params.messageId)
        this.props.fetchCategoriesTypeMessage(this.props.params.projectId)
    }

    onCommentUpdate() {
        this.props.fetchComments(this.props.params.projectId, OBJECT_TYPE_MESSAGE, this.props.params.messageId)
    }

    onCommentDelete() {
        this.props.fetchComments(this.props.params.projectId, OBJECT_TYPE_MESSAGE, this.props.params.messageId)
    }


    render() {
        const data = this.props.projectMessage;
        if (jQuery.isEmptyObject(data)) return false;
        const {created_by_user} = data;
        const messageId = this.props.params.messageId;

        return (
            <div>
                <div className="control-toolbar1 message">
                    <div className="left">
                        <span className="title">{data.message_title}</span><br/>
                        <span className="dated">Created on: {moment(data.created_at).format('llll')}</span>
                    </div>
                  
                    <div className="right">
                        <span className="pull-right">
                            <span className="col mr10">
                                
                            </span>
                            <span className="col icons-group">
                                <a href="#" className="" title="Edit" onClick={(e)=> this.editMessage(e, data)} ><i className="fa fa-pencil"></i></a>
                            </span>
                        </span>    
                    </div>
                </div>
               
                <div className="d-table w100 mt30">
                    <div className="d-table-cell xs-d-block wp150 xs-w100">
                        <div className="userInfoBlock">
                            <div className="image d-inline-block valign-middle text-center">
                                <div className="avatar d-inline-block" style={{backgroundImage: "url('"+created_by_user.profile_image_url+"')"}}>
                                </div>
                                <div>
                                    <span className="title">{created_by_user.user_id} {created_by_user.fullname}</span><br/>
                                    
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div className="d-table-cell xs-d-block xs-w100 pr20 valign-top">
                        <div className="">
                            <div dangerouslySetInnerHTML={{__html: data.message_body}} />
                        </div>

                        <div className="mt30">
                            <h4>Attachments</h4>
                        </div>

                    </div>
                </div>

                <div className="section_comments">
                    {/*<CommentList object_type={OBJECT_TYPE_MESSAGE} object_id={data.id} />
                                        <CommentForm object_type={OBJECT_TYPE_MESSAGE} object_id={data.id} />*/}
                    <CommentList 
                        commentsList = {this.props.commentsList}
                        project_id={this.props.params.projectId} 
                        projectUsers={this.props.projectUsers}
                        profile_image_url={this.props.current_user.profile_image_url}
                        onCommentDelete={() => this.onCommentDelete()}
                        onCommentUpdate={() => this.onCommentUpdate()}
                        object_type={OBJECT_TYPE_MESSAGE} 
                        object_id={messageId} />

                    <CommentForm
                        project_id={this.props.params.projectId} 
                        projectUsers={this.props.projectUsers}
                        onCommentUpdate={() => this.onCommentUpdate()}
                        profile_image_url={this.props.current_user.profile_image_url}
                        object_type={OBJECT_TYPE_MESSAGE} 
                        object_id={messageId} />
                </div>

            </div>
        );
    }
}


export default ProjectMessage;
