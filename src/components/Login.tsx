import { useState } from 'react';
import styled from 'styled-components';
import { Zap } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string) => void;
}

const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #0a0a0a, #000000, #0f0f0f);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const LoginCard = styled.div`
  background: #1a1a1a;
  backdrop-filter: blur(12px);
  border-radius: 1rem;
  padding: 2rem;
  max-width: 28rem;
  width: 100%;
  border: 1px solid #2a2a2a;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  background: linear-gradient(to bottom right, #7f1d1d, #450a0a);
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 2px solid #ca8a04;
`;

const Title = styled.h1`
  color: white;
  font-size: 2.25rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #9ca3af;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  color: #d1d5db;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background: #262626;
  border: 1px solid #404040;
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;

  &::placeholder {
    color: #737373;
  }

  &:focus {
    outline: none;
    ring: 2px solid #7f1d1d;
    border-color: transparent;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(to right, #7f1d1d, #450a0a);
  color: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(202, 138, 4, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);

  &:hover {
    background: linear-gradient(to right, #991b1b, #7f1d1d);
    transform: scale(1.05);
  }
`;

const Footer = styled.p`
  color: #737373;
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.875rem;
`;

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <HeaderSection>
          <IconWrapper>
            <Zap style={{ width: '3rem', height: '3rem', color: '#eab308' }} />
          </IconWrapper>
          <Title>Pokemon Cards</Title>
          <Subtitle>Battle Platform</Subtitle>
        </HeaderSection>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Trainer Name</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your trainer name"
              autoFocus
            />
          </FormGroup>

          <SubmitButton type="submit">
            Start Journey
          </SubmitButton>
        </Form>

        <Footer>
          New trainers receive 1000 coins to start!
        </Footer>
      </LoginCard>
    </LoginContainer>
  );
}
