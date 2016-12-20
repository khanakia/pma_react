import React, { Component } from 'react';
// import ReactDom from 'react-dom';
// import {connectWithStore} from '../../store/index.js';

// import CompanyHelper from '../../helpers/helper_company'
// import { fetchProjectUsers } from '../../actions/action_project';

class NotifyUsersDdl extends Component {
  

    static defaultProps = {
        className : '',
        name : 'notifypeoples[]',
        projectUsers : [],
        selectedUsers : [],
        onChange : function() {},
    }

    componentWillMount() {
        
    }
    
    componentDidMount() {
        this.selectpickerInit();
    }

    // shouldComponentUpdate = (nextProps, nextState, nextContext) => {
    //     // return !(nextProps.projectUsers == this.props.projectUsers);
    // }

    componentDidUpdate() {
        // this.selectpickerInit();
        // console.info("ControlNotifyPeople componentDidUpdate")
    }

    selectpickerInit() {
        jQuery(this.refs.controlnotifypeople).selectpicker('destroy'); // Destroy already initiated instance so we can reinit it with new data
        
        jQuery(this.refs.controlnotifypeople).selectpicker({
            actionsBox : true
        });

        // Set Selected Values
        jQuery(this.refs.controlnotifypeople).selectpicker('val', _.map(this.props.selectedUsers, 'id'));
        
    }

    renderList(items) {
        return items.map((item) => {
            return (
                <option key={item.id} value={item.user_id} >{item.user.fullname}</option>
            );
        });
    }

    render() {
        
        const data = this.props.projectUsers
        return (
            <span className="control-controlnotifypeople">
                <select className={ 'controlnotifypeople' + this.props.className} ref="controlnotifypeople" name={this.props.name} onChange={(e) => this.props.onChange(e)} multiple={true} >
                    {this.renderList(data)}
                </select>
            </span>
        );
    }
}


NotifyUsersDdl.propTypes = {
    projectUsers: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        user_id: React.PropTypes.number.isRequired,
        user: React.PropTypes.shape({
            // fullname: React.PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired).isRequired,
};

export default NotifyUsersDdl;



