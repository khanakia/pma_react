import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import {store} from '../store/index.js';

import UploadImageControl from '../components/controls/UploadImageControl'

import ProjectForm from '../components/project/ProjectForm'
import ProjectUsersEditForm from '../components/project/ProjectUsersEditForm'

import UserProfileEditForm from '../components/other/UserProfileEditForm'
import ChangePasswordForm from '../components/other/ChangePasswordForm'

import OrgForm from '../components/org/OrgForm'
import CompanyForm from '../components/org/CompanyForm'
import OrgUserPermissionForm from '../components/org/OrgUserPermissionForm'
import OrgUserSettingForm from '../components/org/OrgUserSettingForm'

import ProjectFileBrowseForm from '../components/project_file/ProjectFileBrowseForm'
import ProjectFileDetailsEditForm from '../components/project_file/ProjectFileDetailsEditForm'
import ProjectFileUploadForm from '../components/project_file/ProjectFileUploadForm'
import ProjectFileViewVersions from '../components/project_file/ProjectFileViewVersions'
import ProjectFilePrviewModal from '../components/project_file/ProjectFilePrviewModal'


import CommentForm from '../components/stateless/CommentForm'

// import ProjectMessageForm from '../components/project/ProjectMessageForm'
import ProjectMessageForm from '../components/stateless/ProjectMessageForm'


import TasklistForm from '../components/project_todo/TasklistForm'
import TaskForm from '../components/project_todo/TaskForm'
import TaskCopyFromTemplateForm from '../components/project_todo/TaskCopyFromTemplateForm'

import TagForm from '../components/tag/TagForm'

export default class PopupHelper {
    constructor() {

    }

