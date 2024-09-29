import { TweetCard } from "@/components/magicui/tweet-card";
import ClientTweetCard from "@/components/magicui/client-tweet-card";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      {/* Server-side rendering of Tweet Card */}
      <h1 className="text-2xl font-bold mb-4">Server-Side Tweet Card</h1>
      <TweetCard id="1441032681968212480" className="shadow-2xl" />
      
      {/* Client-side rendering of Tweet Card */}
      <h1 className="text-2xl font-bold mt-8 mb-4">Client-Side Tweet Card</h1>
      <ClientTweetCard id="1441032681968212480" className="shadow-2xl" />
    </div>
  );
}
