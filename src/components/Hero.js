import React from 'react'

class Hero extends React.Component {
    render() {
        return (
            <img className="hero" src={hero.portrait} style={{backgroundColor: hero.color}} onClick={() => this.setHero(hero.id)} key={hero.id} data-id={hero.id} data-hero={hero.name}/>
        )
    }
}

export default Hero