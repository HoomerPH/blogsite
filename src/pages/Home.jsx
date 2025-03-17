import styled from 'styled-components'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`

const Hero = styled.section`
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing.xl} 0`};
  max-width: 800px;
  margin: 0 auto;
`

const Title = styled.h1`
  color: ${({ theme }) => theme.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  ${({ theme }) => theme.typography.h1}
`

const Subtitle = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.125rem; // 18px
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  ${({ theme }) => theme.typography.body}
`

const Description = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const HighlightText = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`

const BlogCard = styled.article`
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.surface}80, ${theme.surface}40)`};
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: visible;  // Changed from hidden to allow the light effect
  transition: ${({ theme }) => theme.transition};
  border: 1px solid ${({ theme }) => `${theme.border}40`};
  position: relative;

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  &::before {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => `radial-gradient(circle, ${theme.primary} 0%, ${theme.secondary} 100%)`};
    filter: blur(2px);
    opacity: 0;
    transition: opacity 0.3s ease;
    animation: rotate-corner ${({ theme }) => theme.animation.cornerLight.duration} cubic-bezier(0.4, 0, 0.2, 1) infinite;
    box-shadow: ${({ theme }) => `${theme.animation.cornerLight.glow} ${theme.primary}40`};
    z-index: 0;
  }

  &:hover::before {
    opacity: 0.9;
  }

  @keyframes rotate-corner {
    0% {
      transform: translate(0, 0);
      top: 0;
      left: 0;
    }
    25% {
      transform: translate(0, 0);
      top: 0;
      left: calc(100% - 6px);
    }
    50% {
      transform: translate(0, 0);
      top: calc(100% - 6px);
      left: calc(100% - 6px);
    }
    75% {
      transform: translate(0, 0);
      top: calc(100% - 6px);
      left: 0;
    }
    100% {
      transform: translate(0, 0);
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
`

const BlogContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  position: relative;
  z-index: 1;
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.surface}95, ${theme.surface}90)`};
`

const BlogTitle = styled.h2`
  ${({ theme }) => theme.typography.h3}
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.text};
`

const BlogExcerpt = styled.p`
  ${({ theme }) => theme.typography.body}
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 1rem; // 16px explicitly set
  line-height: 1.6;
`

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.textSecondary};
  ${({ theme }) => theme.typography.small}
`

const Tag = styled.span`
  background: ${({ theme }) => theme.background};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.primary};
`

const mockPosts = [
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
    title: 'Team Collaboration and Communication',
    excerpt: 'Exploring effective ways to work with the development team and improve communication skills...',
    image: 'https://a.pinatafarm.com/750x593/da377f0e4e/soyjak-pointing.jpg',
    date: '2025-02-21',
    tag: 'Soft Skills'
  },
  {
    id: 4,
    title: 'First Project Assignment',
    excerpt: 'Taking on my first real project and learning to handle responsibilities in a professional environment...',
    image: 'https://i.imgflip.com/4/1otk96.jpg',
    date: '2025-02-28',
    tag: 'Projects'
  },
  {
    id: 5,
    title: 'Problem Solving in Production',
    excerpt: 'Encountering and resolving real-world challenges in a production environment...',
    image: 'https://i.imgflip.com/4/1bhk.jpg',
    date: '2025-03-07',
    tag: 'Technical'
  },
  {
    id: 6,
    title: 'Growth and Learning Opportunities',
    excerpt: 'Reflecting on personal and professional growth during the internship journey...',
    image: 'https://imgflip.com/s/meme/This-Is-Fine.jpg',
    date: '2025-03-14',
    tag: 'Personal Growth'
  }
]

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