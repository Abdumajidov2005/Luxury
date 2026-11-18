const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isValidEmail = (value) => EMAIL_RE.test(String(value).trim());

/** Today's date as YYYY-MM-DD in the visitor's local timezone. */
export const todayISO = () => {
  const d = new Date();
  const offset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - offset).toISOString().slice(0, 10);
};

/** Add whole days to a YYYY-MM-DD string. */
export const addDaysISO = (iso, days) => {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d + days));
  return date.toISOString().slice(0, 10);
};

/** Number of nights between two YYYY-MM-DD strings. */
export const nightsBetween = (from, to) => {
  if (!from || !to) return 0;
  const ms = Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`);
  return Math.round(ms / 86400000);
};

export function validateBooking(values, maxGuests) {
  const errors = {};
  const today = todayISO();

  if (values.name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.checkIn) {
    errors.checkIn = 'Choose a check-in date.';
  } else if (values.checkIn < today) {
    errors.checkIn = 'Check-in cannot be in the past.';
  }

  if (!values.checkOut) {
    errors.checkOut = 'Choose a check-out date.';
  } else if (values.checkIn && nightsBetween(values.checkIn, values.checkOut) < 1) {
    errors.checkOut = 'Check-out must be after check-in.';
  } else if (values.checkIn && nightsBetween(values.checkIn, values.checkOut) > 30) {
    errors.checkOut = 'Stays are limited to 30 nights.';
  }

  const guests = Number(values.guests);
  if (!Number.isInteger(guests) || guests < 1) {
    errors.guests = 'Select the number of guests.';
  } else if (guests > maxGuests) {
    errors.guests = `This stay hosts up to ${maxGuests} guests.`;
  }

  return errors;
}
