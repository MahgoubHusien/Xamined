package com.xamined.xamined.controller;

import com.xamined.xamined.model.Tweet;
import com.xamined.xamined.service.TweetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tweets")
public class TweetController {

    @Autowired
    private TweetService tweetService;

    @GetMapping
    public ResponseEntity<List<Tweet>> getAllTweetsInReverseOrder() {
        List<Tweet> tweets = tweetService.getAllTweetsInReverseOrder();
        return ResponseEntity.ok(tweets);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tweet> getTweetById(@PathVariable("id") String tweetId) {
        Optional<Tweet> tweetOptional = tweetService.getTweetById(tweetId);
        return tweetOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTweetById(@PathVariable("id") String tweetId) {
        tweetService.deleteTweetById(tweetId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/save")
    public ResponseEntity<Tweet> saveTweet(@RequestBody Tweet tweet) {
        Tweet savedTweet = tweetService.saveTweet(tweet);
        return ResponseEntity.ok(savedTweet);
    }

    @GetMapping("/sentiment/{tweetId}")
    public ResponseEntity<?> getTweetSentiment(@PathVariable String tweetId) {
        Optional<Tweet> tweetOptional = tweetService.getTweetById(tweetId);
        if (tweetOptional.isPresent()) {
            return ResponseEntity.ok(tweetOptional.get().getSentimentAnalysis());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tweet not found in the database");
        }
    }
}
