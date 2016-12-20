import React, { PropTypes } from 'react'

import CommandBarItem from '../CommandBarItem/CommandBarItem.js'


class CommandBar extends React.Component {
    static defaultProps = {        
        className: '',
        theme: '',

        items: [],
        farItems: [],
        overflowItems: [] 
        
    }

    componentDidMount() {
       
    }

    editorInit() {
     
    }

    _renderItems() {
        return this.props.items.map((item) => {
            return (
                <CommandBarItem {...item} />
            )
        })
    }

    _renderFarItems() {
        return this.props.farItems.map((item) => {
            return (
                <CommandBarItem {...item} />
            )
        })
    }

    _renderOverflowItems() {
        return (
            <CommandBarItem iconClass="fa fa-ellipsis-h" childItems={this.props.overflowItems} />
        )
    }
  

    render() {
        return (
            <div className={'CommandBar ' + this.props.className}>
                <div className="itemsArea">
                    {this._renderItems()}
                    {(this.props.overflowItems.length>0) ? this._renderOverflowItems() : ''}
                </div>
                <div className="farItemsArea">
                    {this._renderFarItems()}
                </div>
            </div>
        );
    }
}
CommandBar.propTypes = {
    // id: React.PropTypes.number,
    // body: React.PropTypes.string,
    // project_id: React.PropTypes.string.isRequired,
    // object_type: React.PropTypes.oneOf([OBJECT_TYPE_TASK, OBJECT_TYPE_MESSAGE]).isRequired,
    // object_id: React.PropTypes.string.isRequired,
    // profile_image_url : React.PropTypes.string
};

export default CommandBar