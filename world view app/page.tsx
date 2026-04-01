'use client';

import useSWR from 'swr';
import { useState, useEffect } from 'react';
import Map from '../components/Map';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  const { data } = useSWR('/api/events', fetcher, { refreshInterval: 10000 });
  const { data: summaryData } = useSWR('/api/summary', fetcher);

  const [timeRange, setTimeRange] = useState(24);
  const [isPlaying, setIsPlaying] = useState(false);

  const now = Date.now();

  const filteredEvents = data?.events?.filter((e: any) =>
    now - e.timestamp <= timeRange * 3600000
  );

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTimeRange(prev => (prev <= 1 ? 24 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex h-screen bg-black">
      <Sidebar summary={summaryData?.summary} />

      <div className="flex-1 relative">
        <Map events={filteredEvents} />
      </div>

      <div className="w-80 bg-gray-900">
        <Feed events={filteredEvents} />
      </div>
    </div>
  );
}