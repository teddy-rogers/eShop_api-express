const { PrismaClient } = require('@prisma/database');
const data = require('./data.json');

const db = new PrismaClient();

function upsertUsers() {
  return data.users.map(
    async (i) =>
      await db.user.upsert({
        where: { id: i.id },
        update: {},
        create: { ...i },
      }),
  );
}

function upsertTexts() {
  return data.texts.map(
    async (i) =>
      await db.text.upsert({
        where: { id: i.id },
        update: {},
        create: { ...i },
      }),
  );
}

function upsertSkus() {
  return data.skus.map(
    async (i) =>
      await db.sku.upsert({
        where: { id: i.id },
        update: {},
        create: { ...i },
      }),
  );
}

function upsertSelections() {
  return data.selections.map(
    async (i) =>
      await db.selection.upsert({
        where: { id: i.id },
        update: {},
        create: { ...i },
      }),
  );
}

function upsertProducts() {
  return data.products.map(
    async (i) =>
      await db.product.upsert({
        where: { id: i.id },
        update: {},
        create: { ...i },
      }),
  );
}

function upsertPostsSections() {
  return data.postsSections.map(
    async (i) =>
      await db.postSection.upsert({
        where: { id: i.id },
        update: {},
        create: { ...i },
      }),
  );
}

function upsertPosts() {
  return data.posts.map(
    async (i) =>
      await db.post.upsert({
        where: { id: i.id },
        update: {},
        create: { ...i },
      }),
  );
}

function upsertOrders() {
  return data.orders.map(
    async (i) =>
      await db.order.upsert({
        where: { id: i.id },
        update: {},
        create: { ...i },
      }),
  );
}

function upsertKeywords() {
  return data.keywords.map(
    async (i) =>
      await db.keywords.upsert({
        where: { id: i.id },
        update: {},
        create: { ...i },
      }),
  );
}

function upsertCreditCards() {
  return data.creditCards.map(
    async (i) =>
      await db.creditCard.upsert({
        where: { id: i.id },
        update: {},
        create: { ...i },
      }),
  );
}

function upsertCredentials() {
  return data.credentials.map(
    async (i) =>
      await db.credentials.upsert({
        where: { id: i.id },
        update: {},
        create: { ...i },
      }),
  );
}

function upsertArticles() {
  return data.articles.map(
    async (i) =>
      await db.article.upsert({
        where: { id: i.id },
        update: {},
        create: { ...i },
      }),
  );
}

function upsertAddresses() {
  return data.addresses.map(
    async (i) =>
      await db.address.upsert({
        where: { id: i.id },
        update: {},
        create: { ...i },
      }),
  );
}

(async () => {
  try {
    //WARNING: order of upserts matters!
    upsertCredentials();
    upsertUsers();
    upsertCreditCards();
    upsertAddresses();
    upsertTexts();
    upsertSelections();
    upsertPosts();
    upsertPostsSections();
    upsertProducts();
    upsertKeywords();
    upsertOrders();
    upsertSkus();
    upsertArticles();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
