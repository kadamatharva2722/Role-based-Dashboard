const { getUser } = require('../service/auth'); 

async function restrictUserLogin(req, res, next) {
  try {
    const userId = req.cookies?.uid;

    if (!userId) return res.redirect('/login');

    const user = await getUser(userId); // await here!

    if (!user) return res.redirect('/login');

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.redirect('/login');
  }
}

module.exports = { restrictUserLogin };
