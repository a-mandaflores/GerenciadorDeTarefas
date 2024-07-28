import React, { useState, useEffect } from 'react';

interface DateType {
  date: string;
}

const DateComponent: React.FC<DateType> = ({ date }) => {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    const dateObject = new Date(date);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;

    const dayZero = day < 10 ? '0' : '';
    const monthZero = month < 10 ? '0' : '';
    const formattedDate = `${dayZero}${day}/${monthZero}${month}`;

    setFormattedDate(formattedDate);
  }, [date]);

  return <div>{formattedDate}</div>;
};

export default DateComponent;
