"use client";
import React, { useMemo } from 'react';
import TimeSlot from './TimeSlot';

// Normalize API availabilities (roster.json shape) into the { date, slots: [{ time, status, ... }] } shape
function normalizeAvailabilities(availabilities = []) {
  const priority = {
    blocked: 6,
    online_booked: 5,
    offline_booked: 5,
    online_offline: 4,
    online: 3,
    offline: 2,
    available: 1,
  };

  const mergeStatus = (a, b) => {
    if (!a) return b;
    if (!b) return a;
    if (a === b) return a;
    const pick = a && b ? (priority[a] >= priority[b] ? a : b) : (a || b);
    return pick;
  };

  const toMinutes = (t = '00:00') => {
    const [hh, mm] = t.split(':').map(Number);
    return (hh || 0) * 60 + (mm || 0);
  };

  return availabilities.map((day, idx) => {
    // If the availability already has slots in the desired shape, pass through
    if (Array.isArray(day.slots) && day.slots.length && day.slots[0].time) {
      return {
        date: day.date || day.label || `Day ${idx + 1}`,
        slots: day.slots.slice().sort((a, b) => toMinutes(a.time) - toMinutes(b.time)),
      };
    }

    const map = new Map();
    const add = (time, status, extra) => {
      if (!time) return;
      const existing = map.get(time);
      if (existing) {
        existing.status = mergeStatus(existing.status, status);
        if (extra && extra.reason) existing.reason = extra.reason;
      } else {
        map.set(time, { time, status, ...(extra && extra.reason ? { reason: extra.reason } : {}) });
      }
    };

    // both_slots means available for online & offline
    (day.both_slots || []).forEach((t) => add(t, 'online_offline'));
    (day.online_slots || []).forEach((t) => add(t, 'online'));
    (day.offline_slots || []).forEach((t) => add(t, 'offline'));

    // booked slots — mark specially so UI can style differently
    (day.online_booked_slots || []).forEach((t) => add(t, 'online_booked'));
    (day.offline_booked_slots || []).forEach((t) => add(t, 'offline_booked'));

    // blocked_slots is an array of objects [{ slot: '11:00', reason: 'Unwell' }]
    (day.blocked_slots || []).forEach((b) => add(b.slot, 'blocked', b));

    const slots = Array.from(map.values()).sort((a, b) => toMinutes(a.time) - toMinutes(b.time));

    return {
      date: day.date || day.label || `Availability ${idx + 1}`,
      slots,
    };
  });
}

export default function CalendarModal({ provider, onClose }) {
  if (!provider) return null;

  const days = useMemo(() => normalizeAvailabilities(provider.availabilities || []), [provider]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-4xl rounded-lg p-6 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold">{provider.name} — Calendar</h3>
            {provider.clinic_details?.name && (
              <div className="text-sm text-gray-500">{provider.clinic_details.name}</div>
            )}
          </div>
          <button onClick={onClose} className="px-2 py-1 border rounded">Close</button>
        </div>

        {days.length === 0 && <div className="text-sm text-gray-500">No availabilities</div>}

        {days.map((day, index) => (
          <div key={index} className="mb-4">
            <div className="font-medium mb-2">{day.date}</div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {day.slots.map((slot, i) => (
                <TimeSlot key={i} slot={slot} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
