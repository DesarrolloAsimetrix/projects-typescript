import { FC, useEffect, useState } from 'react';
import { UserType } from '../types/user';
import { RequestState } from '../emuns/RequestState';
import { getLeaderBoard } from '../api/api';
import Loading from '../components/Loading';
import Empty from '../components/Empty';
import Error from '../components/Error';


const LeaderBoard: FC = () => {

  const [users, setUsers] = useState<UserType[]>([]);
  const [requestState, setrequestState] = useState<RequestState>(RequestState.Initial);

  useEffect(() => {
      const fetchData = async () => {
          try {
              setrequestState(RequestState.Loading)
              const response = await getLeaderBoard();

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

  const sortedUsers = [...users].sort((a, b) => b.totalTime - a.totalTime);
  const top3 = sortedUsers.slice(0, 3);
  const others = sortedUsers.slice(3); 

  return (
    <>
      <h1 className="text-center my-4">Tabla de líderes</h1>
      {requestState === RequestState.Loading && <Loading />}
      {requestState === RequestState.Empty && <Empty />}
      {requestState === RequestState.Error && <Error />}
      {(requestState === RequestState.Loaded)  && (
      <div className="container my-4">
          <div className="row justify-content-center">
            {[1,0,2].map((index, i) => (
              <div className={`col-md-4 mb-4`} key={i}>
                <div className={`card text-white shadow ${i === 0 ? 'bg-warning' : i === 1 ? 'bg-success' : 'bg-secondary'}`}>
                  <div className="card-body text-center">
                  <h5 className="card-title">#{index + 1} - {top3[index].userName}</h5>
                    <p className="card-text">Tiempo total: {top3[index].totalTime} minutos</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card shadow">
            <div className="card-header bg-dark text-white">
              <h5>Otros Infractores</h5>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Tiempo Total (min)</th>
                  </tr>
                </thead>
                <tbody>
                  {others.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 4}</td>
                      <td>{user.userName}</td>
                      <td>{user.totalTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
  </>
  );
};

export default LeaderBoard
