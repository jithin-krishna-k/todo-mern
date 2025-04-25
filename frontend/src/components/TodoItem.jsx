import React from 'react';
import { Link } from 'react-router-dom';
import { useTodoContext } from '../context/TodoContext';
import { formatDistanceToNow } from 'date-fns';

const TodoItem = ({ todo }) => {

    const { removeTodo } = useTodoContext();

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this todo?')) {
            removeTodo(todo._id);
        }
    };


    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'in-progress':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatRelativeTime = (date) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true });
    };


    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-300 p-5 hover:shadow-lg transition-shadow">
            <div className="flex flex-wrap justify-between items-start mb-3">
                <Link to={`/edit/${todo._id}`}>
                    <h3 className="text-xl font-semibold text-gray-800 break-words">{todo.title}</h3>
                </Link>

                <div className="flex flex-wrap gap-2 mt-1">
                    <span className={`px-3 py-2 rounded-full text-xs font-medium ${getStatusColor(todo.status)}`}>
                        {todo.status}
                    </span>
                </div>
            </div>

            {todo.description && (
                <p className="text-gray-600 mb-4 whitespace-pre-line">{todo.description}</p>
            )}

            <div className="flex flex-wrap justify-between items-center mt-4 pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                    {todo.updatedAt !== todo.createdAt
                        ? `Updated ${formatRelativeTime(todo.updatedAt)}`
                        : `Created ${formatRelativeTime(todo.createdAt)}`}
                </p>

                <div className="flex space-x-2 mt-2 sm:mt-0">
                    <Link
                        to={`/edit/${todo._id}`}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoItem;
