import React, { Component, PropTypes } from 'react';

import _ from 'lodash';

import './styles/index.css';

class TrainCarPlace extends Component {
    /**
     * Свойства
     * @param width - ширина места
     * @param height - высота места
     * @param top - значение css-свойства 'top'
     * @param left - значение css-свойства 'left'
     * @param placeNumb - номер места
     * @param placeBusy - занято/свободно место
     * @param placePos - верхнее/нижнее место
     * @param placeType - тип места (плацкарт, купе, люкс, вип)
     * @param onClick - принимаемый метод от компонента выше для обработки клика по месту
     */
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        top: PropTypes.number,
        left: PropTypes.number,
        placeNumb: PropTypes.number,
        placeBusy: PropTypes.bool,
        placePos: PropTypes.string,
        placeType: PropTypes.string,
        onClick: PropTypes.func
    };

    render() {
        const { placeNumb, placeBusy, placePos, placeType, width, height, top, left, onClick } = this.props;
        const placeStyle = (placeBusy) ? 'busy' : '';
        const tooltipStyleBusy = (placeBusy) ? 'busy' : '';
        const style = { width, height, top, left };

        let placeTooltipText = placePos;
        let tooltipStyle = '';

        if (placeBusy) {
            placeTooltipText = 'Занято';
        }

        switch (placeType) {
            case 'купе':
                tooltipStyle = (placePos === 'Верхнее') ? 'coupTop' : 'coupBottom';
                break;
            case 'люкс':
                tooltipStyle = 'luxFree';
                break;
            case 'вип':
                tooltipStyle = 'vipFree';
                break;
            case 'плацкарт':
                if (placePos === 'Верхнее') {
                    tooltipStyle = 'platCTop';
                }
                if (placePos === 'Нижнее') {
                    tooltipStyle = 'platCBottom';
                }
                if (placePos === 'Верхнее' && placeNumb > 36) {
                    tooltipStyle = 'platCSideTop';
                }
                if (placePos === 'Нижнее' && placeNumb > 36) {
                    tooltipStyle = 'platCSideBottom';
                }
                break;
            default:
                break;
        }

        return (
            <div className={ `sw-place _${placeStyle}` } style={style} onClick={onClick}>
                { placeNumb }
                <div className='sw-place__inner'>
                    <div className={ `sw-place__tooltip _${tooltipStyle} _${tooltipStyleBusy}` }>
                        { placeTooltipText }
                    </div>
                </div>
            </div>
        );
    }
}

export default class TrainCar extends Component {
    /**
     * Свойства
     * @param carNumb - номер вагона
     * @param type - тип вагона (плацкарт, купе, люкс, вип)
     * @param freePlaces - номера свободных мест
     * @param actionMethod - принимаемый метод от компонента выше и
     * передаваемый компоненту ниже для обработки клика по месту
     */
    static propTypes = {
        carNumb: PropTypes.string,
        type: PropTypes.string,
        freePlaces: PropTypes.array,
        actionMethod: PropTypes.func.isRequired,
    };

    handleOnClick = () => {
        if (this.props.actionMethod) this.props.actionMethod();
    };

    renderCar = (type) => {
        const { carNumb } = this.props;

        switch (type) {
            case 'Купе':
                return this.renderCoupe(carNumb);
            case 'Вип':
                return this.renderVip(carNumb);
            case 'Люкс':
                return this.renderLux(carNumb);
            case 'Плацкарт':
                return this.renderPlatC(carNumb);
            default:
                return null;
        }
    };

    calcFreePlaces = (places) => {
        const { freePlaces } = this.props;

        return _.mapValues(places, (place, number) => {
            const newPlaces = place.slice();

            if (_.includes(freePlaces, number)) {
                newPlaces[2] = false;
            }

            return newPlaces
        });
    };

    renderPlaces = (placeWidth, placeHeight, places, sidePlaces, sidePlaceWidth, sidePlaceHeight, place) => {
        const placesArr = [];

        if (places) {
            _.forEach(places, (_place, key) => {
                placesArr.push(
                    <TrainCarPlace
                        key={ parseInt(key, 10) }
                        onClick={ this.handleOnClick }
                        placeNumb={ parseInt(key, 10) }
                        width={ placeWidth }
                        height={ placeHeight }
                        top={ _place[0] }
                        left={ _place[1] }
                        placeBusy={ _place[2] }
                        placePos={ _place[3] }
                        placeType={ place }
                    />
                );
            })
        }

        if (sidePlaces) {
            _.forEach(sidePlaces, (_sidePlace, key) => {
                placesArr.push(
                    <TrainCarPlace
                        key={ parseInt(key, 10) }
                        onClick={ this.handleOnClick }
                        placeNumb={ parseInt(key, 10) }
                        width={ sidePlaceWidth }
                        height={ sidePlaceHeight }
                        top={ _sidePlace[0] }
                        left={ _sidePlace[1] }
                        placeBusy={ _sidePlace[2] }
                        placePos={ _sidePlace[3] }
                        placeType={ place }
                    />
                );
            })
        }

        return placesArr;
    };

