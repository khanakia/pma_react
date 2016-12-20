import React, { Component } from 'react';
import ReactDom from 'react-dom';

import { OBJECT_TYPE_MESSAGE } from '../../config.js'
import { ProjectMessageHelper } from '../../helpers'



// import CategorySelectControl from '../category/CategorySelectControl'
// import ControlNotifyPeople from '../controls/ControlNotifyPeople'

import CategorySelectControl from './CategorySelectControl'
import NotifyUsersDdl from './NotifyUsersDdl'
import ProjectFileAttachForm from '../project_file/ProjectFileAttachForm'


class ProjectMessageForm extends Component {
    constructor(props) {
        super(props);

        this.msg_btn_save_text = 'Save Message'
        this.msg_heading = 'Create Message'
    }

    static defaultProps = {

        id: '',
        message_title: '',
        message_body: '',
        project_id: '',

        // NotifyUserDdl
        projectUsers : [],
        selectedUsers : [],

        categoryList: [],
        selectedCategories: [],
        // notify_users : [],
        // categoryList : [],
        // projectId: '',

        is_new : true,

        popup_id: '',
        // settings : {},
        onMessageUpdate: function(org) { },
    }

    componentWillMount() {
        console.info("this.props.is_new", this.props.is_new)
        if(!this.props.is_new) {
            this.msg_btn_save_text = "Update Message"
            this.msg_heading = 'Edit Message'
        }
    }

    componentDidMount() {
        // $(this.refs.message_body).trumbowyg();
        this.editorInit()
    }


    editorInit() {
        $(this.refs.message_body).trumbowyg({
            autogrow: true
        });
        $(this.refs.message_body).trumbowyg('html', this.props.message_body);
    }

    componentDidUpdate() {
        // $(this.refs.message_body).trumbowyg();
        // $(this.refs.message_body).trumbowyg('html', this.props.message_body);
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
        data.message_body = $(this.refs.message_body).trumbowyg('html');

        data = jQuery.param(data)
        // console.log(data)

        ProjectMessageHelper.save(data).then((response) => {
            // this.props.fetchProjectMessages(this.props.project_id)
            this.props.onMessageUpdate(response.data)
            this.hidePopup();
        })
        return false;

    }

    render() {
        return (
            <div>
                <div className="modal-header">
                    <h4 className="modal-title">{this.msg_heading}</h4>
                </div>

                <form className="form-horizontal11 form" ref='form' onSubmit={this.handleSubmit}>
                    <div className="content-area">
                        <input type="hidden" name="project_id" defaultValue={this.props.project_id} placeholder="project_id" />
                        <input type="hidden" name="id" defaultValue={this.props.id} placeholder="id" />
                        <div className="">
                            <input type="text" className="message_title w100 required" name="message_title" defaultValue={this.props.message_title} placeholder="Message Title" />
                        </div>
                        <div className="">
                            <textarea id="message_body" name="message_body" ref="message_body"></textarea>
                        </div>

                        <div className="mb30 w100" ref="attach_form">
                            <ProjectFileAttachForm selectedFiles={this.props.project_files} />
                        </div>

                        <div className="d-table w100">
                            <div className="d-inline-block mr20 xs-d-block xs-w100">
                                <label className="mr10">Notify by Email</label>
                                {/*<ControlNotifyPeople selectedUsers={this.props.notify_users} />*/}
                                <NotifyUsersDdl {...this.props} selectedUsers={this.props.selectedUsers} />
                            </div>
                            <div className="d-inline-block mr20 xs-d-block xs-w100">
                                <label className="mr10">Category</label>
                                <span className="d-inline-block">
                                    <CategorySelectControl 
                                        selectedValues={this.props.selectedCategories} 
                                        categoryList={this.props.categoryList} 
                                        object_type={OBJECT_TYPE_MESSAGE}  />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer text-right">
                        <button type="submit" className="btn btn-blue-link">{this.msg_btn_save_text}</button>
                    </div>
                </form>
            </div>
        );
    }
}


ProjectMessageForm.propTypes = {
    // id: React.PropTypes.number,
    message_title: React.PropTypes.string,
    message_body: React.PropTypes.string,
    // project_id: React.PropTypes.string.isRequired,
};

export default ProjectMessageForm;


