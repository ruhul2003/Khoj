"use client";

import React, { useState } from 'react';
import { ShieldCheck, CheckSquare, Square, X, AlertTriangle, Smartphone, Laptop, Car, PackageCheck, Sparkles } from 'lucide-react';

const CATEGORY_CHECKLISTS = {
  'Mobile Phones': [
    { id: 'imei', title: 'Verify IMEI Number', desc: 'Dial *#06# and verify that the 15-digit IMEI matches the original box and invoice.' },
    { id: 'screen', title: 'Test Touch Digitizer', desc: 'Hold and drag any home screen icon smoothly across every corner of the display to ensure no dead touch zones.' },
    { id: 'battery', title: 'Check Battery Health', desc: 'Inspect Settings > Battery Health (iOS) or test rapid discharge during a 3-minute 4K video recording.' },
    { id: 'camera', title: 'Test Cameras & Microphones', desc: 'Take photo with both main & ultra-wide lenses, test selfie camera, flash, and record a test voice memo.' },
    { id: 'accounts', title: 'Ensure Cloud Accounts are Signed Out', desc: 'Confirm iCloud / Apple ID or Google Account is completely removed and device is factory reset.' },
    { id: 'biometrics', title: 'Test Face ID / Fingerprint', desc: 'Set up your own biometric unlock in settings to verify hardware sensors are authentic.' }
  ],
  'Electronics': [
    { id: 'serial', title: 'Serial Number Verification', desc: 'Check that device serial number in software matches the physical sticker and box.' },
    { id: 'screen_pixels', title: 'Check for Dead Pixels', desc: 'Display a pure white and pure black fullscreen image to spot any stuck or dead pixels.' },
    { id: 'ports', title: 'Test All Physical Ports', desc: 'Plug flash drive and charger into all USB-C, USB-A, HDMI, and headphone jack sockets.' },
    { id: 'battery_cycle', title: 'Check Battery Cycles', desc: 'Verify battery cycle count and capacity retention via system report.' },
    { id: 'fans', title: 'Listen for Fan Noise & Thermals', desc: 'Run a brief benchmark to ensure cooling fans operate smoothly without grinding noises.' }
  ],
  'Gaming': [
    { id: 'drift', title: 'Controller Stick Drift Test', desc: 'Open gamepad calibration settings to check for any analog stick drift or sticky triggers.' },
    { id: 'fans', title: 'Thermals & Fan Noise', desc: 'Run a heavy game for 5 minutes to ensure the console or GPU does not overheat or shut down.' },
    { id: 'network', title: 'Network & Online Services', desc: 'Connect to Wi-Fi and verify the console/account is not banned from PSN, Xbox Live, or Steam.' },
    { id: 'disc_drive', title: 'Disc Drive / Port Testing', desc: 'Insert a disc or test cartridge slot to ensure smooth loading and read performance.' }
  ],
  'Vehicles': [
    { id: 'brta', title: 'BRTA Papers & Tax Token', desc: 'Verify Blue Book / Smart Card, tax token validity, and fitness certificate expiration.' },
    { id: 'engine_chassis', title: 'Engine & Chassis Number Stamp', desc: 'Compare physical stamping on the engine block and chassis against the registration document.' },
    { id: 'oil_dipstick', title: 'Oil & Fluid Condition', desc: 'Pull the engine oil dipstick to check for sludge, milky residue (head gasket leak), or burnt smell.' },
    { id: 'test_drive', title: 'Steering, Brakes & Suspension Drive', desc: 'Drive on varying roads, check for unusual clunking noises, brake shudder, or gear slipping.' }
  ],
  'Default': [
    { id: 'match_photos', title: 'Matches Listing Photos', desc: 'Verify item condition, color, and accessories match what was displayed on Khoj.' },
    { id: 'physical_damage', title: 'Inspect Joints & Physical Structure', desc: 'Check carefully for undisclosed cracks, deep scratches, dents, or tears.' },
    { id: 'working_order', title: 'Test Working Operation', desc: 'Verify all moving parts, zippers, buttons, or power switches function properly.' },
    { id: 'invoice_warranty', title: 'Collect Invoice or Warranty Card', desc: 'Ask the seller for any original receipt, warranty documentation, or included accessories.' }
  ]
};

export function InspectionChecklistModal({ category, productTitle, isOpen, onClose }) {
  const [checkedItems, setCheckedItems] = useState({});

  if (!isOpen) return null;

  const steps = CATEGORY_CHECKLISTS[category] || CATEGORY_CHECKLISTS['Default'];
  const totalCount = steps.length;
  const verifiedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((verifiedCount / totalCount) * 100);

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getCategoryIcon = () => {
    if (category === 'Mobile Phones') return <Smartphone className="w-5 h-5 text-[#0c9096]" />;
    if (category === 'Electronics' || category === 'Gaming') return <Laptop className="w-5 h-5 text-[#0c9096]" />;
    if (category === 'Vehicles') return <Car className="w-5 h-5 text-[#0c9096]" />;
    return <PackageCheck className="w-5 h-5 text-[#0c9096]" />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md font-['Bai_Jamjuree']">
      <div className="glass-panel w-full max-w-xl max-h-[90vh] rounded-3xl border border-zinc-800 shadow-2xl flex flex-col overflow-hidden my-auto animate-in fade-in">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 bg-zinc-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0c9096]/20 border border-[#0c9096]/40 flex items-center justify-center">
              {getCategoryIcon()}
            </div>
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <span>Handover Inspection Checklist</span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#0c9096]/20 text-[#38d4dc] border border-[#0c9096]/40">
                  {category}
                </span>
              </h3>
              <p className="text-xs text-zinc-400 truncate max-w-sm">
                Follow these verification steps before transferring payment
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-5 pb-3 border-b border-zinc-800/80 bg-zinc-950/30">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-zinc-300">
              Inspection Progress: {verifiedCount} of {totalCount} verified
            </span>
            <span className={`font-black ${progressPercent === 100 ? 'text-emerald-400' : 'text-[#38d4dc]'}`}>
              {progressPercent}%
            </span>
          </div>
          <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <div
              className={`h-full transition-all duration-300 ${
                progressPercent === 100
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : 'bg-gradient-to-r from-[#0c9096] to-[#38d4dc]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Steps List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {steps.map((step, idx) => {
            const isDone = !!checkedItems[step.id];

            return (
              <div
                key={step.id}
                onClick={() => toggleCheck(step.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                  isDone
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-zinc-200'
                    : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isDone ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Square className="w-5 h-5 text-zinc-600" />
                  )}
                </div>

                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs font-bold ${isDone ? 'line-through text-zinc-400' : 'text-white'}`}>
                      {idx + 1}. {step.title}
                    </h4>
                    {isDone && (
                      <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/40">
                        Passed
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-zinc-800 bg-zinc-950/70 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Never pay advance or deposit before physical handover.</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0c9096] hover:bg-[#0a6c71] text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
