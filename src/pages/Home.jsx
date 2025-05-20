import styled from 'styled-components'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  background: ${({ theme }) => theme.background};
  min-height: 100vh;
`

const Hero = styled.section`
  text-align: center;
  padding: 3rem 0;
  max-width: 800px;
  margin: 0 auto;
`

const Title = styled.h1`
  color: #DDA853;
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
  font-weight: bold;
`

const Subtitle = styled.p`
  color: #183B4E;
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`

const Description = styled.p`
  color: #183B4E;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
`

const HighlightText = styled.span`
  color: #DDA853;
  font-weight: 600;
`

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`

const BlogCard = styled.article`
  background: linear-gradient(145deg, #fffbe9cc, #F5EEDC99);
  border-radius: 1em;
  overflow: visible;
  transition: box-shadow 0.3s, transform 0.3s;
  border: none; /* Remove the border */
  position: relative;
  box-shadow: 0 4px 15px rgba(39, 84, 138, 0.07);

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 24px rgba(39, 84, 138, 0.12);
  }

  &::before {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: radial-gradient(circle, #27548A 0%, #183B4E 100%);
    filter: blur(2px);
    opacity: 0;
    transition: opacity 0.3s ease;
    animation: rotate-corner 2.5s linear infinite;
    box-shadow: 0 0 8px #DDA85366;
    z-index: 0;
  }

  &:hover::before {
    opacity: 0.9;
  }

  @keyframes rotate-corner {
    0% {
      top: 0;
      left: 0;
    }
    25% {
      top: 0;
      left: calc(100% - 6px);
    }
    50% {
      top: calc(100% - 6px);
      left: calc(100% - 6px);
    }
    75% {
      top: calc(100% - 6px);
      left: 0;
    }
    100% {
      top: 0;
      left: 0;
    }
  }
`

const BlogLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`

const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  position: relative;
  z-index: 1;
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
`

const BlogContent = styled.div`
  padding: 2rem;
  position: relative;
  z-index: 1;
  background: linear-gradient(145deg, #fffbe9f2, #F5EEDCeb);
  border-bottom-left-radius: 1em;
  border-bottom-right-radius: 1em;
`

const BlogTitle = styled.h2`
  margin-bottom: 0.75rem;
  color: #183B4E;
  font-size: 1.5rem;
  font-weight: bold;
`

const BlogExcerpt = styled.p`
  color: #27548A;
  margin-bottom: 1rem;
  font-size: 1rem;
  line-height: 1.6;
`

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #183B4E;
  font-size: 0.95rem;
`

const Tag = styled.span`
  background: #DDA85322;
  padding: 0.25em 0.75em;
  border-radius: 1em;
  color: #27548A;
  font-weight: 500;
