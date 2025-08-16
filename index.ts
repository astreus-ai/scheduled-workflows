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
    name: 'Quick Test Pipeline',
    description: 'Test automated workflow with seconds interval',
    maxConcurrency: 2
  }, agent);

  // Run after 5 seconds
  const researchNode = graph.addTaskNode({
    name: 'Content Research',
    prompt: 'Research trending topics in AI and technology. Find 3-5 compelling topics for blog content.',
    schedule: 'after:5s'
  });

  // Run after 10 seconds
  const creationNode = graph.addTaskNode({
    name: 'Content Creation',
    prompt: 'Based on the research findings, create a short blog post summary on one of the trending topics.',
    schedule: 'after:10s',
    dependsOn: ['Content Research']
  });

  // Run after 15 seconds
  const seoNode = graph.addTaskNode({
    name: 'SEO Optimization',
    prompt: 'Optimize the blog post for SEO: add meta description and keywords.',
    schedule: 'after:15s',
    dependsOn: ['Content Creation']
  });

  // Run after 20 seconds
  const publishNode = graph.addTaskNode({
    name: 'Content Publishing',
    prompt: 'Create a social media post for the optimized content.',
    schedule: 'after:20s',
    dependsOn: ['SEO Optimization']
  });

  console.log('Starting scheduled workflow test...');
  console.log('Tasks will run at:');
  console.log('- Research: 5 seconds from now');
  console.log('- Creation: 10 seconds from now');
  console.log('- SEO: 15 seconds from now');
  console.log('- Publishing: 20 seconds from now\n');

  // Run the graph and get results
  const result = await graph.run();

  // Display execution results
  console.log('\n=== Workflow Execution Results ===');
  console.log('Success:', result.success);
  console.log(`Completed: ${result.completedNodes} tasks`);
  console.log(`Failed: ${result.failedNodes} tasks`);
  console.log(`Duration: ${result.duration}ms`);

  // Display each task result
  if (result.results) {
    console.log('\n=== Task Results ===');
    for (const [nodeId, nodeResult] of Object.entries(result.results)) {
      console.log(`\n[${nodeId}]:`);
      console.log(nodeResult);
    }
  }

  // Check for errors
  if (result.errors && Object.keys(result.errors).length > 0) {
    console.log('\n=== Errors ===');
    for (const [nodeId, error] of Object.entries(result.errors)) {
      console.log(`[${nodeId}]: ${error}`);
    }
  }

  console.log('\n✅ Scheduled workflow test completed!');
}

main().catch(console.error);