import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Profile, Content } from './styles';
import logo from '~/assets/logoRocha.svg';
import Notifications from '~/pages/components/Notifications';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Logo" />
          <Link to="/dashboard">DASHBOARD </Link>
        </nav>

        <aside>
          <Notifications />

          <Profile>
            <div>
              <strong>{profile.nome}</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img
              src={
                profile.avatar.url ||
                'https://api.adorable.io/avatars/49/abott@adorable.png'
              }
              alt="Logo"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
