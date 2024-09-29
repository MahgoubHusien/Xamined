import React from "react";
import { Tweet } from "react-tweet";
import 'react-tweet/style.css';

const tweetIds = [
  "1628832338187636740",
  "1628833922514372608",
  "1628835521684738049",
  "1628837415141632002",
  "1628839197203998720",
  "1628841002349518848",
  "1628842639637286913",
  "1628844411287838720",
  "1628846201643159553",
  "1628847872095211520",
  "1628849509603487744",
  "1628851143766626304",
  "1628852855352281089",
  "1628854646453889025",
  "1628856209521856512",
  "1628857982367922176",
  "1628859782705516545",
  "1628861604316897282",
  "1628863272744460288",
  "1628865077094385665",
];

const firstRow = tweetIds.slice(0, Math.ceil(tweetIds.length / 2));
const secondRow = tweetIds.slice(Math.ceil(tweetIds.length / 2));

const TweetCard = ({ id }: { id: string }) => (
  <div className="m-4">
    <Tweet id={id} />
  </div>
);

export const TweetDemo = () => (
  <div className="relative flex h-auto w-full flex-col items-center justify-center overflow-hidden rounded-lg p-8">
    <div className="flex space-x-4">
      {firstRow.map((id) => (
        <TweetCard key={id} id={id} />
      ))}
    </div>
    <div className="flex space-x-4 mt-8">
      {secondRow.map((id) => (
        <TweetCard key={id} id={id} />
      ))}
    </div>
  </div>
);

export default TweetDemo;
