import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { RequestState } from '../emuns/RequestState';
import { getUsers } from '../api/api';
import imgs from '../components/Img';

const Home: FC = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [requestState, setrequestState] = useState<RequestState>(RequestState.Initial);

  useEffect(() => {
      const fetchData = async () => {
          try {
              setrequestState(RequestState.Loading)
              const response = await getUsers();

              if (response.data.length === 0) {
                  setrequestState(RequestState.Empty);
              } else {
                  setUsers(response.data);
                  setTimeout(() => setrequestState(RequestState.Loaded), 1000);
              }
          } catch (err) {
              setrequestState(RequestState.Error);
          }
      };

      if (requestState === RequestState.Initial) {
          fetchData();
      }
  }, []);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Lista de Infractores</h1>
      <div className="row">
        {users.map(user => (
          <div className="col-md-4" key={user}>
            <div className="card mb-4 shadow">
              <div className="card-body text-center">
                <img src={imgs[user]} alt="user" className="rounded-circle mb-3"width={128} height={128} />
                <h5 className="card-title">{user}</h5>
                <Link to={`/detail?name=${user}`} className="btn btn-primary">
                  Ver Detalle
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home
