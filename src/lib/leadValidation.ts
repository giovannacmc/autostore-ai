const VALID_BRAZILIAN_DDDS = [
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "21",
  "22",
  "24",
  "27",
  "28",
  "31",
  "32",
  "33",
  "34",
  "35",
  "37",
  "38",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "51",
  "53",
  "54",
  "55",
  "61",
  "62",
  "64",
  "63",
  "65",
  "66",
  "67",
  "68",
  "69",
  "71",
  "73",
  "74",
  "75",
  "77",
  "79",
  "81",
  "87",
  "82",
  "83",
  "84",
  "85",
  "88",
  "86",
  "89",
  "91",
  "93",
  "94",
  "92",
  "97",
  "95",
  "96",
  "98",
  "99",
];

export function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidWhatsapp(phone: string) {
  const normalizedPhone = normalizePhone(phone);

  if (normalizedPhone.length !== 11) {
    return false;
  }

  const ddd = normalizedPhone.slice(0, 2);
  const phoneNumber = normalizedPhone.slice(2);

  const hasValidDdd = VALID_BRAZILIAN_DDDS.includes(ddd);
  const isMobilePhone = /^9\d{8}$/.test(phoneNumber);

  return hasValidDdd && isMobilePhone;
}

export function formatWhatsapp(phone: string) {
  const normalizedPhone = normalizePhone(phone).slice(0, 11);

  if (normalizedPhone.length <= 2) {
    return normalizedPhone;
  }

  if (normalizedPhone.length <= 7) {
    return `(${normalizedPhone.slice(0, 2)}) ${normalizedPhone.slice(2)}`;
  }

  return `(${normalizedPhone.slice(0, 2)}) ${normalizedPhone.slice(
    2,
    7,
  )}-${normalizedPhone.slice(7)}`;
}
