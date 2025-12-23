
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { JournalArticle } from './types';

export const BRAND_NAME = 'Sola';
export const STUDIO_NAME = 'Gregorious Creative Studios';
export const TECH_NAME = 'Schroeder Technologies';

export const EXPLAINER_SECTIONS = [
  {
    title: "The Problem with 'Invert'",
    content: "Designers often rely on simple color inversion to create dark modes. This flips the emotional value of colors and turns brand identities into 'negative' versions. It's a shortcut that produces design debt.",
    icon: "🚫"
  },
  {
    title: "The Sola Mapping Engine",
    content: "Sola treats your UI as a hierarchy of layers. We map light backgrounds to professional Zinc scales while recalibrating accent colors for 'Dark Vibrancy'—ensuring your brand's soul remains intact.",
    icon: "⚙️"
  },
  {
    title: "Contrast & Accessibility",
    content: "Every transformation is checked against WCAG AA standards. We ensure interactive elements maintain a minimum contrast ratio of 4.5:1, reducing eye fatigue for low-light users.",
    icon: "⚖️"
  },
  {
    title: "Professional Grade Output",
    content: "Whether it's a SaaS dashboard or a landing page, Sola produces intentional dark themes. We replace harsh shadows with subtle rim lighting and depth-based elevation grays.",
    icon: "💎"
  }
];

// Added JOURNAL_ARTICLES export to satisfy the dependency in components/Journal.tsx
/**
 * Editorial content for the Research Insights section.
 */
export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: '1',
    title: 'The Future of AI Literacy',
    date: 'Oct 24, 2024',
    excerpt: 'Exploring why understanding AI is becoming as fundamental as reading and writing.',
    content: 'In an era where algorithms shape our newsfeeds, classrooms, and careers, the definition of literacy is undergoing a profound transformation. Basic reading and writing are no longer sufficient to navigate the complexities of the 21st century. We are entering the age of "Algorithmic Awareness," where understanding how data is collected, processed, and used to influence behavior is a vital survival skill. This article explores how Schroeder Technologies is pioneering this new educational frontier.'
  },
  {
    id: '2',
    title: 'Perceptual Luminance in Dark Mode',
    date: 'Nov 12, 2024',
    excerpt: 'How our eyes perceive brightness and why simple inversion fails design standards.',
    content: 'Simple color inversion is the "fast food" of UI design. It is cheap, quick, and ultimately unsatisfying. The human eye perceives luminance differently across the color spectrum—yellows feel brighter than blues even at the same mathematical intensity. When creating dark modes, designers must account for "visual buzzing" and contrast ratios that change as background luminance drops. Sola uses a custom mapping engine that preserves the brand identity while ensuring every pixel is optimized for low-light legibility.'
  },
  {
    id: '3',
    title: 'Designing for the Next Generation',
    date: 'Dec 05, 2024',
    excerpt: 'How digital products for children need to shift from passive consumption to active comprehension.',
    content: 'The term "digital native" is often used as an excuse to avoid teaching technology. Just because a toddler can swipe doesn\'t mean they understand the ethical implications of the data they generate. At Schroeder, we believe in "Glass Box" design—creating interfaces that reveal their inner workings through exploration. We move away from the "black box" approach of modern tech, giving children the tools to look under the hood of the digital world they inherit.'
  }
];

export const getSourceColor = (type: string): string => {
  const colors: Record<string, string> = {
    'UI': '#6A4FBF',
    'Theme': '#FFB673',
    'Snippet': '#2AB9A9',
    'General': '#4A4A4A'
  };
  return colors[type] || colors['General'];
};
