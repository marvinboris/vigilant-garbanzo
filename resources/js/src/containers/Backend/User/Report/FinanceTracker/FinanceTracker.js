import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default class FinanceTracker extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';

    render() {
        const { data, currencies } = this.props;

        const formattedData = [];
        const keys = [];

        data.forEach(el => {
            const elementData = {
                name: el.name
            };
            Object.keys(el.data).forEach(supportKey => {
                Object.keys(el.data[supportKey]).forEach(currencyKey => {
                    const key = `${supportKey}-${currencyKey}`;
                    if (!keys.includes(key)) keys.push(key);
                    elementData[key] = el.data[supportKey][currencyKey];
                });
            });
            formattedData.push(elementData);
        });

        const colors = ["#06B0B6", "#F5A10E", "#d1b853", "#ff0b33", "#05C945"];
        const bars = keys.map((key, index) => <Bar key={key} dataKey={key} fill={colors[(index < colors.length) ? index : (index % colors.length)]} />);

        const CustomTooltip = ({ payload, label, active }) => {
            if (active) {
                return <div className="bg-white rounded p-3 text-dark">
                    <div className="text-700">{label}</div>
                    {payload && payload.map(item => {
                        const keys = item.name.split('-');
                        const currencyKey = keys[keys.length - 1];
                        const currency = currencies[currencyKey];
                        return <div style={{ color: item.color }} key={Math.random()}>
                            {item.name} : {item.value / currency.exchange_rate} {currency.abbr}
                        </div>
                    })}
                </div>;
            }

            return null;
        }

        return (
            <ResponsiveContainer>
                <BarChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    {bars}
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
