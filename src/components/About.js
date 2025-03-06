import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from 'framer-motion';
import fitnessImage from '../assets/fitness.png';
import eventCoordinatorImage from '../assets/eventcordinator.png';
import fitness3Image from '../assets/fitness3.jpg';
import publicSpeakingImage from '../assets/publicspeaking.png';
import Navbar from './Navbar';

const AboutContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #FFFFFF;
  overflow-x: hidden;
  padding-top: 70px; /* Add padding to account for navbar height */
`;

const QuoteSection = styled.section`
  height: 70vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(
    180deg,
    rgba(26, 26, 26, 0.95) 0%,
    rgba(45, 45, 45, 0.95) 100%
  );
  position: relative;
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
      rgba(74, 144, 226, 0.2),
      transparent
    );
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(74, 144, 226, 0.2),
      transparent
    );
  }
`;

const QuoteWrapper = styled(motion.div)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(74, 144, 226, 0.1);
  max-width: 1000px;
  width: 90%;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(74, 144, 226, 0.05) 0%,
      transparent 70%
    );
    z-index: -1;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(74, 144, 226, 0.03) 50%,
      transparent 100%
    );
    transform: rotate(45deg);
    animation: shimmer 8s linear infinite;
    z-index: -1;
  }

  @keyframes shimmer {
    0% {
      transform: rotate(45deg) translateY(0%);
    }
    100% {
      transform: rotate(45deg) translateY(100%);
    }
  }
`;

const Quote = styled(motion.h1)`
  font-size: 3.2rem;
  margin: 0 auto;
  line-height: 1.4;
  font-weight: 300;
  color: #FFFFFF;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  font-family: 'Georgia', serif;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const QuoteHighlight = styled(motion.span)`
  color: #4A90E2;
  font-weight: 500;
  display: inline-block;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #4A90E2, transparent);
    opacity: 0.5;
  }
`;

const QuoteAuthor = styled(motion.p)`
  font-size: 1.2rem;
  color: #E0E0E0;
  font-style: italic;
  margin-top: 1rem;
  opacity: 0.8;
  letter-spacing: 2px;

  &::before {
    content: '— ';
  }
