'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type Task = {
    id: string;
    group_id: string;
    title: string;
    status: boolean;
    create_at: string;
};

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuthAndLoad = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return router.push('/sign-in');
            const { data: tasksData } = await supabase.from('tasks').select('*').order('inserted_at', { ascending: false });
            setTasks(tasksData || []);
            setLoading(false);
        };
        checkAuthAndLoad();
    }, [router]);

    async function addTodo(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user || !input.trim()) return;
        const { data: newTodo, error } = await supabase.from('tasks').insert({ title: input, user_id: userData.user.id }).select().single();
        if (!error) setTasks([newTodo, ...tasks]);
        setInput('');
    }

    if (loading) return (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-neutral-800/20 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-pinwheel-icon lucide-loader-pinwheel animate-spin text-yellow-600"><path d="M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0"/><path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6"/><path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6"/><circle cx="12" cy="12" r="10"/></svg>
        </div>
    );

    return (
        <main>
            <h1>Your Todo List</h1>
            <form onSubmit={addTodo}>
                <input
                type="text"
                placeholder="Add new task"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>
            <ul>
                {tasks.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
        </main>
    );
}