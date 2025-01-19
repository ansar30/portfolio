import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ProjectSection = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #282c34 0%, #1a1d24 100%);
  color: white;
  text-align: center;
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #61dafb, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  animation: ${fadeIn} 1s ease-out;
`;

const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(97, 218, 251, 0.2);
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 20px rgba(97, 218, 251, 0.15);
  }
`;

const ProjectTitle = styled.h3`
  color: #61dafb;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: #a0a0a0;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const TechStack = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: auto;
`;

const TechBadge = styled.span`
  background: rgba(97, 218, 251, 0.1);
  color: #61dafb;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
`;

const ProjectLink = styled.a`
  color: #61dafb;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid #61dafb;
  border-radius: 5px;
  transition: all 0.3s ease;
  margin-top: 1rem;
  display: inline-block;

  &:hover {
    background: rgba(97, 218, 251, 0.1);
    transform: translateY(-2px);
  }
`;

const Projects = () => {
  const projects = [
    {
      title: "Zupain",
      description: "A comprehensive e-commerce platform builder that enables users to create and manage their own online stores. Features include customizable templates, secure payment integration, inventory management, and analytics dashboard for tracking sales and customer behavior.",
      techStack: ["React", "Node.js", "Next.js", "Ant Design", "Sequelize", "MySQL"],
      link: "https://zupain.com"
    },
    {
      title: "Fleeters",
      description: "A comprehensive fleet management system that helps businesses track and optimize their vehicle operations. Features include real-time GPS tracking, automated maintenance scheduling, fuel efficiency monitoring, driver behavior analysis, route optimization, and detailed reporting dashboards. ",
      techStack: ["Next.js", "Express", "PostgreSQL", "Material UI"],
      link: "https://www.linkedin.com/company/kaay-labs"
    },
    {
      title: "Duway",
      description: "A social media platform integrated with AI capabilities for database management. Users can create posts, like content, add comments and interact with others. Features an admin application for tracking user activity, moderating content and maintaining the platform.",
      techStack: ["React", "Node.js", "MongoDB", "Express", "Socket.io", "AWS", "Nest.js", "Tailwind CSS", "Storybook", "JavaScript", "HTML", "CSS"],
      link: "https://www.linkedin.com/company/kaay-labs"
    }
  ];

  return (
    <ProjectSection>
      <Title>Featured Projects</Title>
      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard key={index}>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            <TechStack>
              {project.techStack.map((tech, techIndex) => (
                <TechBadge key={techIndex}>{tech}</TechBadge>
              ))}
            </TechStack>
            <ProjectLink href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </ProjectLink>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </ProjectSection>
  );
};

export default Projects;
