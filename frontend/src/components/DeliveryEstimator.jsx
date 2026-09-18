"use client";

import React, { useState } from 'react';
import { Truck, MapPin, Clock, ShieldCheck, Check, PackageCheck, Info } from 'lucide-react';
import { formatBDT } from '@/utils/formatters';

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

const COURIER_PARTNERS = [
  { id: 'steadfast', name: 'Steadfast Courier', cod: true, speed: 'Fastest nationwide', tracking: 'Live SMS' },
  { id: 'pathao', name: 'Pathao Courier', cod: true, speed: 'Same day in Dhaka', tracking: 'App GPS' },
  { id: 'redx', name: 'RedX Logistics', cod: true, speed: 'Doorstep pickup', tracking: 'Real-time' },
  { id: 'sundarban', name: 'Sundarban Courier', cod: true, speed: 'Hub-to-hub coverage', tracking: 'Waybill' },
];

export function DeliveryEstimator({ sellerCity = 'Dhaka' }) {
  const [selectedDivision, setSelectedDivision] = useState('Dhaka');
  const [selectedCourier, setSelectedCourier] = useState('steadfast');
  const [isExpress, setIsExpress] = useState(false);
  const [openBoxCheck, setOpenBoxCheck] = useState(true);

  const divisionData = DIVISIONS.find(d => d.name === selectedDivision) || DIVISIONS[0];
  const isSameCity = selectedDivision.toLowerCase() === sellerCity.toLowerCase();
  const baseCost = isSameCity ? 60 : divisionData.insideRate;
  const finalCost = isExpress ? baseCost + 60 : baseCost;
  const estimatedTime = isExpress 
    ? (isSameCity ? 'Same Day Delivery (within 12h)' : '1 - 2 Business Days')
    : divisionData.insideDays;

  return (
    <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4 font-['Bai_Jamjuree']">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Nationwide Delivery Estimator</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Dispatched from <span className="font-semibold text-slate-700 dark:text-slate-200">{sellerCity}</span></p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Check className="w-3 h-3" /> Cash on Delivery (COD)
          </span>
        </div>
      </div>

      {/* Division and Speed selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" /> Destination Division
          </label>
          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="w-full text-xs bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500 font-medium cursor-pointer"
          >
            {DIVISIONS.map((div) => (
              <option key={div.name} value={div.name}>
                {div.name} ({div.name === sellerCity ? 'Local' : 'Inter-District'})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" /> Delivery Speed
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsExpress(false)}
              className={`flex-1 text-xs py-2 rounded-xl font-bold border transition-colors cursor-pointer ${
                !isExpress
                  ? 'bg-teal-50 dark:bg-teal-950/50 border-teal-500 text-teal-700 dark:text-teal-300'
                  : 'bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-200'
              }`}
            >
              Standard
            </button>
            <button
              type="button"
              onClick={() => setIsExpress(true)}
              className={`flex-1 text-xs py-2 rounded-xl font-bold border transition-colors cursor-pointer ${
                isExpress
                  ? 'bg-teal-50 dark:bg-teal-950/50 border-teal-500 text-teal-700 dark:text-teal-300'
                  : 'bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-200'
              }`}
            >
              Express (+৳60)
            </button>
          </div>
        </div>
      </div>

      {/* Courier Partners Selection Pills */}
      <div>
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
          Available Courier Services
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {COURIER_PARTNERS.map((courier) => (
            <button
              key={courier.id}
              type="button"
              onClick={() => setSelectedCourier(courier.id)}
              className={`p-2 rounded-xl text-left border text-[11px] transition-all cursor-pointer ${
                selectedCourier === courier.id
                  ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 font-bold'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-zinc-950 text-slate-600 dark:text-slate-400 hover:border-slate-400'
              }`}
            >
              <div className="truncate">{courier.name}</div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 block font-normal mt-0.5">{courier.tracking}</span>
            </button>
          ))}
        </div>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 flex items-center gap-1">
          <Info className="w-3 h-3 text-teal-500 shrink-0" />
          <span>
            {selectedCourier === 'steadfast' && 'Steadfast Helpline: 09678-045045 • Verified nationwide doorstep & SMS tracking'}
            {selectedCourier === 'pathao' && 'Pathao Helpline: 09610-003030 • Live in-app rider GPS & OTP delivery'}
            {selectedCourier === 'redx' && 'RedX Helpline: 09612-223344 • Fast doorstep pickup & instant return support'}
            {selectedCourier === 'sundarban' && 'Sundarban Courier: 09612-005005 • Comprehensive 64-district hub coverage'}
          </span>
        </p>
      </div>

      {/* Summary Box */}
      <div className="bg-slate-50 dark:bg-zinc-950 rounded-xl p-3.5 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
        <div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Estimated Delivery</span>
          <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100">{estimatedTime}</span>
        </div>
        <div className="text-right">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">Estimated Fee</span>
          <span className="text-base font-black text-teal-600 dark:text-teal-400">{formatBDT(finalCost)}</span>
        </div>
      </div>

      {/* Open-box inspection note */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800/80">
        <span className="flex items-center gap-1.5">
          <PackageCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>Parcel open-box physical check allowed upon delivery</span>
        </span>
        <span className="text-[10px] text-slate-400">Doorstep COD</span>
      </div>
    </div>
  );
}
