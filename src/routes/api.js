const fs = require('fs');
const path = require('path');
const pg = require('pg');
const jwt = require('jsonwebtoken');

import { pool } from '../app';

module.exports = function(router) {

  router.get('/lesson/:lessonid/posts', (req, res) => {
    pool.query('SELECT * FROM posts', (err, posts) => {

      if(err) return res.status(500).send();
      return res.status(200).json(posts.rows);
    });
  });

  router.get('/weeks', (req, res) => {
    if(!req.cookies.redit_session) return res.status(403).send();
    const session = jwt.decode(req.cookies.redit_session);

    pool.query(`SELECT * FROM users WHERE email='${session.user_email}';`)
    .then((err, users) => {
      if(users && useres.rows.length) {

      pool.query('SELECT * FROM weeks', (err, weeks) => {
      if(err) return res.status(500).send(err)

        pool.query('SELECT * FROM lessons', (err, lessons) => {
          if(err) return res.status(500).send(err)
          const response = weeks.rows.map(week => {
            return Object.assign({}), {
              title: week.title,
              lessons: lessons.rows.filter(lesson => lesson.week_id === week.id)
            };
          })
          res.send(response);
        });
      });

      } else {
        return res.status(403).send();
      }
    })
  });
  return router;
};
