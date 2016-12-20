import React, { PropTypes } from 'react'

class DropdownMenu extends React.Component {
    static defaultProps = {    
        className: '',
        title: '',

        items: []        
    }

    componentDidMount() {
       
    }

    _renderChildItems() {
        return(
            <ul className="dropdown-menu dropdown-menu-right">
                {this.props.items.map((item) => {
                    if(!item.isVisible) return null;
                    return (
                        <li key={item.key} className="li-dropdownMenuItem">
                            <a href="#" onClick={(e)=>{e.preventDefault(); item.onClick()}}>
                                <i className={item.iconClass} ></i>{item.value}
                            </a>
                        </li>
                    )
                })}
            </ul>
        )
    }

    render() {
        return (
            <div className={'DropdownMenu dropdown' + this.props.className}>
                <a href="#" className="dropdown-toggle btn btn-plain" data-toggle="dropdown" role="button"><i className="fa fa-ellipsis-v"></i></a>
                {this._renderChildItems()}
            </div>
        )
    }
}
DropdownMenu.propTypes = {

};

export default DropdownMenu