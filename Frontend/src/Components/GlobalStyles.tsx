import { createGlobalStyle } from 'styled-components';
import { darkSber, darkEva, darkJoy } from '@salutejs/plasma-tokens/themes'; // Или один из списка: darkEva, darkJoy, lightEva, lightJoy, lightSber
import {
    text, // Цвет текста
    background, // Цвет подложки
    gradient, // Градиент
} from '@salutejs/plasma-tokens';

export const CHAR_SBER = 'sber'; // Сбер
export const CHAR_EVA = 'eva';   // Афина
export const CHAR_JOY = 'joy';   // Джой
export type CharacterId = typeof CHAR_SBER
  | typeof CHAR_EVA
  | typeof CHAR_JOY

const DocumentStyle = createGlobalStyle`
    html {
        color: ${text};
        background-color: ${background};
        background-image: ${gradient};
        min-height: 100vh;
    }
`;
//const ThemeStyle = createGlobalStyle(darkSber);
const ThemeBackgroundSber = createGlobalStyle(darkSber);
const ThemeBackgroundEva = createGlobalStyle(darkEva);
const ThemeBackgroundJoy = createGlobalStyle(darkJoy);

export const getThemeBackgroundByChar = (
    character: CharacterId,
  ) => {
    console.log("getThemeBackgroundByChar", character)
    const themeBackgroundByChar = {
        "sber": <ThemeBackgroundSber/>,
        "eva": <ThemeBackgroundEva/>,
        "joy": <ThemeBackgroundJoy/>,
    }
    const themeBackground = themeBackgroundByChar[character];
    return themeBackground || null;
  }

export const GlobalStyle = ({
    character,
    children,
  }: {
character: CharacterId,
children: JSX.Element[] | JSX.Element,
}) =>  (
    <>
        <DocumentStyle />
        {
       getThemeBackgroundByChar(character)
      }
      {
        children
      }
    </>
);