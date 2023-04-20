import connectRedis from 'connect-redis';
import dotenv from 'dotenv';
import express from 'express';
import fileUpload from 'express-fileupload';
import session from 'express-session';
import { sessionSecrets } from './constants';
import { appCache, SessionHelper } from './helpers';

dotenv.config();

const sessionHelper = new SessionHelper();
const port = parseInt(process.env.APP_PORT!!) as number;
const redisStore = connectRedis(session);

const Router = express();

Router.use(express.urlencoded({ extended: true }));
Router.use(express.json());
Router.use(fileUpload({ useTempFiles: true }));

Router.use(
  session({
    secret: sessionHelper.shuffleSessionSecrets(sessionSecrets),
    store: new redisStore({
      client: appCache,
      ttl: 86400,
    }),
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 1800000, secure: false },
  }),
);

Router.use((req, _, next) => {
  if (!sessionHelper.getCurrentSessionId(req.session))
    sessionHelper.createGuestSession({
      session: req.session,
      storeCountry: sessionHelper.getCurrentLocal(
        req.headers['accept-language'],
      ),
    });
  next();
});

Router.use('/user', require('./routes/user'));
Router.use('/address', require('./routes/address'));
Router.use('/article', require('./routes/article'));
Router.use('/order', require('./routes/order'));
Router.use('/product', require('./routes/product'));
Router.use('/selection', require('./routes/selection'));
Router.use('/post', require('./routes/post'));
Router.use('/post_section', require('./routes/postSections'));

Router.listen(port);

//

// import { Category, PrismaClient, Product, Size } from '@prisma/database';
// import { v4 as uuid } from 'uuid';
//
// Router.use('/fix', async () => {
//   try {
//     await createProductSkus().then(() => {});
//   } catch (e) {}
// });
// const db = new PrismaClient();
//
// const createProductSkus = async () => {
//   const topSizeList = [
//     Size.xxs,
//     Size.xs,
//     Size.s,
//     Size.m,
//     Size.l,
//     Size.xl,
//     Size.xxl,
//   ];
//   const bottomSizeList = [
//     Size.eu32,
//     Size.eu34,
//     Size.eu36,
//     Size.eu38,
//     Size.eu40,
//     Size.eu42,
//     Size.eu44,
//     Size.eu46,
//   ];
//   try {
//     await db.product.findMany().then((products) => {
//       const { topProducts, bottomProducts } = products.reduce(
//         (acc, cur) => {
//           const { topProducts, bottomProducts } = acc;
//           if (
//             [Category.chino, Category.jean, Category.jogger].find(
//               (cat) => cat === cur.category,
//             )
//           ) {
//             bottomProducts.push(cur);
//           } else {
//             topProducts.push(cur);
//           }
//           return { bottomProducts, topProducts };
//         },
//         { topProducts: [], bottomProducts: [] } as {
//           topProducts: Product[];
//           bottomProducts: Product[];
//         },
//       );
//
//       topProducts.forEach(async (product) => {
//         topSizeList.map(async (size) => {
//           return await db.sku.create({
//             data: {
//               ref: uuid().split('-')[0],
//               quantity: Math.floor(Math.random() * 2999),
//               productId: product.id,
//               size: size as Size,
//             },
//           });
//         });
//       });
//       bottomProducts.forEach(async (product) => {
//         bottomSizeList.map(async (size) => {
//           return await db.sku.create({
//             data: {
//               ref: uuid().split('-')[0],
//               quantity: Math.floor(Math.random() * 2999),
//               productId: product.id,
//               size: size,
//             },
//           });
//         });
//       });
//     });
//   } catch (error) {
//     throw error;
//   }
// };
