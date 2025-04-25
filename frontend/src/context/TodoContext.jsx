import { createContext, useState, useEffect, useContext } from 'react';
import { getTodos, deleteTodo } from '../api/todoService';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTodos = async () => {
        try {
            setLoading(true);
            const res = await getTodos();
            setTodos(res.data);
        } catch (err) {
            setError(err.message || 'Failed to load todos');
        } finally {
            setLoading(false);
        }
    };

    const removeTodo = async (id) => {
        try {
            await deleteTodo(id);
            setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
        } catch (err) {
            setError(err.message || 'Failed to delete todo');
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <TodoContext.Provider value={{ todos, setTodos, fetchTodos, removeTodo, loading, error }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodoContext = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodoContext must be used within a TodoProvider');
    }
    return context;
};
