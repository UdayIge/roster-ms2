"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRoster, setFilter, applyFilters } from "../store/rosterSlice";
import Filters from "../components/Filters";
import SearchInput from "../components/SearchInput";
import ProviderCard from "../components/ProviderCard";
import CalendarModal from "../components/CalendarModal";

export default function HomePage() {
  const dispatch = useDispatch();
  const { filtered, loading, filters } = useSelector((s) => s.roster);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    dispatch(loadRoster());
  }, [dispatch]);

  const handleSearch = (value) => {
    dispatch(setFilter({ key: "search", value }));
    dispatch(applyFilters());
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl font-bold">Roster Management</h1>
      </header>

      <main className="max-w-6xl mx-auto space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Filters />
          <div className="w-full md:w-64">
            <SearchInput value={filters.search} onChange={handleSearch} />
          </div>
        </div>

        <section>
          {loading ? (
            <div>Loading...</div>
          ) : filtered.length === 0 ? (
            <div>No providers found</div>
          ) : (
            <div className="grid gap-4">
              {filtered.map((p) => (
                <ProviderCard
                  key={p.id}
                  provider={p}
                  onViewCalendar={(prov) => setSelected(prov)}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {selected && (
        <CalendarModal provider={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