`

export const mockPosts = [
  {
    id: 1,
    title: 'First Week at OJT: Getting Started',
    excerpt: 'My journey begins with orientation and meeting the team. Here\'s what I learned in my first week...',
    image: 'https://imgflip.com/s/meme/Waiting-Skeleton.jpg',
    date: '2025-02-07',
    tag: 'Week 1',
    path: '/week1'
  },
  {
    id: 2,
    title: 'Learning the Development Stack',
    excerpt: 'Deep diving into the company\'s tech stack and development practices...',
    image: 'https://imgflip.com/s/meme/Buff-Doge-vs-Cheems.png',
    date: '2025-02-14',
    tag: 'Week 2',
    path: '/week2'
  },
  {
    id: 3,
    title: 'Building Core Features & Team Collaboration',
    excerpt: 'Week 3 marks the start of real development: implementing authentication, collaborating with the team, and overcoming technical challenges...',
    image: '/cinema.png',
    date: '2025-02-21',
    tag: 'Week 3',
    path: '/week3'
  },
  {
    id: 4,
    title: 'Week 4: Database Schema and Mobile UI',
    date: 'February 24-28, 2025',
    excerpt: 'Designing the database schema and creating the initial mobile landing screen...',
    image: '/Week 4/image.png',
    tag: 'Week 4',
    path: '/week4'
  },
  {
    id: 5,
    title: 'Week 5: Login and Patient Dashboard UI',
    date: 'February 31 - March 4, 2025', // Note: Corrected date from original summary if Feb 31 was a typo
    excerpt: 'Developing the login page and the initial UI for the patient dashboard...',
    image: '/Week 5/image.png',
    tag: 'Week 5',
    path: '/week5'
  },
  {
    id: 6,
    title: 'Week 6: Iteration and Optimization',
    date: 'March 3-7, 2025',
    excerpt: 'Team collaboration, sprint planning, and optimizing the Patient Dashboard...',
    image: '/Week 6/image.png',
    tag: 'Week 6',
    path: '/week6'
  },
  {
    id: 7,
    title: 'Week 7: Feature Implementation and API Integration',
    date: 'March 10-14, 2025',
    excerpt: 'Implementing user profile management and integrating with backend APIs for real-time patient data...',
    image: '/Week 7/image.png',
    tag: 'Week 7',
    path: '/week7'
  },
  {
    id: 8,
    title: 'Week 8: Diving into React Native - Authentication & API Endpoints',
    date: 'March 17-21, 2025',
    excerpt: 'Self-paced learning on React Native authentication flows and connecting to MySQL backends via API endpoints...',
    image: '/Week 8/image.png',
    tag: 'Week 8',
    path: '/week8'
  },
  {
    id: 9,
    title: 'Week 9: Mastering API Communication - Fetch vs. Axios',
    date: 'March 24-28, 2025',
    excerpt: 'Deep dive into Fetch API and Axios for making HTTP requests in React Native, comparing their features and use cases...',
    image: '/Week 9/image.png',
    tag: 'Week 9',
    path: '/week9'
  },
  {
    id: 10,
    title: 'Week 10: Practical API Calls - Axios in Action',
    date: 'May 03 - May 09, 2025',
    excerpt: 'This week, we put theory into practice by implementing API calls using Axios. We explored a practical example of fetching data, highlighting Axios\'s ease of use, automatic JSON parsing, and robust error handling. A hands-on dive into a crucial skill for modern app development.',
    image: '/Week 10/image.png', // Assuming OJT folder is not at the root of public
    path: '/week10',
    tag: 'API Integration'
  },
  {
    id: 11,
    title: "Week 11: Final Presentation and Completion",
    date: "May 10 - May 17, 2025",
    excerpt: "In my final week, I prepared and delivered my OJT presentation to Sir Michael, showcasing all my contributions to the BU HealthSync+ project. The successful presentation led to the signing of my completion form, marking the end of a transformative 11-week journey filled with growth, challenges, and valuable experiences.",
    image: "/Week 11/image.png",
    path: "/week11",
    tag: "Completion"
  }
];

const Home = () => {
  const [posts] = useState(mockPosts)

  return (
    <HomeContainer>
      <Hero>
        <Title>Welcome to My OJT Journey</Title>
        <Subtitle>
          Documenting my growth, challenges, and achievements during my On-the-Job Training experience, one week at a time.
        </Subtitle>
        <Description>
          Join me as I share detailed insights into my <HighlightText>weekly progress</HighlightText>, 
          explore new technologies, and document valuable lessons learned throughout my 
          <HighlightText> internship experience </HighlightText>. From hands-on projects 
          to team collaborations, discover the real-world applications of classroom knowledge.
        </Description>
      </Hero>

      <BlogGrid>
        {posts.map((post) => (
          <BlogCard key={post.id}>
            <div className="corner-top-right"></div>
            <div className="corner-bottom-left"></div>
            {post.path ? (
              <BlogLink to={post.path}>
                <BlogImage src={post.image} alt={post.title} />
                <BlogContent>
                  <BlogTitle>{post.title}</BlogTitle>
                  <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                  <BlogMeta>
                    <Tag>{post.tag}</Tag>
                    <span>{post.date}</span>
                  </BlogMeta>
                </BlogContent>
              </BlogLink>
            ) : (
              <>
                <BlogImage src={post.image} alt={post.title} />
                <BlogContent>
                  <BlogTitle>{post.title}</BlogTitle>
                  <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                  <BlogMeta>
                    <Tag>{post.tag}</Tag>
                    <span>{post.date}</span>
                  </BlogMeta>
                </BlogContent>
              </>
            )}
          </BlogCard>
        ))}
      </BlogGrid>
    </HomeContainer>
  )
}

export default Home