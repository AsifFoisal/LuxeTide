delete from public.suite_pricing where ship_id in ('the-wave', 'the-river-cruise');

insert into public.suite_pricing (ship_id, ship_name, suite_name, price_per_night, b2b_price_per_night, b2c_price_per_night, capacity, description)
values
  ('the-wave-2', 'M.V. The Wave 2', 'Infinity Royal Suite', 25000, null, null, 2, 'Luxury suite with panoramic views'),
  ('the-wave-2', 'M.V. The Wave 2', 'Panorama Deluxe Suite', 18000, null, null, 2, 'Deluxe suite with balcony'),
  ('the-wave-2', 'M.V. The Wave 2', 'Panorama King Suite', 22000, null, null, 2, 'King suite with spacious interior'),
  ('the-wave-2', 'M.V. The Wave 2', 'Panorama Triple Suite', 24000, null, null, 3, 'Triple suite for small groups'),
  ('the-wave-2', 'M.V. The Wave 2', 'VIP Panorama Triple Suite', 30000, null, null, 3, 'VIP triple suite with premium amenities'),
  ('the-wave', 'M.V. The Wave', 'Couple Bed Cabin', 16000, 16000, 18000, 2, 'Premium couple cabin for two guests'),
  ('the-wave', 'M.V. The Wave', 'Family Cabin', 18000, 18000, 20000, 4, 'Family cabin with extra room'),
  ('the-wave', 'M.V. The Wave', 'Single Bed Cabin', 12000, 12000, 14000, 1, 'Private solo cabin'),
  ('the-river-cruise', 'The River Cruise', 'River View Cabin', 16000, 16000, 18000, 2, 'River-facing cabin with scenic views'),
  ('the-river-cruise', 'The River Cruise', 'Vip Couple Cabin', 17000, 17000, 19000, 2, 'Premium couple cabin with upgraded furnishings'),
  ('the-river-cruise', 'The River Cruise', 'Bunk Bed Cabin', 16000, 16000, 18000, 3, 'Practical multi-guest cabin');

insert into public.suite_availability (ship_id, ship_name, start_date, end_date, status)
values
  ('the-wave-2', 'M.V. The Wave 2', (current_date + interval '7 days')::date, (current_date + interval '20 days')::date, 'active'),
  ('the-wave-2', 'M.V. The Wave 2', (current_date + interval '35 days')::date, (current_date + interval '48 days')::date, 'active'),
  ('the-wave', 'M.V. The Wave', (current_date + interval '9 days')::date, (current_date + interval '22 days')::date, 'active'),
  ('the-wave', 'M.V. The Wave', (current_date + interval '37 days')::date, (current_date + interval '50 days')::date, 'active'),
  ('the-river-cruise', 'The River Cruise', (current_date + interval '12 days')::date, (current_date + interval '24 days')::date, 'active'),
  ('the-river-cruise', 'The River Cruise', (current_date + interval '40 days')::date, (current_date + interval '52 days')::date, 'active');

insert into public.schedules (
  ship_id,
  ship_name,
  departure_date,
  return_date,
  destination,
  price_per_person,
  total_capacity,
  booked_seats,
  status,
  amenities,
  itinerary
)
values
  (
    'the-wave-2',
    'M.V. The Wave 2',
    (current_date + interval '14 days')::date,
    (current_date + interval '18 days')::date,
    'Saint Martin''s Island',
    'BDT 85,000',
    500,
    120,
    'scheduled',
    array['Infinity Dining', 'Sky Lounge', 'Spa'],
    array['Dhaka Port', 'Saint Martin''s', 'Coral Island', 'Return']
  ),
  (
    'the-wave',
    'M.V. The Wave',
    (current_date + interval '21 days')::date,
    (current_date + interval '26 days')::date,
    'The Sundarbans',
    'BDT 65,000',
    350,
    80,
    'scheduled',
    array['Balcony Views', 'Family Lounge', 'Food Zone'],
    array['Dhaka Port', 'Sundarbans', 'Forest Safari', 'Return']
  ),
  (
    'the-river-cruise',
    'The River Cruise',
    (current_date + interval '30 days')::date,
    (current_date + interval '34 days')::date,
    'Kuakata',
    'BDT 55,000',
    180,
    60,
    'scheduled',
    array['Scenic Decks', 'Live Music', 'River Dining'],
    array['Khulna Port', 'Kuakata', 'Sunset Cruise', 'Return']
  );
