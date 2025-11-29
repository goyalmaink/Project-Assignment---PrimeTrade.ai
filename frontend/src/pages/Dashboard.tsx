import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import type { Task } from '../types';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'

const API_URL = 'http://localhost:8000/api';

const Dashboard = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const { token } = useAuth();

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_URL}/task/gettask`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(response.data.tasks || []);
            setError('');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [token]);

    const handleCreateTask = async (taskData: { title: string; description: string; priority: string }) => {
        try {
            await axios.post(`${API_URL}/task/create`, taskData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchTasks();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create task');
        }
    };

    const handleUpdateTask = async (taskData: { title: string; description: string; priority: string }) => {
        if (!editingTask) return;

        try {
            await axios.put(`${API_URL}/task/updated/${editingTask.id}`, taskData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setEditingTask(null);
            fetchTasks();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update task');
        }
    };

    const handleToggleTask = async (id: string, completed: boolean) => {
        try {
            await axios.put(
                `${API_URL}/task/updated/${id}`,
                { completed },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchTasks();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to update task');
        }
    };

    const handleDeleteTask = async (id: string) => {
        if (!confirm('Are you sure you want to delete this task?')) return;

        try {
            await axios.delete(`${API_URL}/task/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchTasks();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to delete task');
        }
    };

    const pendingTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <TaskForm
                    onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                    editingTask={editingTask}
                    onCancel={() => setEditingTask(null)}
                />

                {loading ? (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600">Loading tasks...</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                Pending Tasks ({pendingTasks.length})
                            </h2>
                            {pendingTasks.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No pending tasks</p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {pendingTasks.map((task) => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            onToggle={handleToggleTask}
                                            onDelete={handleDeleteTask}
                                            onEdit={setEditingTask}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {completedTasks.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                    Completed Tasks ({completedTasks.length})
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {completedTasks.map((task) => (
                                        <TaskCard
                                            key={task.id}
                                            task={task}
                                            onToggle={handleToggleTask}
                                            onDelete={handleDeleteTask}
                                            onEdit={setEditingTask}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;