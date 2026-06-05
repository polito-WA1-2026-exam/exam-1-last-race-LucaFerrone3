export const ConnectionDTO = {
    from(connection_id, line, station_u, station_v) {
        return {
            connection_id: connection_id,
            line: line,
            station_u: station_u,
            station_v: station_v,
        }
    }
}
