import React, { Component } from 'react'
import Layout from './../components/Layout';
import currencyFormatter from 'currency-formatter'

//pie chart import
import {Pie} from 'react-chartjs-2';
import PortfolioTable from './../components/PortfolioTable';

const colors = ['#F66D44','#FEAE65','#E6F69D','#AADEA7','#64C2A6','#2D87BB'];

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
        const {portfolio} = this.state;
        const total = portfolio.reduce((acc,x) => Number(acc) + Number(x.price), 0);
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
                            <Pie data={{
                                labels: portfolio.map((label) => label.coin.name),
                                datasets: [{
                                    data: portfolio.map((label) => label.price),
                                    backgroundColor: colors
                                }]}}
                                width={200}
                                height={200}
                                options={{ 
                                            maintainAspectRatio: true,
                                            legend: {
                                                display: false,
                                                position: 'top',
                                                labels: {
                                                    fontFamily: 'Barlow',
                                                    fontSize: 14
                                                }
                                            },
                                            plugins: {
                                                labels: {
                                                    // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
                                                    render: 'value'
                                                }
                                            },
                                            tooltips: {
                                                callbacks: {
                                                label: function(tooltipItem, data) {
                                                    var dataset = data.datasets[tooltipItem.datasetIndex];
                                                    var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                                                    var total = meta.total;
                                                    var currentValue = dataset.data[tooltipItem.index];
                                                    var percentage = parseFloat((currentValue/total*100).toFixed(1));
                                                    return  percentage + '%';
                                                },
                                                title: function(tooltipItem, data) {
                                                    return data.labels[tooltipItem[0].index];
                                                }
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