    renderCoupe = (carNumb) => {
        const placeWidth = 29;
        const placeHeight = 35;
        const placeTop = 0;
        const placeBottom = 36;
        const coupePlaces = this.calcFreePlaces(
            {
                '1':  [placeBottom, 113, true, 'Нижнее'],
                '2':  [placeTop, 113, true, 'Верхнее'],
                '3':  [placeBottom, 164, true, 'Нижнее'],
                '4':  [placeTop, 164, true, 'Верхнее'],
                '5':  [placeBottom, 194, true, 'Нижнее'],
                '6':  [placeTop, 194, true, 'Верхнее'],
                '7':  [placeBottom, 245, true, 'Нижнее'],
                '8':  [placeTop, 245, true, 'Верхнее'],
                '9':  [placeBottom, 275, true, 'Нижнее'],
                '10': [placeTop, 275, true, 'Верхнее'],
                '11': [placeBottom, 326, true, 'Нижнее'],
                '12': [placeTop, 326, true, 'Верхнее'],
                '13': [placeBottom, 356, true, 'Нижнее'],
                '14': [placeTop, 356, true, 'Верхнее'],
                '15': [placeBottom, 407, true, 'Нижнее'],
                '16': [placeTop, 407, true, 'Верхнее'],
                '17': [placeBottom, 437, true, 'Нижнее'],
                '18': [placeTop, 437, true, 'Верхнее'],
                '19': [placeBottom, 488, true, 'Нижнее'],
                '20': [placeTop, 488, true, 'Верхнее'],
                '21': [placeBottom, 518, true, 'Нижнее'],
                '22': [placeTop, 518, true, 'Верхнее'],
                '23': [placeBottom, 569, true, 'Нижнее'],
                '24': [placeTop, 569, true, 'Верхнее'],
                '25': [placeBottom, 599, true, 'Нижнее'],
                '26': [placeTop, 599, true, 'Верхнее'],
                '27': [placeBottom, 650, true, 'Нижнее'],
                '28': [placeTop, 650, true, 'Верхнее'],
                '29': [placeBottom, 680, true, 'Нижнее'],
                '30': [placeTop, 680, true, 'Верхнее'],
                '31': [placeBottom, 731, true, 'Нижнее'],
                '32': [placeTop, 731, true, 'Верхнее'],
                '33': [placeBottom, 761, true, 'Нижнее'],
                '34': [placeTop, 761, true, 'Верхнее'],
                '35': [placeBottom, 812, true, 'Нижнее'],
                '36': [placeTop, 812, true, 'Верхнее']
            }
        );

        return (
            <div className='sw-car__inner sw-car_coupe'>
                <span className='sw-car__number'>
                    {carNumb}
                </span>
                { this.renderPlaces(placeWidth, placeHeight, coupePlaces, null, null, null, 'купе') }
            </div>
        );
    };

    renderLux = (carNumb) => {
        const placeWidth = 29;
        const placeHeight = 72;
        const placeTop = 0;
        const luxPlaces = this.calcFreePlaces(
            {
                '1':  [placeTop, 113, true, 'Свободно'],
                '2':  [placeTop, 164, true, 'Свободно'],
                '3':  [placeTop, 194, true, 'Свободно'],
                '4':  [placeTop, 245, true, 'Свободно'],
                '5':  [placeTop, 275, true, 'Свободно'],
                '6':  [placeTop, 326, true, 'Свободно'],
                '7':  [placeTop, 356, true, 'Свободно'],
                '8':  [placeTop, 407, true, 'Свободно'],
                '9':  [placeTop, 437, true, 'Свободно'],
                '10': [placeTop, 488, true, 'Свободно'],
                '11': [placeTop, 518, true, 'Свободно'],
                '12': [placeTop, 569, true, 'Свободно'],
                '13': [placeTop, 599, true, 'Свободно'],
                '14': [placeTop, 650, true, 'Свободно'],
                '15': [placeTop, 680, true, 'Свободно'],
                '16': [placeTop, 731, true, 'Свободно'],
                '17': [placeTop, 761, true, 'Свободно'],
                '18': [placeTop, 811, true, 'Свободно']
            }
        );

        return (
            <div className='sw-car__inner sw-car_lux'>
                <span className='sw-car__number'>
                    {carNumb}
                </span>
                { this.renderPlaces(placeWidth, placeHeight, luxPlaces, null, null, null, 'люкс') }
            </div>
        );
    };

