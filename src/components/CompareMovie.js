import React, { Component } from 'react';
import movieStore from '../store/movieStore';
import Spinner from './Spinner';
export default class CompareMovie extends Component {
    constructor() {
        super()
        this.state = {
            moviesDetails: [],
        }
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount() {
        this.setState({ isLoad: true });
        movieStore.addChangeListener(this.onChange);
        movieStore.loadMoviesDetails();
    }
    componentWillUnmount() {
        movieStore.removeChangeListener(this.onChange);
    }
    onChange() {
        let moviesDetails = movieStore.getMoviesDetails();
        this.setState({
            moviesDetails: [...moviesDetails],
            isLoad: false
        });
    }
    render() {
        let moviesDetails = this.state.moviesDetails;
        return (
            <Spinner isLoad={this.state.isLoad}>

                <table class="ui compact celled definition table">
                    <thead>
                        <tr>
                            <th></th>
                            {
                                moviesDetails.map(item => {
                                    return (
                                        <th>{item.Name}</th>
                                    )
                                })
                            }

                        </tr></thead><tbody>
                        <tr>
                            <td>Actors</td>
                            {
                                moviesDetails.map(item => {
                                    let actors = item.Actors.join(',');
                                    return (
                                        <td>{actors}</td>
                                    )
                                })
                            }

                        </tr>
                        <tr>
                            <td>Description</td>
                            {
                                moviesDetails.map(item => {
                                    return (
                                        <td>{item.Description}</td>
                                    )
                                })
                            }

                        </tr>
                        <tr>
                            <td>Director</td>
                            {
                                moviesDetails.map(item => {
                                    return (
                                        <td>{item.Director}</td>
                                    )
                                })
                            }

                        </tr>
                        <tr>
                            <td>Duration</td>
                            {
                                moviesDetails.map(item => {
                                    return (
                                        <td>{item.Duration}</td>
                                    )
                                })
                            }

                        </tr>
                        <tr>
                            <td>Genres</td>
                            {
                                moviesDetails.map(item => {
                                    let gen = item.Genres.join(',');
                                    return (
                                        <td>{gen}</td>
                                    )
                                })
                            }

                        </tr>
                    </tbody>
                </table>
            </Spinner>
        )

    }
}