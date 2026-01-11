
import React from 'react';
import { ICONS } from '../../constants';
import RepairsTracker from './RepairsTracker';
import OrderHistory from './OrderHistory';

const CustomerDashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">My Tech Hub</h1>
          <p className="text-slate-400 mt-1">Track your repairs and explore premium accessories.</p>
        </div>
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2">
          <ICONS.Plus className="w-5 h-5" /> Request New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <RepairsTracker />
        <OrderHistory />
      </div>
    </div>
  );
};

export default CustomerDashboard;
