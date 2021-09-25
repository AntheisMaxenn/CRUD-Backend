const router = require("express").Router();


const jwt = require("../middleware/auth")
const post = require("../controller/post")


// router.post("/new", jwt.verify, (req, res) => {
//     console.log("console.log from post/new.");
// });
// This .use is scoped to this module only
router.use("/", jwt.verify);

router.post("/new", jwt.isOwner, post.newPost);

router.get("/myPost", jwt.isOwner, post.userPosts);

router.get("/feed", jwt.isOwner, post.publicPosts);

router.delete("/delete", jwt.isOwner, post.deletePost);

// router.get("/new", (req, res) => {
//     console.log("console.log from post/new.");
// });





module.exports = router;