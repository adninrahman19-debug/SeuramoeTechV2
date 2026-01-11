
import React from 'react';

interface TaskQueueProps {
  isTechnician: boolean;
}

const TaskQueue: React.FC<TaskQueueProps> = ({ isTechnician }) => {
  return (
    <div className="glass-panel rounded-2xl border-slate-800 overflow-hidden">
      <div className="p-6 border-b border-slate-800 bg-slate-900/50">
        <h3 className="text-lg font-bold text-white uppercase tracking-wider text-xs">Active Task Queue</h3>
      </div>
      <div className="p-6 space-y-4">
        {[1, 2, 3].map((task) => (
          <div key={task} className="flex items-center justify-between p-4 bg-slate-950/40 border border-slate-800 rounded-xl hover:border-indigo-500/30 transition-all">
            <div className="flex items-center gap-4">
              <div className={`w-2 h-2 rounded-full ${task === 1 ? 'bg-amber-500 animate-pulse' : 'bg-slate-600'}`}></div>
              <div>
                <h4 className="font-bold text-white text-sm">
                  {isTechnician ? `Repair: MacBook Air M2 Logic Board (#T-10${task})` : `Order Fulfillment: Lenovo Legion 5 (#O-50${task})`}
                </h4>
                <p className="text-xs text-slate-500">Priority: High • Due: Today, 5:00 PM</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-slate-800 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg transition-colors border border-slate-700">
              Update Status
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskQueue;
