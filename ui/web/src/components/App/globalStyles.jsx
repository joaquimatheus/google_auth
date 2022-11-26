import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
      :root,
    ::after,
    ::before {
        --bg-first-hue: 231;
        --bg-first-sat: 0.09 * 100;
        --bg-first-val: 0.9 * 100;
        --bg-second-hue: 231;
        --bg-second-sat: 0.11 * 100;
        --bg-second-val: 0.12 * 100;
        --primary-hue: 192;
        --primary-sat: 1 * 100;
        --primary-val: 0.35 * 100;
        --secondary-hue: 192;
        --secondary-sat: 0.19 * 100;
        --secondary-val: 0.24 * 100;
        --bg-first: hsl(
            var(--bg-first-hue),
            calc(var(--bg-first-sat) * 1%),
            calc(var(--bg-first-val) * 1%)
    );
    --bg-second: hsl(
        var(--bg-second-hue),
        calc(var(--bg-second-sat) * 1%),
        calc(var(--bg-second-val) * 1%)
    );
    --primary: hsl(
        var(--primary-hue),
        calc(var(--primary-sat) * 1%),
        calc(var(--primary-val) * 1%)
    );
    --secondary: hsl(
        var(--secondary-hue),
        calc(var(--secondary-sat) * 1%),
        calc(var(--secondary-val) * 1%)
    );
    /* the threshold at which colors are considered "light." */
        --threshold: 60;
        --border-threshold: 80;
    }
    *,
    *::after,
    *::before {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    ::-webkit-scrollbar {
        width: 10px;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 20px;
        background-color: hsla(
            var(--primary-hue),
            calc(var(--primary-sat) * 1%),
            calc(var(--primary-val) * 1%),
            30%
    );
    }
    body {
        font-size: 14px;
    }
`
