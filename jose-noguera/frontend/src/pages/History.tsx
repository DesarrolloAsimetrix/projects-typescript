import { FC, useEffect, useState } from 'react';
import { HistoryType } from '../types/track';
import { getHistoryTracker } from '../api/api';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Empty from '../components/Empty';
import { RequestState } from '../emuns/RequestState';


const History: FC = () => {

    const [history, setHistory] = useState<HistoryType[]>([]);
    const [requestState, setrequestState] = useState<RequestState>(RequestState.Initial);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setrequestState(RequestState.Loading)
                const response = await getHistoryTracker();

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

        if (requestState === RequestState.Initial) {
            fetchData();
        }
    }, []);

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4">Histórico</h1>
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

export default History