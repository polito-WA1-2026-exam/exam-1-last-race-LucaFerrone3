
export const StationDTO = {
    from(station_id, name, is_interchange) {
        return {
            station_id: station_id,
            name: name,
            is_interchange: is_interchange === 1 ? true : false,
        }
    }
}
