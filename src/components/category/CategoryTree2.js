import { connect } from 'react-redux'

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';

import {connectWithStore} from '../../store/index.js';

import { fetchCategoriesTypeMessage, fetchCategoriesTypeFile } from '../../actions/action_category';
import { Util, CategoryHelper } from '../../helpers'
import CategoryForm from './CategoryForm'

class CategoryTree2 extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        onItemClick: function(e, data) { },
        onDeleted: function(data) { },
        onUpdated: function() { },
        selectedValue : 0,
        showControls : true,
        allMessageLabel : 'All Messages',

        // categoryList : [],

        // Required for Creating New Category
        project_id : '',
        object_type : '',
    }

    componentWillMount() {
        const object_type = this.props.object_type
        if(object_type=='file') {
            this.props.fetchCategoriesTypeFile(this.props.project_id)
        }

        if(object_type=='message') {
            this.props.fetchCategoriesTypeMessage(this.props.project_id)
        }
        // console.log('this.props', this.props)
    }

    componentDidMount() {
        
        
    }

    componentDidUpdate() {
        
        this.buildJsTree()

  
    }

    onItemClick(e, data) {
        e.preventDefault()

        // Add Selected Class
        jQuery(this.refs.category_list_tree).find('li').removeClass("selected");
        jQuery(e.target).parent("li").addClass("selected")

        // Hide Show Controls
        
        if(data.id=="") {
            jQuery(this.refs.edit_controls_span).hide();
        } else {
            jQuery(this.refs.edit_controls_span).show();
        }

        if(jQuery(e.target).parent("li").hasClass('has_childrens')) {
            jQuery(this.refs.btn_trash).hide();
        } else {
            jQuery(this.refs.btn_trash).show();
        }

        this.props.onItemClick(e,data)
    }

    buildJsTree() {
        // if (jQuery.isEmptyObject(this.props.categoryList)) return false;

        // var $tree = $(this.refs.category_list_tree);

        // var treeData = this.getTree()

        
        // console.log(treeData)
    }


    isSelected(item) {
        if(item.id==this.props.selectedValue) return 'selected';
        return ''
    }

    hasChildrens(item) {
        if(item.children) return 'has_childrens';
        return ''
    }

    renderList(items, level) {
        if(undefined==items) return false;
        return items.map((item) => {
            return (
                <li className={' ' + 'level_'+level +' ' +this.isSelected(item) + ' '+ this.hasChildrens(item)} key={item.id} data-id={item.id} data-level={level} data-json={JSON.stringify(item)} data-name={item.category_name}>
                    <a href="#" onClick={(e)=>this.onItemClick(e, item)}>{item.category_name}</a>
                    {this.renderUl(item.children, level+1)}
                </li>
            );
        });
    }

    renderUl(items, level) {
        
        if(undefined==items) return false;
        return (
            <ul>
                {this.renderList(items, level)}
            </ul>
        );
    }

    getTree() {
        const object_type = this.props.object_type
        if(object_type=='file') {
            return this.getNestedChildren(this.props.type_file_list,null)
        }

        if(object_type=='message') {
            return this.getNestedChildren(this.props.type_message_list,null)
        }
    }

    getNestedChildren(arr, parent_id) {
        // console.log("arr", arr)
        var data = this._getNestedChildren(arr, parent_id)
        var allMessage = {
                category_name : this.props.allMessageLabel,
                id : '',
                parent_id : null
            }
        data.unshift(allMessage)
        
        return data
    }


    _getNestedChildren(arr, parent_id) {
        var out = []
        for(var i in arr) {
            arr[i].text = arr[i].category_name
            if(arr[i].parent_id == parent_id) {
                var children = this._getNestedChildren(arr, arr[i].id)

                if(children.length) {
                    arr[i].children = children
                }
                out.push(arr[i])
            }
        }
        return out
    }

    removeCategory(e) {
        $.confirm({
            title: '',
            content: 'Are you sure you want to remove ?',
            confirmButton: 'Yes',
            cancelButton: 'No',
            confirm: function(){

            // var data = $('.category_list_tree').treeview('getSelected');
            var $tree = $(this.refs.category_list_tree);
            var selectedItemID = $tree.find("li.selected").data("id");
            // console.log(selectedItemID)
            CategoryHelper.delete(selectedItemID).then((response) => {
                this.props.onDeleted(selectedItemID);
            });

            }.bind(this)
        });
    }

    editCategory(e) {
        var $tree = $(this.refs.category_list_tree);
        // var data = $tree.find("li.selected").data("json");

        var data = (jQuery.parseJSON($tree.find("li.selected").attr("data-json")))  

        
        CategoryForm.showInPoup({data, categoryList:this.props.categoryList,  onDataUpdate:this.props.onUpdated})
    }

    createCategory(e) {
        // console.log(this.getTree());
        var data = {
            project_id : this.props.project_id,
            object_type : this.props.object_type
        }
        CategoryForm.showInPoup({data:data, categoryList:this.getTree(),  onDataUpdate:this.props.onUpdated})
    }


    render() {
        const data = this.getTree()
        return (
            <div className="mt20">
                {this.props.showControls ?
                    <div className="">
                        <button className="btn btn-xs btn-plain" onClick={(e) => this.createCategory(e)}><i className="fa fa-plus"></i></button>
                        <span className="pull-right" ref="edit_controls_span">
                            <button className="btn btn-xs btn-plain mr10" ref="btn_edit" onClick={(e) => this.editCategory(e)}><i className="fa fa-pencil"></i></button>
                            <button className="btn btn-xs btn-plain" ref="btn_trash" onClick={() => this.removeCategory()}><i className="fa fa-trash"></i></button>
                        </span>
                    </div>
                    : ''
                }
                <div className="category_list_tree" ref="category_list_tree">
                    {this.renderUl(data, 0)}
                </div>

            </div>
        );
    }
}


// export default CategoryTree2;



const mapStateToProps = (state) => {
    
    return {
        state : state,
        current_org: state.appdata.current_org,
        type_message_list: state.category.type_message_list,
        type_file_list: state.category.type_file_list,
    };
}

const mapDispatchToProps = (dispatch) => {
    
    return {
        dispatch,
        fetchCategoriesTypeMessage: (project_id) => {
            dispatch(fetchCategoriesTypeMessage(project_id))
        },

        fetchCategoriesTypeFile: (project_id) => {
            dispatch(fetchCategoriesTypeFile(project_id))
        }


    }
}

const CategoryTreeContainer = connectWithStore(CategoryTree2, mapStateToProps, mapDispatchToProps)

export default CategoryTreeContainer
