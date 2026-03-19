/**
 * ReDefiners — Tailwind CSS Configuration
 * Loaded after the Tailwind CDN script on all pages.
 * Mirrors the design tokens from css/tokens.css.
 */
tailwind.config = {
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#00303F',
          800: '#063949',
          700: '#0F4D61',
          600: '#1C5D71',
          400: '#668B91',
          200: '#8CA7AF',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          50: '#F6F9FA',
          100: '#F0F6F7',
          150: '#EDF5F6',
          200: '#E9F2F4',
          250: '#E0E8EA',
          300: '#CCD6D9',
          400: '#B5C2C6',
          500: '#8CA7AF',
        },
        accent: {
          cyan: '#16D2DD',
          blue: '#2989CA',
          'blue-light': '#DFEDF7',
          purple: '#8828CD',
          'purple-light': '#A766D7',
          'purple-track': '#EEE1F8',
          orange: '#F49E21',
          yellow: '#F5BE24',
          'yellow-light': '#FDF5DE',
          green: '#38AA51',
          teal: '#4DCAC5',
          red: '#F45252',
          'red-muted': '#DA6E61',
          'gold': '#EEC960',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display': ['5rem', { lineHeight: '1.1' }],
        'h1': ['24px', { lineHeight: '1.3' }],
        'h2': ['20px', { lineHeight: '1.3' }],
        'h3': ['18px', { lineHeight: '1.4' }],
        'h4': ['16px', { lineHeight: '1.4' }],
        'body-lg': ['15px', { lineHeight: '1.5' }],
        'body': ['14px', { lineHeight: '1.5' }],
        'body-sm': ['13px', { lineHeight: '1.5' }],
        'caption': ['12px', { lineHeight: '1.4' }],
        'caption-sm': ['11px', { lineHeight: '1.4' }],
        'overline': ['10px', { lineHeight: '1.3' }],
      },
      borderRadius: {
        'token-xs': '3px',
        'token-sm': '6px',
        'token-md': '10px',
        'token-lg': '15px',
        'token-xl': '20px',
        'token-2xl': '30px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.07)',
        'elevated': '0 8px 24px rgba(0,0,0,0.08)',
        'glow-cyan': '0 4px 15px rgba(22,210,221,0.3)',
        'glow-purple': '0 4px 15px rgba(136,40,205,0.3)',
        'glow-orange': '0 3px 10px rgba(244,158,33,0.3)',
        'glow-blue': '0 2px 8px rgba(41,137,202,0.25)',
        'sidebar-active': '0 4px 15px rgba(6,57,73,0.4)',
        /* shadcn-inspired shadows */
        'shadcn-xs': '0 1px 2px 0 rgba(0,0,0,0.05)',
        'shadcn-sm': '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)',
        'shadcn-md': '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
        'shadcn-lg': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
        'shadcn-xl': '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
        /* shadcn focus ring */
        'ring-focus': '0 0 0 2px #FFFFFF, 0 0 0 4px #2989CA',
        'ring-focus-destructive': '0 0 0 2px #FFFFFF, 0 0 0 4px #F45252',
      },
      spacing: {
        'sidebar': '228px',
        'topbar': '60px',
        '18': '4.5rem',
        '88': '22rem',
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      transitionDuration: {
        'fast': '150ms',
        'DEFAULT': '200ms',
        'slow': '500ms',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-up': 'slideInUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.2s ease-out',
      },
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
};
