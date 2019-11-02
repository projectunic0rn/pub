declare module '*.jpg';
declare module '*.png';
declare module '*.ico';
declare module '*.svg';

declare module 'gatsby-plugin-mailchimp' {
  interface Field {
    [key: string]: string;
  }

  interface MailChimpPluginResponse {
    result: 'success' | 'error';
    msg: string;
  }

  /** Subscribe an email address to a Mailchimp email list. */
  export default async function addToMailchimp(
    /** The email address you want to subscribe */
    email: string,
    /** Additional info (columns) you want included with this subscriber */
    fields?: Field,
    /**
     * If you want to override the default MC mailing list that's listed in your
     * gatsby-config, pass the list in here
     */
    endpointOverride?: string,
  ): Promise<MailChimpPluginResponse>;
}

declare module 'typography-theme-ocean-beach' {
  import { TypographyOptions } from 'typography';

  const Theme: TypographyOptions;

  export = Theme;
}
