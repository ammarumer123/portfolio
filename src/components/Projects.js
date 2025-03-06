import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const ProjectsContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #FFFFFF;
  padding: 120px 2rem 2rem;
  overflow-x: hidden;
`;

const Title = styled(motion.h1)`
  text-align: center;
  font-size: 3.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #4A90E2, #67B26F);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0.9;
`;

const Subtitle = styled(motion.p)`
  text-align: center;
  font-size: 1.2rem;
  color: #E0E0E0;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
`;

const ProjectMedia = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(74, 144, 226, 0.1);
  overflow: hidden;

  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    content: '\${props => (!props.hasMedia ? props.title : '')}';
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.2rem;
    text-align: center;
    padding: 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: \${props => (!props.hasMedia ? 'block' : 'none')};
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #FFFFFF;
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  color: #E0E0E0;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: rgba(74, 144, 226, 0.1);
  border: 1px solid rgba(74, 144, 226, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.85rem;
  color: #4A90E2;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  background: rgba(74, 144, 226, 0.1);
  color: #4A90E2;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(74, 144, 226, 0.2);
    transform: translateY(-2px);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

function Projects() {
  const projects = [
    {
      title: "AI-Powered Task Manager",
      description: "A sophisticated task management application that leverages AI to help users organize, prioritize, and complete tasks efficiently. Features include smart task categorization, priority suggestions, and automated reminders.",
      media: {
        type: "video",
        url: "/task-manager-demo.mp4"
      },
      techStack: ["React", "Node.js", "OpenAI API", "MongoDB"],
      liveLink: "https://github.com/ammarumer123",
      githubLink: "https://github.com/ammarumer123"
    },
    {
      title: "Real-time Weather Dashboard",
      description: "An elegant weather dashboard that provides real-time weather updates, forecasts, and interactive weather maps. Users can save multiple locations and receive weather alerts.",
      media: {
        type: "video",
        url: "/weather-dashboard-demo.mp4"
      },
      techStack: ["React", "Weather API", "Chart.js", "Styled Components"],
      liveLink: "https://github.com/ammarumer123",
      githubLink: "https://github.com/ammarumer123"
    },
    {
      title: "FitJourney - Fitness Companion App",
      description: "A comprehensive fitness application designed for beginners and intermediate fitness enthusiasts. Features personalized workout plans, progress tracking, exercise demonstrations, and nutrition guidance.",
      media: {
        type: "video",
        url: "/fitjourney-demo.mp4"
      },
      techStack: ["React Native", "Firebase", "Express.js", "Node.js"],
      liveLink: "https://github.com/ammarumer123",
      githubLink: "https://github.com/ammarumer123"
    },
    {
      title: "Classic Games Hub",
      description: "An interactive web application featuring three beloved classic games: Pong, Tetris, and Tic-Tac-Toe. Built with responsive design principles for seamless gameplay across all devices. Includes 2-factor authentication for secure user access.",
      media: {
        type: "video",
        url: "/games-hub-demo.mp4"
      },
      techStack: ["HTML5", "CSS3", "JavaScript", "2FA", "Responsive Design"],
      liveLink: "https://github.com/ammarumer123",
      githubLink: "https://github.com/ammarumer123"
    },
    {
      title: "Enigma Machine Simulator",
      description: "A faithful recreation of the historical WWII Enigma machine, offering text encoding and decoding capabilities. Built with modular design principles, making it both an educational tool and a practical demonstration of classical cryptography.",
      media: {
        type: "video",
        url: "/enigma-demo.mp4"
      },
      techStack: ["Python", "Cryptography", "OOP", "Unit Testing"],
      liveLink: "https://github.com/ammarumer123",
      githubLink: "https://github.com/ammarumer123"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const renderProjectMedia = (project) => {
    const { media } = project;
    if (!media) return null;

    if (media.type === "video") {
      return (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={`https://via.placeholder.com/400x200?text=${project.title.replace(/ /g, '+')}`}
        >
          <source src={media.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }

    return <img src={media.url} alt={project.title} />;
  };

  return (
    <>
      <Navbar />
      <ProjectsContainer>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Projects
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Here are some of my recent projects that showcase my skills and passion for creating impactful solutions.
        </Subtitle>

        <ProjectsGrid
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ProjectMedia 
                hasMedia={project.media} 
                title={project.title}
              >
                {renderProjectMedia(project)}
              </ProjectMedia>
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TechStack>
                  {project.techStack.map((tech, index) => (
                    <TechTag key={index}>{tech}</TechTag>
                  ))}
                </TechStack>
                <ProjectLinks>
                  <ProjectLink href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"/>
                    </svg>
                    Live Demo
                  </ProjectLink>
                  <ProjectLink href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View Code
                  </ProjectLink>
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ProjectsContainer>
    </>
  );
}

export default Projects; 