const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));

app.use(
  '/css',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')),
);
app.use(
  '/js',
  express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')),
);
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

const books = [
  {
    title: 'journey to the center of the earth',
    id: 1,
    author: 'Mark Twain',
    description: 'Science Fiction'
  },
  {
    title: 'Karnali Blues',
    id: 2,
    author: 'Buddi Sagar',
    description: 'Nepali Classic'
  },
  {
    title: 'Dear Sufi',
    id: 3,
    author: 'Subin Bhattarai',
    description: 'Love Story'
  },
];

app.use('/books', bookRouter);

bookRouter.route('/single')
  .get((req, res) => {
    res.send('hello single book');
  });

bookRouter.route('/')
  .get((req, res) => {
    res.render(
      'books',
      {
        nav: [
          { links: '/books', title: 'Books' },
          { links: '/authors', title: 'Author' }
        ],
        title: 'Library',
        books
      },
    );
  });

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav: [
        { links: '/books', title: 'Books' },
        { links: '/authors', title: 'Author' }
      ],
      title: 'Library',
      books
    },
  );
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
