"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Ban, 
  Eye, 
  ExternalLink, 
  Clock, 
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { api } from '@/lib/api';

export function AdminReportsTab({ onInspectProduct }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReports = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/products/admin/reports');
      setReports(res.data || []);
    } catch (err) {
      console.warn('Could not fetch reports:', err.message);
      // Fallback empty array
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleResolve = async (reportId, action, productId) => {
    try {
      await api.put(`/products/admin/reports/${reportId}/status`, {
        status: action === 'dismiss' ? 'Dismissed' : 'Resolved',
        action
      });
      // Optimistic update
      setReports(prev => prev.map(r => {
        if (r._id === reportId) {
          return {
            ...r,
            status: action === 'dismiss' ? 'Dismissed' : 'Resolved',
            actionTaken: action === 'suspend' ? 'Product Suspended' : (r.actionTaken || 'Reviewed')
          };
        }
        return r;
      }));
    } catch (err) {
      alert(err.message || 'Failed to update report status');
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#111726] border border-slate-200/80 dark:border-slate-800 rounded-xl p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-7 w-7 border-2 border-slate-300 dark:border-slate-700 border-t-amber-500 mb-2" />
        <p className="text-xs text-slate-500">Loading trust & safety reports...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Tab Header with Refresh */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            <span>Listing Reports & Moderation Queue</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Review listings flagged by buyers or automated safety heuristics
          </p>
        </div>

        <button
          onClick={fetchReports}
          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111726] hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3 h-3 text-slate-400" />
          <span>Refresh</span>
        </button>
      </div>

      {reports.length === 0 ? (
        <div className="bg-white dark:bg-[#111726] border border-slate-200/80 dark:border-slate-800 rounded-xl p-10 text-center space-y-2">
          <div className="w-10 h-10 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Moderation Queue is Clear
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            No active buyer complaints or suspicious listings reported. All marketplace listings are in good standing.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {reports.map((report) => (
            <div
              key={report._id}
              className="bg-white dark:bg-[#111726] border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {/* Product and Report Meta */}
              <div className="flex items-start gap-3 min-w-0">
                {report.productImage ? (
                  <img
                    src={report.productImage}
                    alt=""
                    className="w-12 h-12 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200/60 dark:border-slate-700"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                )}

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">
                      {report.productTitle || 'Reported Product'}
                    </span>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
                      Reason: {report.reason}
                    </span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                      report.status === 'Resolved' 
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' 
                        : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                    }`}>
                      {report.status}
                    </span>
                  </div>

                  {report.details && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                      "{report.details}"
                    </p>
                  )}

                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span>Reporter: {report.reporterContact || 'Anonymous'}</span>
                    <span>·</span>
                    <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                    {report.actionTaken && (
                      <>
                        <span>·</span>
                        <span className="text-rose-500 font-bold">{report.actionTaken}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 shrink-0 w-full sm:w-auto justify-end">
                {report.status !== 'Resolved' && report.status !== 'Dismissed' && (
                  <>
                    <button
                      onClick={() => handleResolve(report._id, 'suspend', report.productId)}
                      className="px-2.5 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 hover:bg-rose-100 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Ban className="w-3.5 h-3.5" />
                      <span>Suspend</span>
                    </button>

                    <button
                      onClick={() => handleResolve(report._id, 'dismiss', report.productId)}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </>
                )}

                <button
                  onClick={() => onInspectProduct && onInspectProduct({ _id: report.productId, title: report.productTitle })}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Inspect Product Record"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
