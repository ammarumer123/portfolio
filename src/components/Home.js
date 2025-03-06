import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/fitness2.jpg';

// Styled components
const HomeContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #000;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${props => props.bgImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 0;
  }
`;

const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.4),
    rgba(0, 0, 0, 0.6)
  );
  z-index: 1;
`;

const ContentWrapper = styled(motion.div)`
  position: relative;
  z-index: 2;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Name = styled(motion.h1)`
  font-size: 4.5rem;
  margin-bottom: 1rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  cursor: default;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 3px;
    bottom: -5px;
    left: 50%;
    background: linear-gradient(90deg, #4A90E2, #67B26F);
    transform: translateX(-50%);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const Subtitle = styled(motion.div)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  letter-spacing: 4px;
  color: #4A90E2;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  cursor: default;

  &:hover {
    transform: translateY(-2px);
    text-shadow: 0 0 15px rgba(74, 144, 226, 0.5);
  }
`;

const Quote = styled(motion.p)`
  font-size: 1.8rem;
  max-width: 800px;
  margin: 2rem auto;
  font-style: italic;
  line-height: 1.6;
  color: #FFFFFF;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  cursor: default;
  transition: all 0.3s ease;

  &:hover {
    color: #FFFFFF;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    letter-spacing: 0.5px;
  }
`;

const SubQuote = styled(motion.p)`
  font-size: 1.2rem;
  margin-top: 1rem;
  color: #E0E0E0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  cursor: default;

  &:hover {
    color: #FFFFFF;
    transform: translateY(-1px);
  }
`;

const Navigation = styled.nav`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const NavButton = styled(motion.button)`
  background: rgba(74, 144, 226, 0.1);
  border: 2px solid #4A90E2;
  color: #FFFFFF;
  padding: 0.8rem 2rem;
  margin: 0.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.4s ease;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(74, 144, 226, 0.1);

  &:hover {
    background: #4A90E2;
    color: #FFFFFF;
    box-shadow: 0 0 25px rgba(74, 144, 226, 0.3);
    transform: translateY(-2px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const MainSection = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  margin-top: -10vh;
`;

const AboutSection = styled(motion.section)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  position: relative;
  z-index: 2;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(0, 0, 0, 0.7)
  );
`;

const AboutTitle = styled(motion.h2)`
  font-size: 3.5rem;
  color: #FFFFFF;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #4A90E2, #67B26F);
    border-radius: 2px;
  }
`;

const AboutText = styled(motion.p)`
  font-size: 1.4rem;
  line-height: 1.8;
  max-width: 800px;
  text-align: center;
  color: #FFFFFF;
  margin: 2rem auto;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const LearnMoreButton = styled(motion.button)`
  background: transparent;
  border: 2px solid #FFFFFF;
  color: #FFFFFF;
  padding: 1rem 3rem;
  font-size: 1.2rem;
  margin-top: 2rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 3px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover {
    background: #FFFFFF;
    color: #000000;
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #FFFFFF;
  cursor: pointer;
  z-index: 3;
`;

const ScrollText = styled.span`
  font-size: 1rem;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ScrollIcon = styled(motion.div)`
  width: 30px;
  height: 50px;
  border: 2px solid #FFFFFF;
  border-radius: 15px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background: #FFFFFF;
    border-radius: 50%;
    animation: scrollAnimation 2s infinite;
  }
  
  @keyframes scrollAnimation {
    0% { transform: translate(-50%, 0); opacity: 1; }
    100% { transform: translate(-50%, 20px); opacity: 0; }
  }
`;

const ProjectsSection = styled(motion.section)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  position: relative;
  z-index: 2;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.9)
  );
`;

const ProjectsTitle = styled(motion.h2)`
  font-size: 3.5rem;
  color: #FFFFFF;
  margin-bottom: 4rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #4A90E2, #67B26F);
    border-radius: 2px;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
`;

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

const ProjectMedia = styled.div`
  width: 100%;
  height: 200px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &::after {
    content: 'Media Coming Soon';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  color: #FFFFFF;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  color: #E0E0E0;
  line-height: 1.6;
  font-size: 1rem;
`;

