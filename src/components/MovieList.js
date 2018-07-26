import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Icon, Container, Button, Grid, Header, Checkbox } from 'semantic-ui-react'
import movieStore from '../store/movieStore';
import poster from '../assets/images/noposter.jpg'
import './MovieList.css';
import Spinner from './Spinner';
export default class MovieList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            compareIds: []
        }
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        this.setState({ isLoad: true });
        movieStore.addChangeListener(this.onChange);
        movieStore.loadMovies();
    }
    componentWillUnmount() {
        movieStore.removeChangeListener(this.onChange);
    }
    onChange() {
        let movies = movieStore.getTopMovies();
        this.setState({
            movies: [...movies],
            isLoad: false
        });
    }
    onCardClicked = (e) => {
        console.log(e.target.id);
        console.log(e.target.checked);
        let id = e.target.id;
        if (e.target.checked) {
            this.state.compareIds.push(parseInt(id,10));
        }
        else {
            this.state.compareIds.splice(this.state.compareIds.indexOf(id), 1);
        }
        this.setState({ compareIds: this.state.compareIds });
    }
    onBuy=(e)=>{
        window.open("https://www.zocdoc.com/", "_blank")
    }
    createMovieCard(item) {
        return (

            <Card color='blue' key={item.Id}  >

                <Card.Content>
                    <Image floated='right' size='mini' src={poster} />
                    <Card.Header>{item.Name}</Card.Header>
                    <Card.Meta>Rank {item.Rank}</Card.Meta>
                    <Card.Description></Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Container>
                        <Checkbox label="Compare" onClick={this.onCardClicked} id={item.Id} />
                        <Button primary floated="right" onClick={this.onBuy}>Buy</Button>
                    </Container>
                </Card.Content>
            </Card>

        )
    }

    onFilter = (e) => {
        movieStore.setCompareMoviesIds(this.state.compareIds);
        this.context.router.history.push('compare')
    }
    render() {

        return (
            <Spinner isLoad={this.state.isLoad}>
                <Grid textAlign="center" className="marginTop20">

                    <Header as='h2' icon textAlign='center'>
                        <Icon name='picture' circular />
                        <Header.Content>Top Movies</Header.Content>
                    </Header>
                </Grid>
                <Container textAlign="right">
                    <Button className="filterbtn" color='teal' disabled={this.state.compareIds.length > 1 ? false : true} onClick={this.onFilter}>Filter</Button>
                </Container>
                <Card.Group itemsPerRow={3}>
                    {
                        this.state.movies.map((item) => {
                            return (
                                this.createMovieCard(item)
                            )
                        })
                    }
                </Card.Group>

            </Spinner>
        )
    }
}
MovieList.contextTypes = {
    router: PropTypes.object.isRequired,
};