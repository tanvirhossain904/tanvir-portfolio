import { 
  Code2, 
  Server, 
  Database, 
} from 'lucide-react';
import React from 'react';

export const DATA = {
  profile: {
    name: "Tanvir Hossain",
    role: "Senior Full Stack Architect",
    tagline: "I build scalable, high-performance web systems for enterprise growth.",
    bio: "With over 5 years of experience in the MERN ecosystem, I don't just write code—I engineer solutions. My focus is on reducing technical debt, optimizing server response times, and building architectures that scale with your business.",
    email: "contact@tanvirh.com",
    socials: {
      github: "https://github.com/tanvirh",
      linkedin: "https://linkedin.com/in/tanvirh",
    }
  },
  stats: [
    { label: "Years Experience", value: "5+" },
    { label: "Successful Deploys", value: "40+" },
    { label: "Avg Perf Boost", value: "300%" },
  ],
  skills: [
    {
      category: "Frontend Architecture",
      icon: React.createElement(Code2, { className: "w-6 h-6" }),
      techs: ["React.js", "Next.js (App Router)", "TypeScript", "Tailwind CSS", "Redux Toolkit", "Micro-frontends"]
    },
    {
      category: "Backend Engineering",
      icon: React.createElement(Server, { className: "w-6 h-6" }),
      techs: ["Node.js", "Express", "NestJS", "GraphQL", "WebSockets", "Serverless Functions"]
    },
    {
      category: "Database & Cloud",
      icon: React.createElement(Database, { className: "w-6 h-6" }),
      techs: ["MongoDB (Aggregation Pipelines)", "PostgreSQL", "Redis Caching", "AWS (EC2, S3, Lambda)", "Docker"]
    }
  ],
  projects: [
    {
      id: 1,
      title: "Fintech Analytics Dashboard",
      client: "FinCorps Inc.",
      type: "SaaS Platform",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
      summary: "A real-time financial data visualization platform handling 50k+ concurrent socket connections.",
      challenge: "The client's legacy dashboard suffered from 8s+ load times and crashed during high-volume trading hours.",
      solution: "Re-architected the backend using Node.js streams and implemented a Redis caching layer. Migrated frontend to Next.js for server-side rendering.",
      impact: [
        "Reduced initial load time to 1.2s (85% improvement)",
        "Handled 100k+ concurrent events with zero downtime",
        "Increased user retention by 25% post-launch"
      ],
      stack: ["Next.js", "Node.js", "Redis", "Socket.io", "AWS"],
      fullDescription: "FinCorps needed a complete overhaul of their trader dashboard. We moved from a polling-based architecture to WebSockets for real-time updates. The UI was rebuilt with React Query to manage server state efficiently, drastically reducing unnecessary re-renders."
    },
    {
      id: 2,
      title: "Global E-Commerce Scalability",
      client: "RetailGiant",
      type: "E-Commerce",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1000",
      summary: "Scaling a monolithic MERN shop to a microservices architecture for global expansion.",
      challenge: "Database bottlenecks were causing checkout failures during Black Friday sales events.",
      solution: "Decoupled the order processing service and implemented message queues (RabbitMQ). Optimized MongoDB indexes for complex queries.",
      impact: [
        "Supported 500 orders/minute throughput",
        "Eliminated database deadlocks completely",
        "Reduced infrastructure costs by 30% via auto-scaling"
      ],
      stack: ["React", "Express", "RabbitMQ", "MongoDB", "Docker"],
      fullDescription: "The original monolith was hitting connection limits on MongoDB. By implementing a CQRS pattern and separating the read/write concerns, we were able to scale reads horizontally. RabbitMQ acted as a buffer for burst traffic during sales events."
    },
    {
      id: 3,
      title: "AI-Powered Real Estate Search",
      client: "PropTech Solutions",
      type: "Web Application",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000",
      summary: "Integrating natural language processing to allow users to search homes using conversational text.",
      challenge: "Standard filters were too rigid for users looking for specific architectural styles.",
      solution: "Integrated OpenAI API for query parsing and vector search implementation in PostgreSQL.",
      impact: [
        "Search engagement increased by 40%",
        "Lead conversion rate jumped from 2% to 5.5%",
        "Featured in TechDaily for innovation"
      ],
      stack: ["React", "Python/Django", "PostgreSQL", "OpenAI API"],
      fullDescription: "Users wanted to search for 'modern homes with big backyards in quiet neighborhoods'. Traditional SQL queries couldn't handle this. We implemented pgvector in PostgreSQL to perform semantic searches against property descriptions."
    }
  ],
  articles: [
    {
      title: "Why I Moved from Redux to Zustand in Large Scale Apps",
      readTime: "5 min read",
      date: "Nov 2024",
      tags: ["State Management", "Performance"],
      content: [
        "In the pursuit of maximum performance and minimal boilerplate, many senior developers are shifting away from older, established state management libraries like Redux. While Redux is powerful and battle-tested, its requirement for reducers, actions, and thunks creates significant technical overhead in large-scale applications.",
        "Zustand, on the other hand, offers a simple, hook-based, and highly performant alternative. Its core principle is minimal abstraction, allowing developers to create stores with just a few lines of code. This drastically reduces the bundle size and improves developer experience, especially in applications where fast iterations are key.",
        "The performance gains come from its unique approach to subscription: only components that consume specific parts of the state re-render, effectively mimicking the best parts of Redux selectors without the complexity. For Tanvir's work on complex enterprise dashboards, this clean, micro-store approach was vital for maintaining sub-second interaction times."
      ]
    },
    {
      title: "Optimizing MongoDB Aggregations for Sub-Second Queries",
      readTime: "8 min read",
      date: "Oct 2024",
      tags: ["Backend", "Database"],
      content: [
        "Aggregation pipelines are MongoDB's powerhouse for data transformation, but they can quickly become bottlenecks if not structured and indexed correctly. I recently tackled an 8-second query time on a mission-critical report, reducing it to under 500ms.",
        "The key steps involved analyzing the `$unwind` and `$lookup` stages using `explain()` to identify index gaps. For sub-second performance, ensure all filtering stages (`$match`) run as early as possible in the pipeline to reduce the document set before computationally expensive steps like `$group` or `$sort`."
      ]
    },
    {
      title: "A Strategic Guide to Next.js App Router Migration",
      readTime: "6 min read",
      date: "Sep 2024",
      tags: ["Frontend", "Architecture"],
      content: [
        "Moving from the Pages router to the new App router in Next.js requires more than just file restructuring—it demands a fundamental mental shift in how you handle data fetching and component rendering.",
        "I break down the critical differences between Server Components (RSC) and Client Components (CC). The strategic decision is determining which parts of your application must be interactive (CC) and which can benefit from zero-JS payload and direct database access (RSC). Proper boundary placement is the key to an effective, high-performance migration."
      ]
    }
  ]
};