import instance from './axios';

export const getTodos = () => instance.get('/todos');
export const getTodoById = (id) => instance.get(`/todos/${id}`);
export const createTodo = (data) => instance.post('/todos', data);
export const updateTodo = (id, data) => instance.put(`/todos/${id}`, data);
export const deleteTodo = (id) => instance.delete(`/todos/${id}`);
