import React, { Component, PropTypes } from 'react';

import './styles/index.css';

export default class Tooltip extends Component {
    /**
     * Свойства
     * @prop string position - определяет положение тултипа над текстом.
     * @prop string theme - определяет внешнее оформление тултипа.
     */
    static propTypes = {
        position: PropTypes.string, // top, right, bottom, left
        theme: PropTypes.string, // light, dark
        children: PropTypes.node,
    };

    static defaultProps = {
        position: 'bottom',
        theme: 'light',
        children: null,
    };

    render() {
        const { position, theme, children } = this.props;

        return (
            <div className={ `sw-tooltip _${position} _${theme}` }>
                { children }
            </div>
        );
    }
}
