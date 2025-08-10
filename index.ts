import { config } from 'dotenv';
import { Agent, Graph } from '@astreus-ai/astreus';

// Load environment variables
config();

async function main() {
  const agent = await Agent.create({
    name: 'ContentAgent',
    model: 'gpt-4o',
    systemPrompt: 'You are a content creation specialist.'
  });

  const graph = new Graph({
    name: 'Daily Content Pipeline',
    description: 'Automated content creation and publishing',
    defaultAgentId: agent.id,
    maxConcurrency: 2
  }, agent);

  // 6 AM: Research trending topics  
  const researchNode = graph.addTaskNode({
    name: 'Content Research',
    prompt: 'Research trending topics in AI and technology. Find 3-5 compelling topics for blog content.',
    schedule: 'daily@06:00'
  });

  // 8 AM: Create content (after research)
  const creationNode = graph.addTaskNode({
    name: 'Content Creation',
    prompt: 'Based on the research findings, create a comprehensive blog post on one of the trending topics.',
    schedule: 'daily@08:00',
    dependsOn: ['Content Research']
  });

  // 10 AM: SEO optimization (after content)
  const seoNode = graph.addTaskNode({
    name: 'SEO Optimization',
    prompt: 'Optimize the blog post for SEO: add meta description, keywords, and improve structure.',
    schedule: 'daily@10:00',
    dependsOn: ['Content Creation']
  });

  // 12 PM: Publish content (after SEO)
  const publishNode = graph.addTaskNode({
    name: 'Content Publishing',
    prompt: 'Create social media posts and publishing schedule for the optimized content.',
    schedule: 'daily@12:00',
    dependsOn: ['SEO Optimization']
  });

  // Run the graph - scheduler auto-starts for scheduled nodes
  await graph.run();

  console.log('Content pipeline running with automatic scheduling!');
}

main().catch(console.error);