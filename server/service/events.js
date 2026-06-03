import EventDAO from '../dao/event.js';
import EventDTO from '../dto/event.js';
import ServerError from '../errors/ServerError.js';

function randomEventsWithReplacement(arr, n) {
    const result = [];

    for (let i = 0; i < n; i++) {
        const index = Math.floor(Math.random() * arr.length);
        result.push(arr[index]);
    }

    return result.map(event =>EventDTO.from(event));
}


const EventService = {

    async getEvents(steps) {

        const events = await EventDAO.getEvents();

        if (!events) throw new ServerError("Error taking events");

        return randomEventsWithReplacement(events, steps);
    }
}

export default EventService;
