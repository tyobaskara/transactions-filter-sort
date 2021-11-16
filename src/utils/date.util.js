const monthsID = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'July', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

export const formatDateID = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = monthsID[date.getMonth() - 1];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const isDate = date => date instanceof Date && !isNaN(date.valueOf());
