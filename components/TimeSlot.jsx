"use client";
import React from 'react';
import { statusClass } from '../utils/statusColors';

export default function TimeSlot({slot}) {
  const cls = statusClass(slot.status);
  return (
    <div className={`border rounded px-2 py-1 text-xs ${cls} flex items-center justify-center`}>
      <span>{slot.time}</span>
    </div>
  );
}
