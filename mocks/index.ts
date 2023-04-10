// import {
//   Address,
//   Credentials,
//   CreditCard,
//   Order,
//   Prisma,
//   Product,
//   Selection,
//   Sku,
//   User
// } from '@prisma/database';
//
// import dotenv from 'dotenv';
// dotenv.config();
//
// const baseUrl =
//   process.env.NODE_ENV === 'dev' ? `localhost:${process.env.APP_PORT}` : '';
//
// export const user: Partial<User> = {
//   id: 'user-id',
//   email: 'martin-gale@email.com',
//   civility: 'Mr',
//   firstName: 'Martin',
//   lastName: 'Gale',
// };
//
// export const credentials: Credentials = {
//   id: 'credentials-id',
//   email: 'martin-gale@email.com',
//   password: process.env.TEST_USER_PWD!!,
// };
//
// export const creditCard: CreditCard = {
//   id: 'creditCard-id',
//   CCNumber: '12R%/F3V2V',
//   ExpirationDate: '0732',
//   CCV: 123,
//   cardOwner: 'Martin Game',
//   userId: 'user-id',
// };
//
// export const address: Address = {
//   id: 'address-id',
//   title: 'random title',
//   email: 'martin-gale@email.com',
//   civility: 'Mr',
//   firstName: 'Martin',
//   lastName: 'Gale',
//   phone: '0600000000',
//   prefixPhone: '+33',
//   address1: '22 faubourg poissonière',
//   address2: '',
//   zipCode: '75000',
//   city: 'Paris',
//   country: 'France',
//   userId: 'user-id',
// };
//
// export const order: Partial<Order> = {
//   id: 'order-id',
//   orderNumber: '1324354',
//   creditCardId: 'creditCard-id',
//   total: new Prisma.Decimal(180),
//   status: 'waiting',
//   trackingNumber: 'ADE25346',
//   billingAddressId: 'address-id',
//   shippingAddressId: 'address-id',
//   userId: 'user-id',
// };
//
// export const product1: Product = {
//   id: 'product-id1',
//   isActive: false,
//   name: 'basic tshirt',
//   gender: 'man',
//   category: 't_shirt',
//   description: 'basic tshirt regular',
//   color: 'white',
//   price: new Prisma.Decimal(19.9),
//   sale: new Prisma.Decimal(0),
//   season: 'summer',
//   imageUrl: '',
//   backgroundColor: '',
// };
//
// export const product2: Product = {
//   id: 'product-id2',
//   isActive: false,
//   name: 'oversized sweat',
//   gender: 'woman',
//   category: 'pull',
//   description: 'stylish sweat oversized green for women',
//   color: 'green',
//   price: new Prisma.Decimal(29.9),
//   sale: new Prisma.Decimal(10),
//   season: 'winter',
//   imageUrl: '',
//   backgroundColor: '',
// };
//
// export const product3: Product = {
//   id: 'product-id3',
//   isActive: false,
//   name: 'slim jean',
//   gender: 'woman',
//   category: 'jean',
//   description: 'slim jean blue for women',
//   color: 'blue',
//   price: new Prisma.Decimal(79.9),
//   sale: new Prisma.Decimal(20),
//   season: 'summer',
//   imageUrl: '',
//   backgroundColor: '',
// };
//
// export const sku1: Sku = {
//   id: 'sku-id1',
//   ref: 'S3D4F45G56',
//   size: 'm',
//   quantity: 50,
//   productId: 'product-id1',
// };
//
// export const sku2: Sku = {
//   id: 'sku-id2',
//   ref: 'S3D4F45G56',
//   size: 'xl',
//   quantity: 567,
//   productId: 'product-id2',
// };
//
// export const sku3: Sku = {
//   id: 'sku-id3',
//   ref: 'S3D4F45G56',
//   size: 's',
//   quantity: 8765,
//   productId: 'product-id3',
// };
//
// export const selection1: Selection = {
//   id: 'selection-id1',
//   title: 'Winter is coming',
//   description: 'Warm clothes for icy days',
//   foregroundColor: 'white',
//   imageUrl:
//     'https://images.unsplash.com/photo-1484081064812-86e90e107fa8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
//   backgroundColor: '',
//   aspect: 'portrait',
//   isActive: true,
//   selectionUrl: `http://${baseUrl}/product?season=winter`,
//   dateStart: new Date(2021, 11, 17),
//   dateEnd: new Date(3000, 12, 30),
// };
//
// export const selection2: Selection = {
//   id: 'selection-id2',
//   title: 'Up to -20%!',
//   description: 'Redo your wardrobe at a low price',
//   foregroundColor: '#F2EE2E',
//   imageUrl:
//     'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
//   backgroundColor: '',
//   aspect: 'portrait',
//   isActive: true,
//   selectionUrl: `http://${baseUrl}/product?sale=20`,
//   dateStart: new Date(2021, 11, 17),
//   dateEnd: new Date(3000, 12, 30),
// };
//
// export const selection3: Selection = {
//   id: 'selection-id3',
//   title: 'Jeans',
//   description: 'Nothing but denim...',
//   foregroundColor: '#ED1B1E',
//   imageUrl:
//     'https://images.unsplash.com/photo-1551619873-fcaaf90f88b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
//   backgroundColor: '',
//   aspect: 'portrait',
//   isActive: true,
//   selectionUrl: `http://${baseUrl}/product?category=jean`,
//   dateStart: new Date(2021, 11, 17),
//   dateEnd: new Date(3000, 12, 30),
// };
