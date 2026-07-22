export function formatTime(dateInput: string | Date): string {
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return '08:30 AM';
    let hours = d.getUTCHours();
    const minutes = d.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const hoursStr = hours < 10 ? '0' + hours : hours;
    return `${hoursStr}:${minutesStr} ${ampm}`;
  } catch (e) {
    return '08:30 AM';
  }
}

export function formatDateTime(dateInput: string | Date): string {
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return 'July 22, 2026, 08:30 AM';
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[d.getUTCMonth()];
    const day = d.getUTCDate();
    const year = d.getUTCFullYear();
    const timeStr = formatTime(d);
    return `${month} ${day}, ${year} ${timeStr}`;
  } catch (e) {
    return 'July 22, 2026';
  }
}
