import ClientTweetCard from "@/components/magicui/client-tweet-card";

export default function TweetDemo() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Client-Side Tweet Demo</h1>
      {/* Render the ClientTweetCard component */}
      <ClientTweetCard id="1668408059125702661" className="shadow-2xl" />
    </div>
  );
}
