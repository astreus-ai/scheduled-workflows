# Scheduled Workflows

This project demonstrates how to build time-based automated workflows with simple schedule strings and dependency management using the Astreus AI framework.

## Features

- **Time-based Scheduling**: Schedule tasks with cron-like expressions
- **Dependency Management**: Tasks can depend on completion of other scheduled tasks
- **Automated Workflows**: Set up and forget automated processes
- **Pipeline Orchestration**: Complex multi-step scheduled workflows

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Edit the `.env` file and add your API keys

## Running

```bash
npm run dev
```

## Code Explanation

The example creates a daily content pipeline that automatically researches topics, creates content, optimizes for SEO, and schedules publishing - all on automated schedules.

## Environment Variables

```bash
OPENAI_API_KEY=sk-your-openai-api-key-here
DB_URL=sqlite://./astreus.db
NODE_ENV=development
```

## More Information

- [Astreus AI Documentation](https://astreus.org/docs)
- [Scheduler Features](https://astreus.org/docs/framework/scheduler)
- [GitHub Repository](https://github.com/astreus-ai/astreus)