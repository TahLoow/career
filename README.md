# Paul's Site

I made this bio/blog fusion site so that I could share a portfolio of career work. I wanted to avoid using a template so that I could mess with my own hosting parameters, and experiment with a new component library ([Skeleton UI](www.skeleton.dev)). You can read more about my experience developing this site [here](https://www.paul-maclean.com/posts/this-site). 

## SvelteKit

This node app uses [SvelteKit](https://svelte.dev/docs/kit/introduction), which is a very sleek reactive frontend language + framework (really- it's its own compiler). 

## Developing

### Dependencies
**Node JS**. The core dependency for this app is `node` >= `23.0.0`. I recommend using `nvm` so you can easily switch between node versions, but it isn't strictly necessary for this application. 

**pnpm**. Pnpm is a very fast, caching package manager. It's used for installing the dependencies. 

### Setup

1. Clone this repository with ``git clone https://github.com/TahLoow/career.git``

2. Install node modules with ``pnpm install``

3. Run the application locally with ``npm run start:local``

4. Access the locally hosted app in your browser, at ``localhost:5173``

## Vercel

This project is hosted by Vercel, and deployments are automated via the Vercel deployment pipeline. You can see CI/CD messages and checks in the PR history.
