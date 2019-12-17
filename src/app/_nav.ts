interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer'
  },
  {
    title: true,
    name: 'Collaboration'
  },
  {
    name: 'AWS Mail',
    url: 'https://outlawdesigns.awsapps.com/mail',
    icon: 'icon-envelope-letter'
  },
  {
    name: 'Slack',
    url: 'https://outlawdesignsio.slack.com/',
    icon: 'icon-bubbles'
  },
  {
    name: 'Discord',
    url: 'https://discordapp.com',
    icon: 'icon-screen-smartphone'
  },
  {
    name: 'Trello',
    url: 'https://trello.com/outlawstar4761/boards',
    icon: 'icon-layers'
  },
  {
    title: true,
    name: 'Development'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/outlawdesigns-io',
    icon: 'icon-social-github'
  },
  {
    name: 'Npm',
    url: 'https://www.npmjs.com/~outlawstar4761',
    icon: 'icon-grid'
  },
  {
    title: true,
    name: 'Administration',
  },
  {
    name: 'AWS Console',
    url: 'https://console.aws.amazon.com/',
    icon: 'icon-cloud-upload'
  },
  {
    title: true,
    name: 'Apps'
  },
  {
    name: 'LOE',
    url: '',
    icon: 'icon-home',
    children: [
      {
        name: 'Holding Bay',
        url: 'http://outlawdesigns.io/loe/holding',
        icon: 'icon-screen-desktop'
      },
      {
        name: 'Music',
        url: 'http://outlawdesigns.io/loe/music',
        icon: 'icon-screen-smartphone'
      }
    ]
  },
  {
    name: 'Buddy System',
    url: 'http://outlawdesigns.io/buddy',
    icon: 'icon-screen-smartphone'
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Disabled',
    url: '/dashboard',
    icon: 'icon-ban',
    badge: {
      variant: 'secondary',
      text: 'NEW'
    },
    attributes: { disabled: true },
  }
];
