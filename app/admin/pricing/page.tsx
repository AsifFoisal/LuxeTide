'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { SHIPS } from '@/src/constants';
import { PremiumButton, PremiumInput, PremiumSelect } from '@/src/components/PremiumUI';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import type { SuitePricing } from '@/src/types';
import { getSuitesForShip } from '@/src/lib/suite-catalog';
import {
  createSuitePricing,
  deleteSuitePricing,
  getSuitePricing,
  updateSuitePricing,
} from '@/src/lib/suite-pricing';

function isDualPriceShip(shipId?: string) {
  return shipId === 'the-wave' || shipId === 'the-river-cruise';
}

function formatPrice(value?: number) {
  return typeof value === 'number' && Number.isFinite(value)
    ? `৳${value.toLocaleString('en-IN')}`
    : 'Not set';
}

export default function PricingAdminPage() {
  const [selectedShip, setSelectedShip] = useState(SHIPS[0].name);
  const [suitePrices, setSuitePrices] = useState<SuitePricing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<SuitePricing>>({
    shipName: selectedShip,
    pricePerNight: 0,
    capacity: 1,
    b2bPricePerNight: 0,
    b2cPricePerNight: 0,
  });

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setLoadError(null);

    getSuitePricing()
      .then((data) => {
        if (isMounted) {
          setSuitePrices(data);
        }
      })
      .catch((error) => {
        console.error('Failed to load suite pricing:', error);
        if (isMounted) {
          setLoadError('Unable to load suite pricing. Please sign in and try again.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddSuite = async () => {
    const shipMeta = SHIPS.find((ship) => ship.name === (formData.shipName || selectedShip));
    if (!shipMeta) {
      return;
    }

    const dualPriceShip = isDualPriceShip(shipMeta.id);
    const canonicalPrice = dualPriceShip ? formData.b2bPricePerNight : formData.pricePerNight;

    if (!formData.suiteName || !canonicalPrice) {
      return;
    }

    if (dualPriceShip && (!formData.b2bPricePerNight || !formData.b2cPricePerNight)) {
      return;
    }

    try {
      const created = await createSuitePricing({
        shipId: shipMeta.id,
        shipName: shipMeta.name,
        suiteName: formData.suiteName,
        pricePerNight: canonicalPrice,
        b2bPricePerNight: dualPriceShip ? formData.b2bPricePerNight : undefined,
        b2cPricePerNight: dualPriceShip ? formData.b2cPricePerNight : undefined,
        capacity: formData.capacity || 1,
        description: formData.description || '',
      });
      setSuitePrices((current) => [...current, created]);
      setFormData({
        shipName: selectedShip,
        pricePerNight: 0,
        capacity: 1,
        suiteName: '',
        description: '',
        b2bPricePerNight: 0,
        b2cPricePerNight: 0,
      });
    } catch (error) {
      console.error('Failed to create suite pricing:', error);
      alert('Unable to save suite pricing. Please try again.');
    }
  };

  const handleUpdateSuite = async (id: string) => {
    const shipMeta = SHIPS.find((ship) => ship.name === (formData.shipName || selectedShip));
    if (!shipMeta) {
      return;
    }

    const dualPriceShip = isDualPriceShip(shipMeta.id);
    const canonicalPrice = dualPriceShip ? formData.b2bPricePerNight : formData.pricePerNight;

    if (!formData.suiteName || !canonicalPrice) {
      return;
    }

    if (dualPriceShip && (!formData.b2bPricePerNight || !formData.b2cPricePerNight)) {
      return;
    }

    try {
      const updated = await updateSuitePricing(id, {
        ...formData,
        shipId: shipMeta.id,
        shipName: shipMeta.name,
        pricePerNight: canonicalPrice,
        b2bPricePerNight: dualPriceShip ? formData.b2bPricePerNight : undefined,
        b2cPricePerNight: dualPriceShip ? formData.b2cPricePerNight : undefined,
      });
      setSuitePrices((current) => current.map((suite) => (suite.id === id ? updated : suite)));
      setEditingId(null);
      setFormData({
        shipName: selectedShip,
        pricePerNight: 0,
        capacity: 1,
        suiteName: '',
        description: '',
        b2bPricePerNight: 0,
        b2cPricePerNight: 0,
      });
    } catch (error) {
      console.error('Failed to update suite pricing:', error);
      alert('Unable to update suite pricing. Please try again.');
    }
  };

  const handleDeleteSuite = async (id: string) => {
    try {
      await deleteSuitePricing(id);
      setSuitePrices((current) => current.filter((suite) => suite.id !== id));
    } catch (error) {
      console.error('Failed to delete suite pricing:', error);
      alert('Unable to delete suite pricing. Please try again.');
    }
  };

  const handleEditClick = (suite: SuitePricing) => {
    setEditingId(suite.id);
    setFormData(suite);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      shipName: selectedShip,
      pricePerNight: 0,
      capacity: 1,
      suiteName: '',
      description: '',
      b2bPricePerNight: 0,
      b2cPricePerNight: 0,
    });
  };

  const filteredSuites = suitePrices.filter((suite) => suite.shipName === selectedShip);
  const selectedShipMeta = SHIPS.find((ship) => ship.name === selectedShip) ?? SHIPS[0];
  const availableSuites = getSuitesForShip(selectedShipMeta.id);
  const dualPriceShip = isDualPriceShip(selectedShipMeta.id);
  const availableSuiteSet = new Set(availableSuites);
  const visibleSuites = filteredSuites.filter((suite) => availableSuiteSet.has(suite.suiteName));

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <p className="editorial-label">Pricing Management</p>
        <h1 className="text-3xl md:text-5xl font-heading text-white">
          Suite Pricing & Configuration
        </h1>
        <p className="text-slate-400">
          Manage all suite prices, capacity, and details across all ships.
        </p>
      </motion.div>

      {loadError && (
        <div className="border border-rose-500/30 bg-rose-500/10 text-rose-200 px-4 py-3 text-sm">
          {loadError}
        </div>
      )}

      {isLoading && !loadError && (
        <div className="border border-white/10 bg-slate-900/40 text-slate-300 px-4 py-3 text-sm">
          Loading suite pricing...
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add/Edit Suite Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-1"
        >
          <div className="luxury-card p-6 space-y-4">
            <h3 className="text-lg font-heading text-white">
              {editingId ? 'Edit Suite' : 'Add New Suite'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                  Select Ship
                </label>
                <PremiumSelect
                  value={formData.shipName || selectedShip}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const newShip = e.target.value;
                    setFormData({ ...formData, shipName: newShip, suiteName: '' });
                  }}
                  className="h-12 w-full"
                >
                  {SHIPS.map((ship) => (
                    <option key={ship.id} value={ship.name}>
                      {ship.name}
                    </option>
                  ))}
                </PremiumSelect>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                  Suite Name
                </label>
                <PremiumSelect
                  value={formData.suiteName || ''}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, suiteName: e.target.value })}
                  className="h-12 w-full"
                >
                  <option value="">Select a suite</option>
                  {availableSuites.map((suite) => (
                    <option key={suite} value={suite}>
                      {suite}
                    </option>
                  ))}
                </PremiumSelect>
              </div>

              {dualPriceShip ? (
                <>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                      B2B Price (BDT / person)
                    </label>
                    <PremiumInput
                      type="number"
                      placeholder="Enter B2B price"
                      value={formData.b2bPricePerNight || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, b2bPricePerNight: parseInt(e.target.value) })}
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                      B2C Price (BDT / person)
                    </label>
                    <PremiumInput
                      type="number"
                      placeholder="Enter B2C price"
                      value={formData.b2cPricePerNight || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, b2cPricePerNight: parseInt(e.target.value) })}
                      className="h-12"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                    Price Per Night (BDT / person)
                  </label>
                  <PremiumInput
                    type="number"
                    placeholder="Enter price"
                    value={formData.pricePerNight || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, pricePerNight: parseInt(e.target.value) })}
                    className="h-12"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                  Capacity (Guests)
                </label>
                <PremiumInput
                  type="number"
                  placeholder="Enter capacity"
                  value={formData.capacity || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  className="h-12"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Suite description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold/50 transition-all placeholder:text-slate-600 rounded min-h-20"
                />
              </div>

              <div className="flex gap-2">
                {editingId ? (
                  <>
                    <PremiumButton
                      onClick={() => handleUpdateSuite(editingId)}
                      className="h-12 flex-1"
                    >
                      Update Suite
                    </PremiumButton>
                    <button
                      onClick={handleCancelEdit}
                      className="h-12 flex-1 px-4 bg-white/5 border border-white/10 text-slate-300 rounded hover:bg-white/10 transition-all"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <PremiumButton onClick={handleAddSuite} className="h-12 w-full">
                    <Plus size={16} className="mr-2" />
                    Add Suite
                  </PremiumButton>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Suites List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="luxury-card p-8 space-y-6">
            {/* Ship Selection Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
              {SHIPS.map((ship) => (
                <button
                  key={ship.id}
                  onClick={() => {
                    setSelectedShip(ship.name);
                    setFormData({ ...formData, shipName: ship.name });
                    setEditingId(null);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedShip === ship.name
                      ? 'bg-gold/20 border border-gold/40 text-gold'
                      : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {ship.name}
                </button>
              ))}
            </div>

            {/* Suites Summary */}
            <div>
              <h3 className="text-2xl font-heading text-white mb-2">
                {selectedShip} Suites
              </h3>
              <p className="text-slate-400 text-sm">
                {visibleSuites.length} suite{visibleSuites.length !== 1 ? 's' : ''} configured
              </p>
            </div>

            {/* Suites Table/Grid */}
            <div className="space-y-3">
              {visibleSuites.length > 0 ? (
                visibleSuites.map((suite) => (
                  <motion.div
                    key={suite.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-gold/20 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-lg font-heading text-white">{suite.suiteName}</h4>
                        <p className="text-sm text-slate-400 mt-1">{suite.description}</p>
                      </div>
                      <div className="flex gap-2 shrink-0 ml-4">
                        <button
                          onClick={() => handleEditClick(suite)}
                          className="p-2 text-slate-400 hover:text-gold transition-colors"
                          title="Edit suite"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteSuite(suite.id)}
                          className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                          title="Delete suite"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Price:</span>
                        <span className="text-gold font-heading">
                          {suite.b2bPricePerNight && suite.b2cPricePerNight
                            ? `B2B ${formatPrice(suite.b2bPricePerNight)} / Person · B2C ${formatPrice(suite.b2cPricePerNight)} / Person`
                            : `৳${suite.pricePerNight.toLocaleString()} / Person`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Capacity:</span>
                        <span className="text-white">
                          {suite.capacity} guest{suite.capacity !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 border border-dashed border-white/10 rounded-lg">
                  <p className="text-slate-400">No catalog suites configured for {selectedShip}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
