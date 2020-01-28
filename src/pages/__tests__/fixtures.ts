import { DefaultPostImage, SiteMetadata } from '@hooks';

export const defaultPostImage: DefaultPostImage = {
  childImageSharp: {
    fluid: { aspectRatio: 1, src: '', srcSet: '', sizes: '' },
  },
};

export const siteMetadata: SiteMetadata = {
  title: 'Awesome Project',
  version: '',
  tag: '',
  description: '',
  siteUrl: '',
  appUrl: '',
  contactEmail: '',
  royEmail: '',
  social: {
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    reddit: '',
    github: '',
    slackInvite: '',
  },
};
