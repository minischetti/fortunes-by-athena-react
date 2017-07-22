import React from 'react'
import heroes from './heroes.json'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedHero: "", heroLine: ""};
        this.updateHeroState = this.updateHeroState.bind(this);
    }

    updateHeroState(selectedHero, heroLine) {
        this.setState({selectedHero, heroLine})
    }

    render() {
        const selectedHero = this.state.selectedHero;
        const heroLine = this.state.heroLine;
        return (
            <HeroPage mysteryHero={this.updateHeroState} selectedHero={selectedHero} heroLine={heroLine}/>
        )
    }
}

class HeroPage extends React.Component {
    constructor(props) {
        super(props);
        this.mysteryHero = this.mysteryHero.bind(this);
    }


    selectRandom(element) {
        return element[Math.floor(Math.random() * element.length)]
    }

    mysteryHero() {
        const selectedHero = this.selectRandom(heroes.roster)
        const heroLine = this.selectRandom(selectedHero.line)
        this.props.mysteryHero(selectedHero, heroLine);
    }
    render() {
        return (
            <div>
                <span className="mysteryHeroButton" onClick={this.mysteryHero}>Mystery<span className="mysteryKey">M</span></span> 
                <span>{this.props.selectedHero.name}</span>
                <br/>
                <span>{this.props.heroLine}</span>
                <div className="backgroundTint" style={{backgroundColor: this.props.selectedHero.color}}></div>
                <img className="heroImage" src={this.props.selectedHero.image}/>
            </div>
        )
    }
}

export default App