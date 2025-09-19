# Folder and File Conventions

An overview of the folder and file conventions as well as guidelines for organisation of the project.

## Top-level Folders and Files

```plaintext
 .
├── .husky                   # Git hooks managed by Husky
├── .vscode                  # Settings for VS Code
├── env                      # Collection of Environment Variable files
├── public                   # Static assets served directly
│  └── images                # Stores all images (preferrably svgs)
├── src                      # Source code directory for the main application logic
├── .editorconfig            # Code style configuration to maintain consistent formatting
├── .gitignore               # Files & folder to be ignored from git
├── eslint.config.mjs        # ESLint: defining linting rules
├── next-env.d.ts            # Next.js-specific TypeScript environment declarations
├── package.json             # Project metadata and dependencies for npm
├── PROJECT-STRUCTURE.md     # Documentation explaining the folder and file structure of the project
├── README.md                # Overview and instructions for the project
├── tsconfig.eslint.json     # TypeScript configuration for ESLint to enforce coding standards
└── tsconfig.json            # Main TypeScript configuration file for the project
```

## ENV directory

This directory hosts all the environment files that you may need to run your application. Depending on your repository requirements, you may add these files to `.gitignore` incase you do not wish to commit changes (this would be applicable in case your repository is publicly accessible and you are storing sensitive information in the environment files).

```plaintext
 .
├── .env.base                 # File for common (usually non-sensitive) variables
├── .env.beta                 # File for beta environment
├── .env.development          # File for development environment
├── .env.production           # File for production environment
├── .env.qa                   # File for qa environment
└── .env.staging              # File for staging environment
```

## SRC directory

This directory is where next.js related code is placed.

```plaintext
 .
├── app                       # NextJS App Router
├── components                # UI component repository to be imported within containers
│  ├── forms                  # Stores all form related UI componets
│  ├── modal                  # Modal / Bottomsheet along with it's hook
│  └── page-[...]             # Stores all UI components related to specific page (eg, dashboard)
├── contexts                  # Stores React Context providers for components
│  ├── index                  # Exports the wrapper and the hook for the context usage
│  ├── context                # Stores the context and exposes the useContext
│  └── wrapper                # Exposes the provider with the UI for the context
├── configs                   # Holds constant configuration files
│  ├── settings               # Stores environment-specific global configuration files
│  │  ├── [environment].ts    # Environment level configuration
│  │  ├── global-settings.ts  # Exports environment-specific configurations
│  │  ├── index.ts            # Entry point for environment-specific configurations
├── containers                # Layout containers for pages
├── data
│  ├── contexts               # Contextual data storage (useContext)
│  ├── persist                # Persistent data storage using either cookies or localStorage
│  └── services               # API / socket interfaces
├── hooks                     # Custom React hooks for reusable stateful logic
├── middlewares               # Stores all middlewares
└── utilities                 #
```

TODO: Explain why `containers` exists

### References

NextJS App Router: [Link](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
