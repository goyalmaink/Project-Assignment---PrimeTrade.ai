import type { Task } from '../types';

interface TaskCardProps {
    task: Task;
    onToggle: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
}

const TaskCard = ({ task, onToggle, onDelete, onEdit }: TaskCardProps) => {
    const priorityColors = {
        high: 'bg-red-100 text-red-800 border-red-300',
        medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        low: 'bg-green-100 text-green-800 border-green-300',
    };

    const priorityColor = priorityColors[task.priority as keyof typeof priorityColors] || priorityColors.medium;

    return (
        <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${task.completed ? 'opacity-60' : ''}`}>
            <div className="flex justify-between items-start mb-2">
                <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {task.title}
                </h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColor}`}>
                    {task.priority}
                </span>
            </div>

            {task.description && (
                <p className="text-gray-600 text-sm mb-3">{task.description}</p>
            )}

            {task.owner && (
                <p className="text-xs text-gray-500 mb-3">Owner: {task.owner.email}</p>
            )}

            <div className="flex justify-between items-center">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggle(task.id, !task.completed)}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                        {task.completed ? 'Completed' : 'Mark as complete'}
                    </span>
                </label>

                <div className="flex space-x-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className="mt-2 text-xs text-gray-400">
                Created: {new Date(task.createdAt).toLocaleDateString()}
            </div>
        </div>
    );
};

export default TaskCard;