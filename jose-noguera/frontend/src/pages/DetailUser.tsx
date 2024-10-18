import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserDetail } from '../api/api';
import imgs from '../components/Img';
import { HistoryType } from '../types/track';
import { RequestState } from '../emuns/RequestState';
import Loading from '../components/Loading';
import Empty from '../components/Empty';
import Error from '../components/Error';

const DetailUser: FC = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [userName, setUserName] = useState<string | null>(null);

  const [history, setHistory] = useState<HistoryType[]>([]);
  const [requestState, setrequestState] = useState<RequestState>(RequestState.Initial);

  useEffect(() => {

    setUserName(queryParams.get('name'));

    const fetchData = async (userName: string) => {
      try {
        setrequestState(RequestState.Loading)
        const response = await getUserDetail(userName);

        if (response.data.length === 0) {
          setrequestState(RequestState.Empty);
        } else {
          setHistory(response.data);
          setTimeout(() => setrequestState(RequestState.Loaded), 1000);
        }
      } catch (err) {
        setrequestState(RequestState.Error);
      }
    };
    console.log('userName', userName);
    console.log('requestState', requestState);
    if (requestState === RequestState.Initial && userName) {
      fetchData(userName);
    }
  }, [userName]);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Detalle de usuario</h1>
      <div className="row">
        <div className="col-12 text-center">
          <img src={imgs[userName ? userName : '']} alt="user" className="rounded-circle mb-3" width={128} height={128} />
          <h3 className='mb-3'>{userName}</h3>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <div className='card shadow'>
            <div className="card-header bg-dark text-white">
              <h5>Infracciones</h5>
            </div>
            <div className='card-body'>
              {requestState === RequestState.Loading && <Loading />}
              {requestState === RequestState.Empty && <Empty />}
              {requestState === RequestState.Error && <Error />}
              {(requestState === RequestState.Loaded || requestState === RequestState.Initial) && (
                <>
                  <table className="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Reunion</th>
                        <th>Tiempo</th>
                        <th>Infractor</th>
                        <th>Comentarios</th>
                        <th>Comentarios2</th>
                        <th>Reglas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((row) => (
                        <tr key={row.id}>
                          <td>{row.fecha}</td>
                          <td>{row.reunion}</td>
                          <td>{row.tiempo}</td>
                          <td>{row.infractor}</td>
                          <td>{row.comentarios}</td>
                          <td>{row.comentarios2}</td>
                          <td>{row.reglas}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default DetailUser