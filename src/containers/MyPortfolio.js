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
                { label: 'Buying Price (USD)', id: 'price', type: 'numeric', headerStyle},
                { label: 'Buying Price (INR)', id: 'price', type: 'numeric', headerStyle},
                { label: 'Date', id: 'selectedDate', type: 'numeric', headerStyle}
            ] 
        }
    }

    render() {
        const {portfolio} = this.state;
        const total = portfolio.reduce((acc,x) => Number(acc) + Number(x.buyingPriceINR), 0);
        const data = {
            labels: portfolio.map((label) => label.coin.name),
            datasets: [{
                data: portfolio.map((label) => label.buyingPriceINR),
                backgroundColor: colors
            }]}
        return (
            <Layout>
                <div className="row mb-5">
                    <div className="col-5">
                        <div className="stats-container">
                            <h1 className="mb-0">{currencyFormatter.format(total, {code: 'INR'})}</h1>
                            <p>Total Portfolio Price</p>
                            <div className="row mt-5">
                                    {
                                        data.labels.map((el,index)=> {
                                            return <div className="col-6 mb-3">
                                                        <span className="coin-color" style={{
                                                            background: `${data.datasets[0].backgroundColor[index]}`,
                                                        }}></span><span>{el}</span>
                                                        {/* <span>{data.datasets[0].data[index]}</span> */}
                                                    </div>
                                        })
                                    }
                            </div>
                        </div>
                    </div>
                    <div className="col-7">
                        <div style={{width: '60%', margin: '0 auto'}}>
                            <Pie data={data}
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
