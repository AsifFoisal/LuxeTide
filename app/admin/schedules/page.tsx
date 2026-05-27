'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit2, Calendar, Ship, Clock, X, Check } from 'lucide-react';
import { SHIPS } from '@/src/constants';
import {
  createSuiteAvailability,
  deleteSuiteAvailability,
  getSuiteAvailabilities,
  updateSuiteAvailability,
} from '@/src/lib/suite-availability';
import { SuiteAvailability, SuiteAvailabilityStatus } from '@/src/types';

interface FormData {
  shipId: string;
  startDate: string;
  endDate: string;
  status: SuiteAvailabilityStatus;
}

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const startLabel = start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  const endLabel = end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  return `${startLabel} - ${endLabel}`;
}

function toISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export default function SchedulesPage() {
  const [items, setItems] = useState<SuiteAvailability[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    shipId: '',
    startDate: toISODate(addDays(new Date(), 7)),
    endDate: toISODate(addDays(new Date(), 14)),
    status: 'active',
  });

  const loadItems = async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const data = await getSuiteAvailabilities();
      setItems(data);
    } catch (error) {
      console.error('Failed to load suite availability:', error);
      setLoadError('Unable to load availability. Please sign in and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const summary = useMemo(() => {
    const activeCount = items.filter((item) => item.status === 'active').length;
    const inactiveCount = items.filter((item) => item.status === 'inactive').length;
    const uniqueShips = new Set(items.map((item) => item.shipId)).size;
    return { activeCount, inactiveCount, uniqueShips };
  }, [items]);

  const openModal = (item?: SuiteAvailability) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        shipId: item.shipId,
        startDate: item.startDate,
        endDate: item.endDate,
        status: item.status,
      });
    } else {
      setEditingId(null);
      setFormData({
        shipId: SHIPS[0]?.id ?? '',
        startDate: toISODate(addDays(new Date(), 7)),
        endDate: toISODate(addDays(new Date(), 14)),
        status: 'active',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const reloadItems = () => {
    loadItems();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const ship = SHIPS.find((item) => item.id === formData.shipId);
    if (!ship) {
      return;
    }

    try {
      if (editingId) {
        await updateSuiteAvailability(editingId, {
          shipId: ship.id,
          shipName: ship.name,
          startDate: formData.startDate,
          endDate: formData.endDate,
          status: formData.status,
        });
      } else {
        await createSuiteAvailability({
          shipId: ship.id,
          shipName: ship.name,
          startDate: formData.startDate,
          endDate: formData.endDate,
          status: formData.status,
        });
      }

      reloadItems();
      closeModal();
    } catch (error) {
      console.error('Failed to save availability:', error);
      alert('Unable to save availability. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSuiteAvailability(id);
      reloadItems();
    } catch (error) {
      console.error('Failed to delete availability:', error);
      alert('Unable to delete availability. Please try again.');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Suite Date Ranges</h1>
          <p className="text-slate-400">Manage per-suite availability windows for homepage booking</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openModal()}
          className="px-6 py-3 bg-gold text-slate-950 font-bold rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-gold/50 transition-all"
        >
          <Plus size={20} /> New Date Range
        </motion.button>
      </motion.div>

      {loadError && (
        <div className="border border-rose-500/30 bg-rose-500/10 text-rose-200 px-4 py-3 text-sm">
          {loadError}
        </div>
      )}

      {isLoading && !loadError && (
        <div className="border border-white/10 bg-slate-900/40 text-slate-300 px-4 py-3 text-sm">
          Loading availability...
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Ranges', value: items.length, icon: Calendar, color: 'bg-blue-500/10' },
          { label: 'Active Ranges', value: summary.activeCount, icon: Check, color: 'bg-emerald-500/10' },
          { label: 'Inactive Ranges', value: summary.inactiveCount, icon: Clock, color: 'bg-slate-500/10' },
          { label: 'Ships Covered', value: summary.uniqueShips, icon: Ship, color: 'bg-gold/10' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.color} border border-white/10 rounded-lg p-6 space-y-2`}
          >
            <div className="flex items-center justify-between">
              <p className="text-slate-400 text-sm">{stat.label}</p>
              <stat.icon size={20} className="text-gold" />
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-slate-900/50 border border-white/10 rounded-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-800/50 border-b border-white/5">
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-300">Ship</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-300">Date Range</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-300">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-300">Updated</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b border-white/5 hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Ship size={16} className="text-gold" />
                      <span className="text-white font-semibold">{item.shipName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-300">{formatDateRange(item.startDate, item.endDate)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${
                        item.status === 'active'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-slate-500/20 text-slate-300 border-slate-500/30'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{item.updatedAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => openModal(item)}
                        className="p-2 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(event) => event.stopPropagation()}
              className="bg-slate-900 border border-white/10 rounded-lg p-8 max-w-2xl w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingId ? 'Edit Date Range' : 'New Date Range'}
                </h2>
                <button onClick={closeModal} className="text-slate-400 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-white mb-2">Ship</label>
                    <select
                      value={formData.shipId}
                      onChange={(event) => setFormData({ ...formData, shipId: event.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded text-white focus:border-gold outline-none transition-colors"
                    >
                      <option value="">Select a ship</option>
                      {SHIPS.map((ship) => (
                        <option key={ship.id} value={ship.id}>
                          {ship.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white mb-2">Start Date</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(event) => setFormData({ ...formData, startDate: event.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded text-white focus:border-gold outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white mb-2">End Date</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(event) => setFormData({ ...formData, endDate: event.target.value })}
                      required
                      className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded text-white focus:border-gold outline-none transition-colors"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-white mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(event) =>
                        setFormData({ ...formData, status: event.target.value as SuiteAvailabilityStatus })
                      }
                      required
                      className="w-full px-4 py-2 bg-slate-800/50 border border-white/10 rounded text-white focus:border-gold outline-none transition-colors"
                    >
                      <option value="active">active</option>
                      <option value="inactive">inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 justify-end mt-6 pt-4 border-t border-white/10">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeModal}
                    className="px-6 py-2 bg-slate-700 text-white rounded font-semibold hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gold text-slate-950 rounded font-bold hover:shadow-lg hover:shadow-gold/50 transition-all"
                  >
                    {editingId ? 'Update' : 'Create'} Date Range
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
