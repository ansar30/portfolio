import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ExperienceSection = styled.section`
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

const ExperienceCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid rgba(97, 218, 251, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  margin-bottom: 2rem;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 20px rgba(97, 218, 251, 0.15);
  }
`;

const JobTitle = styled.h3`
  color: #61dafb;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const Company = styled.h4`
  color: #ffffff;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const Period = styled.p`
  color: #a0a0a0;
  margin-bottom: 1.5rem;
`;

const DescriptionList = styled.ul`
  list-style: none;
  padding: 0;
`;

const DescriptionItem = styled.li`
  color: #a0a0a0;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: start;
  
  &:before {
    content: "▹";
    color: #61dafb;
    margin-right: 10px;
  }
`;

const Experience = () => {
    const experiences = [
        {
            title: "Software Engineer",
            company: "Kaay Labs",
            period: "May 2023 - Present",
            years: "2 years",
            description: [
                "Developed and maintained web applications using React.js, Node.js and MongoDB",
                "Collaborated with cross-functional teams to deliver high-quality software solutions",
                "Implemented responsive designs and ensured cross-browser compatibility",
                "Participated in code reviews and provided constructive feedback to team members",
                "Optimized application performance and reduced load times by 40%"
            ]
        },
        {
            title: "System Engineer",
            company: "TATA Consultancy Services (TCS)",
            period: "Jan 2022 - Mar 2023",
            years: "1.3 years",
            description: [
                "Collaborated with international clients from US and UK to gather requirements and resolve technical issues",
                "Developed and maintained enterprise-level applications using Java, Spring Boot, and Oracle",
                "Provided timely resolution of production issues and implemented bug fixes",
                "Participated in daily scrum meetings and sprint planning with distributed teams",
                "Documented technical specifications and maintained up-to-date system documentation"
            ]
        },
    ];

    return (
        <ExperienceSection>
            <Content>
                <Title>Work Experiences</Title>
                {experiences.map((exp, index) => (
                    <ExperienceCard key={index}>
                        <JobTitle>{exp.title}</JobTitle>
                        <Company>{exp.company}</Company>
                        <Period>{exp.period}</Period>
                        <DescriptionList>
                            {exp.description.map((item, idx) => (
                                <DescriptionItem key={idx}>
                                    {item}
                                </DescriptionItem>
                            ))}
                        </DescriptionList>
                    </ExperienceCard>
                ))}
            </Content>
        </ExperienceSection>
    );
};

export default Experience;
