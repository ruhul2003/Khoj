"use client";

import React, { useState } from 'react';
import { ShieldCheck, MapPin, Building2, Train, CheckCircle2, ChevronRight, Info } from 'lucide-react';

const REGIONAL_HUBS = {
  Dhaka: [
    { name: 'MRT Line-6 Metro Stations', desc: 'Uttara North, Mirpur 10, Farmgate, or Motijheel Concourse', tag: 'CCTV & Police Post', icon: Train },
    { name: 'Bashundhara City or Jamuna Future Park', desc: 'Main Food Courts or Central Atrium', tag: 'High Foot Traffic', icon: Building2 },
    { name: 'Dhanmondi Shimanto Square / Rapa Plaza', desc: 'Public Ground Floor Cafe Zone', tag: 'Daylight Hub', icon: Building2 },
    { name: 'Gulshan-1 DCC / Police Plaza Concord', desc: 'Prominent Shopping Concourse', tag: 'Security Guarded', icon: ShieldCheck }
  ],
  Chattogram: [
    { name: 'Sanmar Ocean City or Afmi Plaza', desc: 'GEC Circle Commercial Hub', tag: 'High Foot Traffic', icon: Building2 },
    { name: 'Agrabad Commercial Area', desc: 'Near Major Bank Branches', tag: 'Security Guarded', icon: ShieldCheck }
  ],
  Sylhet: [
    { name: 'Al-Hamra Shopping City', desc: 'Zindabazar Central Hub', tag: 'Commercial Zone', icon: Building2 },
    { name: 'Kumarpara Public Square', desc: 'High Visibility Crossing', tag: 'Daylight Hub', icon: MapPin }
  ],
  Default: [
    { name: 'Central Shopping Complex or Mall', desc: 'Main public concourse or food area', tag: 'Public Area', icon: Building2 },
    { name: 'Public Transit Terminal / Station', desc: 'Near security counter or station master', tag: 'High Visibility', icon: Train },
    { name: 'Nearby Bank or Post Office Lobby', desc: 'Well-lit area with surveillance cameras', tag: 'CCTV Monitored', icon: ShieldCheck }
  ]
};

export const SafeHandoverHubs = ({ location = 'Dhaka, Bangladesh' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const locLower = (location || '').toLowerCase();
  let cityKey = 'Default';
  if (locLower.includes('dhaka') || locLower.includes('mirpur') || locLower.includes('uttara') || locLower.includes('gulshan') || locLower.includes('dhanmondi')) {
    cityKey = 'Dhaka';
  } else if (locLower.includes('chattogram') || locLower.includes('chittagong')) {
    cityKey = 'Chattogram';
  } else if (locLower.includes('sylhet')) {
    cityKey = 'Sylhet';
  }

  const hubs = REGIONAL_HUBS[cityKey] || REGIONAL_HUBS.Default;

  return (
    <div className="glass-panel p-5 rounded-2xl border border-zinc-800/90 space-y-3 font-['Bai_Jamjuree']">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#0c9096]">
          <div className="w-6 h-6 rounded-lg bg-[#0c9096]/15 border border-[#0c9096]/30 flex items-center justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-[#38d4dc]" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Safe Handover Exchange Zones
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
          Verified Public Spots
        </span>
      </div>

      <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
        For physical handover in <strong className="text-white font-medium">{location}</strong>, meet at these high-visibility public spots:
      </p>

      <div className="space-y-2 pt-1">
        {hubs.slice(0, isExpanded ? hubs.length : 2).map((hub, idx) => {
          const Icon = hub.icon;
          return (
            <div
              key={idx}
              className="flex items-start gap-3 p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/70 hover:border-zinc-700 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-zinc-800 text-zinc-300 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-3.5 h-3.5 text-[#0c9096]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h5 className="text-xs font-bold text-white truncate">{hub.name}</h5>
                  <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-zinc-800 text-[#38d4dc] font-semibold shrink-0">
                    {hub.tag}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 font-light mt-0.5">{hub.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {hubs.length > 2 && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full pt-1 text-[11px] font-bold text-[#0c9096] hover:text-[#38d4dc] text-center cursor-pointer transition-colors"
        >
          {isExpanded ? 'Show Fewer Hubs ▲' : `View ${hubs.length - 2} More Safe Zones in ${cityKey} ▼`}
        </button>
      )}

      <div className="pt-2 border-t border-zinc-800/60 flex items-center gap-1.5 text-[10px] text-zinc-500">
        <Info className="w-3 h-3 text-zinc-400 shrink-0" />
        <span>Always inspect items & test before paying. Never meet in private residences.</span>
      </div>
    </div>
  );
};
