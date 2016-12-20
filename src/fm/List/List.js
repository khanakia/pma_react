import React, { PropTypes } from 'react'

class List extends React.Component {
    static defaultProps = {        
        className: '',
        theme: '',

        items: [],
        farItems: [],
        overflowItems: [] 
        
    }

    componentDidMount() {
       
    }

    _renderItems() {
        return this.props.items.map((item) => {
            return (
                "sdfds"
            )
        })
    }
  

    render() {
        return (
            <div className={'fm-List ' + this.props.className}>
               dddd
            </div>
        );
    }
}
List.propTypes = {
    
};

export default List