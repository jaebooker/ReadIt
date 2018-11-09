const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    category: { type: String, required: false },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    summary: { type: String, required: true },
    upvote: { type: Number, required: false },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

Post.pre("save", function(next) {
    //createdAt and updatedAt, the alpha and omega
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});
module.exports = mongoose.model("Post", Post);


//Ever had a hard time getting your kids to eat healthy, do their homework, or go to bed on time? Modern science has given us a better way to handle this, and improve our children's productivity and worldly understanding. I propose Hooked On Drugs, it's like Hooked On Phonics, but for the 21st Century! When your kid doesn't want to eat their veggies, sprinkle a bit of cocaine. If your kid is slow with their homework, give them some Speed! If they won't go to bed, mix their milk with whiskey and opium. Think of how your child's eyes will fill with wonder, if you teach them about undersea creatures while their tripping on LSD. If your school can't afford a field trip, why not try an acid trip! Wouldn't your kids like to ride the "Magic School Bus"? Your kids will learn and try all kinds of different drugs at some point in their lives, why not be the one to introduce it to them?

//The only problem with taking over the world is it's small, shitty, and invested with vermin (humans) which I would have to waste a lot of time and resources exterminating. It is, however, a good starting point to invade other planets and systems, such as Mars or Alpha Centuri. I will therefore be making plans for conquest, but do so reluctantly, since there's a lot of tedious shit I'll have to get through first, but hopefully it will prove fruitful. EDIT: Thanks for everyones words of support! I had almost abandoned this dream, but now have the motivation to continue! And to those who didn't like what I had to say, I will make your deaths far more unpleasant when the Day of Reckoning comes.
