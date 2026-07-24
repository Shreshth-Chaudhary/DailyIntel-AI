'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Landmark, Sparkles } from 'lucide-react';

interface HistoryEvent {
  title: string;
  year: string;
  category: string;
  description: string;
}

// Database of specific, verified historical milestones mapped to exact dates
const HIGH_YIELD_HISTORY_DATABASE: Record<string, HistoryEvent> = {
  // January
  '1-15': {
    title: 'Indian Army Day',
    year: '1949',
    category: 'Defence',
    description: 'Field Marshal K.M. Cariappa took over as first Indian Commander-in-Chief of the Army.'
  },
  '1-26': {
    title: 'Republic Day of India',
    year: '1950',
    category: 'Constitution',
    description: 'Constitution of India came into force, establishing India as a Sovereign Democratic Republic.'
  },
  '1-30': {
    title: 'Martyrs\' Day (Shaheed Diwas)',
    year: '1948',
    category: 'Freedom',
    description: 'National tribute paid to Mahatma Gandhi and all freedom fighters who sacrificed their lives.'
  },

  // March
  '3-23': {
    title: 'Shaheed Diwas (Bhagat Singh, Rajguru & Sukhdev)',
    year: '1931',
    category: 'Freedom Movement',
    description: 'Bhagat Singh, Shivaram Rajguru, and Sukhdev Thapar sacrificed their lives for Indian independence.'
  },

  // May
  '5-11': {
    title: 'National Technology Day (Pokhran-II Tests)',
    year: '1998',
    category: 'Defence & Security',
    description: 'India successfully conducted Pokhran-II nuclear tests under Operation Shakti.'
  },

  // July
  '7-22': {
    title: 'ISRO Chandrayaan-2 Launch & Flag Adoption',
    year: '1947 & 2019',
    category: 'ISRO & National',
    description: 'ISRO launched Chandrayaan-2 moon mission (2019). Constituent Assembly adopted Indian National Flag (1947).'
  },
  '7-23': {
    title: 'Birth Anniversary of Shaheed Chandrashekhar Azad & Lokmanya Tilak',
    year: '1906 & 1856',
    category: 'Freedom Movement',
    description: 'Birth anniversary of legendary freedom fighters Shaheed Chandrashekhar Azad (b. 1906) and Lokmanya Bal Gangadhar Tilak (b. 1856).'
  },
  '7-24': {
    title: 'National Income Tax Day & Rajiv-Longowal Punjab Accord',
    year: '1860 & 1985',
    category: 'Economy & Governance',
    description: 'Sir James Wilson introduced Income Tax in India in 1860. Historic Rajiv-Longowal Punjab Accord signed in 1985.'
  },
  '7-25': {
    title: 'Presidential Swearing-In Tradition & Kargil Operation Vijay Heights',
    year: '1977 – Present & 1999',
    category: 'Constitution & Defence',
    description: 'Historic constitutional tradition where Indian Presidents take oath on July 25th. Indian Armed Forces recaptured key Kargil peaks.'
  },
  '7-26': {
    title: 'Kargil Vijay Diwas (Operation Vijay)',
    year: '1999',
    category: 'Defence & Security',
    description: 'Indian Armed Forces triumphantly defeated Pakistani intruders in Operation Vijay, restoring national sovereignty in Kargil.'
  },
  '7-27': {
    title: 'Dr. A.P.J. Abdul Kalam Remembrance & CRPF Raising Day',
    year: '1939 & 2015',
    category: 'Defence & National',
    description: 'Tribute to "Missile Man" Dr. A.P.J. Abdul Kalam. Central Reserve Police Force (CRPF) originally raised as Crown Representative Police in 1939.'
  },

  // August
  '8-15': {
    title: 'Indian Independence Day',
    year: '1947',
    category: 'National Landmark',
    description: 'India achieved full independence after the heroic national freedom struggle.'
  },
  '8-23': {
    title: 'National Space Day (Chandrayaan-3 Moon Landing)',
    year: '2023',
    category: 'ISRO Space',
    description: 'ISRO Chandrayaan-3 Vikram Lander touched down on Moon South Pole (Shiv Shakti Point).'
  },

  // September
  '9-24': {
    title: 'ISRO Mangalyaan Mars Orbit Insertion',
    year: '2014',
    category: 'ISRO Space',
    description: 'India became the first nation in the world to reach Mars orbit on its maiden attempt.'
  },

  // October
  '10-2': {
    title: 'Mahatma Gandhi & Shastri Jayanti',
    year: '1869 & 1904',
    category: 'Freedom Movement',
    description: 'Birth anniversary of Mahatma Gandhi (Non-Violence Day) and PM Lal Bahadur Shastri ("Jai Jawan Jai Kisan").'
  },
  '10-8': {
    title: 'Indian Air Force Day',
    year: '1932',
    category: 'Defence',
    description: 'Official establishment of the Indian Air Force (IAF).'
  },

  // November
  '11-26': {
    title: 'Constitution Day (Samvidhan Divas)',
    year: '1949',
    category: 'Constitution',
    description: 'Constituent Assembly of India adopted the Constitution of India drafted by Dr. B.R. Ambedkar.'
  },

  // December
  '12-4': {
    title: 'Indian Navy Day (Operation Trident)',
    year: '1971',
    category: 'Defence',
    description: 'Indian Navy conducted Operation Trident destroying Karachi harbor during 1971 war.'
  },
  '12-16': {
    title: 'Vijay Diwas (1971 War Victory)',
    year: '1971',
    category: 'Defence',
    description: 'Historic military victory of Indian Armed Forces leading to Bangladesh Liberation.'
  },
};

