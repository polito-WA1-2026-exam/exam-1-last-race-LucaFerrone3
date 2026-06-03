const EventDTO = {
    from(event){
        return {
            event_id: event.event_id,
            description: event.description,
            score: event.score
        }
    }
}

export default EventDTO;