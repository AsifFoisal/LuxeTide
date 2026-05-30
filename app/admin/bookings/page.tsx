'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Users, 
  Ship, 
  MapPin, 
  Briefcase, 
  Search, 
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { PremiumButton, PremiumInput, PremiumSelect } from '@/src/components/PremiumUI';
import { Booking, BookingStatus, PaymentStatus } from '@/src/types';
import { createBooking, deleteBooking, getBookings, updateBooking } from '@/src/lib/bookings';

const statusStyles: Record<BookingStatus, string> = {
  pending: 'border-amber-400/40 text-amber-200 bg-amber-500/10',
  confirmed: 'border-emerald-400/40 text-emerald-200 bg-emerald-500/10',
  completed: 'border-sky-400/40 text-sky-200 bg-sky-500/10',
  cancelled: 'border-rose-400/40 text-rose-200 bg-rose-500/10'
};

const paymentStyles: Record<PaymentStatus, string> = {
  unpaid: 'border-rose-400/40 text-rose-200 bg-rose-500/10',
  paid: 'border-emerald-400/40 text-emerald-200 bg-emerald-500/10',
  partial: 'border-amber-400/40 text-amber-200 bg-amber-500/10',
  refunded: 'border-slate-400/40 text-slate-200 bg-slate-500/10'
};

const statusOptions: { value: BookingStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' }
];

const paymentOptions: { value: PaymentStatus; label: string }[] = [
  { value: 'unpaid', label: 'Unpaid' },
  { value: 'paid', label: 'Paid' },
  { value: 'partial', label: 'Partial' },
  { value: 'refunded', label: 'Refunded' }
];

