import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AboutSection = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #282c34 0%, #1a1d24 100%);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Content = styled.div`
  max-width: 800px;
  width: 100%;
  animation: ${fadeIn} 1s ease-out;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #61dafb, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: #a0a0a0;
  text-align: center;
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const SkillCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid rgba(97, 218, 251, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 20px rgba(97, 218, 251, 0.15);
  }

  h3 {
    color: #61dafb;
    margin-bottom: 1rem;
  }

  p {
    color: #a0a0a0;
  }
`;

const About = () => {
    const skills = [
        {
            title: "Frontend Development",
            description: "Expertise in React, TypeScript, and modern CSS frameworks"
        },
        {
            title: "Backend Development",
            description: "Proficient in Node.js, Express, and RESTful APIs"
        },
        {
            title: "Database Management",
            description: "Experience with MySQL, MongoDB, and database optimization"
        },
    ];

    return (
        <AboutSection>
            <Content>
                <Title>About Me</Title>
                <Description>
                    I'm a passionate Full Stack Developer with a keen eye for detail and a
                    dedication to crafting efficient, scalable solutions. With expertise in
                    modern web technologies, I transform complex problems into elegant applications.
                </Description>
                <SkillsContainer>
                    {skills.map((skill, index) => (
                        <SkillCard key={index}>
                            <h3>{skill.title}</h3>
                            <p>{skill.description}</p>
                        </SkillCard>
                    ))}
                </SkillsContainer>
            </Content>
        </AboutSection>
    );
};

export default About;
