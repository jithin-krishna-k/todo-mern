import React, { useContext, useState } from 'react';
import { TodoContext } from '../context/TodoContext';
import TodoItem from '../components/TodoItem';
import { Link } from 'react-router-dom';

const Home = () => {
    const { todos, loading, error } = useContext(TodoContext);
    const [filter, setFilter] = useState('all');

    const filteredTodos =
        filter === 'all' ? todos : todos.filter(todo => todo.status === filter);

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
                <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
                    Todo List
                </h1>

                <div className="sticky top-10 z-10 pb-4 pt-1">
                    <div className="flex items-center justify-end space-x-2">
                        <Link
                            to="/add"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                        >
                            + Add Todo
                        </Link>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                        >
                            <option value="all">All</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                {loading && (
                    <div className="flex justify-center py-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                )}

                {error && (
                    <div className="text-red-500 bg-red-100 p-3 rounded-md text-center font-medium mb-4">
                        {error}
                    </div>
                )}

                {filteredTodos.length === 0 && !loading ? (
                    <p className="text-center text-gray-500 font-medium">No todos found.</p>
                ) : (
                    <ul className="space-y-4 mt-4">
                        {filteredTodos.map(todo => (
                            <TodoItem key={todo._id} todo={todo} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Home;