    static showUserProfileEditForm(args = {}) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "",
            opacity: 0.5,
            blur: false,
            // zindex : 5000,

            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                jQuery('#'+pid + "_background").css('z-index', 5000);
                jQuery('#'+pid + "_wrapper").css('z-index', 5001);
                ReactDom.render(<UserProfileEditForm popup_id={pid} {...args} />, document.getElementById(uniq));
            },
            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
            }
        });
    }

    static showChangePasswordForm(args = {}) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "w500",
            opacity: 0.5,
            blur: false,
            // zindex : 5000,

            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                jQuery('#'+pid + "_background").css('z-index', 5000);
                jQuery('#'+pid + "_wrapper").css('z-index', 5001);
                ReactDom.render(<ChangePasswordForm popup_id={pid} {...args} />, document.getElementById(uniq));
            },
            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
            }
        });
    }

    static showOrgForm(args = {}) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "w500",
            opacity: 0.5,
            blur: false,
            // zindex : 5000,

            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                jQuery('#'+pid + "_background").css('z-index', 5000);
                jQuery('#'+pid + "_wrapper").css('z-index', 5001);
                ReactDom.render(<OrgForm popup_id={pid} {...args} />, document.getElementById(uniq));
            },
            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
            }
        });
    }


    static showOrgUserPermissionForm(args = {}) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "w500",
            opacity: 0.5,
            blur: false,
            // zindex : 5000,

            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                jQuery('#'+pid + "_background").css('z-index', 5000);
                jQuery('#'+pid + "_wrapper").css('z-index', 5001);
                ReactDom.render(<OrgUserPermissionForm popup_id={pid} {...args} />, document.getElementById(uniq));
            },
            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
            }
        });
    }


    static showOrgUserSettingForm(args = {}) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "w500",
            opacity: 0.5,
            blur: false,
            // zindex : 5000,

            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                jQuery('#'+pid + "_background").css('z-index', 5000);
                jQuery('#'+pid + "_wrapper").css('z-index', 5001);
                ReactDom.render(<OrgUserSettingForm popup_id={pid} {...args} />, document.getElementById(uniq));
            },
            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
            }
        });
    }




    static showProjectForm(args = {}) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "w800",
            opacity: 0.5,
            blur: false,
            // zindex : 5000,

            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                jQuery('#'+pid + "_background").css('z-index', 5000);
                jQuery('#'+pid + "_wrapper").css('z-index', 5001);
                ReactDom.render(<ProjectForm popup_id={pid} {...args} />, document.getElementById(uniq));
            },
            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
            }
        });
    }

    static showProjectUsersEditForm(args = {}) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "w800",
            opacity: 0.5,
            blur: false,
            // zindex : 5000,

            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                jQuery('#'+pid + "_background").css('z-index', 5000);
                jQuery('#'+pid + "_wrapper").css('z-index', 5001);
                ReactDom.render(<ProjectUsersEditForm popup_id={pid} {...args} />, document.getElementById(uniq));
            },
            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
            }
        });
    }

    static showUploadImageControl(args = {}) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "w600",
            opacity: 0.5,
            blur: false,
            // zindex : 5000,

            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                jQuery('#'+pid + "_background").css('z-index', 5000);
                jQuery('#'+pid + "_wrapper").css('z-index', 5001);
                ReactDom.render(<UploadImageControl popup_id={pid} {...args} />, document.getElementById(uniq));
            },
            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
            }
        });
    }

    static showCompanyForm(args = {}) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "w800",
            opacity: 0.5,
            blur: false,
            // zindex : 5000,

            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                jQuery('#'+pid + "_background").css('z-index', 5000);
                jQuery('#'+pid + "_wrapper").css('z-index', 5001);
                ReactDom.render(<CompanyForm popup_id={pid} {...args} />, document.getElementById(uniq));
            },
            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
            }
        });
    }

    static showProjectFileBrowseForm(args = ProjectFileBrowseForm.defaultProps) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "w800",
            opacity: 0.5,
            blur: false,
            // zindex : 5000,

            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                jQuery('#'+pid + "_background").css('z-index', 5000);
                jQuery('#'+pid + "_wrapper").css('z-index', 5001);
                ReactDom.render(<ProjectFileBrowseForm popup_id={pid} {...args} />, document.getElementById(uniq));
                // console.log(pid);
                // setTimeout(() => jQuery('#'+pid).popup('hide'), 3000); 
            },
            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
            }
        });
    }


    static showProjectFileDetailsEditForm(args = ProjectFileDetailsEditForm.defaultProps) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "w700",
            opacity: 0.5,
            blur: false,
            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                ReactDom.render(<ProjectFileDetailsEditForm popup_id={pid} {...args} />, document.getElementById(uniq));
            },
            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
            }   
        });
    }


    static showCommentForm(args = {}) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "w800",
            opacity: 0.5,
            blur: false,
            autozindex : true,
            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                // ReactDom.render(<CommentForm popup_id={pid} {...args} />, document.getElementById(uniq));
                ReactDom.render(
                <Provider store={store} key="provider">
                    <CommentForm popup_id={pid} {...args} />
                </Provider>,
                document.getElementById(uniq));
            },
            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
            }
        });
    }

    static showProjectFileUploadForm(args = {}) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "w800",
            opacity: 0.5,
            blur: false,
            autozindex : true,
            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                ReactDom.render(<ProjectFileUploadForm popup_id={pid} {...args} />, document.getElementById(uniq));
            },
            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
            }   
        });
    }

    static showProjectFileViewVersions(args = {}) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "w800",
            opacity: 0.5,
            blur: false,
            autozindex : true,
            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                ReactDom.render(<ProjectFileViewVersions popup_id={pid} {...args} />, document.getElementById(uniq));
            },
            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
            }
        });
    }


    static showProjectFilePrviewModal(args = {}) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "wauto",
            opacity: 0.5,
            blur: false,
            autozindex : true,
            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                ReactDom.render(<ProjectFilePrviewModal popup_id={pid} {...args} />, document.getElementById(uniq));
            },
            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
            }
        });
    }

    

    static showProjectMessageForm(args = {}) {
        var uniq = 'id' + (new Date()).getTime();
        // console.log(uniq)
        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "w800",
            opacity: 0.5,
            blur: false,
            autozindex : true,
            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                // console.log(pid)
                ReactDom.render(<ProjectMessageForm popup_id={pid} renderDomId={uniq} {...args} />, document.getElementById(uniq));
            },
            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
            }
        });
    }


    static showTasklistForm(args = {}) {
        var uniq = 'id' + (new Date()).getTime();
        // console.log(uniq)
        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "",
            opacity: 0.5,
            blur: false,
            autozindex : true,
            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                // console.log(pid)
                ReactDom.render(<TasklistForm popup_id={pid} renderDomId={uniq} {...args} />, document.getElementById(uniq));
            },
            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
            }
        });
    }

    static showTaskForm(args = {}) {
        var uniq = 'id' + (new Date()).getTime();
        // console.log(uniq)
        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "",
            opacity: 0.5,
            blur: false,
            autozindex : true,
            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                // console.log(pid)
                // ReactDom.render(<TaskForm popup_id={pid} {...args} />, document.getElementById(uniq));
                ReactDom.render(
                <Provider store={store} key="provider">
                    <TaskForm popup_id={pid} {...args} />
                </Provider>,
                document.getElementById(uniq));
            },
            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
            }
        });
    }

    static showTaskCopyFromTemplateForm(args = {}) {
        var uniq = 'id' + (new Date()).getTime();
        // console.log(uniq)
        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "",
            opacity: 0.5,
            blur: false,
            autozindex : true,
            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                ReactDom.render(
                <Provider store={store} key="provider">
                    <TaskCopyFromTemplateForm popup_id={pid} {...args} />
                </Provider>,
                document.getElementById(uniq));
            },
            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
            }
        });
    }



    static showTagForm(args = {}) {
        var uniq = 'id' + (new Date()).getTime();
        // console.log(uniq)
        Controls.showpopup({
            detach: true,
            message: '<div id="' + uniq + '"></div>',
            container_class: "w500",
            opacity: 0.5,
            blur: false,
            autozindex : true,
            onopen: function(e) {
                var pid = (jQuery(e).attr('id'));
                // console.log(pid)
                ReactDom.render(<TagForm popup_id={pid} renderDomId={uniq} {...args} />, document.getElementById(uniq));
            },
            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
            }
        });
    }




}