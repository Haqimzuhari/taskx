'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ScreenLoading from '@/components/screen/loading';

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
        <ScreenLoading/>
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