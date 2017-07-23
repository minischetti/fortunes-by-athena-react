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

    selectRandom(element) {
        return element[Math.floor(Math.random() * element.length)];
    }

    render() {
        var selectedHero = this.state.selectedHero;
        var heroLine = this.state.heroLine;
        return (
            <div>
                <HeroPage selectRandom={this.selectRandom} mysteryHero={this.updateHeroState} selectedHero={selectedHero} heroLine={heroLine}/>
                <HeroList selectRandom={this.selectRandom} setHero={this.updateHeroState} mysteryHero={this.updateHeroState} selectedHero={selectedHero} heroLine={heroLine}/>
            </div>
        )
    }
}

class HeroPage extends React.Component {
    constructor(props) {
        super(props);
        this.mysteryHero = this.mysteryHero.bind(this);
    }

    mysteryHero() {
        var selectedHero = this.props.selectRandom(heroes.roster);
        var heroLine = this.props.selectRandom(selectedHero.line);
        this.props.mysteryHero(selectedHero, heroLine);
        console.log(selectedHero);
    }

    componentWillUpdate(nextProps, nextState) {
        // alert("Component will update after this alert...");
    }

    componentDidUpdate(prevProps, prevState) {
        // alert("Component just updated...");
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

class HeroList extends React.Component {
    constructor(props) {
        super(props);
        this.setHero = this.setHero.bind(this);
    }

    searchList(query) {
        const heroes = [...document.getElementsByClassName("hero")];
        var searchedHero;
        heroes.forEach(function(element) {
            if (query === element.innerHTML) {
                searchedHero = element.dataset.hero;
                element.style.backgroundColor = "red";
                console.log("We've found " + query + "!");
                console.log(searchedHero);
            } else {
                element.style.backgroundColor = "initial";
            }
        })

        return (this.setHero(searchedHero));
    }

    setHero(hero) {
        var selectedHero = heroes.roster[hero]; 
        var heroLine = this.props.selectRandom(selectedHero.line);
        this.props.setHero(selectedHero, heroLine);
        console.log(selectedHero);
    }

    render() {
        const heroList = heroes.roster.map((hero) =>
            <li className="hero" onClick={() => this.setHero(hero.id)} key={hero.id} data-hero={hero.id}>{hero.name}</li>
        );
        return (
            <div>
                <input type="text" onChange={event => this.searchList(event.target.value)}></input>
                <ul>{heroList}</ul>
            </div>
        )
    }
}

export default App