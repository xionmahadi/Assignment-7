// Helper functions for Bengali locale formatting

const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

// Convert English digits to Bengali numerals
export function toBengaliNumber(number: number | string | undefined | null): string {
  if (number === undefined || number === null) return '০';
  const str = number.toString();
  return str.replace(/\d/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

export function parseBengaliNumber(bengaliStr: string): number {
  if (!bengaliStr) return 0;
  const englishStr = bengaliStr.replace(/[০-৯]/g, (digit) =>
    bengaliDigits.indexOf(digit).toString()
  );
  return parseFloat(englishStr) || 0;
}

export function formatUnitBn(unit: string): string {
  switch (unit?.toLowerCase()) {
    case 'kg':
    case 'কেজি':
      return 'প্রতি কেজি';
    case 'liter':
    case 'litre':
    case 'লিটার':
      return 'প্রতি লিটার';
    case 'piece':
    case 'পিস':
      return 'প্রতি পিস';
    case 'dozen':
    case 'ডজন':
      return 'প্রতি ডজন';
    case 'hali':
    case 'হালি':
      return 'প্রতি হালি';
    default:
      return unit ? `প্রতি ${unit}` : 'প্রতি কেজি';
  }
}

export function getBanglaDate(): string {
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  const months = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  
  const now = new Date();
  const dayName = days[now.getDay()];
  const dayNum = toBengaliNumber(now.getDate());
  const monthName = months[now.getMonth()];
  const yearNum = toBengaliNumber(now.getFullYear());
  
  return `${dayName}, ${dayNum} ${monthName}, ${yearNum}`;
}
