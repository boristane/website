import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    {
      'bg-main': 'bg-white dark:bg-black',
      'text-main': 'text-gray-800 dark:text-hex-bbb',
      'text-link': 'text-sky-600 dark:text-white ',
      'border-main': 'border-truegray-300 dark:border-truegray-600',
    },
    {
      'text-title': 'text-main text-4xl font-800',
      'nav-link': 'text-main hover:text-sky-600 transition duration-200 cursor-pointer',
      'prose-link': 'text-link text-nowrap cursor-pointer border-b-1 !border-opacity-30 hover:!border-opacity-100 border-sky-600 hover:border-sky-600 dark:border-neutral-500 hover:dark:border-truegray-400 transition-border-color duration-200 decoration-none',
    },
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // sans: 'Inter:400,600,800',
        mono: 'DM Mono:400,600',
        neucha: 'Neucha:400,600,800',
        poppins: 'Poppins:400,600,800',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: [
    'i-carbon-webhook',
    'i-carbon-mountain',
    'i-carbon-pen-fountain',
    'i-carbon-face-satisfied',
    'i-carbon-tools-alt',
  ],
})