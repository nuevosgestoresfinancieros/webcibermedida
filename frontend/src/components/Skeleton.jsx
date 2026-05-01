import React from 'react';

export function SkeletonBox({ className = '' }) {
  return <div className={`animate-pulse bg-slate-800/70 rounded-md ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/40 p-6 space-y-4">
      <SkeletonBox className="h-40 w-full" />
      <SkeletonBox className="h-5 w-3/4" />
      <SkeletonBox className="h-3 w-full" />
      <SkeletonBox className="h-3 w-5/6" />
      <div className="flex gap-2">
        <SkeletonBox className="h-7 w-16" />
        <SkeletonBox className="h-7 w-20" />
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-slate-800">
      <SkeletonBox className="w-12 h-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <SkeletonBox className="h-4 w-1/3" />
        <SkeletonBox className="h-3 w-2/3" />
      </div>
    </div>
  );
}
