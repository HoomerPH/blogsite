import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { FaHeart, FaLightbulb, FaArrowUp, FaReact, FaLink, FaYoutube, FaGraduationCap, FaCodeBranch, FaExchangeAlt } from 'react-icons/fa'; // Added FaCodeBranch, FaExchangeAlt
import { BiHappy } from 'react-icons/bi';
import { Link } from 'react-router-dom';

// Reusing styled components from other week pages (ensure these are defined or imported)
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  position: relative;
  padding: ${({ theme }) => theme.spacing.md};
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.primary};
  ${({ theme }) => theme.typography.h1}
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Date = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  ${({ theme }) => theme.typography.small}
  font-style: italic;
`;

const Section = styled.section`
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.surface}80, ${theme.surface}40)`};
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => `${theme.border}40`};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  transition: ${({ theme }) => theme.transition};
  position: relative;
  overflow: visible;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  ${({ theme }) => theme.typography.h2}
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  border-bottom: 2px solid ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Content = styled.div`
  color: ${({ theme }) => theme.text};
  ${({ theme }) => theme.typography.body}
  line-height: 1.8;
  position: relative;
  z-index: 1;
`;

const Paragraph = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: 1rem;
  line-height: 1.8;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const ImageContainer = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.surface}90, ${theme.surface}60)`};
  backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => `${theme.border}30`};
  transition: ${({ theme }) => theme.transition};
  position: relative;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
`;

const Caption = styled.figcaption`
  padding: ${({ theme }) => theme.spacing.sm};
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  ${({ theme }) => theme.typography.small}
  background-color: ${({ theme }) => `${theme.surface}90`};
`;

const List = styled.ul`
  list-style-position: inside;
  margin: ${({ theme }) => `${theme.spacing.md} 0 ${theme.spacing.lg}`};
  padding-left: ${({ theme }) => theme.spacing.md};

  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    position: relative;
    padding-left: ${({ theme }) => theme.spacing.md};
    
    &::before {
      content: '✨'; // New bullet for this week
      color: ${({ theme }) => theme.primary};
      font-weight: bold;
      position: absolute;
      left: 0;
      top: 1px;
    }
  }
`;

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${props => props.$width}%;
  height: 4px;
  background: ${({ theme }) => theme.primary};
  z-index: 1000;
  transition: width 0.2s ease;
`;

const ReactionBar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.xl} 0;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.surface}80, ${theme.surface}40)`};
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => `${theme.border}40`};
`;

const ReactionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: none;
  background: ${({ theme, $active }) => $active ? theme.primary : 'transparent'};
  color: ${({ theme, $active }) => $active ? theme.background : theme.text};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  border: 1px solid ${({ theme, $active }) => $active ? theme.primary : theme.border };

  &:hover {
    transform: scale(1.05);
    background: ${({ theme, $active }) => !$active && theme.surface};
  }

  svg {
    font-size: 1.2rem;
  }
`;

const NavigationButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

const StyledNavButton = styled(Link)`
  background-color: ${({ theme }) => theme.primary};
  color: #ffffff;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.borderRadius};
  text-decoration: none;
  font-weight: 600;
  transition: ${({ theme }) => theme.transition};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }

  &.disabled {
    background-color: ${({ theme }) => theme.textSecondary};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const ScrollToTop = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.background};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.$visible ? '1' : '0'};
  transform: ${props => props.$visible ? 'scale(1)' : 'scale(0.8)'};
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: ${props => props.$visible ? 'scale(1.1)' : 'scale(0.8)'};
  }
