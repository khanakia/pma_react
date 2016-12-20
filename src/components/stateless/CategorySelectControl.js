import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {connectWithStore} from '../../store/index.js';

import {store} from '../../store/index.js';

import { fetchCategories } from '../../actions/action_category';

class CategorySelectControl extends Component {
    constructor(props) {
        super(props);

    }

    static defaultProps = {
        
        className : '',
        name : 'category_select',

        categoryList : [],
        selectedValues : [],

        project_id : '',
        object_type : '',
    }

    componentWillMount() {
        // this.props.fetchCategories(this.props.project_id, this.props.object_type)
    }


    componentDidMount() {
       jQuery(this.refs.btn_selectcat).click(function(){
            jQuery("#tree").toggle('fast');
        })

        var tree = this.getNestedChildren(this.props.categoryList,null);
        console.log('this.props.categoryList', tree)
        $('#tree').treeview({
            data: tree,
            showCheckbox: true,
            highlightSelected : false
            
        });

        $('#tree').on('nodeChecked nodeUnchecked ', function(event, data) {
                // Your logic goes here
                // console.log(data)
                // var getChecked = $('#tree').treeview('getChecked');
                this.paintDisplayText()
                this.paintInputArray()

               
        }.bind(this));

        // _.forEach(this.props.selectedValues, function(item){
        //     var index = _.findIndex(this.props.categoryList, {'id':item.id})
        //     $('#tree').treeview('checkNode', [ index ]);
        // }.bind(this))
    
        this.paintDisplayText()
        this.paintInputArray()

        // console.info("this.props.selectedValues", this.props.selectedValues)

    }

    componentDidUpdate() {
        // if (jQuery.isEmptyObject(this.props.categoryList)) return false;

 
     

    }

    paintDisplayText() {
        var selectedText = [];
        var getCheckedItems = $(this.refs.category_tree).treeview('getChecked');
        _.forEach(getCheckedItems, function(item){
            selectedText.push(item.category_name)
        });
        var text = _.join(selectedText, ',');
        text = text ? text : 'No Category';
        jQuery(this.refs.btn_selectcat).text(text);
    }

    paintInputArray() {
        var getCheckedItems = $(this.refs.category_tree).treeview('getChecked');
        jQuery(this.refs.input_list).html('')
        _.forEach(getCheckedItems, function(item){
            jQuery(this.refs.input_list).append('<input type="hidden" name="categories[]" value="' + item.id + '"" />');
        }.bind(this));
    }

    getNestedChildren(arr, parent_id) {
        var out = []
        
        for(var i in arr) {
            arr[i].text = arr[i].category_name
            var index = _.findIndex(this.props.selectedValues, {'id':arr[i].id})
            if(index>=0) {
                arr[i].state = {
                    checked: true
                }
            }
            if(arr[i].parent_id == parent_id) {
                var children = this.getNestedChildren(arr, arr[i].id)

                if(children.length) {
                    arr[i].nodes = children
                }
                out.push(arr[i])
            }
        }
        return out
    }


    render() {
        // console.log('this.categoryList', this.props.categoryList)
        return (

            <div className="control-categoryselect">
                <button className="btn btn-default" ref="btn_selectcat" type="button">No Category</button>
                <div className="" ref="input_list">
                </div>
                
                <div id="tree" ref="category_tree" style={{display: 'none'}}></div>
            </div>
        );
    }
}


export default CategorySelectControl;

