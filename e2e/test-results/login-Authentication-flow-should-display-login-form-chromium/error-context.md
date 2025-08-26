# Page snapshot

```yaml
- generic [active]:
    - alert [ref=e1]
    - dialog [ref=e4]:
        - generic [ref=e5]:
            - generic [ref=e6]:
                - heading "Build Error" [level=1] [ref=e7]
                - paragraph [ref=e8]: Failed to compile
                - generic [ref=e9]:
                    - generic "An outdated version detected (latest is 15.5.0), upgrade is highly recommended!" [ref=e11]: Next.js (14.2.32) is outdated
                    - link "(learn more)" [ref=e12] [cursor=pointer]:
                        - /url: https://nextjs.org/docs/messages/version-staleness
            - generic [ref=e13]:
                - generic [ref=e14]:
                    - link "./app/globals.css.webpack[javascript/auto]!=!../../node_modules/.pnpm/next@14.2.32_@opentelemetry+api@1.9.0_@playwright+test@1.55.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js??ruleSet[1].rules[14].oneOf[12].use[2]!../../node_modules/.pnpm/next@14.2.32_@opentelemetry+api@1.9.0_@playwright+test@1.55.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js??ruleSet[1].rules[14].oneOf[12].use[3]!./app/globals.css" [ref=e15] [cursor=pointer]:
                        - text: ./app/globals.css.webpack[javascript/auto]!=!../../node_modules/.pnpm/next@14.2.32_@opentelemetry+api@1.9.0_@playwright+test@1.55.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js??ruleSet[1].rules[14].oneOf[12].use[2]!../../node_modules/.pnpm/next@14.2.32_@opentelemetry+api@1.9.0_@playwright+test@1.55.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js??ruleSet[1].rules[14].oneOf[12].use[3]!./app/globals.css
                        - img
                    - generic [ref=e20]: "Error: Cannot find module '@tailwindcss/forms' Require stack: - /Users/danielsmith/Documents/Saas_boilerplate/packages/ui/tailwind.config.ts"
                - contentinfo [ref=e21]:
                    - paragraph [ref=e22]:
                        - generic [ref=e23]: This error occurred during the build process and can only be dismissed by fixing the error.
```
