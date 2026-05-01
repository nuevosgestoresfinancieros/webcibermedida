import React from 'react';
import Counter from './Counter';
import { stats } from '../mock';

export default function StatsBand() {
  return (
    <section className="bg-gradient-to-r from-cyan-500 to-cyan-400 py-14">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-slate-900 text-4xl md:text-5xl font-black">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="text-slate-800 text-sm md:text-base font-semibold mt-2">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
