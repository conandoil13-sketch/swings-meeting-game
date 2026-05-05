import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

function resolveBasePath(mode: string) {
  const env = loadEnv(mode, process.cwd(), "");
  const explicitBasePath = env.VITE_BASE_PATH;
  const githubRepository = process.env.GITHUB_REPOSITORY;

  if (explicitBasePath) {
    return explicitBasePath;
  }

  if (githubRepository) {
    const [, repoName] = githubRepository.split("/");

    if (repoName) {
      return `/${repoName}/`;
    }
  }

  return "/";
}

export default defineConfig(({ mode }) => {
  const base = resolveBasePath(mode);

  return {
    base,
    plugins: [react()],
    server: {
      host: true,
      port: 5173
    }
  };
});
