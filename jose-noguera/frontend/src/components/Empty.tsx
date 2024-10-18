import { FC } from "react";


const Empty: FC = () => {
    return (
        <>
            <div className='mx-auto mt-5 mb-5 text-center'>
                <div className="alert alert-warning" role="alert">
                    No hay datos para mostrar
                </div>
            </div>
        </>
    );
}

export default Empty