import React, { useState } from 'react';
import AllActivitys from './AllActivitys';
import Create from './Create';


const Page: React.FC = () => {
    const [createActivity, setCreateActivity] = useState<boolean>(false);
    const [update, setUpdate] = useState<number>(0);

    const toggleCreateActivity = () => {
        setCreateActivity(prev => !prev);
    };

    const updatePage = () => {
        setUpdate(prev => prev + 1)
    }

    return (
        <section className='w-full sm:w-5/6 lg:w-4/6 xl:w-3/6 relative'>
            <div className='bg-white flex justify-between items-center p-2 sm:p-6 shadow-sm'>
                <h1 className='text-red-600 font-bold text-base lg:text-xl'>Gestão de Tarefas</h1>
                <div className='sm:flex w-1/2'>
                    <button 
                        onClick={toggleCreateActivity}
                        className='bg-red-300 py-4 px-2 sm:p-4 text-red-600 font-semibold rounded-lg my-1 sm:my-0 sm:mx-4 text-xs lg:text-sm w-full transition-all hover:bg-red-50 hover:text-red-400'>
                        Criar tarefas
                    </button>
                    
                </div>
            </div>
            <AllActivitys updateActivitys={update}/>
            {createActivity && <Create onActivityCreated={updatePage} onClose={toggleCreateActivity} />}
        </section>
    );
}

export default Page;
