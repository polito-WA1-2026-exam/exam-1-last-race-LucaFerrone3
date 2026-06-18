import { Card, Button, Stack, Container } from 'react-bootstrap';
import { useContext } from 'react';
import { ConnectionContext, ConnectionsSelectedContext } from '../../Contexts'

import './ListOfConnections.css';

function ListOfConnections() {

  const [connections, setConnections] = useContext(ConnectionContext);
  const [connectionsSelected, setConnectionsSelected] = useContext(ConnectionsSelectedContext);

  return (
    <>
      <Container className='station-card shadow'>
        <Stack gap={4} className="align-items-center station-stack my-4">
          {connections.map((connection) => (
            <Button
              key={connection.connection_id}
              className={ connectionsSelected.includes(connection.connection_id) ? "station-button-active" : "station-button"}
              onClick={() => {
                setConnectionsSelected(alreadySelected =>
                  alreadySelected.includes(connection.connection_id)
                    ? alreadySelected.filter(id => id !== connection.connection_id)
                    : [...alreadySelected, connection.connection_id]
                );
              }}
            >
              {connection.station_u.name} ↔ {connection.station_v.name}
            </Button>
          ))}
        </Stack>
      </Container>
    </>
  );
}

export default ListOfConnections;
