# Ho do I define `@` as an alias of the root of the project in Next.js?

To define `@` as an alias for the root directory in a Next.js project, you can configure it in your **Next.js project's `jsconfig.json`** or **`tsconfig.json`** file, depending on whether you are using JavaScript or TypeScript. 
See section *[Set up Absolute Imports and Module Path Aliases](https://nextjs.org/docs/app/getting-started/installation#set-up-absolute-imports-and-module-path-aliases)* of the Next.js documentation for more information.
Here’s how to set it up:

### 1. Add `@` Alias in `jsconfig.json` or `tsconfig.json`

1. Create or open your `jsconfig.json` or `tsconfig.json` file in the root of your Next.js project.
2. Add the `baseUrl` and `paths` properties to define the alias.

   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["./*"]
       }
     }
   }
   ```

   Here’s what each part does:
   - `"baseUrl": "."` sets the base directory for absolute imports to the root.
   - `"@/*": ["./*"]` maps `@/` to the root directory (`./`), so you can use `@/path/to/file` to access any file from the project root.

### 2. Import Files Using the `@` Alias

Now, you can import files relative to the project root by using `@` as the alias. For example:

```javascript
import Component from '@/components/Component';
import { helperFunction } from '@/utils/helper';
```

### 3. Restart the Development Server

After setting up the alias, restart your development server to apply the changes.

### Notes
- This configuration will work for both JavaScript and TypeScript in Next.js.
- Make sure to install the appropriate ESLint or VSCode settings if you want autocompletion or linting support for the `@` alias.