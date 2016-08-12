import React, { Component } from 'react';
import ReactDom from 'react-dom';

import OrgHelper from '../../helpers/helper_org.js'

import { fetchOrgs, fetchOrgCurrent } from '../../actions/action_organization';
import {store} from '../../store/index.js';


class OrgForm extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        onDataUpdate: function(org) { },
        
        popup_id: '',
        settings : {},
        data : {
            id: '',
            org_title: '',
        }    
    }

    componentWillMount() {

    }

    componentDidMount() {
        
    }


    static showInPoup({settings={}, data={}, onDataUpdate=this.defaultProps.onDataUpdate()}) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach : true,
            message : '<div id="' + uniq + '"></div>',
            opacity: 0.5,
            blur: false,
            onopen : function(e){
              var pid = (jQuery(e).attr('id'));
              ReactDom.render(<OrgForm popup_id={pid} settings={settings} data={data} onDataUpdate={onDataUpdate} />, document.getElementById(uniq));
              console.log(pid);
              // setTimeout(() => jQuery('#'+pid).popup('hide'), 3000); 
            }
        });
    }


    hidePopup = () => {
        if (this.props.popup_id) {
            jQuery('#' + this.props.popup_id).popup('hide');
        }
    }


    handleSubmit = (e) => {
        e.preventDefault();

        let data = jQuery(this.refs.form).serialize();
        data = URI.parseQuery(data);

        var valid = jQuery(this.refs.form).valid();
        if (!valid) {return false};


        if (data.id) {
            var ajaxObj = OrgHelper.update(data);
            console.log("Update");
        } else {
            var ajaxObj = OrgHelper.store(data);
        }

        ajaxObj.then(function(response) {
            console.log(response);
            // this.props.fetchTags();
            store.dispatch(fetchOrgs()).then((response1) => {
                console.log('response1', response1)
                store.dispatch(fetchOrgCurrent(response1))
            });
            this.props.onDataUpdate(response.data.org)
            this.hidePopup();
        }.bind(this));

        return false;

    }



    render() {
        return (
            <div>
                <form className="form" ref='form' onSubmit={this.handleSubmit}>
                    <input type="hidden" className="form-control" ref="id" name="id" id="id" defaultValue={this.props.data.id} />
                    <div className="row">
                        <div className="col-md-8">
                            <h4>Organization</h4>
                            <div className="form-group">
                                <label className="col-sm-12 control-label">Organization Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control required" name="org_title" id="org_title" defaultValue={this.props.data.org_title} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-right">
                        <button type="submit" className="btn btn-success">Save</button>
                    </div>
                </form>

            </div>
        );
    }
}


export default OrgForm;