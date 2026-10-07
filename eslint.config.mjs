import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // Warn on console.log in production code (server API routes exempt)
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Avoid unescaped entities in JSX
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
