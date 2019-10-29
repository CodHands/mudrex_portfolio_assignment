import React, { Component } from 'react'
import Layout from './../components/Layout';
import currencyFormatter from 'currency-formatter'

//pie chart import
import {Pie} from 'react-chartjs-2';
import PortfolioTable from './../components/PortfolioTable';

const data = {
	labels: [
		'Total Supply',
		'Total Sale',
		'Other Supply'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
            '#E38627',
            '#C13C37',
            '#6A2135'
		]
	}]
};


const headerStyle = {
    fontWeight: 'bold'
}


class MyPortfolio extends Component {

    constructor(props){
        super(props);
        this.state = {
            portfolio: JSON.parse(localStorage.getItem('myPortfolio')) ? JSON.parse(localStorage.getItem('myPortfolio')) : [],
            columns: [
                { label: '', id: 'imageUrl', headerStyle },
                { label: 'Name', id: 'name', headerStyle },
                {
                    label: 'Amount',
                    id: 'amount',
                    headerStyle
                },
                { label: 'Price (in INR)', id: 'price', type: 'numeric', headerStyle}
            ] 
        }
    }

    render() {
        console.log(this.state);
        const total = this.state.portfolio.reduce((acc,x) => Number(acc) + Number(x.price), 0);
        return (
            <Layout>
                <div className="row mb-5">
                    <div className="col-4">
                        <div className="stats-container">
                            <h1 className="mb-0">{currencyFormatter.format(total, {code: 'INR'})}</h1>
                            <p>Total Portfolio Price</p>
                        </div>
                    </div>
                    <div className="col-8">
                        <div style={{width: '60%', margin: '0 auto'}}>
                            <Pie data={data}
                                width={200}
                                height={200}
                                options={{ maintainAspectRatio: true,
                                            legend: {
                                                display: false,
                                                position: 'top',
                                                labels: {
                                                    fontFamily: 'Barlow',
                                                    fontSize: 14
                                                }
                                            } 
                                    }}   
                            />
                        </div>
                    </div>
                </div>
                <PortfolioTable 
                    columns={this.state.columns}
                    rows={this.state.portfolio}
                />
            </Layout>
        )
    }
}

export default MyPortfolio;
