import React from 'react'
import heroes from './heroes.json'

class HeroPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedHero: "", heroLine: "", searchedHero: "", favoriteHeroes: [], showHeroList: false };
        this.generateFortune = this.generateFortune.bind(this);
        this.showHeroList = this.showHeroList.bind(this);
        this.isFavorite = this.isFavorite.bind(this);
        this.updateSearchedHero = this.updateSearchedHero.bind(this);
        this.updateFavoriteHeroesState = this.updateFavoriteHeroesState.bind(this);
    }

    selectRandom(element) {
        return element[Math.floor(Math.random() * element.length)];
    }

    mysteryFortune() {
        const selectedHero = this.selectRandom(heroes.roster);
        const heroLine = this.selectRandom(selectedHero.line);
        this.setState({selectedHero, heroLine})
    }

    generateFortune(hero) {
        const selectedHero = heroes.roster[hero];
        const heroLine = this.selectRandom(selectedHero.line);
        this.showHeroList();
        this.setState({selectedHero, heroLine})
    }

    updateSearchedHero(searchedHero) {
        this.setState({searchedHero});
    }

    updateFavoriteHeroesState(favoriteHeroes) {
        this.setState({favoriteHeroes: favoriteHeroes});
    }

    showHeroList() {
        this.setState({showHeroList: !this.state.showHeroList });
    }

    isFavorite(hero) {
        const favoriteHeroes = this.state.favoriteHeroes;
        return favoriteHeroes.includes(hero);
    }

    render() {
        const selectedHero = this.state.selectedHero;
        const heroLine = this.state.heroLine;
        const searchedHero = this.state.searchedHero;
        const showHeroList = this.state.showHeroList;
        const favoriteHeroes = this.state.favoriteHeroes;
        const isSelectedHeroFavorite = this.isFavorite(this.state.selectedHero.id);
        return (
            <div id="hero-page">
                <span className="mystery-hero-button" onClick={() => this.mysteryFortune()}>Mystery<span className="mystery-key">M</span></span>
                <span className="hero-name">{selectedHero.name}</span>
                <span id="hero-line" className="hero-line">{heroLine}</span>
                <div>
                    <div className="background-tint" style={{backgroundColor: selectedHero.color}}></div>
                    <img className="hero-image" src={selectedHero.background}/>
                </div>
                <span className="toggle-hero-list" onClick={() => this.showHeroList()}>Press <span className="key">H</span> to Switch Heroes</span>
                {isSelectedHeroFavorite && <span>This hero is a favorite!</span>}
                {showHeroList && <HeroList generateFortune={this.generateFortune} updateSearchedHero={this.updateSearchedHero} searchedHero={searchedHero} favoriteHeroes={favoriteHeroes} updateFavoriteHeroesState={this.updateFavoriteHeroesState} isFavorite={this.isFavorite}/>}
            </div>
        )
    }
}

class HeroList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentHero: "" };
        this.updateFavoriteHeroes = this.updateFavoriteHeroes.bind(this);
    }

    componentDidMount() {
        const favoriteHeroes = this.state.favoriteHeroes;
    }

    searchList(query) {
        const heroes = [...document.getElementsByClassName("hero")];
        const pattern = new RegExp(query.toLowerCase());
        let searchedHero;
        heroes.forEach(function(element) {
            const hero = element.dataset.hero.toLowerCase();
            if (query && pattern.test(hero)) {
                searchedHero = element.dataset.id;
                element.style.opacity = "1";
            } else {
                element.style.opacity = ".25";
            }
            if (!query) element.style.opacity = "1";
        });
        this.props.updateSearchedHero(searchedHero);
    }

    checkKey(key) {
        const heroSearchField = document.getElementById("heroSearchField");
        // Enter
        if(key === 13) {
            this.props.generateFortune(this.props.searchedHero);
        }
    }

    updateFavoriteHeroes(hero) {
        const favoriteHeroes = this.props.favoriteHeroes;
        // If the hero is a favorite, remove it
        if (favoriteHeroes.includes(hero)) {
            const heroPosition = favoriteHeroes.indexOf(hero);
            favoriteHeroes.splice(heroPosition, 1);
            this.props.updateFavoriteHeroesState(favoriteHeroes);
            return;
        }
        // If the hero isn't already a favorite, add it
        if (!favoriteHeroes.includes(hero)) {
            this.props.updateFavoriteHeroesState([...favoriteHeroes, hero]);
            return;
        }
    }

    render() {
        const heroList = heroes.roster.map((hero) =>
            <Hero key={hero.id} hero={hero} generateFortune={this.props.generateFortune} updateCurrentHero={this.updateCurrentHero} updateFavoriteHeroes={this.updateFavoriteHeroes} isFavorite={() => this.props.isFavorite(hero.id)}/>
        );
        const currentHero = this.state.currentHero;
        return (
            <div className="hero-list-container active">
                <input type="text" id="heroSearchField" className="search" onKeyDown={event => this.checkKey(event.keyCode)} onChange={event => this.searchList(event.target.value)}></input>
                <div className="hero-list">{heroList}</div>
            </div>
        )
    }
}

class Hero extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({ isFavorite: false });
    }

    componentDidMount() {
        const isFavorite = this.props.isFavorite();
        if(isFavorite) {
            this.setState({isFavorite: true});
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.isFavorite !== nextState.isFavorite) {
            return true;
        }
        return false;
    }

    componentWillReceiveProps() {
        const isFavorite = this.props.isFavorite();
        if (isFavorite) {
            this.setState({ isFavorite: true });
        } else {
            this.setState({ isFavorite: false });
        }
    }

    handleFavoriteState(hero) {
        this.props.updateFavoriteHeroes(hero);
        this.setState({isFavorite: !this.state.isFavorite});
    }

    render() {
        const hero = this.props.hero;
        const currentHero = this.props.currentHero;
        const isFavorite = this.state.isFavorite;
        return (
            <div className={`hero${isFavorite ? " favorite" : ""}`} data-id={hero.id} data-hero={hero.name}>
                <img className="hero-portrait"  onClick={() => this.props.generateFortune(hero.id)} src={hero.portrait} style={{backgroundColor: "black"}}/>
                <div className="favorite-icon-container" onClick={() => this.props.updateFavoriteHeroes(hero.id)}>
                    <svg className={`favorite-icon${isFavorite ? " active" : ""}`} width="24" height="22" viewBox="0 0 24 22" stroke="#FFC800"><path id="a" d="M12 18l-7.05342303 3.7082039L6.2936609 13.854102.5873218 8.29179607l7.8859667-1.14589804L12 0l3.5267115 7.14589803 7.8859667 1.14589804-5.7063391 5.56230593 1.3470839 7.8541019z"/></svg>
                </div>
                <span>{hero.name}</span>
            </div>
        )
    }
}

export default HeroPage
