import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });
  return formatter.format(amount);
};

export const formatDate = (date: string | Date): string => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const formatDateTime = (date: string | Date): string => {
  return dayjs(date).format('YYYY-MM-DD HH:mm');
};

export const formatFromNow = (date: string | Date): string => {
  return dayjs(date).fromNow();
};

export const getMonthRange = (year: number, month: number) => {
  const start = dayjs(`${year}-${String(month).padStart(2, '0')}-01`);
  const end = start.endOf('month');
  return {
    startDate: start.format('YYYY-MM-DD'),
    endDate: end.format('YYYY-MM-DD'),
  };
};

export const calculateDaysSince = (date: string | Date): number => {
  return Math.floor(dayjs().diff(dayjs(date), 'day'));
};

export const calculatePercentage = (value: number, total: number): number => {
  return total > 0 ? (value / total) * 100 : 0;
};

export const getSatisfactionColor = (score: number): string => {
  if (score >= 4) return '#10b981'; // green
  if (score >= 3) return '#eab308'; // yellow
  if (score >= 2) return '#f97316'; // orange
  return '#ef4444'; // red
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    active: '#10b981',
    sold: '#6366f1',
    gifted: '#ec4899',
    broken: '#ef4444',
    lost: '#737373',
  };
  return colors[status] || '#999';
};

export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    active: 'Active',
    sold: 'Sold',
    gifted: 'Gifted',
    broken: 'Broken',
    lost: 'Lost',
  };
  return labels[status] || status;
};
