import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {connectWithStore} from '../../store/index.js';

import { Auth, ProjectFileHelper, ProjectFileVersionHelper } from '../../helpers'

import { API_URL_PROJECT_FILE, OBJECT_TYPE_FILE, google_developerKey, google_clientId, google_appId } from '../../config.js'

var scope = ['https://www.googleapis.com/auth/drive.readonly'];
var pickerApiLoaded = false;
var oauthToken;

class GooglePicker extends Component {
    constructor(props) {
        super(props);

        this.unique_id = Auth.getUserID()+'_'+(new Date()).getTime();
        this.uploadedFiles = []

    }

    static defaultProps = {
        onFilesSelected: function(data) {},
        popup_id: '',
        settings : {},
        data : {
            id : ''
        },

        project_id : ''
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.googlePickerInit()
    }

    componentDidUpdate() {
        // this.googlePickerInit()
    }

    googlePickerInit() {
        var _this = this;

        // Use the API Loader script to load google.picker and gapi.auth.
        function onApiLoad() {}
        jQuery(this.refs.picker_btn).click(function(e){
            e.preventDefault()
            gapi.load('auth', { 'callback': onAuthApiLoad });
            gapi.load('picker', { 'callback': onPickerApiLoad });
        }.bind(this))

        function onAuthApiLoad() {
          
          var token = window.gapi.auth.getToken();
          
          if (!token) {
            
            window.gapi.auth.authorize({
                    'client_id': google_clientId,
                    'scope': scope,
                    'immediate': false
                },
                handleAuthResult);
          }
        }

        function onPickerApiLoad() {
          pickerApiLoaded = true;
          createPicker();
        }

        function handleAuthResult(authResult) {
          if (authResult && !authResult.error) {
              oauthToken = authResult.access_token;
              createPicker();
          }
        }

        // Create and render a Picker object for picking user Photos.
        function createPicker() {
          
          if (pickerApiLoaded && oauthToken) {
              var view = new google.picker.View(google.picker.ViewId.DOCS);
              view.setMimeTypes("image/png,image/jpeg,image/jpg");
              var picker = new google.picker.PickerBuilder()
                  .enableFeature(google.picker.Feature.NAV_HIDDEN)
                  .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                  .setAppId(google_appId)
                  .setOAuthToken(oauthToken)
                  .addView(view)
                  .addView(new google.picker.DocsUploadView())
                  .setDeveloperKey(google_developerKey)
                  .setCallback(pickerCallback)
                  .build();
              picker.setVisible(true);
          }
        }

        // A simple callback implementation.
        function pickerCallback(data) {
          if (data.action == google.picker.Action.PICKED) {
              // console.log(data.docs)
              // var fileId = data.docs[0].id;
              _this.props.onFilesSelected(data);
              // alert('The user selected: ' + fileId);
          }
        }

    }



    hidePopup = () => {
        if (this.props.popup_id) {
            jQuery('#' + this.props.popup_id).popup('hide');
        }
    }

 

    handleSubmit = (e) => {
        e.preventDefault();

        // var data = {
        //     project_id : this.props.project_id,
        //     unique_id : this.unique_id,
        // }

        let data = jQuery(this.refs.form).serialize();

        // data = jQuery.param(data)
        
        ProjectFileHelper.store(data).then(function(response) {
            this.props.onDataUpdate(response)
            this.hidePopup();
        }.bind(this));

        return false;

    }
  
    render() {
        // console.log("this.props.data", this.props.data)
        return (
            <span className="comp-googlepicker">
               <a ref="picker_btn" href="#" className="btn btn-green-bordered"><i className="fa fa-cloud"></i>Google Drive</a>
            </span>
        );
    }
}


// export default ProjectFileUploadForm;


import { fetchProjectFiles} from '../../actions/action_project';

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
        fetchProjectFiles: (project_id) => {
            dispatch(fetchProjectFiles(project_id)).then((response) => {
                // dispatch(fetchCategoriesTypeFile(project_id))
            });
        }
    }
}

const GooglePickerContainer = connectWithStore(GooglePicker, mapStateToProps, mapDispatchToProps)

export default GooglePickerContainer
