import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        background: #312e28;
        -webkit-font-smoothing: antialiased;
    }

    body, input, button {
        font-family: 16px Roboto Slab, sans-serif;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 500;
        color: #F4EDE8;
    }


    button {
        cursor: pointer;
    }

    `;
