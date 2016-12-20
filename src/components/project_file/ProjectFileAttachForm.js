import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {connectWithStore} from '../../store/index.js';

import {
        API_URL_PROJECT_FILE,
        API_URL_PROJECT_FILE_GOOGLE_DRIVE_STORE
    } from '../../config.js'

import { Auth, ProjectFileHelper, ProjectFileVersionHelper } from '../../helpers'
import PopupHelper from '../../helpers/helper_popup'

import ProjectFileBrowseForm from './ProjectFileBrowseForm'
import GooglePicker from './GooglePicker'


var FileListRender = React.createClass({
    render: function() {
      return (
        <ul className="list-group-uploadedfiles">
          {this.props.list.map(function(item){
            return (
                <li className="" key={item.id}>
                    {/*<input type="hidden" name="files[]" defaultValue={item.id} />*/}
                    <label className="title">
                        <input type="checkbox" name="files[]" defaultValue={item.id} defaultChecked={true} />
                        {   item.project_file_version_latest ?
                            item.project_file_version_latest.file_displayname
                            : ''
                        }
                    </label>
                    
                </li>
            )
          })}
        </ul>
      )
    }
});

class ProjectFileAttachForm extends Component {
    constructor(props) {
        super(props);
        this.unique_id = Auth.getUserID()+'_'+(new Date()).getTime();
        this.uploadedFiles = []
        this.googledriveFiles = []
    }

    static defaultProps = {
        defaultValue : '',
        className : '',

        selectedFiles : []
    }

    componentWillMount() {
    }

    componentDidMount() {
        // this.fineUploader()
    }

    componentDidUpdate() {
        this.fineUploader()
    }

    addFiles() {


    }

    fineUploader() {
        var project_id = this.props.project_id;
        var unique_id = this.unique_id;

        var $fub = $(this.refs.btn_add_files);
        var fineUploaderBasicInstance = new qq.FineUploaderBasic({
            debug: true,
             button: $fub[0],
            request: {
                endpoint: API_URL_PROJECT_FILE + '/upload',
                customHeaders: {
                    'Authorization': Auth.getTokenBearer()
                }
            },

            // deleteFile: {
            //     enabled: true,
            //     endpoint: API_URL_PROJECT_FILE + '/delete'
            // },

            // retry: {
            //    enableAuto: true
            // },

            callbacks: {
                onSubmit: function (id, fileName) {
                    
                    var extraParams = {
                        unique_id : unique_id,
                        project_id: project_id
                    }

                    this.setParams(extraParams);
                },
                onComplete: function(id, fileName, responseJSON) {
                    if (responseJSON.success) {
                        this.uploadedFiles.push(responseJSON.file)
                        this.renderUploadedFiles()
                    }
                }.bind(this)
            }
        });
    }

    selectExistingFiles() {
        PopupHelper.showProjectFileBrowseForm({onFileItemsSelect:this.onFileItemsSelect.bind(this)})
    }

    onFileItemsSelect(items) {
        // console.log("onFileItemsSelect", items)
        var attached_files_list = jQuery(this.refs.attached_files_list)
        ReactDom.render(
            <div>
                <FileListRender list={items}/>
            </div>,
            attached_files_list[0]
        );
    }

    onFilesSelected(data) {
        // console.info("onFilesSelected", data)
        data.project_id = this.props.project_id;
        axios({
            method: 'post',
            url: API_URL_PROJECT_FILE_GOOGLE_DRIVE_STORE,
            headers: Auth.header(),
            data: data
        }).then(function(response){
            // console.log(response.data.file_ids)
            var files = response.data.files;
            $.each( files, function( key, value ) {
                // console.log( key + ": " + value );
                this.googledriveFiles.push(value)
            }.bind(this));
            this.renderGoogleDriveFiles();

        }.bind(this));
    }

    renderGoogleDriveFiles() {
        var googledrive_files_list = jQuery(this.refs.googledrive_files_list)
        ReactDom.render(
            <div>
                <FileListRender list={this.googledriveFiles}/>
            </div>,
            googledrive_files_list[0]
        );
    }


    renderUploadedFiles() {
        var uploaded_files_list = jQuery(this.refs.uploaded_files_list)
        ReactDom.render(
            <div>
                <FileListRender list={this.uploadedFiles}/>
            </div>,
            uploaded_files_list[0]
        );
    }

    renderFiles(items) {

    }
  
    render() {
        var data = this.props.selectedFiles;
        return (
            <div className="comp-projectfileAttachform">
                
                <div ref="selected_files_list">
                    <FileListRender list={data}/>
                </div>

                <div ref="attached_files_list">
                
                </div>
                <div ref="uploaded_files_list">
                </div>

                <div ref="googledrive_files_list">
                </div>

                <div className="d-table w100">
                    <div className="d-inline-block mr20 xs-d-block xs-w100">Drop Files Here</div>
                    <div className="d-inline-block pull-right xs-d-block xs-w100">
                        <div type="button" className="btn btn-plain mr10" ref="btn_add_files" ><i className="fa fa-upload"></i></div>
                        <button type="button" className="btn btn-plain mr10" onClick={this.selectExistingFiles.bind(this)}><i className="fa fa-file"></i></button>
                        <GooglePicker onFilesSelected={this.onFilesSelected.bind(this)} />
                    </div>
                </div>
            </div>
        );
    }
}


// export default ProjectFileAttachForm;


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
        // fetchProjectFiles: (project_id, extraParams={}) => {

        //     dispatch(fetchProjectFilesBrowserFormList(project_id, extraParams)).then((response) => {
        //         // dispatch(fetchCategoriesTypeFile(project_id))
        //     });
        // }
    }
}

const ProjectFileAttachFormContainer = connectWithStore(ProjectFileAttachForm, mapStateToProps, mapDispatchToProps)

export default ProjectFileAttachFormContainer
