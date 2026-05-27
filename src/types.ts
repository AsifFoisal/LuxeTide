export interface Ship {
  id: string;
  name: string;
  description: string;
  image: string;
  capacity: string;
  amenities: string[];
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Package {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  image: string;
}

export interface Schedule {
  id: string;
  shipId: string;
  shipName: string;
  departureDate: string;
  returnDate: string;
  destination: string;
  pricePerPerson: string;
  totalCapacity: number;
  bookedSeats: number;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  amenities: string[];
  itinerary: string[];
  createdAt: string;
  updatedAt: string;
}

export type SuiteAvailabilityStatus = 'active' | 'inactive';

export interface SuiteAvailability {
  id: string;
  shipId: string;
  shipName: string;
  startDate: string;
  endDate: string;
  status: SuiteAvailabilityStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SuitePricing {
  id: string;
  shipId: string;
  shipName: string;
  suiteName: string;
  suiteSlug?: string;
  pricePerNight: number;
  b2bPricePerNight?: number;
  b2cPricePerNight?: number;
  capacity: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'paid' | 'partial' | 'refunded';

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  travelStart: string;
  travelEnd: string;
  passengers: number;
  shipId?: string;
  shipName?: string;
  packageId?: string;
  packageLabel?: string;
  destinationId?: string;
  destinationName?: string;
  suiteSlug?: string;
  suiteTitle?: string;
  roomCount?: number;
  guestCount?: number;
  selectedDateRangeLabel?: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  totalAmount?: string;
  specialRequests?: string;
  adminNotes?: string;
  createdAt: string;
}

export type UserRole = 'admin' | 'staff' | 'customer';
export type UserStatus = 'active' | 'disabled' | 'invited';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  lastLogin?: string;
  createdAt: string;
}

export type GalleryVisibility = 'public' | 'private';

export interface GalleryItem {
  id: string;
  title: string;
  caption?: string;
  imageUrl: string;
  sortOrder: number;
  visibility: GalleryVisibility;
  createdAt: string;
}

export type DiscountType = 'percent' | 'fixed';
export type PromotionStatus = 'draft' | 'active' | 'expired';

export interface Promotion {
  id: string;
  code: string;
  title: string;
  description?: string;
  discountType: DiscountType;
  discountValue: number;
  startDate: string;
  endDate: string;
  usageLimit?: number;
  status: PromotionStatus;
  createdAt: string;
}
