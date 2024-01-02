import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { qwikReact } from "@builder.io/qwik-react/vite";
import { qwikSpeakInline } from 'qwik-speak/inline';

export default defineConfig(() => {
    return {
        plugins: [qwikCity(), qwikVite(), qwikSpeakInline({
            supportedLangs: ['de', 'en'],
            defaultLang: 'de',
            assetsPath: 'i18n'
          }), tsconfigPaths(), qwikReact()
        ],
        dev: {
            headers: {
                "Cache-Control": "public, max-age=0",
            },
        },
        preview: {
            headers: {
                "Cache-Control": "public, max-age=600",
            },
        }
    };
});
