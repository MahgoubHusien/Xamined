import React from "react";
import { TweetCard } from "@/components/magicui/tweet-card";

const ClientTweetCard = ({ id, className }: { id: string; className?: string }) => {
  return <TweetCard id={id} className={className} />;
};

export default ClientTweetCard;
