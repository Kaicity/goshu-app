'use client';

import AppAreaChart from '@/components/AppAreaChart';
import AppBarChart from '@/components/AppBarChart';
import AppPieChart from '@/components/AppPieChart';
import ProtectPage from '@/components/auth/ProtectPage';
import CardList from '@/components/CardList';
import TodoList from '@/components/TodoList';
import { useApp } from '@/contexts/AppContext';
import { useEffect } from 'react';

const Homepage = () => {
  const { setUserAccount } = useApp();
  

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserAccount(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList title="Latest Transactions" />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppPieChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <TodoList />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList title="Popular Content" />
      </div>
    </div>
  );
};

export default ProtectPage(Homepage);