    renderVip = (carNumb) => {
        const placeWidth = 45;
        const placeHeight = 66;
        const placeTop = 8;
        const vipPlaces = this.calcFreePlaces(
            {
                '1': [placeTop, 114, true, 'Свободно'],
                '2': [placeTop, 361, true, 'Свободно'],
                '3': [placeTop, 407, true, 'Свободно'],
                '4': [placeTop, 654, true, 'Свободно'],
                '5': [placeTop, 700, true, 'Свободно']
            }
        );

        return (
            <div className='sw-car__inner sw-car_vip'>
                <span className='sw-car__number'>
                    {carNumb}
                </span>
                { this.renderPlaces(placeWidth, placeHeight, vipPlaces, null, null, null, 'вип') }
            </div>
        );
    };

    renderPlatC = (carNumb) => {
        const placeWidth = 29;
        const placeHeight = 35;
        const sidePlaceWidth = 39;
        const sidePlaceHeight = 29;
        const placeTop = 0;
        const placeBottom = 37;
        const sidePlaceY = 96;

        const platCPlaces = this.calcFreePlaces(
            {
                '1':  [placeBottom, 114, true, 'Нижнее'],
                '2':  [placeTop, 114, true, 'Верхнее'],
                '3':  [placeBottom, 165, true, 'Нижнее'],
                '4':  [placeTop, 165, true, 'Верхнее'],
                '5':  [placeBottom, 195, true, 'Нижнее'],
                '6':  [placeTop, 195, true, 'Верхнее'],
                '7':  [placeBottom, 246, true, 'Нижнее'],
                '8':  [placeTop, 246, true, 'Верхнее'],
                '9':  [placeBottom, 276, true, 'Нижнее'],
                '10': [placeTop, 276, true, 'Верхнее'],
                '11': [placeBottom, 327, true, 'Нижнее'],
                '12': [placeTop, 327, true, 'Верхнее'],
                '13': [placeBottom, 357, true, 'Нижнее'],
                '14': [placeTop, 357, true, 'Верхнее'],
                '15': [placeBottom, 408, true, 'Нижнее'],
                '16': [placeTop, 408, true, 'Верхнее'],
                '17': [placeBottom, 438, true, 'Нижнее'],
                '18': [placeTop, 438, true, 'Верхнее'],
                '19': [placeBottom, 489, true, 'Нижнее'],
                '20': [placeTop, 489, true, 'Верхнее'],
                '21': [placeBottom, 519, true, 'Нижнее'],
                '22': [placeTop, 519, true, 'Верхнее'],
                '23': [placeBottom, 570, true, 'Нижнее'],
                '24': [placeTop, 570, true, 'Верхнее'],
                '25': [placeBottom, 600, true, 'Нижнее'],
                '26': [placeTop, 600, true, 'Верхнее'],
                '27': [placeBottom, 651, true, 'Нижнее'],
                '28': [placeTop, 651, true, 'Верхнее'],
                '29': [placeBottom, 681, true, 'Нижнее'],
                '30': [placeTop, 681, true, 'Верхнее'],
                '31': [placeBottom, 732, true, 'Нижнее'],
                '32': [placeTop, 732, true, 'Верхнее'],
                '33': [placeBottom, 762, true, 'Нижнее'],
                '34': [placeTop, 762, true, 'Верхнее'],
                '35': [placeBottom, 813, true, 'Нижнее'],
                '36': [placeTop, 813, true, 'Верхнее']
            }
        );

        const platCSidePlaces = this.calcFreePlaces(
            {
                '37': [sidePlaceY, 803, true, 'Нижнее'],
                '38': [sidePlaceY, 762, true, 'Верхнее'],
                '39': [sidePlaceY, 722, true, 'Нижнее'],
                '40': [sidePlaceY, 681, true, 'Верхнее'],
                '41': [sidePlaceY, 641, true, 'Нижнее'],
                '42': [sidePlaceY, 601, true, 'Верхнее'],
                '43': [sidePlaceY, 560, true, 'Нижнее'],
                '44': [sidePlaceY, 519, true, 'Верхнее'],
                '45': [sidePlaceY, 479, true, 'Нижнее'],
                '46': [sidePlaceY, 438, true, 'Верхнее'],
                '47': [sidePlaceY, 398, true, 'Нижнее'],
                '48': [sidePlaceY, 356, true, 'Верхнее'],
                '49': [sidePlaceY, 317, true, 'Нижнее'],
                '50': [sidePlaceY, 276, true, 'Верхнее'],
                '51': [sidePlaceY, 236, true, 'Нижнее'],
                '52': [sidePlaceY, 195, true, 'Верхнее'],
                '53': [sidePlaceY, 155, true, 'Нижнее'],
                '54': [sidePlaceY, 114, true, 'Верхнее']
            }
        );

        return (
            <div className='sw-car__inner sw-car_platC'>
                <span className='sw-car__number'>
                    {carNumb}
                </span>
                { this.renderPlaces(placeWidth, placeHeight, platCPlaces, platCSidePlaces, sidePlaceWidth, sidePlaceHeight, 'плацкарт') }
            </div>
        );
    };

    render() {
        const { type } = this.props;

        return (
            <div className='sw-car'>
                { this.renderCar(type) }
            </div>
        );
    }
}
