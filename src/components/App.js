import React from 'react'
import heroes from './heroes.json'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedHero: "", heroLine: "" };
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

    mysteryHero() {
        const selectedHero = heroes.roster[Math.floor(Math.random() * heroes.roster.length)]
        const heroLine = selectedHero.line[Math.floor(Math.random() * selectedHero.line.length)]
        this.props.mysteryHero(selectedHero, heroLine);
    }

    render() {
        return (
            <div>
                 <span onClick={this.mysteryHero}>Mystery Hero</span> 
                  <span>{this.props.selectedHero.name}</span>
                <br/>
                 <span>{this.props.heroLine}</span> 
            </div>
        )
    }
}

export default App