const generatePageNumbers = (current: number, total: number): (number | string)[] => {
  const pages: (number | string)[] = [];
  const showPages = 5;

  if (total <= showPages + 2) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (current > 3) {
      pages.push('...');
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) {
      pages.push('...');
    }

    pages.push(total);
  }

  return pages;
};

export default generatePageNumbers;
