import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHeart, FaLightbulb, FaArrowUp, FaCode, FaBolt, FaCheckCircle, FaBookOpen, FaCogs } from 'react-icons/fa'; // Added FaCode, FaBolt, FaCheckCircle, FaBookOpen, FaCogs

// Styled Components (reused and adapted from Week9.jsx for consistency)
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

const CodeBlock = styled.pre`
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => `${theme.spacing.lg} 0`};
  overflow-x: auto;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);

  code {
    font-family: inherit;
  }
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
      content: '🚀'; 
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


const Week10 = () => {
  const theme = useContext(ThemeContext);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [reactions, setReactions] = useState({ helpful: 0, inspiring: 0, code: 0 });
  const [userReaction, setUserReaction] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalHeight) * 100);
      setShowScrollTop(currentScroll > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReaction = (type) => {
    setReactions(prev => ({
      ...prev,
      [type]: userReaction === type ? prev[type] - 1 : (userReaction ? prev[type] : prev[type] + 1) // Allow un-reacting
    }));
    setUserReaction(prev => (prev === type ? null : type));
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const axiosExampleCode = `\`\`\`javascript
// Don't forget to install Axios: npm install axios or yarn add axios
import axios from 'axios';

async function fetchData() {
  try {
    // Make a GET request to a public API
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    
    // Axios automatically parses JSON, so response.data is the JavaScript object
    console.log('Fetched Data:', response.data);
    
    // You can access status, headers, etc.
    console.log('Status Code:', response.status);

    // Example: Displaying the title in a hypothetical UI element
    // document.getElementById('todoTitle').innerText = response.data.title;

  } catch (error) {
    // Axios provides detailed error objects
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Data:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error Request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error Message:', error.message);
    }
    console.error('Error Config:', error.config);
  }
}

fetchData();
\`\`\``;

  return (
    <PageContainer>
      <ProgressBar $width={scrollProgress} />
      <Header>
        <Title>Week 10: Practical API Calls - Axios in Action</Title>
        <Date>May 03 - May 09, 2025</Date>
      </Header>

      <Section>
        <SectionTitle><FaBookOpen /> Introduction: From Theory to Practice</SectionTitle>
        <Content>
          <Paragraph>
            Last week, we dived into the theoretical differences between <Highlight>Fetch API</Highlight> and <Highlight>Axios</Highlight> for making HTTP requests in JavaScript applications, particularly in a React Native context. This week, it's time to roll up our sleeves and put that knowledge into practice! We'll focus on <Highlight>Axios</Highlight> due to its ease of use and powerful features, demonstrating a simple yet practical example of fetching data from an external API.
          </Paragraph>
          <Paragraph>
            While our initial learning was geared towards React Native, the principles and usage of Axios are largely the same across various JavaScript environments, including web development with React.
          </Paragraph>
        </Content>
      </Section>

      <ImageGrid>
        <ImageContainer>
          <BlogImage src="/Week 10/image.png" alt="Axios API Call Diagram" />
        </ImageContainer>
        <ImageContainer>
          <BlogImage src="/Week 10/image copy.png" alt="Axios Code Snippet Example" />
        </ImageContainer>
      </ImageGrid>

      <Section>
        <SectionTitle><FaCogs /> Setting the Stage: Conceptual Setup</SectionTitle>
        <Content>
          <Paragraph>
            Before making any API calls, you'd typically ensure Axios is part of your project. If you're starting a new project or adding it to an existing one, the installation is straightforward using npm or yarn:
          </Paragraph>
          <CodeBlock><code>npm install axios</code></CodeBlock>
          <Paragraph>Or, if you prefer yarn:</Paragraph>
          <CodeBlock><code>yarn add axios</code></CodeBlock>
          <Paragraph>
            Once installed, you can import Axios into any JavaScript file where you need to make HTTP requests. For our demonstration, we'll imagine we're fetching data for a simple to-do list application.
          </Paragraph>
        </Content>
      </Section>

      <Section>
        <SectionTitle><FaCode /> Crafting the API Call with Axios</SectionTitle>
        <Content>
          <Paragraph>
            Let's demonstrate how to fetch data using Axios with a <Highlight>GET</Highlight> request. We'll use the JSONPlaceholder API, which is a great resource for testing and prototyping.
          </Paragraph>
          <Paragraph>
            Here’s a simple JavaScript function that uses <Highlight>async/await</Highlight> to fetch a single to-do item:
          </Paragraph>
          <CodeBlock>
            <code>{axiosExampleCode}</code>
          </CodeBlock>
          <Paragraph>
            In this snippet, <Highlight>axios.get()</Highlight> makes the request. Axios automatically parses the JSON response, so <Highlight>response.data</Highlight> directly gives us the JavaScript object. Error handling is also more structured with Axios, providing detailed information in the <Highlight>error</Highlight> object.
          </Paragraph>
        </Content>
      </Section>

      <Section>
        <SectionTitle><FaBolt /> Key Axios Features in This Example</SectionTitle>
        <Content>
          <List>
            <li><Highlight>Simplicity:</Highlight> Making a GET request is a one-liner with <code>axios.get()</code>.</li>
            <li><Highlight>Automatic JSON Parsing:</Highlight> No need for <code>response.json()</code>; Axios handles it.</li>
            <li><Highlight>Promise-based:</Highlight> Works seamlessly with <code>async/await</code> for cleaner asynchronous code.</li>
            <li><Highlight>Error Handling:</Highlight> Provides a structured error object (<code>error.response</code>, <code>error.request</code>) that makes debugging easier.</li>
            <li><Highlight>Browser and Node.js Support:</Highlight> Axios can be used in both client-side JavaScript and server-side Node.js environments.</li>
          </List>
        </Content>
      </Section>
      
      <Section>
        <SectionTitle><FaCheckCircle /> Reflections and Moving Forward</SectionTitle>
        <Content>
          <Paragraph>
            This week, we translated our understanding of Axios into a practical example. Fetching data from APIs is a cornerstone of modern web and mobile development, and Axios provides an elegant and efficient way to manage these interactions.
          </Paragraph>
          <Paragraph>
            The ease of use, automatic transformations, and robust error handling make Axios a popular choice among developers. As we continue our OJT journey, mastering such tools will be invaluable for building dynamic and data-driven applications. Next week, we'll explore another crucial aspect of app development!
          </Paragraph>
        </Content>
      </Section>

      <ReactionBar>
        <ReactionButton $active={userReaction === 'helpful'} onClick={() => handleReaction('helpful')}>
          <FaLightbulb /> {reactions.helpful} Helpful
        </ReactionButton>
        <ReactionButton $active={userReaction === 'inspiring'} onClick={() => handleReaction('inspiring')}>
          <FaHeart /> {reactions.inspiring} Inspiring
        </ReactionButton>
        <ReactionButton $active={userReaction === 'code'} onClick={() => handleReaction('code')}>
          <FaCode /> {reactions.code} Code!
        </ReactionButton>
      </ReactionBar>

      <NavigationButtonsContainer>
        <StyledNavButton to="/week9">
          &larr; Previous Week
        </StyledNavButton>
        <StyledNavButton to="/week11">
          Next Week &rarr;
        </StyledNavButton>
      </NavigationButtonsContainer>

      {showScrollTop && (
        <ScrollToTop $visible={showScrollTop} onClick={scrollToTop} aria-label="Scroll to top">
          <FaArrowUp />
        </ScrollToTop>
      )}
    </PageContainer>
  );
};

export default Week10;
