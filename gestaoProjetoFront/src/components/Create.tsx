import React, { useEffect, useState } from 'react';
import Activity from './Activity';

interface CreateProps {
    onClose: () => void;
    onActivityCreated: () => void;
}


const Create: React.FC<CreateProps> = ({ onClose, onActivityCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [priority, setPriority] = useState('media');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const dateConvert = new Date(date)
        const dueDate = dateConvert.toISOString()

        const activity = {
            title,
            description,
            dueDate,
            priority
        };

        console.log(activity)
        try {
            const response = await fetch('https://localhost:7166/api/Activity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(activity)
            });

            if (response.ok) {
                onActivityCreated()
                onClose(); 
            } else {
                console.error('Failed to create activity', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred while creating the activity', error);
        }
    }
    

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-red-900'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
                <h2 className='text-xl font-bold mb-4'>Criar Nova Tarefa</h2>
                <form onSubmit={handleSubmit} className='space-y-4 text-red-400'>
                    <div>
                        <label className='block text-sm font-medium'>Título</label>
                        <input 
                            type='text' 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            className='mt-1 block w-full rounded-md outline-none text-red-300 border-gray-300 shadow-sm sm:text-sm' 
                            required 
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium '>Descrição</label>
                        <textarea 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            className='mt-1 block w-full rounded-md outline-none text-red-300 border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm' 
                            required 
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium '>Data</label>
                        <input 
                            type='date' 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                            className='mt-1 block w-full rounded-md text-red-300 shadow-sm sm:text-sm outline-none' 
                            required 
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium'>Prioridade</label>
                        <select 
                            value={priority} 
                            onChange={(e) => setPriority(e.target.value)} 
                            className='mt-1 block w-full rounded-md shadow-sm text-red-300 outline-none sm:text-sm'
                            required
                        >
                            <option value='urgente'>Urgente</option>
                            <option value='alta'>Alta</option>
                            <option value='media'>Média</option>
                            <option value='baixa'>Baixa</option>
                        </select>
                    </div>
                    <div className='flex justify-end'>
                        <button 
                            type='button' 
                            onClick={onClose} 
                            className='bg-red-100 py-2 px-4 rounded-lg text-sm font-medium text-red-500 mr-2'
                        >
                            Cancelar
                        </button>
                        <button 
                            type='submit' 
                            className='bg-red-500 py-2 px-4 rounded-lg text-sm font-medium text-white'
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Create;
