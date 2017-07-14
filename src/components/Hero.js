import React from 'react'

class Hero extends React.Component {
    render() {
        return (
            <span className="hero">{this.props.hero}</span>
        )
    }
}

export default Hero