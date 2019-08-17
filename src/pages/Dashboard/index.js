import React from 'react';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
import { Container, Time } from './styles';

export default function Dashboard() {
  return (
    <Container>
      <header>
        <button type="button">
          <MdChevronLeft size={36} color="#fff" />
        </button>
        <strong>31 de maio</strong>
        <button type="button">
          <MdChevronRight size={36} color="#fff" />
        </button>
      </header>
      <ul>
        <Time past>
          <strong>08:00</strong>
          <span>Ronielli</span>
        </Time>
        <Time available>
          <strong>08:00</strong>
          <span>Ronielli</span>
        </Time>
        <Time>
          <strong>08:00</strong>
          <span>Ronielli</span>
        </Time>
      </ul>
    </Container>
  );
}
