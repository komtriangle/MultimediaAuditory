import React from 'react'
import { createGlobalStyle } from 'styled-components';
import { darkSber } from '@sberdevices/plasma-tokens/themes'; // Или один из списка: darkEva, darkJoy, lightEva, lightJoy, lightSber
import {
    text, // Цвет текста
    background, // Цвет подложки
    gradient, // Градиент
} from '@sberdevices/plasma-tokens';
import { colorValues } from '@salutejs/plasma-tokens';

const DocumentStyle = createGlobalStyle`
    html:root {
        min-height: 100vh;
        color: ${text};
        background-color: ${background};
        background-image: ${gradient};
    }
    .device-on{
        color: ${colorValues.success};
    }
    .device-off{
        color: ${colorValues.secondary}
    }
`;
const ThemeStyle = createGlobalStyle(darkSber);
export const GlobalStyle = () => (
    <div>
        <DocumentStyle />
        <ThemeStyle />
    </div>
);
