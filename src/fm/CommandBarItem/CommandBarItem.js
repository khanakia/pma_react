import React, { PropTypes } from 'react'


class CommandBarItem extends React.Component {
    static defaultProps = {        
        className: '',
        theme: '',

        key: [],
        value: [],
        iconClass: '',
        onClick: function(){},

        childItems: [],

        isVisible : true
        
    }

    componentDidMount() {
        // this.refs.CommandBarItem.
    }

    _renderChildItems() {
        return(
            <ul className="subMenu">
                {this.props.childItems.map((item) => {
                    return (
                        <li key={item.key}>
                            <a href="#" onClick={(e)=>{e.preventDefault(); item.onClick()}}>
                                <i className={item.iconClass} ></i>{item.value}
                            </a>
                        </li>
                    )
                })}
            </ul>
        )
    }


    handleClick() {
        jQuery(this.refs.CommandBarItem).find('.subMenu').toggle().toggleClass("toggle-active");

        jQuery(document).click(function(e){
            jQuery(".subMenu.toggle-active").toggle().toggleClass("toggle-active")
        })

    }
  
    render() {
        let classExtra = this.props.childItems.length>0 ? ' has-child ' : ''
        classExtra = !this.props.isVisible ? 'isVisible-false' : '';

        return (
            <div ref="CommandBarItem" onClick={() => this.handleClick()} className={'CommandBarItem ' + this.props.className + classExtra}>
                <button onClick={this.props.onClick}>
                    <i className={this.props.iconClass} ></i>
                    <span>{this.props.value}</span>
                </button>
                {this._renderChildItems()}
            </div>
        );
    }
}
CommandBarItem.propTypes = {
    
};

export default CommandBarItem