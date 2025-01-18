import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #282c34 0%, #1a1d24 100%);
  color: white;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(97, 218, 251, 0.1) 0%, transparent 50%);
  }
`;

const Content = styled.div`
  animation: ${fadeIn} 1s ease-out;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1rem;
  background: linear-gradient(
    270deg,
    #61dafb,
    #ffffff,
    #0066cc,
    #61dafb
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientAnimation} 6s ease infinite;
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.5rem);
  margin-bottom: 2rem;
  color: #a0a0a0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;
  margin-bottom: 1rem;
`;

const TechBadge = styled.span`
  padding: 0.5rem 1rem;
  background: rgba(97, 218, 251, 0.1);
  border: 1px solid rgba(97, 218, 251, 0.2);
  border-radius: 20px;
  font-size: 0.9rem;
  color: #61dafb;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    gap: 1.5rem;
  }
`;

const Button = styled(Link)`
  padding: 0.75rem 2rem;
  background: transparent;
  color: #61dafb;
  text-decoration: none;
  font-size: 1.1rem;
  border: 2px solid #61dafb;
  border-radius: 5px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  @media (max-width: 480px) {
    width: 100%;
    max-width: 280px;
    text-align: center;
  }

  &:hover {
    box-shadow: 0 0 15px #61dafb;
    background: rgba(97, 218, 251, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    background: rgba(97, 218, 251, 0.1);
    border-radius: 50%;
    transition: width 0.6s ease, height 0.6s ease;
  }
`;

const ResumeButton = styled.a`
  padding: 0.75rem 2rem;
  background: rgba(97, 218, 251, 0.15);
  color: #61dafb;
  text-decoration: none;
  font-size: 1.1rem;
  border: 2px solid rgba(97, 218, 251, 0.3);
  border-radius: 5px;
  transition: all 0.3s ease;
  cursor: pointer;

  @media (max-width: 480px) {
    width: 100%;
    max-width: 280px;
    text-align: center;
  }

  &:hover {
    box-shadow: 0 0 15px rgba(97, 218, 251, 0.2);
    background: rgba(97, 218, 251, 0.25);
  }
`;

const ShowMoreButton = styled.button`
  background: transparent;
  color: #61dafb;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  margin-top: 0.75rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  
  &:hover {
    color: #ffffff;
  }

  svg {
    width: 12px;
    height: 12px;
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const Home = () => {
  const techStack = ['React', 'Node.js', 'TypeScript', 'MySQL', 'MongoDB', 'Express', 'Next.js', 'Nest.js', 'Tailwind CSS', 'Ant Design', 'Material UI', 'Storybook', 'Jest', 'Bootstrap', 'JavaScript', 'HTML', 'CSS'];
  const [showAll, setShowAll] = React.useState(false);

  const displayedTechStack = showAll ? techStack : techStack.slice(0, 7);

  return (
    <HeroSection>
      <Content>
        <Title>Hi, I'm Ansar Thameem</Title>
        <Subtitle>
          A passionate Full Stack Developer crafting elegant solutions
          to complex problems
        </Subtitle>
        <TechStack>
          {displayedTechStack.map((tech) => (
            <TechBadge key={tech}>{tech}</TechBadge>
          ))}
        </TechStack>
        {techStack.length > 7 && (
          <ShowMoreButton
            onClick={() => setShowAll(!showAll)}
            isOpen={showAll}
          >
            {showAll ? 'Show Less' : 'Show More'}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </ShowMoreButton>
        )}
        <ButtonContainer>
          <Button to="/contact">Get In Touch</Button>
          <ResumeButton
            href={process.env.PUBLIC_URL + '/assets/Ansar-resume-2025.pdf'}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume
          </ResumeButton>
        </ButtonContainer>
      </Content>
    </HeroSection>
  );
};

export default Home;