`;

const Week9 = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [reactions, setReactions] = useState({ helpful: 0, inspiring: 0, fun: 0 });
  const [userReaction, setUserReaction] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReaction = (type) => {
    setReactions(prevReactions => {
      const newReactions = { ...prevReactions };
      if (userReaction === type) {
        newReactions[type] = Math.max(0, newReactions[type] - 1);
        setUserReaction(null);
      } else {
        if (userReaction) {
          newReactions[userReaction] = Math.max(0, newReactions[userReaction] - 1);
        }
        newReactions[type] = (newReactions[type] || 0) + 1;
        setUserReaction(type);
      }
      return newReactions;
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PageContainer>
      <ProgressBar $width={scrollProgress} />
      <Header>
        <Title>Week 9: Mastering API Communication - Fetch vs. Axios in React Native</Title>
        <Date>March 24-28, 2025</Date>
      </Header>

      <Section>
        <SectionTitle><FaYoutube /> Continued Learning: Fetch API Deep Dive</SectionTitle>
        <Content>
          <Paragraph>
            Building on last week's introduction, Week 9 involved a deeper dive into making HTTP requests in React Native. I started by focusing on the built-in <Highlight>Fetch API</Highlight>. My learning through YouTube tutorials covered:
          </Paragraph>
          <List>
            <li>Making GET, POST, PUT, and DELETE requests using Fetch.</li>
            <li>Handling request headers and bodies effectively.</li>
            <li>Managing responses, including parsing JSON and handling different HTTP status codes.</li>
            <li>Error handling strategies for network requests with Fetch.</li>
            <li>Understanding the Promise-based nature of Fetch and using async/await for cleaner code.</li>
          </List>
        </Content>
      </Section>

      <Section>
        <SectionTitle><FaCodeBranch /> Exploring Axios for Robust API Calls</SectionTitle>
        <Content>
          <Paragraph>
            After getting comfortable with Fetch, I shifted my focus to <Highlight>Axios</Highlight>, a popular third-party library for making HTTP requests. The tutorials highlighted several advantages of Axios, such as:
          </Paragraph>
          <List>
            <li>Automatic transformation of request and response data (e.g., JSON).</li>
            <li>Simpler error handling with a global `catch` block.</li>
            <li>Support for request and response interceptors, useful for tasks like adding authentication tokens or logging.</li>
            <li>Protection against XSRF (Cross-Site Request Forgery).</li>
            <li>Wider browser compatibility (though less of a concern for React Native, still good to know).</li>
          </List>
          <Paragraph>
            I explored how to install and integrate Axios into a React Native project and practiced making similar API calls as I did with Fetch.
          </Paragraph>
        </Content>
      </Section>

      <ImageGrid>
        <ImageContainer>
          <BlogImage src="/Week 9/image.png" alt="Fetch API vs Axios Comparison" />
          <Caption>Comparing Fetch API and Axios for React Native backend communication.</Caption>
        </ImageContainer>
        <ImageContainer>
          <BlogImage src="/Week 9/image copy.png" alt="Axios Interceptors Example" />
          <Caption>Conceptualizing Axios interceptors for request/response handling.</Caption>
        </ImageContainer>
      </ImageGrid>

      <Section>
        <SectionTitle><FaExchangeAlt /> Fetch vs. Axios: Key Differences & Use Cases</SectionTitle>
        <Content>
          <Paragraph>
            A significant part of my learning this week was understanding the <Highlight>key differences</Highlight> between Fetch and Axios and when to choose one over the other.
          </Paragraph>
          <List>
            <li><Highlight>Simplicity vs. Features:</Highlight> Fetch is built-in and simpler for basic requests, while Axios offers more features out-of-the-box.</li>
            <li><Highlight>Error Handling:</Highlight> Axios generally provides more straightforward error handling, as Fetch doesn't reject Promises on HTTP error statuses (like 4xx or 5xx) by default.</li>
            <li><Highlight>Interceptors:</Highlight> Axios's interceptors are a powerful feature for global request/response manipulation, which Fetch lacks natively.</li>
            <li><Highlight>Data Transformation:</Highlight> Axios automatically stringifies request data to JSON and parses response JSON, whereas Fetch requires manual steps.</li>
          </List>
          <Paragraph>
            The tutorials helped clarify that while Fetch is perfectly capable, Axios can often lead to cleaner and more maintainable code for complex applications with many API interactions.
          </Paragraph>
        </Content>
      </Section>
      
      <Section>
        <SectionTitle><FaGraduationCap /> Practical Takeaways and Next Steps</SectionTitle>
        <Content>
          <Paragraph>
            This week solidified my understanding of how React Native applications communicate with backend services. The main takeaways are:
          </Paragraph>
          <List>
            <li>A clear grasp of making various types of HTTP requests using both Fetch and Axios.</li>
            <li>The ability to choose the appropriate tool (Fetch or Axios) based on project requirements and complexity.</li>
            <li>Improved knowledge of handling asynchronous operations and API responses in a mobile context.</li>
          </List>
          <Paragraph>
            The next step is to start applying this knowledge by building small example projects or integrating simple API calls into test applications before tackling the main project's mobile components.
          </Paragraph>
        </Content>
      </Section>

      <ReactionBar>
        <ReactionButton $active={userReaction === 'helpful'} onClick={() => handleReaction('helpful')}>
          <FaLightbulb /> Helpful ({reactions.helpful})
        </ReactionButton>
        <ReactionButton $active={userReaction === 'inspiring'} onClick={() => handleReaction('inspiring')}>
          <FaHeart /> Inspiring ({reactions.inspiring})
        </ReactionButton>
        <ReactionButton $active={userReaction === 'fun'} onClick={() => handleReaction('fun')}>
          <BiHappy /> Fun ({reactions.fun})
        </ReactionButton>
      </ReactionBar>

      <NavigationButtonsContainer>
        <StyledNavButton to="/week8">
          &larr; Go Back to Week 8
        </StyledNavButton>
        <StyledNavButton to="/week10">
          Proceed to Week 10 &rarr;
        </StyledNavButton>
      </NavigationButtonsContainer>

      <ScrollToTop $visible={showScrollTop} onClick={scrollToTop}>
        <FaArrowUp />
      </ScrollToTop>
    </PageContainer>
  );
};

export default Week9;
