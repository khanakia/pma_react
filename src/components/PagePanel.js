import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export default class Sidebar extends Component {
  componentWillMount() {
    console.log(this.props);

    this.sidebarClass = this.props.hasSidebar ? ' has-sidebar' : '';
  }
  render() {
    return (
		<div className={'page-panel' + this.sidebarClass} id={this.props.id}>
			{this.props.children}
		</div>
    )
  }
}

