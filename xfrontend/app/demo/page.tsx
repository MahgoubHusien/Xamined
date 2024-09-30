// /pages/index.tsx

import TweetDemo from '@/components/ui/TweetDemo';

const HomePage = () => {
  return (
    <div>
      <h1>Display Tweet</h1>
      <TweetDemo tweetId="1629307668568633344" /> {/* Example Tweet ID */}
    </div>
  );
};

export default HomePage;
