import React, { Component } from 'react';

import ToolTip from '../../../components/toolTip';

export default class TooltipPage extends Component {
    render() {
        return (
            <div className='app'>
                <h1>Tooltip page</h1>

                <div className='wrap-25' style={ { width: '400px', margin: '0 auto' } }>

                    <div className='sw-tooltip-wrapper' style={ { marginBottom: 50 } }>
                        1. Некий элемент, требующий небольшого объяснения. Подсказка снизу.
                        <ToolTip>
                            Подсказка снизу
                        </ToolTip>
                    </div>

                    <div className='sw-tooltip-wrapper' style={ { marginBottom: 50 } }>
                        2. Некий элемент, требующий небольшого объяснения. Подсказка справа.
                        <ToolTip position='right'>
                            Подсказка справа
                        </ToolTip>
                    </div>

                    <div className='sw-tooltip-wrapper' style={ { marginBottom: 50 } }>
                        3. Некий элемент, требующий небольшого объяснения. Подсказка сверху.
                        <ToolTip position='top'>
                            Подсказка сверху
                        </ToolTip>
                    </div>

                    <div className='sw-tooltip-wrapper' style={ { marginBottom: 50 } }>
                        4. Некий элемент, требующий небольшого объяснения. Подсказка слева.
                        <ToolTip position='left'>
                            Подсказка слева
                        </ToolTip>
                    </div>

                    <div className='sw-tooltip-wrapper' style={ { marginBottom: 50 } }>
                        1. Некий элемент, требующий небольшого объяснения. Подсказка снизу.
                        <ToolTip theme='dark'>
                            Подсказка снизу
                        </ToolTip>
                    </div>

                    <div className='sw-tooltip-wrapper' style={ { marginBottom: 50 } }>
                        2. Некий элемент, требующий небольшого объяснения. Подсказка справа.
                        <ToolTip position='right' theme='dark'>
                            Подсказка справа
                        </ToolTip>
                    </div>

                    <div className='sw-tooltip-wrapper' style={ { marginBottom: 50 } }>
                        3. Некий элемент, требующий небольшого объяснения. Подсказка сверху.
                        <ToolTip position='top' theme='dark'>
                            Подсказка сверху
                        </ToolTip>
                    </div>

                    <div className='sw-tooltip-wrapper' style={ { marginBottom: 50 } }>
                        4. Некий элемент, требующий небольшого объяснения. Подсказка слева.
                        <ToolTip position='left' theme='dark'>
                            Подсказка слева
                        </ToolTip>
                    </div>

                </div>
            </div>
        );
    }
}
