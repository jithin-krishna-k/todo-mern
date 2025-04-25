import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTodoContext } from '../context/TodoContext';
import { createTodo, updateTodo, getTodoById } from '../api/todoService';

const AddEditTodo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [todoData, setTodoData] = useState({
        title: '',
        description: '',
        status: 'pending',
    });

    const { fetchTodos } = useTodoContext();

    useEffect(() => {
        if (isEditMode) {
            (async () => {
                try {
                    const res = await getTodoById(id);
                    setTodoData(res.data);
                } catch (err) {
                    console.error('Failed to load todo:', err);
                }
            })();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTodoData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await updateTodo(id, todoData);
            } else {
                await createTodo(todoData);
            }
            fetchTodos();
            navigate('/');
        } catch (err) {
            console.error('Error saving todo:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Todo' : 'Add New Todo'}</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={todoData.title}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={todoData.description}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            rows="4"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Status</label>
                        <select
                            name="status"
                            value={todoData.status}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        {isEditMode ? 'Update Todo' : 'Add Todo'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddEditTodo;
