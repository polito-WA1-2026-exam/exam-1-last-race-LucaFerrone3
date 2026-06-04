export const ConnectionDTO = {
    from(connection_id, line, from_station, to_station) {
        return {
            connection_id: connection_id,
            line: line,
            from_station: from_station,
            to_station: to_station,
        }
    }
}
