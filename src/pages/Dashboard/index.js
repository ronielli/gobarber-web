import React, { useState, useMemo, useEffect } from 'react';
import {
  format,
  subDays,
  addDays,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  isEqual,
  parseISO,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import pt from 'date-fns/locale/pt';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
import { Container, Time } from './styles';
import api from '~/services/api';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
export default function Dashboard() {
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState(new Date());

  const dateFormattrd = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );
  function handlePrevDay() {
    setDate(subDays(date, 1));
  }
  function handleNextDay() {
    setDate(addDays(date, 1));
  }
  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('schedule', {
        params: { data: date },
      });

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const data = range.map(hors => {
        const checkDate = setSeconds(setMinutes(setHours(date, hors), 0), 0);

        const compareDate = utcToZonedTime(checkDate, timezone);

        return {
          time: `${hors}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find(a =>
            isEqual(parseISO(a.data), compareDate)
          ),
        };
      });
      console.tron.log(data);
      setSchedule(data);
    }

    loadSchedule();
  }, [date]);
  return (
    <Container>
      <header>
        <button onClick={handlePrevDay} type="button">
          <MdChevronLeft size={36} color="#fff" />
        </button>
        <strong>{dateFormattrd}</strong>
        <button onClick={handleNextDay} type="button">
          <MdChevronRight size={36} color="#fff" />
        </button>
      </header>
      <ul>
        {schedule.map(time => (
          <Time key={time.time} available={!time.appointment} past={time.past}>
            <strong>{time.time}</strong>
            <span>
              {time.appointment ? time.appointment.user.nome : 'Em aberto'}
            </span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}
