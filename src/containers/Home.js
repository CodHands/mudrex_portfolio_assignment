import React, { Component, Fragment } from 'react'
//components
import Header from './../components/Header';
import DataTable from './../components/DataTable';
import MyPortfolio from './MyPortfolio';

class home extends Component {

    constructor(props){
        super(props);
        this.state = {
            open: false,
            portfolioData: localStorage.getItem('portfolio') ? localStorage.getItem('portfolio') : [] 
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    render() {
        return (
            <Fragment>
                <Header openDialog={this.handleClickOpen} />
                <div className="app-container pt-5">
                    <DataTable/>
                    <MyPortfolio 
                        isOpen={this.state.open} 
                        handleClose={this.handleClose}
                        portfolioData={this.state.portfolioData}
                    />
                </div>
            </Fragment>
        )
    }
}

export default home;
