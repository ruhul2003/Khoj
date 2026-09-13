"use client";

import React, { useState } from 'react';
import { MapPin, X, Check, Search, Globe, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BANGLADESH_DIVISIONS = [
  {
    name: 'All Bangladesh',
    count: 'All listings nationwide',
    areas: []
  },
  {
    name: 'Dhaka',
    count: 'Capital Division',
    areas: ['Mirpur', 'Uttara', 'Dhanmondi', 'Gulshan', 'Mohammadpur', 'Motijheel', 'Gazipur', 'Narayanganj', 'Savar']
  },
  {
    name: 'Chattogram',
    count: 'Port City & Coastal',
    areas: ['Agrabad', 'GEC Circle', 'Nasirabad', 'Halishahar', 'Chawkbazar', 'Cox\'s Bazar', 'Cumilla']
  },
  {
    name: 'Sylhet',
    count: 'Tea Capital & Surma',
    areas: ['Zindabazar', 'Upashahar', 'Amberkhana', 'Shibgonj', 'Moulvibazar', 'Habiganj', 'Sunamganj']
  },
  {
    name: 'Rajshahi',
    count: 'Silk & Education Hub',
    areas: ['Shaheb Bazar', 'Motihar', 'Boalia', 'Bogra Sadar', 'Pabna', 'Naogaon']
  },
  {
    name: 'Khulna',
    count: 'Sundarbans Region',
    areas: ['Shibbari', 'Daulatpur', 'Sonadanga', 'Jashore Sadar', 'Kushtia', 'Satkhira']
  },
  {
    name: 'Barishal',
    count: 'Southern Riverine Hub',
    areas: ['Sadore Road', 'Natullabad', 'Rupatoli', 'Patuakhali', 'Bhola']
  },
  {
    name: 'Rangpur',
    count: 'Northern Division',
    areas: ['Jahaz Company More', 'Dhap', 'Carmichael', 'Dinajpur', 'Kurigram']
  },
  {
    name: 'Mymensingh',
    count: 'Old Brahmaputra Valley',
    areas: ['Town Hall More', 'Ganginar Par', 'Charpara', 'Jamalpur', 'Netrokona']
  }
];

export const LocationPickerModal = ({ isOpen, onClose, selectedLocation = 'Dhaka', onSelectLocation }) => {
  const router = useRouter();
  const [activeDivision, setActiveDivision] = useState('Dhaka');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const currentDivObj = BANGLADESH_DIVISIONS.find(d => d.name === activeDivision) || BANGLADESH_DIVISIONS[1];

  const handlePick = (loc) => {
    try {
      localStorage.setItem('khoj_user_location', loc);
    } catch (e) {
      console.error(e);
    }
    if (onSelectLocation) onSelectLocation(loc);
    onClose();
    router.push(`/browse?location=${encodeURIComponent(loc)}`);
  };

  const filteredDivisions = BANGLADESH_DIVISIONS.filter(div => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const nameMatch = div.name.toLowerCase().includes(q);
    const areaMatch = div.areas.some(a => a.toLowerCase().includes(q));
    return nameMatch || areaMatch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn font-['Bai_Jamjuree']">
      <div className="relative w-full max-w-2xl rounded-3xl bg-zinc-950 border border-zinc-800 p-6 sm:p-8 shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[11px] font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Select Marketplace Region</span>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">Choose Your Location</h3>
          <p className="text-xs text-zinc-400">
            Filter listings, safe meeting zones, and local shop handovers across Bangladesh.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search division or area (e.g. Mirpur, Agrabad, Sylhet)..."
            className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
        </div>

        {/* Division & Sub-areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 max-h-80 overflow-y-auto pr-1">
          {/* Divisions Column */}
          <div className="sm:col-span-5 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block px-1">
              Divisions ({filteredDivisions.length})
            </span>
            {filteredDivisions.map((div) => {
              const isSelected = activeDivision === div.name;
              return (
                <button
                  key={div.name}
                  type="button"
                  onClick={() => {
                    setActiveDivision(div.name);
                    if (div.name === 'All Bangladesh') {
                      handlePick('All Bangladesh');
                    }
                  }}
                  className={`w-full p-3 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 text-zinc-300 hover:text-white'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold">{div.name}</div>
                    <div className={`text-[10px] ${isSelected ? 'text-zinc-900 font-medium' : 'text-zinc-500'}`}>
                      {div.count}
                    </div>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-zinc-950' : 'text-zinc-500'}`} />
                </button>
              );
            })}
          </div>

          {/* Popular Areas Column */}
          <div className="sm:col-span-7 space-y-2 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <span className="text-xs font-bold text-white">
                Popular Areas in {activeDivision}
              </span>
              {activeDivision !== 'All Bangladesh' && (
                <button
                  type="button"
                  onClick={() => handlePick(activeDivision)}
                  className="text-[11px] font-bold text-amber-400 hover:underline cursor-pointer"
                >
                  Select Entire {activeDivision}
                </button>
              )}
            </div>

            {currentDivObj.areas.length === 0 ? (
              <div className="py-8 text-center text-xs text-zinc-400 space-y-2">
                <Globe className="w-8 h-8 text-zinc-600 mx-auto" />
                <p>Browsing listings nationwide across all 64 districts.</p>
                <button
                  type="button"
                  onClick={() => handlePick('All Bangladesh')}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-zinc-950 text-xs font-bold cursor-pointer"
                >
                  Apply All Bangladesh
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                {currentDivObj.areas.map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => handlePick(`${area}, ${activeDivision}`)}
                    className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800/80 hover:border-amber-400 text-left text-xs text-zinc-200 hover:text-amber-300 transition-colors cursor-pointer flex items-center justify-between group"
                  >
                    <span className="truncate font-medium">{area}</span>
                    <Check className="w-3 h-3 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
          <span>Active Selection: <strong className="text-white font-bold">{selectedLocation}</strong></span>
          <button
            type="button"
            onClick={() => handlePick('All Bangladesh')}
            className="text-zinc-400 hover:text-white cursor-pointer underline"
          >
            Reset to All Bangladesh
          </button>
        </div>
      </div>
    </div>
  );
};
