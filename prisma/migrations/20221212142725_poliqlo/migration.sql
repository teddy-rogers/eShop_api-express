-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('man', 'woman', 'unisex');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('shirt', 't_shirt', 'sweat', 'chino', 'jogger', 'jean', 'short', 'pull', 'accessory', 'swimsuit', 'dress', 'skirt');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'eu32', 'eu34', 'eu36', 'eu38', 'eu40', 'eu42', 'eu44', 'eu46', 'u');

-- CreateEnum
CREATE TYPE "Color" AS ENUM ('black', 'white', 'red', 'blue', 'yellow', 'green', 'pink', 'orange', 'brown', 'purple', 'grey');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('waiting', 'paid', 'shipped', 'received', 'returned');

-- CreateEnum
CREATE TYPE "Civility" AS ENUM ('unknown', 'Mr', 'Ms', 'Mrs', 'Eir', 'Dc');

-- CreateEnum
CREATE TYPE "Season" AS ENUM ('winter', 'spring', 'summer', 'autumn');

-- CreateEnum
CREATE TYPE "ImageAspect" AS ENUM ('landscape', 'portrait', 'square', 'maxWidth');

-- CreateEnum
CREATE TYPE "Country" AS ENUM ('GB', 'US', 'FR', 'JP', 'ES');

-- CreateEnum
CREATE TYPE "StoreStatus" AS ENUM ('open', 'standBy', 'maintenance');

-- CreateTable
CREATE TABLE "Credentials" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastConnection" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "civility" "Civility" NOT NULL DEFAULT 'unknown',
    "storeCountry" "Country" NOT NULL DEFAULT 'FR',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "sale" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "skuId" TEXT NOT NULL,
    "userId" TEXT,
    "guestId" TEXT,
    "orderId" TEXT,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "civility" TEXT NOT NULL DEFAULT 'unknown',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT NOT NULL DEFAULT '',
    "zipCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "prefixPhone" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditCard" (
    "id" TEXT NOT NULL,
    "CCNumber" TEXT NOT NULL,
    "ExpirationDate" TEXT NOT NULL,
    "CCV" INTEGER NOT NULL,
    "cardOwner" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CreditCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "trackingNumber" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creditCardId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "billingAddressId" TEXT,
    "shippingAddressId" TEXT,
    "status" "OrderStatus" NOT NULL DEFAULT 'waiting',

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "sale" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "gender" "Gender" NOT NULL DEFAULT 'man',
    "category" "Category" NOT NULL DEFAULT 't_shirt',
    "color" "Color" NOT NULL DEFAULT 'white',
    "season" "Season" NOT NULL DEFAULT 'winter',

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sku" (
    "id" TEXT NOT NULL,
    "ref" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "size" "Size" NOT NULL,

    CONSTRAINT "Sku_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Selection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "selectionPath" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "foregroundColor" TEXT NOT NULL DEFAULT 'white',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "dateStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateEnd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "countries" "Country"[],
    "imageAspect" "ImageAspect" NOT NULL DEFAULT 'portrait',

    CONSTRAINT "Selection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT DEFAULT '',
    "imageUrl" TEXT,
    "foregroundColor" TEXT NOT NULL DEFAULT 'white',
    "backgroundColor" TEXT NOT NULL DEFAULT '',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "dateStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateEnd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "countries" "Country"[],

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostSection" (
    "id" TEXT NOT NULL,
    "postId" TEXT,
    "title" TEXT DEFAULT '',
    "paragraph" TEXT NOT NULL DEFAULT '',
    "localPath" TEXT DEFAULT '',
    "externalLink" TEXT DEFAULT '',
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "imageAspect" "ImageAspect" NOT NULL DEFAULT 'landscape',

    CONSTRAINT "PostSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keywords" (
    "id" TEXT NOT NULL,
    "productId" TEXT,
    "selectionId" TEXT,
    "postId" TEXT,
    "postSectionId" TEXT,
    "indexes" TEXT[],

    CONSTRAINT "Keywords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "status" "StoreStatus" NOT NULL DEFAULT 'open',
    "country" "Country" NOT NULL DEFAULT 'FR',

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "countries" "Country"[],

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_id_key" ON "Credentials"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Credentials_email_key" ON "Credentials"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Keywords_productId_key" ON "Keywords"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Keywords_selectionId_key" ON "Keywords"("selectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Keywords_postId_key" ON "Keywords"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Keywords_postSectionId_key" ON "Keywords"("postSectionId");

-- CreateIndex
CREATE UNIQUE INDEX "Store_country_key" ON "Store"("country");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES "Sku"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditCard" ADD CONSTRAINT "CreditCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_creditCardId_fkey" FOREIGN KEY ("creditCardId") REFERENCES "CreditCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_billingAddressId_fkey" FOREIGN KEY ("billingAddressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sku" ADD CONSTRAINT "Sku_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostSection" ADD CONSTRAINT "PostSection_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keywords" ADD CONSTRAINT "Keywords_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keywords" ADD CONSTRAINT "Keywords_selectionId_fkey" FOREIGN KEY ("selectionId") REFERENCES "Selection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keywords" ADD CONSTRAINT "Keywords_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keywords" ADD CONSTRAINT "Keywords_postSectionId_fkey" FOREIGN KEY ("postSectionId") REFERENCES "PostSection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
