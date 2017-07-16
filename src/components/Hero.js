import React from 'react'

class Hero extends React.Component {
    render() {
        return (
            <div>
                <span className="hero-name">{this.props.heroName}</span>
                <br/>
                <span className="hero-line">{this.props.heroLine}</span>
            </div>
        )
    }
}

export default Hero