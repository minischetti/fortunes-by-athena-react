import React from 'react'
import heroes from './heroes.json'

class HeroPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedHero: "", heroLine: "", searchedHero: "", favoriteHeroes: [], showHeroList: false };
        this.generateFortune = this.generateFortune.bind(this);
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


    // componentWillUpdate(nextProps, nextState) {
    //     var heroLine = document.getElementById("heroLine");
    //     heroLine.classList.remove("fadeIn");
    //     heroLine.classList.remove("fadeOut");
    //     heroLine.classList.add("fadeOut");
    //     // alert("Component will update after this alert...");
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     var heroLine = document.getElementById("heroLine");
    //     heroLine.classList.remove("fadeOut");
    //     heroLine.classList.remove("fadeIn");
    //     heroLine.classList.add("fadeIn");
    //     // alert("Component just updated...");
    // }

    render() {
        const selectedHero = this.state.selectedHero;
        const heroLine = this.state.heroLine;
        const searchedHero = this.state.searchedHero;
        const showHeroList = this.state.showHeroList;
        const favoriteHeroes = this.state.favoriteHeroes;
        return (
            <div>
                <span className="mysteryHeroButton" onClick={() => this.mysteryFortune()}>Mystery<span className="mysteryKey">M</span></span>
                <span className="heroName">{selectedHero.name}</span>
                <span id="heroLine" className="heroLine">{heroLine}</span>
                <div>
                    <div className="backgroundTint" style={{backgroundColor: selectedHero.color}}></div>
                    <img className="heroImage" src={selectedHero.background}/>
                </div>
                <span onClick={() => this.showHeroList()}>Show Hero List</span>
                {showHeroList && <HeroList generateFortune={this.generateFortune} updateSearchedHero={this.updateSearchedHero} searchedHero={searchedHero} favoriteHeroes={favoriteHeroes} updateFavoriteHeroesState={this.updateFavoriteHeroesState}/>}
            </div>
        )
    }
}

class HeroList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showContextMenu: false, currentHero: "" };
        this.showContextMenu = this.showContextMenu.bind(this);
        this.updateFavoriteHeroes = this.updateFavoriteHeroes.bind(this);
        this.isFavorite = this.isFavorite.bind(this);
    }

    componentDidMount() {
        const favoriteHeroes = this.state.favoriteHeroes;
        this.setState({favoriteHeroes: this.props.favoriteHeroes});
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

    showContextMenu(hero) {
        this.setState({ showContextMenu: true, currentHero: hero });
    }

    updateFavoriteHeroes(hero) {
        const favoriteHeroes = this.props.favoriteHeroes;
        // If the hero isn't already a favorite, add it
        if (!favoriteHeroes.includes(hero)) {
            this.props.updateFavoriteHeroesState([...favoriteHeroes, hero]);
        }
        // If the hero is a favorite, remove it
        if (favoriteHeroes.includes(hero)) {
            const heroPosition = favoriteHeroes.indexOf(hero);
            favoriteHeroes.splice(heroPosition, 1);
            this.props.updateFavoriteHeroesState(favoriteHeroes);
        }
    }

    isFavorite(hero) {
        const favoriteHeroes = this.props.favoriteHeroes;
        return favoriteHeroes.includes(hero);
    }

    render() {
        const heroList = heroes.roster.map((hero) =>
            <Hero key={hero.id} hero={hero} generateFortune={this.props.generateFortune} showContextMenu={this.showContextMenu} updateCurrentHero={this.updateCurrentHero} updateFavoriteHeroes={this.updateFavoriteHeroes} isFavorite={() => this.isFavorite(hero.id)}/>
        );
        const showContextMenu = this.state.showContextMenu;
        const currentHero = this.state.currentHero;
        return (
            <div>
                {showContextMenu && <ContextMenu hero={currentHero} updateFavoriteHeroes={this.updateFavoriteHeroes}/>}
                <input type="text" id="heroSearchField" onKeyDown={event => this.checkKey(event.keyCode)} onChange={event => this.searchList(event.target.value)}></input>
                <ul>{heroList}</ul>
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

    handleFavoriteState(hero) {
        this.props.updateFavoriteHeroes(hero);
        this.setState({isFavorite: !this.state.isFavorite});
    }

    render() {
        const hero = this.props.hero;
        const isFavorite = this.state.isFavorite;
        const favoriteStatus = isFavorite ? "Remove Favorite" : "Add Favorite";
        return (
            <div>
                <img className="hero" src={hero.portrait} style={{backgroundColor: hero.color}} onClick={() => this.props.generateFortune(hero.id)} onContextMenu={() => this.props.showContextMenu(hero.id)} data-id={hero.id} data-hero={hero.name}/>
                <button onClick={() => this.handleFavoriteState(hero.id)}>{favoriteStatus}</button>
                {isFavorite && <span>{hero.name} has been added to your favorites!</span>}
            </div>
        )
    }
}

class ContextMenu extends React.Component {
    constructor(props) {
        super(props);
        this.positionMenu = this.positionMenu.bind(this);
    }

    positionMenu(event) {
        const contextMenu = document.getElementById("contextMenu");
        // Position menu at cursor
        const xPos = event.clientX;
        const yPos = event.clientY;

        event.preventDefault();

        // Position the menu via CSS
        contextMenu.style.left = xPos + "px";
        contextMenu.style.top = yPos + "px";
    }

    componentDidMount() {
        this.positionMenu(event);
    }
    
    componentDidUpdate() {
        this.positionMenu(event);
    }

    render() {
        return (
            <div id="contextMenu">
                <span onClick={(hero) => this.props.updateFavoriteHeroes(hero)}>Add to Favorites</span>
            </div>
        )
    }
}

export default HeroPage
