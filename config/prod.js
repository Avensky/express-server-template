module.exports = {
    callbackURL             : "https://www.uriza86.com",

    mongoURI                : process.env.MONGO_URI,
    cookieKey               : process.env.COOKIE_KEY,
    stripePublishableKey    : process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey         : process.env.STRIPE_SECRET_KEY,

    googleClientID          : process.env.GOOGLE_CLIENT_ID,
    googleClientSecret      : process.env.GOOGLE_CLIENT_SECRET,

    facebookClientID        : process.env.FACEBOOK_CLIENT_ID, // your App ID
    facebookClientSecret    : process.env.FACEBOOK_CLIENT_SECRET, // your App Secret

    twitterConsumerKey      : process.env.TWITTER_CONSUMER_KEY,
    twitterConsumerSecret   : process.env.TWITTER_CONSUMER_SECRET,
}
