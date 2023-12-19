import {format, isToday} from 'date-fns';
import React from "react";
import {ru} from "date-fns/locale";
import styles from './time-display.module.scss';

interface TimeDisplayProps {
  createdAt: Date;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({createdAt}) => {
  const createdDate: any = new Date(createdAt);
  // const newDate: any = new Date();
  
  const isTodayDate = isToday(createdDate);
  
  const formattedTimestamp =
    isTodayDate
      ? format(createdDate, "Сегодня, HH:mm", { locale: ru })
      : format(createdDate, "dd.MM.yy, HH:mm", { locale: ru });
  
  return (
    <span className={styles.time}>{formattedTimestamp}</span>
  );
};

export default TimeDisplay;
