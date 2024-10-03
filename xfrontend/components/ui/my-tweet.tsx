// components/my-tweet.tsx
import {
    enrichTweet,
    TweetContainer,
    TweetHeader,
    TweetBody,
    TweetMedia,
    TweetInfo,
    TweetActions,
    QuotedTweet,
    TweetInReplyTo,
    type TwitterComponents,
  } from 'react-tweet';
  import { type Tweet as TweetType } from 'react-tweet/api';
  
  type Props = {
    tweet: TweetType;
    components?: TwitterComponents;
  };
  
  export const MyTweet = ({ tweet: t, components }: Props) => {
    const tweet = enrichTweet(t);
    return (
      <TweetContainer>
        <TweetHeader tweet={tweet} components={components} />
        {tweet.in_reply_to_status_id_str && <TweetInReplyTo tweet={tweet} />}
        <TweetBody tweet={tweet} />
        {tweet.mediaDetails?.length ? (
          <TweetMedia tweet={tweet} components={components} />
        ) : null}
        {tweet.quoted_tweet && <QuotedTweet tweet={tweet.quoted_tweet} />}
        <TweetInfo tweet={tweet} />
        <TweetActions tweet={tweet} />
      </TweetContainer>
    );
  };
  