export default function BookingsAdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | ''>('');
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus | ''>('');
  const [sortBy, setSortBy] = useState<'createdAt' | 'travelStart'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Booking>>({});

  const loadBookings = async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const data = await getBookings();
      setBookings(data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
      setLoadError('Unable to load bookings. Please sign in and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // Filter and sort bookings
  useEffect(() => {
    let result = bookings;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(booking => 
        booking.id.toLowerCase().includes(term) ||
        booking.customerName.toLowerCase().includes(term) ||
        booking.customerEmail.toLowerCase().includes(term) ||
        booking.packageId?.toLowerCase().includes(term) ||
        booking.packageLabel?.toLowerCase().includes(term) ||
        booking.shipId?.toLowerCase().includes(term) ||
        booking.shipName?.toLowerCase().includes(term) ||
        booking.suiteTitle?.toLowerCase().includes(term)
      );
    }
    
    // Apply status filter
    if (statusFilter) {
      result = result.filter(booking => booking.status === statusFilter);
    }
    
    // Apply payment filter
    if (paymentFilter) {
      result = result.filter(booking => booking.paymentStatus === paymentFilter);
    }
    
    // Apply sorting
    result = [...result].sort((a, b) => {
      const aDate = new Date(a[sortBy]);
      const bDate = new Date(b[sortBy]);
      
      if (sortOrder === 'asc') {
        return aDate.getTime() - bDate.getTime();
      } else {
        return bDate.getTime() - aDate.getTime();
      }
    });
    
    setFilteredBookings(result);
  }, [bookings, searchTerm, statusFilter, paymentFilter, sortBy, sortOrder]);

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
    setIsEditing(false);
  };

  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setFormData(booking);
    setIsModalOpen(true);
    setIsEditing(true);
  };

  const handleDeleteBooking = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) {
      return;
    }

    try {
      await deleteBooking(id);
      setBookings((current) => current.filter((booking) => booking.id !== id));
    } catch (error) {
      console.error('Booking delete error:', error);
      alert('Unable to delete booking. Please try again.');
    }
  };

  const handleCreateBooking = () => {
    setSelectedBooking(null);
    setFormData({});
    setIsModalOpen(true);
    setIsEditing(true);
  };

  const validateBooking = (): string[] => {
    const errors: string[] = [];
    
    if (!formData.customerName || formData.customerName.trim() === '') {
      errors.push('Customer name is required');
    }
    
    if (!formData.customerEmail && !formData.customerPhone) {
      errors.push('Customer email or phone is required');
    } else if (formData.customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      errors.push('Invalid email format');
    }
    
    if (!formData.travelStart) {
      errors.push('Travel start date is required');
    }
    
    if (!formData.travelEnd) {
      errors.push('Travel end date is required');
    }
    
    if (formData.travelStart && formData.travelEnd) {
      const startDate = new Date(formData.travelStart);
      const endDate = new Date(formData.travelEnd);
      if (startDate > endDate) {
        errors.push('End date must be after start date');
      }
    }
    
    if (!formData.passengers || formData.passengers < 1) {
      errors.push('At least one passenger is required');
    }
    
    return errors;
  };

  const handleSaveBooking = async () => {
    const errors = validateBooking();
    
    if (errors.length > 0) {
      alert('Please fix the following errors:\n' + errors.join('\n'));
      return;
    }
    
    try {
      if (isEditing && selectedBooking) {
        const updated = await updateBooking(selectedBooking.id, formData);
        setBookings((current) =>
          current.map((booking) => (booking.id === selectedBooking.id ? updated : booking))
        );
      } else {
        const created = await createBooking({
          customerName: formData.customerName || '',
          customerEmail: formData.customerEmail || '',
          customerPhone: formData.customerPhone || '',
          travelStart: formData.travelStart || new Date().toISOString().split('T')[0],
          travelEnd: formData.travelEnd || new Date().toISOString().split('T')[0],
          passengers: formData.passengers || 1,
          status: formData.status || 'pending',
          paymentStatus: formData.paymentStatus || 'unpaid',
          shipId: formData.shipId,
          packageId: formData.packageId,
          destinationId: formData.destinationId,
          paymentMethod: formData.paymentMethod,
          totalAmount: formData.totalAmount,
          specialRequests: formData.specialRequests,
          adminNotes: formData.adminNotes,
        });
        setBookings((current) => [...current, created]);
      }

      setIsModalOpen(false);
      setFormData({});
      alert(isEditing ? 'Booking updated successfully!' : 'Booking created successfully!');
    } catch (error) {
      alert('An error occurred while saving the booking. Please try again.');
      console.error('Booking save error:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatLabel = (value: string) => value.replace(/-/g, ' ');

  const StatusBadge = ({ status }: { status: BookingStatus }) => (
    <span
      className={`px-3 py-1 text-[10px] uppercase tracking-[0.25em] border ${statusStyles[status]}`}
    >
      {formatLabel(status)}
    </span>
  );

  const PaymentBadge = ({ status }: { status: PaymentStatus }) => (
    <span
      className={`px-3 py-1 text-[10px] uppercase tracking-[0.25em] border ${paymentStyles[status]}`}
    >
      {formatLabel(status)}
    </span>
  );

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <p className="editorial-label">Bookings Management</p>
        <h1 className="text-3xl md:text-5xl font-heading text-white">
          Manage Reservations
        </h1>
        <p className="text-slate-400">
          View, create, edit, and manage all customer bookings.
        </p>
      </motion.div>

      {loadError && (
        <div className="border border-rose-500/30 bg-rose-500/10 text-rose-200 px-4 py-3 text-sm">
          {loadError}
        </div>
      )}

      {isLoading && !loadError && (
        <div className="border border-white/10 bg-slate-900/40 text-slate-300 px-4 py-3 text-sm">
          Loading bookings...
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Bookings', value: bookings.length, icon: Calendar },
          { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, icon: Clock },
          { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, icon: CheckCircle },
          { label: 'Cancelled', value: bookings.filter(b => b.status === 'cancelled').length, icon: XCircle }
        ].map((stat) => (
          <div
            key={stat.label}
            className="luxury-card p-6 flex items-center justify-between"
          >
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{stat.label}</p>
              <p className="text-3xl text-white font-heading">{stat.value}</p>
            </div>
            <stat.icon className="w-8 h-8 text-gold/70" />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="luxury-card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
              <PremiumInput
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <PremiumSelect
                value={statusFilter}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value as BookingStatus | '')}
                className="h-12"
              >
                <option value="">All Status</option>
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </PremiumSelect>
              
              <PremiumSelect
                value={paymentFilter}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPaymentFilter(e.target.value as PaymentStatus | '')}
                className="h-12"
              >
                <option value="">All Payments</option>
                {paymentOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </PremiumSelect>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <PremiumButton 
              onClick={handleCreateBooking}
              className="h-12 flex items-center gap-2"
            >
              <Plus size={16} />
              New Booking
            </PremiumButton>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="luxury-card p-6 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-xs uppercase tracking-[0.3em] text-slate-500">
            <tr>
              <th className="py-3">Booking</th>
              <th className="py-3">Guest</th>
              <th className="py-3">Journey</th>
              <th className="py-3">Status</th>
              <th className="py-3">Payment</th>
              <th className="py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-300">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-t border-white/5">
                  <td className="py-4">
                    <div className="text-white font-medium">{booking.id}</div>
                    <div className="text-xs text-slate-500">
                      {formatDate(booking.travelStart)} - {formatDate(booking.travelEnd)}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="text-white">{booking.customerName}</div>
                    <div className="text-xs text-slate-500">{booking.customerEmail}</div>
                  </td>
                  <td className="py-4">
                    <div className="text-white">
                      {booking.packageId ? booking.packageId.replace(/-/g, ' ') : 'Custom Journey'}
                    </div>
                    <div className="text-xs text-slate-500">
                      {booking.shipId ? booking.shipId.replace(/-/g, ' ') : 'N/A'} - {booking.passengers} guests
                    </div>
                  </td>
                  <td className="py-4">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="py-4">
                    <PaymentBadge status={booking.paymentStatus} />
                    <div className="text-xs text-slate-500 mt-2">
                      {booking.totalAmount || 'N/A'}
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleViewBooking(booking)}
                        className="text-xs uppercase tracking-[0.3em] text-gold hover:text-white"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleEditBooking(booking)}
                        className="text-xs uppercase tracking-[0.3em] text-slate-400 hover:text-white"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="text-xs uppercase tracking-[0.3em] text-rose-500 hover:text-rose-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  No bookings found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-slate-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 border border-white/10 rounded-lg text-white scrollbar-hide"
              onClick={(e) => e.stopPropagation()}
            >
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="editorial-label">
                  {isEditing ? (selectedBooking ? 'Edit Booking' : 'Create Booking') : 'Booking Details'}
                </span>
                <h3 className="text-2xl font-heading text-white">
                  {isEditing 
                    ? (selectedBooking ? `Edit ${selectedBooking.id}` : 'New Booking') 
                    : (selectedBooking ? selectedBooking.id : 'Booking Details')}
                </h3>
              </div>
              
              {isEditing ? (
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                        Customer Name
                      </label>
                      <PremiumInput
                        name="customerName"
                        value={formData.customerName || ''}
                        onChange={handleInputChange}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                        Email
                      </label>
                      <PremiumInput
                        name="customerEmail"
                        type="email"
                        value={formData.customerEmail || ''}
                        onChange={handleInputChange}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                        Phone
                      </label>
                      <PremiumInput
                        name="customerPhone"
                        value={formData.customerPhone || ''}
                        onChange={handleInputChange}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                        Passengers
                      </label>
                      <PremiumInput
                        name="passengers"
                        type="number"
                        value={formData.passengers || ''}
                        onChange={handleInputChange}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                        Travel Start
                      </label>
                      <PremiumInput
                        name="travelStart"
                        type="date"
                        value={formData.travelStart || ''}
                        onChange={handleInputChange}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                        Travel End
                      </label>
                      <PremiumInput
                        name="travelEnd"
                        type="date"
                        value={formData.travelEnd || ''}
                        onChange={handleInputChange}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                        Ship
                      </label>
                      <PremiumSelect
                        name="shipId"
                        value={formData.shipId || ''}
                        onChange={handleInputChange}
                        className="h-12"
                      >
                        <option value="">Select Ship</option>
                        <option value="the-wave">M.V. The Wave</option>
                        <option value="the-wave-2">M.V. The Wave 2</option>
                        <option value="the-river-cruise">The River Cruise</option>
                      </PremiumSelect>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                        Package
                      </label>
                      <PremiumSelect
                        name="packageId"
                        value={formData.packageId || ''}
                        onChange={handleInputChange}
                        className="h-12"
                      >
                        <option value="">Select Package</option>
                        <option value="emerald-expedition">Emerald Expedition</option>
                        <option value="sundarbans-luxury">Sundarbans Delta Luxury</option>
                      </PremiumSelect>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                        Status
                      </label>
                      <PremiumSelect
                        name="status"
                        value={formData.status || ''}
                        onChange={handleInputChange}
                        className="h-12"
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </PremiumSelect>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                        Payment Status
                      </label>
                      <PremiumSelect
                        name="paymentStatus"
                        value={formData.paymentStatus || ''}
                        onChange={handleInputChange}
                        className="h-12"
                      >
                        {paymentOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </PremiumSelect>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                        Total Amount
                      </label>
                      <PremiumInput
                        name="totalAmount"
                        value={formData.totalAmount || ''}
                        onChange={handleInputChange}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                        Payment Method
                      </label>
                      <PremiumInput
                        name="paymentMethod"
                        value={formData.paymentMethod || ''}
                        onChange={handleInputChange}
                        className="h-12"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                      Special Requests
                    </label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests || ''}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold/50 transition-all placeholder:text-slate-600 rounded"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                      Admin Notes
                    </label>
                    <textarea
                      name="adminNotes"
                      value={formData.adminNotes || ''}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-gold/50 transition-all placeholder:text-slate-600 rounded"
                      rows={3}
                    />
                  </div>
                </form>
              ) : selectedBooking && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Customer</p>
                      <p className="text-white">{selectedBooking.customerName}</p>
                      <p className="text-slate-400">{selectedBooking.customerEmail}</p>
                      {selectedBooking.customerPhone && (
                        <p className="text-slate-400">{selectedBooking.customerPhone}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Booking ID</p>
                      <p className="text-white">{selectedBooking.id}</p>
                      <p className="text-slate-400">Created: {formatDate(selectedBooking.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Travel Dates</p>
                      <p className="text-white">
                        {formatDate(selectedBooking.travelStart)} - {formatDate(selectedBooking.travelEnd)}
                      </p>
                      {selectedBooking.selectedDateRangeLabel && (
                        <p className="text-slate-400">{selectedBooking.selectedDateRangeLabel}</p>
                      )}
                      <p className="text-slate-400">{selectedBooking.passengers} passengers</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Status</p>
                      <StatusBadge status={selectedBooking.status} />
                      <div className="mt-2">
                        <PaymentBadge status={selectedBooking.paymentStatus} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Journey</p>
                      <p className="text-white">
                        {selectedBooking.packageLabel || (selectedBooking.packageId ? selectedBooking.packageId.replace(/-/g, ' ') : 'Custom Journey')}
                      </p>
                      {selectedBooking.suiteTitle && (
                        <p className="text-slate-400">Suite: {selectedBooking.suiteTitle}</p>
                      )}
                      {(selectedBooking.roomCount || selectedBooking.guestCount) && (
                        <p className="text-slate-400">
                          Rooms: {selectedBooking.roomCount || 'N/A'} | Guests: {selectedBooking.guestCount || 'N/A'}
                        </p>
                      )}
                      <p className="text-slate-400">
                        Ship: {selectedBooking.shipName || (selectedBooking.shipId ? selectedBooking.shipId.replace(/-/g, ' ') : 'N/A')}
                      </p>
                      <p className="text-slate-400">
                        Destination: {selectedBooking.destinationName || (selectedBooking.destinationId ? selectedBooking.destinationId.replace(/-/g, ' ') : 'N/A')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Payment</p>
                      <p className="text-white">{selectedBooking.totalAmount || 'N/A'}</p>
                      <p className="text-slate-400">{selectedBooking.paymentMethod || 'N/A'}</p>
                    </div>
                  </div>
                  
                  {selectedBooking.specialRequests && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Special Requests</p>
                      <p className="text-slate-300">{selectedBooking.specialRequests}</p>
                    </div>
                  )}
                  
                  {selectedBooking.adminNotes && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Admin Notes</p>
                      <p className="text-slate-300">{selectedBooking.adminNotes}</p>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex flex-wrap gap-4 pt-4">
                {isEditing ? (
                  <>
                    <PremiumButton onClick={handleSaveBooking} className="h-12">
                      Save Changes
                    </PremiumButton>
                    <PremiumButton 
                      variant="outline" 
                      onClick={() => setIsModalOpen(false)} 
                      className="h-12"
                    >
                      Cancel
                    </PremiumButton>
                  </>
                ) : (
                  <PremiumButton 
                    onClick={() => setIsModalOpen(false)} 
                    className="h-12"
                  >
                    Close
                  </PremiumButton>
                )}
              </div>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}