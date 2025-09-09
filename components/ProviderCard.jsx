"use client";
import React from 'react';

export default function ProviderCard({provider, onViewCalendar}){
  return (
    <div className="p-4 border rounded-lg shadow-sm flex flex-col md:flex-row md:items-center gap-4 bg-white">
      <div className="flex items-center gap-4">
        <img src={provider.image || '/avatars/default.png'} alt="" className="w-16 h-16 rounded-full object-cover shadow" />
        <div>
          <div className="font-semibold text-base">{provider.name}</div>
          <div className="text-sm text-gray-500 flex gap-2 items-center">
            <span className="capitalize">{provider.provider_usertype}</span>
            {provider.is_inhouse && <span className="inline-block bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs">In-house</span>}
          </div>
          <div className="text-sm text-gray-400">{provider.clinic_details?.name}</div>
        </div>
      </div>

      <div className="ml-auto flex gap-2">
        <button onClick={()=>onViewCalendar(provider)} className="px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md text-sm">View Calendar</button>
      </div>
    </div>
  );
}
