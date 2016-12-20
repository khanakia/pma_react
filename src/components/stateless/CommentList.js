import React, { Component } from 'react';
import ReactDom from 'react-dom';

import ProjectFileAttachForm from '../project_file/ProjectFileAttachForm'
import ProjectFileItem from '../project_file/ProjectFileItem'

import {CommentHelper} from '../../helpers'
import PopupHelper from '../../helpers/helper_popup'



class CommentList extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        commentsList : [],
        onCommentDelete : function() {},

        // CommentForm
        id : '',
        body : '',
        project_id : '',
        object_type : '',
        object_id : '',
        profile_image_url : '',
        // ProjectFileAttachForm
        project_files : [],
        // NotifyUserDdl
        projectUsers : [],
        selectedUsers : [],
        onCommentUpdate : function() {},
    }

    componentWillMount() {
  
    }

    componentDidMount() {

    }

    // componentDidUpdate(prevProps) {
    //     if(prevProps.object_id !== this.props.object_id) {
    //         this.fetchComments();
    //     }
    // }

    editComment(e, item) {
        // console.log(item)
        PopupHelper.showCommentForm({
            id: item.id,
            body: item.body,
            project_id: this.props.project_id,
            object_type:this.props.object_type, 
            object_id:this.props.object_id, 
            profile_image_url : this.props.profile_image_url,
            projectUsers : this.props.projectUsers,
            selectedUsers : item.notify_users,
            data: item,
            onCommentUpdate : this.props.onCommentUpdate
        })
    }

    deleteComment(e, item) {
    	$.confirm({
            title: '',
            content: 'Are you sure you want to remove ?',
            confirmButton: 'Yes',
            cancelButton: 'No',
            confirm: function(){
                CommentHelper.delete(item.id).then((response) => {
                    // this.fetchComments()
                    this.props.onCommentDelete();
                });
            }.bind(this)
        });
    }

    renderFilesList(items) {
        if(!items) return false;
        return items.map((item) => {
            return (
                <li className="list-group-item" key={item.id}>

                   <ProjectFileItem file={item} layout="layout2"  />
                </li>
            );
        });
    }

    renderList(items) {
        return items.map((item) => {
            const {created_by_user} = item;
            return (
                <li className="list-group-item11" key={item.id}>
                    <div className="d-table w100">
                        <div className="d-table-cell xs-d-block wp80">
                            <div className="userInfoBlock">
                                <div className="image d-inline-block valign-middle mr10">
                                    <div className="avatar" style={{backgroundImage: "url('"+created_by_user.profile_image_url+"')"}}>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-table-cell xs-d-block xs-w100 valign-middle">
                            <div>
                                <span className="title">{created_by_user.user_id} {created_by_user.fullname}</span>
                                <span className="dated">{moment(item.created_at).format('llll')}</span>
                            </div>

                            <div className="comment_text">
                                <div dangerouslySetInnerHTML={{__html: item.body}} />
                            </div>
                            <ul className="list-group-filelist-display">
                                {this.renderFilesList(item.project_files)}
                            </ul>
                        </div>
                        <div className="d-table-cell xs-d-block wp100 valign-middle text-right">
                            <span className="icons-group light">
                                <button className="btn btn-plain" title="Edit" onClick={(e)=> this.editComment(e, item)} ><i className="fa fa-edit"></i></button>
                                <button className="btn btn-plain" title="Edit" onClick={(e)=> this.deleteComment(e, item)} ><i className="fa fa-trash"></i></button>
                            </span>
                        </div>
                    </div>
                </li>
            );
        });
    }

    render() {
        
        const data = this.props.commentsList;
        if (jQuery.isEmptyObject(data)) return false;
        return (
            <div className="comp-commentlist">
                <h3>Comments</h3>
                <ul className="list-group-comments">
                    {this.renderList(data)}
                </ul>
            </div>
        );
    }
}


CommentList.propTypes = {

    commentsList: React.PropTypes.arrayOf(React.PropTypes.shape({
        created_by_user: React.PropTypes.object.isRequired,
    }).isRequired).isRequired,
};

export default CommentList;



