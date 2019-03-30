type Provider = 'facebook' | 'twitter' | 'reddit' | 'linkedin';

interface BaseOption {
  /** URL to be shared. */
  url: string;
}

interface FacebookOption {
  /** URL to be shared. */
  u: string;
}

interface TwitterOption extends BaseOption {
  /** Tweet contents. */
  text: string;
  /** Twitter handle to tag in the post. */
  via: string;
}

interface LinkedinOption extends BaseOption {
  /** Title of the post. */
  title: string;
  /** Summary of the post. */
  summary: string;
  /** URL to be shared. */
  source: string;
  /** URL to be shared. */
  mini?: boolean;
}

type RedditOption = BaseOption;

type Option<T> = T extends 'facebook'
  ? FacebookOption
  : T extends 'twitter'
  ? TwitterOption
  : T extends 'linkedin'
  ? LinkedinOption
  : T extends 'reddit'
  ? RedditOption
  : unknown;

/** Generates a URL for sharing to social sites, e.g. Facebook, Twitter, etc. */
export function makeShareUrl<T extends Provider>(
  /** The name of the social site */
  provider: T,
  /** Options for a particular social site */
  options: Option<T>,
) {
  let baseUrl: string;
  let baseOptions = { ...options };

  switch (provider) {
    case 'facebook':
      baseUrl = 'https://www.facebook.com/sharer/sharer.php';
      break;
    case 'linkedin':
      baseUrl = 'https://www.linkedin.com/shareArticle';
      baseOptions = {
        ...baseOptions,
        mini:
          typeof (options as LinkedinOption).mini === 'boolean'
            ? (options as LinkedinOption).mini
            : true,
        title: encodeURIComponent((options as LinkedinOption).title),
        summary: encodeURIComponent((options as LinkedinOption).summary),
      };
      break;
    case 'reddit':
      baseUrl = 'https://www.reddit.com/submit';
      break;
    case 'twitter':
      baseUrl = 'https://twitter.com/intent/tweet';
      baseOptions = {
        ...baseOptions,
        text: encodeURIComponent((options as TwitterOption).text),
      };
      break;
    default:
      return '';
  }

  const query = Object.entries(baseOptions)
    .map(([k, v]) => `${k}=${v}`)
    .join('&');

  return `${baseUrl}?${query}`;
}
