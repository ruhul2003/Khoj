"use client";

import React, { useState } from 'react';
import { Truck, MapPin, Clock, ShieldCheck, Check } from 'lucide-react';

const DIVISIONS = [
  { name: 'Dhaka', insideRate: 60, insideDays: '1 - 2 Business Days' },
  { name: 'Chittagong', insideRate: 110, insideDays: '2 - 3 Business Days' },
  { name: 'Rajshahi', insideRate: 120, insideDays: '2 - 4 Business Days' },
  { name: 'Khulna', insideRate: 120, insideDays: '2 - 4 Business Days' },
  { name: 'Barisal', insideRate: 130, insideDays: '3 - 4 Business Days' },
  { name: 'Sylhet', insideRate: 120, insideDays: '2 - 3 Business Days' },
  { name: 'Rangpur', insideRate: 130, insideDays: '3 - 4 Business Days' },
  { name: 'Mymensingh', insideRate: 110, insideDays: '2 - 3 Business Days' },
];

export function DeliveryEstimator({ sellerCity = 'Dhaka' }) {
  const [selectedDivision, setSelectedDivision] = useState('Dhaka');
  const [isExpress, setIsExpress] = useState(false);

  const divisionData = DIVISIONS.find(d => d.name === selectedDivision) || DIVISIONS[0];
  const baseCost = selectedDivision.toLowerCase() === sellerCity.toLowerCase() ? 60 : divisionData.insideRate;
  const finalCost = isExpress ? baseCost + 60 : baseCost;
  const estimatedTime = isExpress 
    ? (selectedDivision.toLowerCase() === sellerCity.toLowerCase() ? 'Same Day Delivery' : '1 - 2 Business Days')
    : divisionData.insideDays;

  return (
    <div className="bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Delivery & Shipping Estimator</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Dispatched from {sellerCity}</p>
          </div>
        </div>
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full flex items-center gap-1">
          <Check className="w-3 h-3" /> Cash on Delivery
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" /> Destination Division
          </label>
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="w-full text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {DIVISIONS.map((div) => (
              <option key={div.name} value={div.name}>
                {div.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" /> Delivery Speed
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsExpress(false)}
              className={`flex-1 text-xs py-2 rounded-xl font-medium border transition-colors ${
                !isExpress
                  ? 'bg-teal-50 dark:bg-teal-900/40 border-teal-500 text-teal-700 dark:text-teal-300'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              Standard
            </button>
            <button
              type="button"
              onClick={() => setIsExpress(true)}
              className={`flex-1 text-xs py-2 rounded-xl font-medium border transition-colors ${
                isExpress
                  ? 'bg-teal-50 dark:bg-teal-900/40 border-teal-500 text-teal-700 dark:text-teal-300'
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              Express (+৳60)
            </button>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/80 rounded-xl p-3 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-500 dark:text-slate-400 block">Estimated Timeline</span>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{estimatedTime}</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500 dark:text-slate-400 block">Courier Charge</span>
          <span className="text-sm font-extrabold text-teal-600 dark:text-teal-400">৳{finalCost}</span>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
        Supported by Pathao Courier, Steadfast & RedX with parcel inspection guarantee.
      </p>
    </div>
  );
}
