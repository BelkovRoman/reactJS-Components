import React, { Component, PropTypes } from 'react';

import './styles/index.css';

class Notification extends Component {
    /**
    * Свойства
    * @prop string message - текст информационного окна
    * @prop string time - время существования оповещения в окне
    * @prop string level - где именно появится оповещение
    */
    static propTypes = {
        message: PropTypes.string.isRequired,
        time: PropTypes.number.isRequired,
        level: PropTypes.number,
    };

    static defaultProps = {
        level: 1,
    };

    state = {
        open: false,
        hideProcess: false
    };

    show() {
        if (!this.state.open) {
            this.setState({
                open: true
            }, () => {
                this.showTimeout = setTimeout(this.hide, this.props.time);
            });
        }
    }

    hide = () => {
        if (this.state.open) {
            this.setState({
                hideProcess: true
            });
        }
    };

    handleHide = () => {
        clearTimeout(this.showTimeout);
        this.hide();
    };

    handleHideAnimationEnd = () => {
        this.setState({
            hideProcess: false,
            open: false
        });
    };

    renderHideElement() {
        const { message } = this.props;

        return (
            <div className={ `sw-notification sw-notification--hiding-animation` } onAnimationEnd={ this.handleHideAnimationEnd }>
                <div className={ `sw-notification-container sw-notification-container--hiding-animation` }>
                    <div className='sw-notification-message'>
                        { message }
                    </div>
                    <div className='sw-notification-close'>
                        <i className='sw-notification-icon material-icons' onClick={ this.handleHide }>close</i>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { message } = this.props;
        const { open, hideProcess } = this.state;

        if (!open) return null;

        if (hideProcess) return this.renderHideElement();

        return (
            <div className={ `sw-notification ` }>
                <div className={ `sw-notification-container ` }>
                    <div className='sw-notification-message'>
                        { message }
                    </div>
                    <div className='sw-notification-close'>
                        <i className='sw-notification-icon material-icons' onClick={ this.handleHide }>close</i>
                    </div>
                </div>
            </div>
        );
    }
}


export default Notification;
