export default function Game(game_id, user_id, start_station_id, destination_station_id, score, won, played_at) {
    this.game_id = game_id;
    this.user_id = user_id;
    this.start_station_id = start_station_id;
    this.destination_station_id = destination_station_id;
    this.score = score;
    this.won = won;
    this.played_at = played_at;
}