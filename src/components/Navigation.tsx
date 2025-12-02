import styled from 'styled-components';
import { BookMarked, Library, ShoppingBag, Swords, Coins, LogOut } from 'lucide-react';
import { UserData } from '../App';
import { Link, useLocation, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from './library/store';

interface NavigationProps {
  onLogout: () => void;
}

const Nav = styled.nav`
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #2a2a2a;
`;

const NavContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Logo = styled.h1`
  color: #eab308;
  font-size: 1.25rem;
  margin: 0;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const NavButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: ${props => props.$active ? '1px solid rgba(202, 138, 4, 0.3)' : 'none'};
  background: ${props => props.$active ? '#7f1d1d' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#9ca3af'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$active ? '#7f1d1d' : '#262626'};
    color: white;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CoinsDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #262626;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(202, 138, 4, 0.3);
`;

const CoinsText = styled.span`
  color: #eab308;
`;

const Username = styled.div`
  color: #d1d5db;
  padding: 0.5rem 1rem;
`;

const LogoutButton = styled.button`
  color: #9ca3af;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #262626;
    color: white;
  }
`;

export const LogoDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  & > span {
    position: absolute;
    bottom: -10px;
    right: 0px;
    color: #9ca3af;
    font-size: 0.7rem;
    margin: 0;
  }
`;

const FullPageWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
`;

export function NavigationComponent({ onLogout }: NavigationProps) {

  const location = useLocation();
  const user = useSelector((state: RootState) => state.user);
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <Nav>
        <NavContainer>
          <NavContent>
            <LeftSection>
              <LogoDiv>
                <Logo>Pokemon CBL</Logo>
                <span>by: Daniel Avzaradel</span>
              </LogoDiv>

              <NavButtons>
                <NavButton $active={isActive("/library")} as={Link} to="/library">
                  <BookMarked style={{ width: "1rem", height: "1rem" }} />
                  <span>Library</span>
                </NavButton>

                <NavButton $active={isActive("/my-cards")} as={Link} to="/my-cards">
                  <Library style={{ width: "1rem", height: "1rem" }} />
                  <span>Collection</span>
                </NavButton>

                <NavButton $active={isActive("/shop")} as={Link} to="/shop">
                  <ShoppingBag style={{ width: "1rem", height: "1rem" }} />
                  <span>Shop</span>
                </NavButton>

                <NavButton $active={isActive("/battle")} as={Link} to="/battle">
                  <Swords style={{ width: "1rem", height: "1rem" }} />
                  <span>Battle</span>
                </NavButton>
              </NavButtons>
            </LeftSection>

            <RightSection>
              <CoinsDisplay>
                <Coins style={{ width: "1.25rem", height: "1.25rem", color: "#eab308" }} />
                <CoinsText>{user.coins}</CoinsText>
              </CoinsDisplay>

              <Username>{user.username}</Username>

              <LogoutButton onClick={onLogout} title="Logout">
                <LogOut style={{ width: "1.25rem", height: "1.25rem" }} />
              </LogoutButton>
            </RightSection>
          </NavContent>
        </NavContainer>
      </Nav>

      {/* Where Routed pages appear */}
      <FullPageWrapper>
          <Outlet />
      </FullPageWrapper>
    </>
  );
}
