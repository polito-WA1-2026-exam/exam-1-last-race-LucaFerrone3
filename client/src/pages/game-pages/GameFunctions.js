export function getTwoRandomStations(graph) {

    const stationIds = Object.keys(graph);

    // Random starting station
    const start =
        stationIds[Math.floor(Math.random() * stationIds.length)];

    // BFS
    const distances = {};
    const queue = [start];

    distances[start] = 0;

    while (queue.length > 0) {
        const current = queue.shift();

        for (const neighbor of graph[current]) {
            if (!(neighbor in distances)) {
                distances[neighbor] = distances[current] + 1;
                queue.push(neighbor);
            }
        }
    }

    // Filters stations with distance < 3
    const candidates = stationIds.filter(
        id => distances[id] >= 3
    );

    if (candidates.length === 0) {
        return null;
    }

    const destination =
        candidates[Math.floor(Math.random() * candidates.length)];

    return {
        start_station_id: start,
        destination_station_id: destination
    };
}



export function createGraph(connections, setGraph){
    const graph = {}; 

    connections.forEach(conn => {
        const u = conn.station_u.station_id;
        const v = conn.station_v.station_id;

        if (!graph[u]) graph[u] = [];
        if (!graph[v]) graph[v] = [];

        graph[u].push(v);
        graph[v].push(u);
    });

    setGraph(graph);

    return graph;
}


/*
 * This function checks whether the selected connections form an Eulerian path starting at starting_station and ending at destination_station.
 *
 * For an undirected graph, an Eulerian path between two specific nodes exists if:
 * 1. All selected edges belong to the same connected component.
 * 2. starting_station and destination_station have odd degree.
 * 3. Every other node has even degree.
 *
 * These conditions are derived from Euler's theorem for undirected graphs.
 */
export function validateRoute(
    starting_station,
    destination_station,
    connections,
    connectionsSelected
) {
    const degrees = {};
    const adj = {};

    // Build the subgraph containing only the selected connections.
    // For each edge, update the degree of its endpoints and
    // store the adjacency information needed for connectivity checks.
    connections.forEach(conn => {
        if (!connectionsSelected.includes(conn.connection_id)) return;

        const u = conn.station_u.station_id;
        const v = conn.station_v.station_id;

        degrees[u] = (degrees[u] || 0) + 1;
        degrees[v] = (degrees[v] || 0) + 1;

        if (!adj[u]) adj[u] = [];
        if (!adj[v]) adj[v] = [];

        adj[u].push(v);
        adj[v].push(u);
    });

    const start = starting_station.station_id;
    const end = destination_station.station_id;

    // An Eulerian path cannot exist if no edges have been selected.
    if (connectionsSelected.length === 0) {
        return false;
    }

    // Check that all nodes incident to at least one selected edge
    // belong to the same connected component using a DFS.
    const nodesWithEdges = Object.keys(degrees);

    const visited = new Set();
    const stack = [nodesWithEdges[0]];

    while (stack.length > 0) {
        const node = stack.pop();

        if (visited.has(node)) continue;

        visited.add(node);

        (adj[node] || []).forEach(neighbour => {
            if (!visited.has(String(neighbour))) {
                stack.push(String(neighbour));
            }
        });
    }

    // If some nodes with edges are not reachable,
    // the selected subgraph is disconnected.
    if (visited.size !== nodesWithEdges.length) {
        return false;
    }

    // Compute the set of nodes with odd degree.
    // According to Euler's theorem, an Eulerian path exists
    // iff exactly two nodes have odd degree.
    const oddNodes = Object.keys(degrees)
        .filter(node => degrees[node] % 2 !== 0)
        .map(Number);

    // An Eulerian path must have exactly two odd-degree nodes.
    if (oddNodes.length !== 2) {
        return false;
    }

    // The two odd-degree nodes must be the specified
    // starting and destination stations.
    
    return (
        oddNodes.includes(start) &&
        oddNodes.includes(end)
    );
}


export function getOrderedConnectionOfRoutes (
    startingStation,
    destinationStation,
    connections,
    connectionsSelected
){

    const selectedConnections = connections.filter(c =>
        connectionsSelected.includes(c.connection_id)
    );

    const adjacency = new Map();

    for (const connection of selectedConnections) {
        const u = connection.station_u.station_id;
        const v = connection.station_v.station_id;

        if (!adjacency.has(u)) adjacency.set(u, []);
        if (!adjacency.has(v)) adjacency.set(v, []);

        adjacency.get(u).push({
            connectionId: connection.connection_id,
            nextStation: v
        });

        adjacency.get(v).push({
            connectionId: connection.connection_id,
            nextStation: u
        });
    }

    const usedConnections = new Set();
    const orderedRoute = [];

    let currentStation = startingStation.station_id;

    while (currentStation !== destinationStation.station_id) {
        const availableEdges =
            adjacency.get(currentStation)?.filter(
                edge => !usedConnections.has(edge.connectionId)
            ) || [];

        if (availableEdges.length === 0) {
            throw new Error("The routes is invalid...");
        }

        const edge = availableEdges[0];

        usedConnections.add(edge.connectionId);

        orderedRoute.push({
            from_station: currentStation,
            to_station: edge.nextStation
        });

        currentStation = edge.nextStation;
    }

    return orderedRoute;
};

export function shuffle(array) {
    const arr = [...array];

    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}