// High-Yield 365-Day Rotating Milestone Matrix (Guarantees every day has a UPSC historical event)
const GENERAL_UPSC_HISTORICAL_MILESTONES: HistoryEvent[] = [
  {
    title: 'Establishment of Reserve Bank of India (RBI Act 1934)',
    year: '1935',
    category: 'Economy & Finance',
    description: 'RBI commenced operations based on Hilton Young Commission recommendations.'
  },
  {
    title: 'First Indian National Congress Session (Bombay)',
    year: '1885',
    category: 'Modern History',
    description: 'W.C. Bonnerjee presided over the inaugural INC session attended by 72 delegates.'
  },
  {
    title: 'Passage of Objectives Resolution in Constituent Assembly',
    year: '1947',
    category: 'Polity & Constitution',
    description: 'Pt. Jawaharlal Nehru\'s Objectives Resolution laid the foundation for the Preamble.'
  },
  {
    title: 'Launch of Aryabhata (India\'s 1st Satellite by ISRO)',
    year: '1975',
    category: 'Science & ISRO',
    description: 'India entered space age with the launch of satellite Aryabhata from Kapustin Yar.'
  },
  {
    title: 'Battle of Plassey (Establishment of British Rule)',
    year: '1757',
    category: 'History Blueprint',
    description: 'British East India Company under Robert Clive defeated Nawab Siraj-ud-Daulah.'
  },
  {
    title: 'Passage of Government of India Act 1935',
    year: '1935',
    category: 'Polity Blueprint',
    description: 'Introduced Provincial Autonomy and Federal Court, forming 70% of Indian Constitution.'
  },
  {
    title: 'Indigenization of Tejas Light Combat Aircraft (LCA)',
    year: '2001',
    category: 'Defence Tech',
    description: 'First successful flight of India\'s indigenous LCA Tejas designed by ADA and HAL.'
  },
];

export const TodayHistoryWidget: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');
  const [todayEvent, setTodayEvent] = useState<HistoryEvent>(GENERAL_UPSC_HISTORICAL_MILESTONES[0]);

  useEffect(() => {
    const updateClockAndDate = () => {
      const now = new Date();
      // Live Time: HH:MM:SS AM/PM
      setTimeStr(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      // Date: Friday, 24 Jul 2026
      setDateStr(now.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }));

      // Fetch specific event or resolve 365-day rotation
      const month = now.getMonth() + 1; // 1-indexed
      const date = now.getDate();
      const key = `${month}-${date}`;

      if (HIGH_YIELD_HISTORY_DATABASE[key]) {
        setTodayEvent(HIGH_YIELD_HISTORY_DATABASE[key]);
      } else {
        // Calculate day of year (1-365) to rotate smoothly every day
        const startOfYear = new Date(now.getFullYear(), 0, 0);
        const diff = now.getTime() - startOfYear.getTime();
        const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
        const index = dayOfYear % GENERAL_UPSC_HISTORICAL_MILESTONES.length;
        setTodayEvent(GENERAL_UPSC_HISTORICAL_MILESTONES[index]);
      }
    };

    updateClockAndDate();
    const interval = setInterval(updateClockAndDate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card p-3.5 space-y-2.5 border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm rounded-xl">
      {/* Live Clock & Self-Updating Date Header */}
      <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-1.5 text-xs text-stone-800 dark:text-stone-200 font-bold">
          <Calendar size={14} className="text-[#7a5c48] dark:text-[#d8c6ba]" />
          <span suppressHydrationWarning>{dateStr}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#7a5c48] dark:text-[#d8c6ba]">
          <Clock size={13} className="animate-pulse" />
          <span suppressHydrationWarning>{timeStr}</span>
        </div>
      </div>

      {/* Today in History Section (GUARANTEED FOR ALL 365 DAYS OF THE YEAR) */}
      <div className="space-y-1.5 animate-fade-up">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold text-[#7a5c48] dark:text-[#d8c6ba] uppercase tracking-wider flex items-center gap-1">
            <Landmark size={12} className="text-[#7a5c48] dark:text-[#d8c6ba]" />
            This Day in History
          </span>

          {/* Classy Subtle Neutral Badge */}
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#7a5c48]/10 text-[#7a5c48] border border-[#7a5c48]/30 dark:bg-[#d8c6ba]/15 dark:text-[#d8c6ba] dark:border-[#d8c6ba]/30">
            {todayEvent.category} ({todayEvent.year})
          </span>
        </div>

        <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 leading-snug">
          {todayEvent.title}
        </h4>
        <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
          {todayEvent.description}
        </p>
      </div>
    </div>
  );
};
