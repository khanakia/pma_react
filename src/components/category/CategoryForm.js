import React, { Component } from 'react';
import ReactDom from 'react-dom';

// import { fetchCategories } from '../../actions/action_category';
import {store} from '../../store/index.js';
import { CategoryHelper } from '../../helpers'

import CategoryTree2 from './CategoryTree2'

class CategoryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList : []
        }
    }

    static defaultProps = {
        onDataUpdate: function(org) { },
        popup_id: '',
        categoryList : [],
        data : {
            id: '',
            category_name: '',
            parent_id: '',
            project_id: '',
            object_type: '',
        }

    }

    componentWillMount() {
        // CategoryHelper.index().then((response) => {
        //     this.setState({
        //         categoryList : response.data
        //     })
        // });
    }

    componentDidMount() {
        
    }


    componentDidUpdate() {

    }

    static showInPoup({data={}, categoryList={}, onDataUpdate=this.defaultProps.onDataUpdate()}) {
        var uniq = 'id' + (new Date()).getTime();

        Controls.showpopup({
            detach : true,
            message : '<div id="' + uniq + '"></div>',
            container_class : "w500",
            opacity: 0.5,
            blur: false,
            onopen : function(e){
              var pid = (jQuery(e).attr('id'));
              ReactDom.render(<CategoryForm popup_id={pid} data={data} categoryList={categoryList} onDataUpdate={onDataUpdate} />, document.getElementById(uniq));
              // console.log(pid);
              // setTimeout(() => jQuery('#'+pid).popup('hide'), 3000); 
            },

            onclose: function(e) {
                ReactDom.unmountComponentAtNode(document.getElementById(uniq))
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

        var valid = jQuery(this.refs.form).valid();
        if (!valid) {return false};
        
        let data = jQuery(this.refs.form).serialize();
        // const dataJson = URI.parseQuery(data);

        // if (dataJson.id) {
        //     var ajaxObj = OrgHelper.update(data);
        //     console.log("Update");
        // } else {
        //     var ajaxObj = OrgHelper.store(data);
        // }

        CategoryHelper.save(data).then(function(response) {
            console.log(response);
            // this.props.fetchTags();
            // store.dispatch(fetchCategories())
            this.props.onDataUpdate(response.data.category)
            this.hidePopup();
        }.bind(this));

        return false;

    }

    onTreeChange(e, data) {
        console.log(data)
        var $parent_id = $(this.refs.parent_id);
        const selected_value = data.id;
        $parent_id.val(selected_value)
    }

    render() {

        return (
            <div>
                <div className="modal-header">
                    <h4 className="modal-title">Category Information</h4>
                </div>
                <form className="form" ref='form' onSubmit={this.handleSubmit}>
                    <input type="hidden" className="form-control" ref="project_id" name="project_id" id="project_id" defaultValue={this.props.data.project_id} />
                    <input type="hidden" className="form-control" ref="object_type" name="object_type" id="object_type" defaultValue={this.props.data.object_type} />
                    <input type="hidden" className="form-control" ref="id" name="id" id="id" defaultValue={this.props.data.id} />
                    <input type="hidden" className="form-control" ref="parent_id" name="parent_id" id="parent_id" defaultValue={this.props.data.parent_id} />

                    <div className="content-area">
                        <div className="form-group">
                            <label className="control-label">Category Name</label>
                            <input type="text" className="form-control required" name="category_name" id="category_name" defaultValue={this.props.data.text} />
                        </div>

                        <div className="form-group">
                            <label className="control-label">Select Parent</label>
                            
                            <CategoryTree2 
                                showControls={false} 
                                allMessageLabel="Move to Root" 
                                onItemClick={this.onTreeChange.bind(this)} 
                                selectedValue={this.props.data.parent_id} 
                                project_id={this.props.data.project_id} 
                                object_type={this.props.data.object_type} />
                        </div>

                    </div>
                    <div className="modal-footer text-right">
                        <button type="submit" className="btn btn-success">Save</button>
                    </div>
                </form>

            </div>
        );
    }
}


export default CategoryForm;
