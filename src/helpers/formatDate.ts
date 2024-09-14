export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const months = [
    'січня',
    'лютого',
    'березня',
    'квітня',
    'травня',
    'червня',
    'липня',
    'серпня',
    'вересня',
    'жовтня',
    'листопада',
    'грудня',
  ];

  const day = date.getDate().toString().padStart(2, '0'); // додає 0, якщо день < 10
  const month = months[date.getMonth()]; // назва місяця
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}
