import { FC } from "react";


const Loading: FC = () => {

    return (
        <>
            <div className='mx-auto mt-5 mb-5 text-center'>
                <div className='spinner-border'>
                </div>
                <div className=''>Cargando...</div>
            </div>
        </>
    );
}

export default Loading