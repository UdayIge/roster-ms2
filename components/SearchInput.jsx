"use client";
import React from 'react';

export default function SearchInput({value, onChange}){
  return (
    <div className="relative w-full md:w-80">
      <input
        aria-label="Search providers"
        className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring focus:border-indigo-300"
        placeholder="Search providers by name..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
        </svg>
      </div>
    </div>
  );
}