const SeeAllButton = styled(motion.button)`
  background: transparent;
  border: 2px solid #4A90E2;
  color: #4A90E2;
  padding: 1rem 3rem;
  font-size: 1.2rem;
  margin-top: 4rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 3px;
  border-radius: 5px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(74, 144, 226, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover {
    background: #4A90E2;
    color: #FFFFFF;
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(74, 144, 226, 0.2);
  }
  
  &:hover::before {
    left: 100%;
  }
`;

const QuoteSection = styled(motion.section)`
  min-height: 60vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  position: relative;
  z-index: 2;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.9),
    rgba(0, 0, 0, 0.7)
  );
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
  }
`;

const MotivationalQuote = styled(motion.p)`
  font-size: 2.5rem;
  max-width: 1000px;
  text-align: center;
  color: #FFFFFF;
  margin: 0 auto;
  font-weight: 600;
  line-height: 1.4;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const QuoteSubtext = styled(motion.p)`
  font-size: 1.2rem;
  color: #4A90E2;
  margin-top: 2rem;
  font-style: italic;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const ContactButton = styled(motion.button)`
  background: transparent;
  border: 3px solid #FFFFFF;
  color: #FFFFFF;
  padding: 1.2rem 4rem;
  font-size: 1.3rem;
  margin-top: 4rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: 600;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    background: #FFFFFF;
    border-radius: 50%;
    transition: all 0.5s ease;
    z-index: -1;
  }
  
  &:hover {
    color: #000000;
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(255, 255, 255, 0.2);
    
    &::before {
      width: 300%;
      height: 300%;
    }
  }
`;

const projectsData = [
  {
    title: "AI-Powered Classification",
    description: "Built an AI model for image classification, processing over 12,000 WHO dataset images."
  },
  {
    title: "Laravel Music Playlist App",
    description: "Developed a web-based platform allowing users to create and explore dynamic music playlists."
  },
  {
    title: "Exam Scheduler",
    description: "Created a scheduling system that optimizes exam slot allocations while avoiding conflicts."
  }
];

const Home = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <HomeContainer bgImage={backgroundImage}>
      <BackgroundOverlay />
      
      <MainSection>
        <ContentWrapper
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Name
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.02 }}
          >
            Ammar Umer
          </Name>
          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            TECH | FITNESS | PUSHING LIMITS
          </Subtitle>
          <Quote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            "Limits exist only in the mind. Break them in code, break them in life."
          </Quote>
          <SubQuote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            Embracing challenges in tech, fitness, and leadership to push beyond limits.
          </SubQuote>
          <Navigation>
            {navItems.map((item, index) => (
              <StyledLink to={item.path} key={item.name}>
                <NavButton
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 1 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </NavButton>
              </StyledLink>
            ))}
          </Navigation>
        </ContentWrapper>
        
        <ScrollIndicator
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          whileHover={{ scale: 1.1 }}
        >
          <ScrollText>Scroll Down</ScrollText>
          <ScrollIcon />
        </ScrollIndicator>
      </MainSection>

      <AboutSection
        id="about-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <AboutTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Who Am I?
        </AboutTitle>
        <AboutText
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          A tech enthusiast and fitness devotee, I embark on a unique journey where code meets conditioning. 
          My passion lies in crafting innovative solutions while pushing the boundaries of physical and mental excellence. 
          Through the synthesis of technical precision and athletic discipline, I've discovered that the principles of 
          growth, persistence, and continuous improvement apply universally—whether debugging complex code or conquering 
          new fitness milestones.
        </AboutText>
        <StyledLink to="/about">
          <LearnMoreButton
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </LearnMoreButton>
        </StyledLink>
      </AboutSection>

      <ProjectsSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <ProjectsTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </ProjectsTitle>
        
        <ProjectsGrid>
          {projectsData.map((project, index) => (
            <ProjectCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.2
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <ProjectMedia />
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
            </ProjectCard>
          ))}
        </ProjectsGrid>

        <SeeAllButton
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          See All Projects
        </SeeAllButton>
      </ProjectsSection>

      <QuoteSection
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <MotivationalQuote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100
          }}
          viewport={{ once: true }}
        >
          "Success is no accident. It is hard work, perseverance, learning, and sacrifice."
        </MotivationalQuote>
        <QuoteSubtext
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Applying this philosophy in both technology and fitness.
        </QuoteSubtext>
        <ContactButton
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Let's Connect
        </ContactButton>
      </QuoteSection>
    </HomeContainer>
  );
};

export default Home; 