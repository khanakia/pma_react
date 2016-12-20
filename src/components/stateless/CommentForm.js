import React, { PropTypes } from 'react'
import {OBJECT_TYPE_MESSAGE, OBJECT_TYPE_TASK} from '../../config'

import NotifyUsersDdl from './NotifyUsersDdl'
import ProjectFileAttachForm from '../project_file/ProjectFileAttachForm'


import {CommentHelper} from '../../helpers'


class CommentForm extends React.Component {
    static defaultProps = {        
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
        popup_id : '',
        onCommentUpdate : function() {}
    }

    componentDidMount() {
       this.editorInit();
    }

    editorInit() {
        $(this.refs.body).trumbowyg({
            autogrow: true
        });
        $(this.refs.body).trumbowyg('html', this.props.body);
    }

    hidePopup = () => {
        if (this.props.popup_id) {
            jQuery('#' + this.props.popup_id).popup('hide');
        }
    }
   
    handleSubmit = (e) => {
        e.preventDefault();

        // var valid = jQuery(this.refs.form).valid();
        // if (!valid) {return false};

        let data = jQuery(this.refs.form).serialize();
        data = URI.parseQuery(data);
        // data.body = $(this.refs.body).trumbowyg('html');

        data = jQuery.param(data)
        // console.log(data)

    
        CommentHelper.save(data).then(function(response) {
            
            this.props.onCommentUpdate(response.data.project)
            this.hidePopup();
        }.bind(this));

        return false;

    }

    render() {
        return (
            <div className="comp-commentform">
                {
                    this.props.popup_id ?
                    <div className="modal-header">
                        <h4 className="modal-title">Edit Comment</h4>
                    </div>
                    : ''
                }

                <form className="form-horizontal11" ref='form' onSubmit={this.handleSubmit}>
                    <div className="content-area">
                        <input type="hidden" name="id" defaultValue={this.props.id} placeholder={'id'} />
                        <input type="hidden" name="project_id" defaultValue={this.props.project_id} placeholder={'project_id'} />
                        <input type="hidden" name="object_type" defaultValue={this.props.object_type} placeholder={'object_type'} />
                        <input type="hidden" name="object_id" defaultValue={this.props.object_id} placeholder={'object_id'} />
                        
                        <div className="d-table w100">
                            <div className="d-table-cell xs-d-block wp100 xs-w100">
                                <div className="userInfoBlock mt20">
                                    <div className="image d-inline-block valign-middle mr20">
                                        <div className="avatar" style={{backgroundImage: "url('"+this.props.profile_image_url+"')"}}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-table-cell xs-d-block xs-w100 valign-middle">
                                
                                <div className="">
                                    {<textarea id="body" name="body" ref="body" className="textreaa-editor"></textarea>}
                                </div>
                                <div className="mb30 w100" ref="attach_form">
                                    <ProjectFileAttachForm selectedFiles={this.props.project_files} />
                                </div>

                                <div className="d-table mt30 w100">
                                    <div className="d-inline-block mr20 xs-d-block xs-w100">
                                        <label className="mr10">Notify by Email</label>
                                        <NotifyUsersDdl {...this.props} selectedUsers={this.props.selectedUsers} />
                                    </div>
                                    
                                </div>
                            
                            </div>
                        </div>
                    </div>
                    <div className="p20 text-right">
                        <button type="submit" className="btn btn-blue">Post Comment</button>
                    </div>
                </form>
            </div>
        );
    }
}
CommentForm.propTypes = {
    // id: React.PropTypes.number,
    body: React.PropTypes.string,
    project_id: React.PropTypes.string.isRequired,
    object_type: React.PropTypes.oneOf([OBJECT_TYPE_TASK, OBJECT_TYPE_MESSAGE]).isRequired,
    object_id: React.PropTypes.string.isRequired,
    profile_image_url : React.PropTypes.string
};

export default CommentForm