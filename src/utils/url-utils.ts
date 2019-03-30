type Provider = 'facebook' | 'twitter' | 'reddit' | 'linkedin';

interface FacebookOption {
  u: string;
}

interface TwitterOption {
  url: string;
  text: string;
  via: string;
}

interface LinkedinOption {
  url: string;
  title: string;
  summary: string;
  source: string;
  mini?: boolean;
}

interface RedditOption {
  url: string;
}

type Option<T> = T extends 'facebook'
  ? FacebookOption
  : T extends 'twitter'
  ? TwitterOption
  : T extends 'linkedin'
  ? LinkedinOption
  : T extends 'reddit'
  ? RedditOption
  : unknown;

/**
 *
 */
export function makeShareUrl<T extends Provider>(
  provider: T,
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
