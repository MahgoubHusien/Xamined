import ClientTweetCard from '@/components/magicui/client-tweet-card';
import { TweetCard } from '@/components/magicui/tweet-card';

export default function TweetDisplay() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tweet Cards</h1>

      {/* Server-side rendered tweet card */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Server-Side Rendered Mock Tweet</h2>
        <TweetCard id="mock-server" className="shadow-lg" />
      </div>

      {/* Client-side rendered tweet card */}
      <div>
        <h2 className="text-xl font-semibold">Client-Side Rendered Mock Tweet</h2>
        <ClientTweetCard id="mock-client" className="shadow-lg" />
      </div>
    </div>
  );
}