`;

const ContentSection = styled.section`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: flex-start;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s ease forwards;
  animation-play-state: paused;
  
  &.visible {
    animation-play-state: running;
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ScrollProgress = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(to right, #4A90E2, #67B26F);
  transform-origin: 0%;
  z-index: 1000;
`;

const ScrollIndicator = styled(motion.div)`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
`;

const ScrollDot = styled(motion.div)`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(74, 144, 226, 0.3);
  cursor: pointer;
  
  &.active {
    background: #4A90E2;
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  width: 400px;
  height: 400px;
  margin: 0 auto;
  perspective: 1000px;
  transform-style: preserve-3d;

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
`;

const RotatingBorder = styled(motion.div)`
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px dashed rgba(74, 144, 226, 0.3);
  border-radius: 50%;
  pointer-events: none;
`;

const ImageWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
`;

const ProfileImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-image: url(${fitnessImage});
  background-size: cover;
  background-position: center;
  border: 4px solid #4A90E2;
  box-shadow: 0 0 30px rgba(74, 144, 226, 0.3);
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  backface-visibility: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
  }
`;

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const AboutTitle = styled(motion.h2)`
  font-size: 2.5rem;
  color: #4A90E2;
  margin-bottom: 1rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #4A90E2, #67B26F);
    border-radius: 2px;

    @media (max-width: 968px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const AboutText = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #E0E0E0;
  margin-bottom: 1.5rem;
`;

const HighlightText = styled.span`
  color: #4A90E2;
  font-weight: 600;
`;

const SkillsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SkillCard = styled(motion.div)`
  background: rgba(74, 144, 226, 0.1);
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  border: 1px solid rgba(74, 144, 226, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(74, 144, 226, 0.2);
  }
`;

const EducationSection = styled(motion.section)`
  padding: 4rem 2rem;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  margin-top: 4rem;
`;

const EducationBanner = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto 2rem;
  text-align: center;
  
  h2 {
    font-size: 2rem;
    color: #4A90E2;
    margin-bottom: 0.5rem;
  }

  h3 {
    font-size: 1.3rem;
    color: #E0E0E0;
    margin-bottom: 0.3rem;
  }

  p {
    font-size: 1rem;
    color: #AAAAAA;
  }
`;

const EducationTimeline = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 1rem;
  padding: 1.2rem 2.2rem 1.2rem 1.2rem;
  background: rgba(74, 144, 226, 0.05);
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid rgba(74, 144, 226, 0.1);
  transition: all 0.3s ease;
  width: 100%;
  max-width: 800px;

  &:hover {
    background: rgba(74, 144, 226, 0.1);
    border-color: rgba(74, 144, 226, 0.3);
    transform: translateX(10px);
    box-shadow: 0 4px 20px rgba(74, 144, 226, 0.1);
  }

  &::after {
    content: '↓';
    position: absolute;
    right: 1.2rem;
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
    color: #4A90E2;
    font-size: 1rem;
    opacity: 0.6;
    transition: all 0.3s ease;
  }

  &.active::after {
    content: '↑';
    opacity: 1;
  }

  &:hover::after {
    opacity: 1;
  }

  h4 {
    font-size: 1.1rem;
    color: #4A90E2;
    margin-bottom: 0.3rem;
    display: flex;
    align-items: center;
  }
`;

const ModulesList = styled(motion.div)`
  margin-top: 0.8rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  border: 1px solid rgba(74, 144, 226, 0.1);
  width: 100%;
`;

const Module = styled(motion.div)`
  padding: 0.6rem;
  border-bottom: 1px solid rgba(74, 144, 226, 0.1);
  color: #E0E0E0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(74, 144, 226, 0.05);
    padding-left: 1rem;
  }

  span {
    color: #4A90E2;
    font-weight: 600;
  }
`;

const ExperienceSection = styled(motion.section)`
  padding: 4rem 2rem;
  width: 100%;
  background: rgba(0, 0, 0, 0.15);
  position: relative;
`;

const ExperienceBanner = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto 2rem;
  text-align: center;
  
  h2 {
    font-size: 2rem;
    color: #4A90E2;
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 3px;
      background: linear-gradient(90deg, #4A90E2, #67B26F);
      border-radius: 2px;
    }
  }
`;

const ExperienceCard = styled(motion.div)`
  background: rgba(74, 144, 226, 0.05);
  border-radius: 8px;
  padding: 1.2rem 2.2rem 1.2rem 1.2rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(74, 144, 226, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;

  &:hover {
    background: rgba(74, 144, 226, 0.1);
    border-color: rgba(74, 144, 226, 0.3);
    transform: translateX(10px);
    box-shadow: 0 4px 20px rgba(74, 144, 226, 0.1);
  }

  &::after {
    content: '↓';
    position: absolute;
    right: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    color: #4A90E2;
    font-size: 1rem;
    opacity: 0.6;
    transition: all 0.3s ease;
  }

  &.active::after {
    content: '↑';
    opacity: 1;
  }

  &:hover::after {
    opacity: 1;
  }

  h3 {
    color: #4A90E2;
    font-size: 1.1rem;
    margin-bottom: 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .duration {
    font-size: 0.85rem;
    color: #AAAAAA;
    font-style: italic;
  }

  .company {
    color: #E0E0E0;
    font-size: 0.95rem;
    margin-bottom: 0.3rem;
  }
`;

const LeadershipSection = styled(motion.section)`
  padding: 4rem 2rem;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  position: relative;
`;

const LeadershipBanner = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto 3rem;
  text-align: center;
  
  h2 {
    font-size: 2rem;
    color: #4A90E2;
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
  }

  p {
    font-size: 1.1rem;
    color: #E0E0E0;
    max-width: 800px;
    margin: 1rem auto;
    line-height: 1.6;
  }
`;

const LeadershipGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
`;

const LeadershipCard = styled(motion.div)`
  background: rgba(74, 144, 226, 0.05);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  aspect-ratio: 1 / 1.2;
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(74, 144, 226, 0.1);

    img {
      transform: scale(1.02);
      box-shadow: 0 0 20px rgba(74, 144, 226, 0.2);
    }

    &::before {
      opacity: 1;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    right: 0.5rem;
    bottom: 0.5rem;
    border: 1px solid rgba(74, 144, 226, 0.2);
    border-radius: 8px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .image-container {
    width: 100%;
    height: 65%;
    padding: 1rem;
    position: relative;
    background: rgba(74, 144, 226, 0.05);
    border: 1px solid rgba(74, 144, 226, 0.1);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.4s ease;
    border-radius: 4px;
    box-shadow: 0 0 15px rgba(74, 144, 226, 0.1);
  }

  .content {
    padding: 1.5rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: rgba(74, 144, 226, 0.05);
    border-radius: 0 0 12px 12px;
    position: relative;
    z-index: 1;
  }

  h3 {
    color: #4A90E2;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 40px;
      height: 2px;
      background: linear-gradient(90deg, #4A90E2, transparent);
      transition: width 0.3s ease;
    }
  }

  &:hover h3::after {
    width: 60px;
  }

  p {
    color: #E0E0E0;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

function About() {
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const borderRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  const contentRef = useRef(null);
  const skillsRef = useRef(null);
  
  const contentInView = useInView(contentRef, {
    threshold: 0.2,
    once: true
  });

  const skillsInView = useInView(skillsRef, {
    threshold: 0.2,
    once: true
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const quoteWords = [
    { text: "Strength", highlight: true },
    { text: " grows in the moments you think you can't go on but ", highlight: false },
    { text: "do anyway", highlight: true },
    { text: ".", highlight: false }
  ];

  const [activeYear, setActiveYear] = useState(null);
  const [activeExperience, setActiveExperience] = useState(null);

  return (
    <>
      <Navbar />
      <AboutContainer>
        <ScrollProgress style={{ scaleX: scaleProgress }} />
        
        <ScrollIndicator>
          {[0, 0.5, 1].map((target, i) => (
            <ScrollDot
              key={i}
              className={scrollYProgress.get() > target - 0.1 && scrollYProgress.get() < target + 0.1 ? 'active' : ''}
              onClick={() => window.scrollTo({
                top: target * document.documentElement.scrollHeight,
                behavior: 'smooth'
              })}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </ScrollIndicator>

        <QuoteSection>
          <QuoteWrapper
            style={{ 
              opacity, 
              scale,
              y: parallaxY 
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
          >
            <Quote>
              {quoteWords.map((word, index) => (
                word.highlight ? (
                  <QuoteHighlight
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.8,
                      delay: 0.3 + (index * 0.1),
                      ease: "easeOut"
                    }}
                  >
                    {word.text}
                  </QuoteHighlight>
                ) : (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      duration: 0.8,
                      delay: 0.3 + (index * 0.1)
                    }}
                  >
                    {word.text}
                  </motion.span>
                )
              ))}
            </Quote>
          </QuoteWrapper>
        </QuoteSection>

        <ContentSection
          as={motion.section}
          ref={contentRef}
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
          variants={containerVariants}
          style={{ y: parallaxY }}
        >
          <ImageContainer variants={itemVariants}>
            <RotatingBorder style={{ rotate: borderRotate }} />
            <ImageWrapper>
              <ProfileImage />
            </ImageWrapper>
          </ImageContainer>

          <AboutContent>
            <AboutTitle variants={itemVariants}>
              About Me
            </AboutTitle>
            
            <AboutText variants={itemVariants}>
              I'm a <HighlightText>BSC Computer Science student</HighlightText> at the University of Huddersfield, driven by a passion for technology, sports, and a healthy lifestyle. Whether I'm coding innovative solutions or challenging myself physically, I constantly strive to push my limits. My journey is shaped by curiosity, discipline, and a desire to make a meaningful impact in tech and beyond.
            </AboutText>

            <AboutText variants={itemVariants}>
              My approach to both <HighlightText>software development</HighlightText> and <HighlightText>fitness</HighlightText> is guided by the same principles: consistency, dedication, and continuous improvement. I believe that excellence in any field comes from pushing boundaries and embracing challenges as opportunities for growth.
            </AboutText>

            <SkillsContainer
              ref={skillsRef}
              as={motion.div}
              initial="hidden"
              animate={skillsInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {[
                "Full Stack Development",
                "AI & Machine Learning",
                "React & Modern JS",
                "Python Development",
                "Database Design",
                "Cloud Services",
                "Version Control",
                "UI/UX Design",
                "Agile Methodology",
                "Fitness Training",
                "Nutrition Planning",
                "Problem Solving",
                "Team Leadership",
                "Project Management",
                "Data Analysis"
              ].map((skill, index) => (
                <SkillCard
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5
                      }
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </SkillCard>
              ))}
            </SkillsContainer>
          </AboutContent>
        </ContentSection>

        <EducationSection
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <EducationBanner
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2>Education</h2>
            <h3>University of Huddersfield, UK</h3>
            <p>BSc (Hons) Software Engineering • January 2023 - Present</p>
          </EducationBanner>

          <EducationTimeline>
            <TimelineItem
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={() => setActiveYear(activeYear === 1 ? null : 1)}
              whileHover={{ x: 10 }}
              className={activeYear === 1 ? 'active' : ''}
            >
              <h4>First Year Modules</h4>
              <AnimatePresence>
                {activeYear === 1 && (
                  <ModulesList
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Module>Computing <span>A</span></Module>
                    <Module>Professional Engineer <span>A</span></Module>
                    <Module>Hardware and Networks <span>A</span></Module>
                    <Module>Mathematics 1 <span>A</span></Module>
                    <Module>Mathematics 2 <span>A</span></Module>
                    <Module>AES <span>A</span></Module>
                    <Module>Software Design</Module>
                  </ModulesList>
                )}
              </AnimatePresence>
            </TimelineItem>

            <TimelineItem
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              onClick={() => setActiveYear(activeYear === 2 ? null : 2)}
              whileHover={{ x: 10 }}
              className={activeYear === 2 ? 'active' : ''}
            >
              <h4>Second Year Modules</h4>
              <AnimatePresence>
                {activeYear === 2 && (
                  <ModulesList
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Module>Data Structure and Algorithm <span>A</span></Module>
                    <Module>Relational Database and Web Integration <span>A</span></Module>
                    <Module>Introduction to Artificial Intelligence <span>A</span></Module>
                    <Module>Cyber Security <span>A</span></Module>
                    <Module>Operating Systems <span>A</span></Module>
                    <Module>Team Project</Module>
                  </ModulesList>
                )}
              </AnimatePresence>
            </TimelineItem>

            <TimelineItem
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              onClick={() => setActiveYear(activeYear === 3 ? null : 3)}
              whileHover={{ x: 10 }}
              className={activeYear === 3 ? 'active' : ''}
            >
              <h4>Previous Education</h4>
              <AnimatePresence>
                {activeYear === 3 && (
                  <ModulesList
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Module>Lahore Grammar School, Lahore Pakistan (2017-2021)</Module>
                    <Module>O-level 2019-2021 (– 7A* and A's)</Module>
                    <Module>A-levels (2021-2022) - Physics, Maths, Chemistry</Module>
                  </ModulesList>
                )}
              </AnimatePresence>
            </TimelineItem>
          </EducationTimeline>
        </EducationSection>

        <ExperienceSection
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ExperienceBanner
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2>Professional Experience</h2>
          </ExperienceBanner>

          <ExperienceCard
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onClick={() => setActiveExperience(activeExperience === 1 ? null : 1)}
            className={activeExperience === 1 ? 'active' : ''}
          >
            <h3>
              Front of House Staff
              <span className="duration">October 2024 - Present</span>
            </h3>
            <div className="company">Da Sandro Italian Restaurant</div>
            <AnimatePresence>
              {activeExperience === 1 && (
                <ModulesList
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Module>Delivering exceptional customer service in a high-end Italian dining environment, maintaining authentic hospitality standards.</Module>
                  <Module>Mastering cultural adaptability and teamwork in a fast-paced environment while ensuring seamless dining experiences.</Module>
                  <Module>Managing drink orders and anticipating customer needs with precision and attention to detail.</Module>
                </ModulesList>
              )}
            </AnimatePresence>
          </ExperienceCard>

          <ExperienceCard
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onClick={() => setActiveExperience(activeExperience === 2 ? null : 2)}
            className={activeExperience === 2 ? 'active' : ''}
          >
            <h3>
              Employee Administrator & Assistant Software Developer
              <span className="duration">July 2024 - August 2024</span>
            </h3>
            <div className="company">Abdullah Builders, Lahore, Pakistan</div>
            <AnimatePresence>
              {activeExperience === 2 && (
                <ModulesList
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Module>Spearheaded recruitment activities including job postings, resume screening, and interview coordination.</Module>
                  <Module>Collaborated in developing CV analysis software to streamline candidate evaluation processes.</Module>
                  <Module>Managed comprehensive employee relations, including onboarding, training, and conflict resolution.</Module>
                </ModulesList>
              )}
            </AnimatePresence>
          </ExperienceCard>

          <ExperienceCard
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={() => setActiveExperience(activeExperience === 3 ? null : 3)}
            className={activeExperience === 3 ? 'active' : ''}
          >
            <h3>
              E-commerce Entrepreneur
              <span className="duration">April 2022 - December 2022</span>
            </h3>
            <div className="company">Shopify Store Owner</div>
            <AnimatePresence>
              {activeExperience === 3 && (
                <ModulesList
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Module>Established and managed a successful Shopify store specializing in unisex accessories.</Module>
                  <Module>Implemented effective e-commerce strategies across Shopify and eBay platforms.</Module>
                  <Module>Handled end-to-end operations including website management, product sourcing, and customer service.</Module>
                </ModulesList>
              )}
            </AnimatePresence>
          </ExperienceCard>

          <ExperienceCard
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            onClick={() => setActiveExperience(activeExperience === 4 ? null : 4)}
            className={activeExperience === 4 ? 'active' : ''}
          >
            <h3>
              Marketing and Data Entry Apprentice
              <span className="duration">August 2021 - November 2021</span>
            </h3>
            <div className="company">Innovegic Marketing Company, Lahore, Pakistan</div>
            <AnimatePresence>
              {activeExperience === 4 && (
                <ModulesList
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Module>Contributed to multi-channel marketing campaigns from planning to execution.</Module>
                  <Module>Conducted comprehensive market research and competitive analysis.</Module>
                  <Module>Generated detailed performance reports for campaign optimization.</Module>
                </ModulesList>
              )}
            </AnimatePresence>
          </ExperienceCard>
        </ExperienceSection>

        <LeadershipSection
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <LeadershipBanner
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2>Leadership & Extracurricular</h2>
            <p>Leadership isn't about titles—it's about impact. From organizing major university events to leading sports teams, I've developed resilience, teamwork, and problem-solving skills beyond the classroom.</p>
          </LeadershipBanner>

          <LeadershipGrid
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <LeadershipCard
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="image-container">
                <img src={eventCoordinatorImage} alt="Event Coordinator" />
              </div>
              <div className="content">
                <h3>Event Coordinator - Pakistani Society</h3>
                <p>Organized Huddersfield University's largest Qawwali Night, bringing together hundreds of students and showcasing the power of cultural events.</p>
              </div>
            </LeadershipCard>

            <LeadershipCard
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="image-container">
                <img src={fitness3Image} alt="Table Tennis & Basketball" />
              </div>
              <div className="content">
                <h3>Table Tennis & Basketball Leadership</h3>
                <p>Represented the Huddersfield Basketball Team while also leading as a captain in various national table tennis and basketball tournaments in Pakistan.</p>
              </div>
            </LeadershipCard>

            <LeadershipCard
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="image-container">
                <img src={publicSpeakingImage} alt="Public Speaking" />
              </div>
              <div className="content">
                <h3>Public Speaker & Debating Team Lead</h3>
                <p>Represented my university in national debates and panel discussions, refining communication and persuasion skills.</p>
              </div>
            </LeadershipCard>
          </LeadershipGrid>
        </LeadershipSection>
      </AboutContainer>
    </>
  );
}

export default About; 