import React, {Component} from 'react';

import Notification from '../../../components/notification';
import Button from '../../../components/button';

class NotificationPage extends Component {
    state = {
        message: '',
        time: 2000,
        level: 1
    };

    handleClick = (e) => {
        e.preventDefault();

        this.setState({
            message: 'Действие совершено'
        }, () => {
            this.refs.notification.show();
        });
    };

    render() {
        const { message, time, level } = this.state;

        return (
            <div className='app'>
                <div className='wrap-25-flex'>
                    <div className='sw-notificationPage-button'>
                        <Button onClick={ this.handleClick }>
                            Совершить действие
                        </Button>
                    </div>
                    <Notification ref='notification' message={ message } time={ time } level={ level }/>
                </div>
            </div>
        );
    }
}

export default NotificationPage;
