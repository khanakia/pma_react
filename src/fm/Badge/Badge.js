import React, { PropTypes } from 'react'

class Badge extends React.Component {
    static defaultProps = {        
        title: '',
        colorScheme: 'grey',
        isVisible: true

        
    }

    componentDidMount() {
       
    }

  

    render() {
        if(!this.props.isVisible) {
            return null
        }
        return (
            <div className={'Badge ' + this.props.colorScheme}>
                <span>{this.props.title}</span>
            </div>
        )
    }
}
Badge.propTypes = {

};

export default Badge