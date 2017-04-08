import React, { Component } from 'react';

import TrainCar from '../../../components/trainCar';

export default class TrainCarPage extends Component {
    handleAction = () => {
        alert('Нажатие на место');
    };

    render() {
        return (
            <div className='app' style={ { marginTop: '50px' } }>
                <h2 style={ { marginBottom: '20px' , textAlign: 'center'} }>
                    Купе
                </h2>
               <TrainCar
                   type='Купе'
                   carNumb='02'
                   freePlaces={['1', '4', '5', '6', '26', '16', '10', '21', '12', '29']}
                   actionMethod={this.handleAction}
               />
                <h2 style={ { marginBottom: '20px' , textAlign: 'center'} }>
                    Люкс
                </h2>
                <TrainCar
                    type='Люкс'
                    carNumb='56'
                    freePlaces={['1', '4', '5', '6', '16', '10']}
                    actionMethod={this.handleAction}
                />
                <h2 style={ { marginBottom: '20px' , textAlign: 'center'} }>
                    Вип
                </h2>
                <TrainCar
                    type='Вип'
                    carNumb='17'
                    freePlaces={['1', '4', '5']}
                    actionMethod={this.handleAction}
                />
                <h2 style={ { marginBottom: '20px' , textAlign: 'center'} }>
                    Плацкарт
                </h2>
                <TrainCar
                    type='Плацкарт'
                    carNumb='70'
                    freePlaces={['1', '4', '5', '6', '26', '16', '10', '21', '12', '29', '35', '40', '50', '53']}
                    actionMethod={this.handleAction}
                />
            </div>
        );
    }
}
