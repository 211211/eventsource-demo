import {useEffect, useState} from 'react';

export const EventComponent = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:3000/events');
        if (typeof(EventSource) === 'undefined') {
            setMessage('Your browser does not support EventSource');
        } else {
            console.info('EventSource is supported');
        }

        eventSource.onmessage = (event) => {
            const eventData = JSON.parse(event.data);
            setMessage(eventData.message);
        }

        return () => {
            eventSource.close();
        }
    }, []);

    return (
        <div>{message ? message : 'loading'}</div>
    )
}

