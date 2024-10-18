import { FC } from "react";


const Error: FC = () => {

    return (
        <>
            <div className='mx-auto mt-5 mb-5 text-center'>
                <div className="alert alert-danger" role="alert">
                    Error al cargar los datos
                </div>
            </div>
        </>
    );
}

export default Error