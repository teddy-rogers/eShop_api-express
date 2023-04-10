PGDMP     )    )                z            database     12.13 (Debian 12.13-1.pgdg110+1)     12.13 (Debian 12.13-1.pgdg110+1) R    Z           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            [           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            \           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ]           1262    16384    database    DATABASE     x   CREATE DATABASE database WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';
    DROP DATABASE database;
                admin    false            {           1247    37137    Category    TYPE     �   CREATE TYPE public."Category" AS ENUM (
    'shirt',
    't_shirt',
    'sweat',
    'chino',
    'jogger',
    'jean',
    'short',
    'pull',
    'accessory',
    'swimsuit',
    'dress',
    'skirt'
);
    DROP TYPE public."Category";
       public          admin    false            ~           1247    37162    Civility    TYPE     m   CREATE TYPE public."Civility" AS ENUM (
    'unknown',
    'Mr',
    'Ms',
    'Mrs',
    'Eir',
    'Dc'
);
    DROP TYPE public."Civility";
       public          admin    false            �           1247    37176    Color    TYPE     �   CREATE TYPE public."Color" AS ENUM (
    'black',
    'white',
    'red',
    'blue',
    'yellow',
    'green',
    'pink',
    'orange',
    'brown',
    'purple'
);
    DROP TYPE public."Color";
       public          admin    false            �           1247    37198    Country    TYPE     [   CREATE TYPE public."Country" AS ENUM (
    'GB',
    'US',
    'FR',
    'JP',
    'ES'
);
    DROP TYPE public."Country";
       public          admin    false            �           1247    37210    Gender    TYPE     N   CREATE TYPE public."Gender" AS ENUM (
    'man',
    'woman',
    'unisex'
);
    DROP TYPE public."Gender";
       public          admin    false            �           1247    37218    ImageAspect    TYPE     l   CREATE TYPE public."ImageAspect" AS ENUM (
    'landscape',
    'portrait',
    'square',
    'maxWidth'
);
     DROP TYPE public."ImageAspect";
       public          admin    false            �           1247    37228    OrderStatus    TYPE     w   CREATE TYPE public."OrderStatus" AS ENUM (
    'waiting',
    'paid',
    'shipped',
    'received',
    'returned'
);
     DROP TYPE public."OrderStatus";
       public          admin    false            �           1247    37240    Season    TYPE     `   CREATE TYPE public."Season" AS ENUM (
    'winter',
    'spring',
    'summer',
    'autumn'
);
    DROP TYPE public."Season";
       public          admin    false            �           1247    37250    Size    TYPE     �   CREATE TYPE public."Size" AS ENUM (
    'xs',
    's',
    'm',
    'l',
    'xl',
    'xxl',
    'xxs',
    'u',
    'eu32',
    'eu34',
    'eu36',
    'eu38',
    'eu40',
    'eu42',
    'eu44',
    'eu46'
);
    DROP TYPE public."Size";
       public          admin    false            �           1247    37264    StoreStatus    TYPE     [   CREATE TYPE public."StoreStatus" AS ENUM (
    'open',
    'standBy',
    'maintenance'
);
     DROP TYPE public."StoreStatus";
       public          admin    false            �            1259    37271    Address    TABLE     �  CREATE TABLE public."Address" (
    id text NOT NULL,
    title text DEFAULT ''::text NOT NULL,
    civility text DEFAULT 'unknown'::text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    address1 text NOT NULL,
    address2 text DEFAULT ''::text NOT NULL,
    "zipCode" text NOT NULL,
    city text NOT NULL,
    country text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    "prefixPhone" text NOT NULL,
    "userId" text
);
    DROP TABLE public."Address";
       public         heap    admin    false            �            1259    37280    Article    TABLE     �   CREATE TABLE public."Article" (
    id text NOT NULL,
    sale double precision DEFAULT 0 NOT NULL,
    "skuId" text NOT NULL,
    "userId" text,
    "guestId" text,
    "orderId" text
);
    DROP TABLE public."Article";
       public         heap    admin    false            �            1259    37287    Credentials    TABLE     q   CREATE TABLE public."Credentials" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);
 !   DROP TABLE public."Credentials";
       public         heap    admin    false            �            1259    37293 
   CreditCard    TABLE     �   CREATE TABLE public."CreditCard" (
    id text NOT NULL,
    "CCNumber" text NOT NULL,
    "ExpirationDate" text NOT NULL,
    "CCV" integer NOT NULL,
    "cardOwner" text NOT NULL,
    "userId" text NOT NULL
);
     DROP TABLE public."CreditCard";
       public         heap    admin    false            �            1259    37299    Keywords    TABLE     �   CREATE TABLE public."Keywords" (
    id text NOT NULL,
    indexes text[],
    "productId" text,
    "selectionId" text,
    "postId" text,
    "postSectionId" text
);
    DROP TABLE public."Keywords";
       public         heap    admin    false            �            1259    37305    Order    TABLE       CREATE TABLE public."Order" (
    id text NOT NULL,
    "orderNumber" text NOT NULL,
    total numeric(65,30) NOT NULL,
    "trackingNumber" text DEFAULT ''::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "creditCardId" text NOT NULL,
    "userId" text NOT NULL,
    "billingAddressId" text,
    "shippingAddressId" text,
    status public."OrderStatus" DEFAULT 'waiting'::public."OrderStatus" NOT NULL
);
    DROP TABLE public."Order";
       public         heap    admin    false    653    653            �            1259    37314    Post    TABLE     �  CREATE TABLE public."Post" (
    id text NOT NULL,
    title text NOT NULL,
    description text DEFAULT ''::text,
    "imageUrl" text,
    "foregroundColor" text DEFAULT 'white'::text NOT NULL,
    "backgroundColor" text DEFAULT ''::text NOT NULL,
    "isActive" boolean DEFAULT false NOT NULL,
    "dateStart" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "dateEnd" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    countries public."Country"[]
);
    DROP TABLE public."Post";
       public         heap    admin    false    644            �            1259    37326    PostSection    TABLE     y  CREATE TABLE public."PostSection" (
    id text NOT NULL,
    title text DEFAULT ''::text,
    paragraph text DEFAULT ''::text NOT NULL,
    "imageUrl" text DEFAULT ''::text NOT NULL,
    "imageAspect" public."ImageAspect" DEFAULT 'landscape'::public."ImageAspect" NOT NULL,
    "localPath" text DEFAULT ''::text,
    "externalLink" text DEFAULT ''::text,
    "postId" text
);
 !   DROP TABLE public."PostSection";
       public         heap    admin    false    650    650            �            1259    37338    Product    TABLE     U  CREATE TABLE public."Product" (
    id text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    "imageUrl" text NOT NULL,
    "backgroundColor" text NOT NULL,
    price numeric(65,30) DEFAULT 0 NOT NULL,
    sale numeric(65,30) DEFAULT 0 NOT NULL,
    gender public."Gender" DEFAULT 'man'::public."Gender" NOT NULL,
    category public."Category" DEFAULT 't_shirt'::public."Category" NOT NULL,
    color public."Color" DEFAULT 'white'::public."Color" NOT NULL,
    season public."Season" DEFAULT 'winter'::public."Season" NOT NULL
);
    DROP TABLE public."Product";
       public         heap    admin    false    647    635    641    656    647    635    641    656            �            1259    37351 	   Selection    TABLE     a  CREATE TABLE public."Selection" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "selectionPath" text NOT NULL,
    "imageUrl" text NOT NULL,
    "foregroundColor" text DEFAULT 'white'::text NOT NULL,
    "backgroundColor" text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "dateStart" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "dateEnd" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "imageAspect" public."ImageAspect" DEFAULT 'portrait'::public."ImageAspect" NOT NULL,
    countries public."Country"[]
);
    DROP TABLE public."Selection";
       public         heap    admin    false    650    644    650            �            1259    37362    Sku    TABLE     �   CREATE TABLE public."Sku" (
    id text NOT NULL,
    ref text NOT NULL,
    quantity integer NOT NULL,
    "productId" text NOT NULL,
    size public."Size" NOT NULL
);
    DROP TABLE public."Sku";
       public         heap    admin    false    659            �            1259    37368    Store    TABLE     �   CREATE TABLE public."Store" (
    id text NOT NULL,
    status public."StoreStatus" DEFAULT 'open'::public."StoreStatus" NOT NULL,
    country public."Country" DEFAULT 'GB'::public."Country" NOT NULL
);
    DROP TABLE public."Store";
       public         heap    admin    false    662    644    644    662            �            1259    37376    Theme    TABLE       CREATE TABLE public."Theme" (
    id text NOT NULL,
    name text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "dateStart" timestamp(3) without time zone NOT NULL,
    "dateEnd" timestamp(3) without time zone NOT NULL,
    countries public."Country"[]
);
    DROP TABLE public."Theme";
       public         heap    admin    false    644            �            1259    37383    User    TABLE     �  CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    "storeCountry" text DEFAULT 'en-US'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "lastConnection" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    civility public."Civility" DEFAULT 'unknown'::public."Civility" NOT NULL
);
    DROP TABLE public."User";
       public         heap    admin    false    638    638            �            1259    37393    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    admin    false            I          0    37271    Address 
   TABLE DATA           �   COPY public."Address" (id, title, civility, "firstName", "lastName", address1, address2, "zipCode", city, country, email, phone, "prefixPhone", "userId") FROM stdin;
    public          admin    false    202            J          0    37280    Article 
   TABLE DATA           V   COPY public."Article" (id, sale, "skuId", "userId", "guestId", "orderId") FROM stdin;
    public          admin    false    203            K          0    37287    Credentials 
   TABLE DATA           <   COPY public."Credentials" (id, email, password) FROM stdin;
    public          admin    false    204            L          0    37293 
   CreditCard 
   TABLE DATA           f   COPY public."CreditCard" (id, "CCNumber", "ExpirationDate", "CCV", "cardOwner", "userId") FROM stdin;
    public          admin    false    205            M          0    37299    Keywords 
   TABLE DATA           h   COPY public."Keywords" (id, indexes, "productId", "selectionId", "postId", "postSectionId") FROM stdin;
    public          admin    false    206            N          0    37305    Order 
   TABLE DATA           �   COPY public."Order" (id, "orderNumber", total, "trackingNumber", "createdAt", "updatedAt", "creditCardId", "userId", "billingAddressId", "shippingAddressId", status) FROM stdin;
    public          admin    false    207            O          0    37314    Post 
   TABLE DATA           �   COPY public."Post" (id, title, description, "imageUrl", "foregroundColor", "backgroundColor", "isActive", "dateStart", "dateEnd", countries) FROM stdin;
    public          admin    false    208            P          0    37326    PostSection 
   TABLE DATA              COPY public."PostSection" (id, title, paragraph, "imageUrl", "imageAspect", "localPath", "externalLink", "postId") FROM stdin;
    public          admin    false    209            Q          0    37338    Product 
   TABLE DATA           �   COPY public."Product" (id, "isActive", name, description, "imageUrl", "backgroundColor", price, sale, gender, category, color, season) FROM stdin;
    public          admin    false    210            R          0    37351 	   Selection 
   TABLE DATA           �   COPY public."Selection" (id, title, description, "selectionPath", "imageUrl", "foregroundColor", "backgroundColor", "isActive", "dateStart", "dateEnd", "imageAspect", countries) FROM stdin;
    public          admin    false    211            S          0    37362    Sku 
   TABLE DATA           E   COPY public."Sku" (id, ref, quantity, "productId", size) FROM stdin;
    public          admin    false    212            T          0    37368    Store 
   TABLE DATA           6   COPY public."Store" (id, status, country) FROM stdin;
    public          admin    false    213            U          0    37376    Theme 
   TABLE DATA           Z   COPY public."Theme" (id, name, "isActive", "dateStart", "dateEnd", countries) FROM stdin;
    public          admin    false    214            V          0    37383    User 
   TABLE DATA           �   COPY public."User" (id, email, "firstName", "lastName", "storeCountry", "createdAt", "updatedAt", "lastConnection", civility) FROM stdin;
    public          admin    false    215            W          0    37393    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          admin    false    216            �           2606    37402    Address Address_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Address" DROP CONSTRAINT "Address_pkey";
       public            admin    false    202            �           2606    37404    Article Article_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Article"
    ADD CONSTRAINT "Article_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Article" DROP CONSTRAINT "Article_pkey";
       public            admin    false    203            �           2606    37406    Credentials Credentials_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Credentials"
    ADD CONSTRAINT "Credentials_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."Credentials" DROP CONSTRAINT "Credentials_pkey";
       public            admin    false    204            �           2606    37408    CreditCard CreditCard_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."CreditCard"
    ADD CONSTRAINT "CreditCard_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."CreditCard" DROP CONSTRAINT "CreditCard_pkey";
       public            admin    false    205            �           2606    37410    Keywords Keywords_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Keywords"
    ADD CONSTRAINT "Keywords_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Keywords" DROP CONSTRAINT "Keywords_pkey";
       public            admin    false    206            �           2606    37412    Order Order_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "Order_pkey";
       public            admin    false    207            �           2606    37414    PostSection PostSection_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."PostSection"
    ADD CONSTRAINT "PostSection_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."PostSection" DROP CONSTRAINT "PostSection_pkey";
       public            admin    false    209            �           2606    37416    Post Post_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Post" DROP CONSTRAINT "Post_pkey";
       public            admin    false    208            �           2606    37418    Product Product_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Product" DROP CONSTRAINT "Product_pkey";
       public            admin    false    210            �           2606    37420    Selection Selection_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Selection"
    ADD CONSTRAINT "Selection_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Selection" DROP CONSTRAINT "Selection_pkey";
       public            admin    false    211            �           2606    37422    Sku Sku_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public."Sku"
    ADD CONSTRAINT "Sku_pkey" PRIMARY KEY (id);
 :   ALTER TABLE ONLY public."Sku" DROP CONSTRAINT "Sku_pkey";
       public            admin    false    212            �           2606    37424    Store Store_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Store"
    ADD CONSTRAINT "Store_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Store" DROP CONSTRAINT "Store_pkey";
       public            admin    false    213            �           2606    37426    Theme Theme_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Theme"
    ADD CONSTRAINT "Theme_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Theme" DROP CONSTRAINT "Theme_pkey";
       public            admin    false    214            �           2606    37428    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            admin    false    215            �           2606    37430 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            admin    false    216            �           1259    37431    Credentials_email_key    INDEX     Y   CREATE UNIQUE INDEX "Credentials_email_key" ON public."Credentials" USING btree (email);
 +   DROP INDEX public."Credentials_email_key";
       public            admin    false    204            �           1259    37432    Credentials_id_key    INDEX     S   CREATE UNIQUE INDEX "Credentials_id_key" ON public."Credentials" USING btree (id);
 (   DROP INDEX public."Credentials_id_key";
       public            admin    false    204            �           1259    37433    Keywords_postId_key    INDEX     W   CREATE UNIQUE INDEX "Keywords_postId_key" ON public."Keywords" USING btree ("postId");
 )   DROP INDEX public."Keywords_postId_key";
       public            admin    false    206            �           1259    37434    Keywords_postSectionId_key    INDEX     e   CREATE UNIQUE INDEX "Keywords_postSectionId_key" ON public."Keywords" USING btree ("postSectionId");
 0   DROP INDEX public."Keywords_postSectionId_key";
       public            admin    false    206            �           1259    37435    Keywords_productId_key    INDEX     ]   CREATE UNIQUE INDEX "Keywords_productId_key" ON public."Keywords" USING btree ("productId");
 ,   DROP INDEX public."Keywords_productId_key";
       public            admin    false    206            �           1259    37436    Keywords_selectionId_key    INDEX     a   CREATE UNIQUE INDEX "Keywords_selectionId_key" ON public."Keywords" USING btree ("selectionId");
 .   DROP INDEX public."Keywords_selectionId_key";
       public            admin    false    206            �           1259    37437    Store_country_key    INDEX     Q   CREATE UNIQUE INDEX "Store_country_key" ON public."Store" USING btree (country);
 '   DROP INDEX public."Store_country_key";
       public            admin    false    213            �           1259    37438    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public            admin    false    215            �           2606    37439    Address Address_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public."Address" DROP CONSTRAINT "Address_userId_fkey";
       public          admin    false    3001    202    215            �           2606    37444    Article Article_orderId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Article"
    ADD CONSTRAINT "Article_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 J   ALTER TABLE ONLY public."Article" DROP CONSTRAINT "Article_orderId_fkey";
       public          admin    false    207    203    2983            �           2606    37449    Article Article_skuId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Article"
    ADD CONSTRAINT "Article_skuId_fkey" FOREIGN KEY ("skuId") REFERENCES public."Sku"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 H   ALTER TABLE ONLY public."Article" DROP CONSTRAINT "Article_skuId_fkey";
       public          admin    false    212    203    2993            �           2606    37454    Article Article_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Article"
    ADD CONSTRAINT "Article_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public."Article" DROP CONSTRAINT "Article_userId_fkey";
       public          admin    false    203    215    3001            �           2606    37459 !   CreditCard CreditCard_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."CreditCard"
    ADD CONSTRAINT "CreditCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 O   ALTER TABLE ONLY public."CreditCard" DROP CONSTRAINT "CreditCard_userId_fkey";
       public          admin    false    205    3001    215            �           2606    37464    Keywords Keywords_postId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Keywords"
    ADD CONSTRAINT "Keywords_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 K   ALTER TABLE ONLY public."Keywords" DROP CONSTRAINT "Keywords_postId_fkey";
       public          admin    false    2985    206    208            �           2606    37469 $   Keywords Keywords_postSectionId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Keywords"
    ADD CONSTRAINT "Keywords_postSectionId_fkey" FOREIGN KEY ("postSectionId") REFERENCES public."PostSection"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 R   ALTER TABLE ONLY public."Keywords" DROP CONSTRAINT "Keywords_postSectionId_fkey";
       public          admin    false    2987    209    206            �           2606    37474     Keywords Keywords_productId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Keywords"
    ADD CONSTRAINT "Keywords_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 N   ALTER TABLE ONLY public."Keywords" DROP CONSTRAINT "Keywords_productId_fkey";
       public          admin    false    2989    210    206            �           2606    37479 "   Keywords Keywords_selectionId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Keywords"
    ADD CONSTRAINT "Keywords_selectionId_fkey" FOREIGN KEY ("selectionId") REFERENCES public."Selection"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 P   ALTER TABLE ONLY public."Keywords" DROP CONSTRAINT "Keywords_selectionId_fkey";
       public          admin    false    206    2991    211            �           2606    37484 !   Order Order_billingAddressId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_billingAddressId_fkey" FOREIGN KEY ("billingAddressId") REFERENCES public."Address"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 O   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "Order_billingAddressId_fkey";
       public          admin    false    202    2967    207            �           2606    37489    Order Order_creditCardId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_creditCardId_fkey" FOREIGN KEY ("creditCardId") REFERENCES public."CreditCard"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "Order_creditCardId_fkey";
       public          admin    false    2975    205    207            �           2606    37494 "   Order Order_shippingAddressId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES public."Address"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 P   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "Order_shippingAddressId_fkey";
       public          admin    false    207    202    2967            �           2606    37499    Order Order_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 E   ALTER TABLE ONLY public."Order" DROP CONSTRAINT "Order_userId_fkey";
       public          admin    false    3001    215    207            �           2606    37504 #   PostSection PostSection_postId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."PostSection"
    ADD CONSTRAINT "PostSection_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 Q   ALTER TABLE ONLY public."PostSection" DROP CONSTRAINT "PostSection_postId_fkey";
       public          admin    false    209    208    2985            �           2606    37509    Sku Sku_productId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Sku"
    ADD CONSTRAINT "Sku_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 D   ALTER TABLE ONLY public."Sku" DROP CONSTRAINT "Sku_productId_fkey";
       public          admin    false    210    2989    212            I      x������ � �      J      x������ � �      K      x������ � �      L      x������ � �      M      x�}��rّ���o11s��}���7���,��A����>_
dQb;bS&ē�˿�>��ͷ�'�Yrn�1��c�i��ߎ��q9�����çq��?���zx���x�T�򯇿�����msQf���闬���&��T�������Zvjf]=]^��f���[_��>��Ï���b����2���/��Y�(������t9�qx.�q0jFi�O�a�K_\�jI��-��1gk~C�Zf��М[\UcI���+UJ�^uW~<<7_9��D��u|:_��Bqa蘚^����Ԯ�ҝV��0�1[(6�:[rK��K�.E5>B�����h��������@$�_��o�Kޟ�j�S�%;�8�:��Ң��6���5	��g*�"��ɗ:�_JuJe���G�}><�����u<_痫t����_�����x~��u\���������|>��/�k~?��cn�i��V��lY�)���z)s�%(oc�P�������-Ϩ�����<=�S�z�ϗ��[��eZpx��K��p3�4Ǫ���	:D/��X;����JgC��9������tEB��U	��g?`�VU�K��7�]�ż����ZIa�"ꜘ����Z�g�n]��&���iۏ~"F�5��#萇Zj.�q�)k�ͶQ�k�L�	��('Y�39b(&>����ӧq�(��O~��V�	�RY��"��̒5ڨ��NZ��0�ك��t��Q���ܭs̙���r:���Z�DFL��u�T�~�O�zk�ߓ��z05�i�`��� c�)G��3������_�A
|V 3�+M�Q�I�w�k���i��=S,H�H z��_+�j����^\�� ȜK�pCp:�Iz�����{B ���Q:f:�����z[|��#�3�y��GQ����H��7�c�)th�2�bBS1�C�Z�R�!�C�xx -�e��A�X jq*���!|��+�v:^����������x\��3`5����yG�r:>�÷��+_�_�����G$(ն^�p�Xr38�Jaނ\�T���h�IϨ
	:��Ի�4�����(�{:_�����[;��߉b:H(k'������=x�ӷKK �k�C�3/%h;{r�[<��hJ�pfiD���<�Ҳ�=�n��?f!e��߇<8ga�o�>��i��S�8��O�χ��ܽ��*_ʰ��:s벑Y��m����
Jޅ��5����1�3���V`��.#t��I����܏���^c\O_����R-,��2 �P/1�@3*�`�x�!�4��2�d�����[���L������\�gj���gھ���'��gz��p�BQ��(7�w�ᠥ!o��C,M_S*�u	��D�AH$�ޡݽE9X��������k�g�G�ԗ롏����Ӹ��/o�e�m�EL%�����!��Y�'��@FO)'�0��,PS!���ݴ=2E�r�'_���ѝ��ǯ����;�H~^�j�S0vt8f�Ib���^-D$R4��oy2���A=�~�T�W�"RV	,�g�v��طo_RE��E@b��Et�p��X��p$�,���R�9��ѼNa�o��U
���
aS�a6|�U=���[{݄̆]W�갉�oG�x��G�x2�E�；�b-}V0�BF��Q�Z�@5��P� `w0�d+��-S��R=}Sr�G*���Ҿl9�J֞�?^�t��k�)0K��!G��S�~�hbۋ�L�۹<7�RE+��c�E$x��pv��z����'z~=����R��mȫ�8�yI&�{��*4q�f�Ce���YQ"n�uJ9�?��4����ߚ{�I���W�so�r=�V�=XU�0�����ӗ_�p�ثF���xqh�֌vEּy��ǭ[��xs�r�����{ZhHMZ4�L� m�E������;&s��j���aY\3hfɩ���h�q-��?�a���0�=_�����!�"���]т�8(a(m8;���έ:L�"�3ݤ�ݎlPpaOL� �?]�.Q�L�ގ<������^}9���)'O\�D���uk����� �3K��ň��jz�����-'�l�6�e���>���"�׃�%�$$1�5Ȱ`↭���sa�� ��~�H3�TU<Bp4��	F�q9�N?��
�[�q�=]�#��	��[xlE�J�j�jo��[�ɢu�x5���1+5�}l%'[��@,��^�w�x�6t-��4r
��"��E\�� [��l�(��aB2�F)1n�=�y�ǣ���!����~�Z��2bb�V�a	�&���p�:*?�`Nޢ|�E�`�@�	�"�!φ��Վ�j�oN�2>��P��ݎ�XbYW�'Ȇ��C�(���������8UOYLT�E��+4���N�o3���/�w{�mBb���B{��E5���RvI�f>�n�:�d�3�4#Z��?�ـ�.�:P����l▆��ܟM`�-5,i]� ��f��9ǬQ�;�d��0����,��:>�P]��g�t��`��8���L�&��`޷u�ɴ��2�n*�W$����ܵa�� u����YC���h��Ao0�����1�&y�l`/p�x����TL�+�ڒ�y�m��yB��7��\'�U�ҌƊ����X	�^��z:>~��öL�I�}�>��xH$ߥ*3&2fG!cZ�����Z2�{g(s�׍�C �����p�b/e���@�}�G�m�Iʨ*���>mN3$�;����-H� �H�Mc%��<qy�HNT�3�؞��5��=�b�y����!N����t����]*�
�uF��Y��'��"�/����?^m��Y�r�n�7�W�$$ʢ4T�&�sNXu�I������6���h��*��%a#F7z�7�{k�'��$�O���=�X��q�-�\b��&�)5�S��T݁_a�(*+Z4����Y=�G������A7�zyzW��9�h����h�H+�u�I4'��㰮�j:��a4ę�]J'�=5<Ɲ��E���x��W?�x�
�kx6f�Ǌ����������V�N9�i��A�,}6eu(�1~��f�n�psUo�p?{�g����u93�	g�"�(���������)bv=X�{	|GL�5�]G�����+X���eQ�mX�Q����4(��2���}JZO[�*%�(:r*��ZF�w?y{��L����X�Ӿ٤��u��q<����O�O;B%ͧ����색R��ߝ-���[�>�+7��\-���As13(�,̲C���/̪����5W<xV3�Aΰ6������+���æ�?�����-7k:ߊ�w}�*_vk�Y�Idn�Z"� ��b��JM;g��A���E���a�u�'�=Z�>����w�|G2�(j-s�)���Wv���?�����A��+��R�5�����b�Q�AE�(`�� �h���⠫b��JЮ�]
�xȺ*�Ga���f+�}��+8���0�+�]n^���\����+Wf���Eѡ7d	y��Z����V
���bn~�曉x�vy���u����+H�Tp�޵�N:���C֢��`1��j�Y����h5&���xl���м������a�0v�2���a绰N@�{�_�d�a�y�W�#�r'4S�R��'�uJ7���M�N�����idV�lfN֨a���C0)��+�����Z��0�Y��DV��|��552q��s[i�	��Xi�Zi��w=��j�ji%3lUZt�M]P����o����rM���BK
���d5����I�w@�c�h���ȧ���eK�Td&��}����d۱XeM�qG	�h�r�bH9�5�Q�9ǱhD�\�J�EF�5@�����L������Gh�9�S�6�H5�x`�豸�'=��F���,�c�բZb������0X�o���)��`G_LlBTِ��(w�k�;ݬe��Z�U������wBXӨ�����@�>�D�ݩh��,;��y��_g��G��_�ddv U����e��y �  �%�{s1_�o�U���nt�6@ ���h��������]9�^ʅ�2��A�)S�L��T���n������;'93�2���x]��e��R�׼�ń�n�dY|�ŀE�dp:���iM����2��ޝ�����Ɖ��h�l��l	:0a����&��$�^�����<���<̽���_W�w��#�7ѧ"�f��<AÅ���u0��jW�,����]���iZ�̧��lc�����ޢ�WB���t�j{g�u��s�-��%{��ƞ��N^�܁�\�{�s�-U��7,ںܒAet����>'�ϗ���gR�8@��!�-���I-�͌}�9�>]��!���OO삖�zg�NC���z�p˛d�9��;�;�.G���]��i��~��f,��	<ʛ�Fs�`fMN�C��1䕕�]D�r)���s}�BC�V ��T0��ۥQz����^������K" 17���۾�b���M:m�n9���1��u��n�Bu?P QQ�][j��V�^V�-��$0�  �̔�U�5�֒��{W�ۢؔq ��!7M�� �QcvoX*�1�N4�b�:n7WX\Q���������_w�����^z}4�:EYD�Pd_��@�_<ҹ�������M��\�0����ؐ��6d��>>nW}�*��~��K>(��4���A|�4����㎌4�l;A�FE��u��6��H?��jb�>����k��g������Q^*@i�a`_�MG�EjY�(ѧZ� ���hP'�8	 ���E�}����P�r��<~�4AvT 'O"b����n-f��n������}��elh{_�����H,�*��y�)�b�8���02>���`"�}b<}�4�E�@�3ŷ��?_ m��*οޏ�P�tt�TZ��Ѡ�R�(Pk��>NـvT�v�佇�EZ#����5��wIݥ�ۗq�����eNhF��);�A�m�BP�7_<J�re+�x�Y�����p�y��v�p_읎_�=���"4E��]�����J�5����E=b��.�U�[b��ڒ1Ë���߫������ە�ۊ�]�<:���8'B���Pj���J7� C|f�)in�G�᭾�:�OIF���������n�z����N�o�n�\�����L�k�<5�&�u�K�<v�dQ0��^bx��X9��e|�`���s: �*��Ѩ@Oi�I��s'������o����      N      x������ � �      O      x������ � �      P      x������ � �      Q      x��\�n#Ir}f?�e�;����hc��m��3�a�ȫ�EjIjd��;2+�DvwiǪR7Z ���(.�DDR�gym	���E2�J�RpQ� g���s�����6��r����v����̏�ў�a��9�͏��m�ݝN��������v�6;{x���_���ݺh��y������vo×_�T�)����n���y<�Ó?��A��P�|�����f��3�~�ό��o�ك������!��}:==�>���M, �|D�*��s9e��*) �����e~s�9�f_�tz�o7��6Ώ����i�2?���hqw�;@�;�v��o7�wCƌВ�Y��/��lA����w@�{�g̎実�6�8;>=<�ç ��,�C�ʑ!) ��S�,=����~7�c�os~�9�(!η�v�7�z�0O�µ�-<>lGx����PQ�[("d&�����
�|K3�}ꁲ��(yBQj�8�p��r�����@�g�n������&v޶����]�:O�C���a�Y��Ha��C͂k�hu��%8��T�)��Ywg-�$�d��T#n�G���pZ[���ٛ�ړ����n��=���m��� *�s��S��v�~G�.��c�8�-�"���<��\�+ae��E�B�s�<����	�av�˻��K���n��� ������CNiq7z,�u?nn�зS>X&U��
bR�邲�_��Z\��t)E��%d��2@����(誗����;��K�� ���=��yL)�����.VG�&
%�Q��bv�ڄY?��I�bHR�������QtJqH�ڱ������Z����	�_� ��������j��nߏ����v*�TኑY]]��4���??(�N*-]��b
!���t �VHt����5��q����<ƿ?mv��cc8(�-��\�f�%]��$��5�\���}��z���	q�4�TF$#�\�UT��Д�#�I�C��#�l��p2��.� y�����a�����H���0UL��tRy뀣+�"�h�<X`F'�_�0*������?t�1��iyhNF��C
,��'�b�_��Ti�Q����Ąr��I��5�����
���W�����'H�����^�Ի����pjLe
:p��b�\O�+u*�Ӽ�p�h8(^�"��=�ȅ
�)� `��k<7� 9-�>+���ֱ�b��h��T$6��)�-����P�5�*�4��6"H®�a/r�R X�G�I�|�tֿ�z��k2D*av[���Bl���B2���Q AYz3�h���z6��rr���5��������cP(��9OD���G_��T��=��5#�3�/�M�)Vf -�zEu���%��	)I�A��Rd%���6��a���~���>fF5?t/ �q��c�#0�f�+
�[H&�F���dI�	����O!/i�	�o�b�ݩe�r��rߤ�`����c�ᤶNV���fF�v�"D�� =�,�P͜p%ƥ�	Gų�t?c�˙����9xG�C0�+)�[@y�yh-�l�?8��4I"�s-��\�Ȁ<-D�N��i;wY�mv���o��������K�ǆ���Qo�@�V�Ȗb!�Ь���J_��g�Q�,�H�GF������9� �t����E�����("��1.�\s��!]�I3ͦ�4��;PY�I(X���ă �Z��X�Ѵ(N����-Ԣ����o�ڈ�K$�hcԛHN+&�ZaE����ۿ����p(yJ=X �
�E1�T��&�Y��.���ўN�?�����?5��Hc�@��n=���j�Z�������Ô��a�3a�Ҥi��E0�:�'4\�BD[�iג��p��q�,�v�'w�F�ِ�4�&�5��0P�6c/�2�I�:�� mα��u��:Lc"�d�uS�f�:y���k4M(H)�9 Q����V����z=㓵]���w׋�$� ���	*TI��Ut����rעt2j��P��	24j�L7���Z��L}@/��$��� \�@j�5 Ǡxs�]���M�ߗ�W��[�قށ�Tvs�/?��G@#�����`ZC���.gzbh�bJ`���	��rP\J	Ėe��bؔ>�o/5��<�~)�2��ʼ��~`'�42&��1�Խ��\�e"����� �L�y#�OV���w]0H��ۨ/z~,���~�˽�8z5.�1pt$�K��� ���MA�L:7�A�wYVV�{.�_eO�[sgDZ��e�[�W׫���e4y��KIF!�R��Un�`y���i ud��T85��q�<w���a0QJ�ʴ\,�BM�<Om�ʵJ�:$�h���i�WP@ON3�n��Foʜ�ǌ�3�|��ل0�����o��GAPz�T*��"� ;6S�!����Jy��tM�s6\:[qD��9�Pc�`���=��z���S��W�Bj��v��-!!kbbT{Br��~��c���Bq14{���ESij�F/��rZϩ݈*.�R�9��N3R��%,(r�d/���<+$Ͻ
�1*��!JC�,ͫ�Tr-���r��Ae��E�;����G��(\��6~����.��<�C?��)�M���
J*�[����P.�D��8ܮlc���F��k ��m�:��l��E�1����ѣ"��m�b	ʹj�"~� � ~!�s.�kd��8 �s&����������f?�ڿήF a �F}�	%m� ��2�Gj�Py̢��	��r��0I`n�1e�ⵇׅ��s_�ӱS
#�I��pj\X`l����^��$��}8�;Q?)��X됶�@���h-�	EP��h��|��2��f���oAVP# �t����Ĉ~�B��t\/�_ׂ�}��̃��	��Hs�P�@%��F������Ӄs��T�U�0�ETe+M`�%��ry|x*�D�>p� |&��,nL-b���f����C-O�6�=�����%XH�:�����tR
|�夜�R�#r99�Ǒ�aoݙ�+<l��v��nS ooO-�B�֏Xa�`���.��U��4sOh�\S��$��+}���"����a�hj`(W�Z��������i�����rE=�I4�x��@Oɘ �1.��|�
ם���}ᜑ;����/UF�cm�q�l�vp['� ���@=E{�	R�v�!|ޚd�(��1���QЩx�ٹ�mG�,9��ݺ7���9^�P����/��N�"Y@+|���Kሴ$����������R�y���2`(��q9����:X�~�kͯ�׫�H���%a�wq�1�Hx�L�Bј���_�5$>��iR�iT� �ŵ�P���N��{82�� ,��y���H��_�x���_�*��Q�GBV|����7�&����M�d��ĠHb5�^y�����7_.ٖ1Lu��r�b(������*�'K�{&��\��_AT���'*����o���\�th��#�rh��8X@�T44hs�����=��R�D[H��[�[7���l\�R_6���:�)�2�[H#`Qd��7��uZ�����}s������Y0��DFX�@�S�cT2�[@֐R���8$	��L�J�:�T���Q��G��T�`��_�f��h��N�8�G�����%#�R^Q�ߜ���5dڻ��~��`w�q��WF5-���P���?�"��r�M���ww�O��΀hH�D��ls)�8�\"#��;/ZD�t���:��^�e��~�, �ߖ��SR��zq�ˏs��3���b�$��@��2R�A�צ�6F��q*���o�����#�1|��a���<fq�L���=60pe����,�!aD��ДE�󥤯m�q�S(��@����`�5�V�A���Vi`�H�)
1���!C��a>V�w��65+?C��'DǀaBH�`Lx�|^ֳ&X����*��(��)�s�y�S�"��^���P�y?�)g�?�յ�4�[���� �  �D�z	Ҳ�^|���S5B�P��ڂ�^�Lz�:�zdU�K������v/���/�����R�)j�h�A�5���TK�d�)ԁl��@������|"�G����J�m�-㺲ntv�|T�Z��zfDmda���d��\�ԏ�L�}�G|�Tb8ď��EYA��zIq��ގK�;Wԩ{��ʎ@ǰ�>�zFE[Y���'�d�Є
�p� d��)ce��RFC���8Z4��� p��NL�+`o�F�T��W�*���%�6'�9�-(jc���b4������m>7���|�j(�x��ERg�]%�uk�,�EH�@q�@V$���('��!��h��xN5�.O���}|waҜɷg"D�zE9�Lj��0)��@q-2J+ģ���FA���g�R!z����1�z
�.�n7�q<j����+\���wMVb9�'��&"��G�D�8�}^A'yK%��P�g��w=j݅o>�b�Q)� �[R�XP�r�r�9YO���t��wJHm�F���f�p���d�<p(��
�>z�t&^W�Fu�4�xh9���k��r�>�T[f���a�(␣Aa�h��I����>E���ں�7�����z;�p�
'\�|�I_�.��?���� ��]      R   C  x����n�F���`a�+k� FYT�,� i�M�b8�)�QHʮZ��;R\Y�EĂ� q~R��3�B�|�:H6��E0k���@D$Q�6�u�~N��^/�j�>���m�.�u�h�&�u}���}X�vw�)߂�}��^M&m�n]���^�vw��j�m���}��+����I�O�T�qA�lRSnҤMp}��ݤ_m��m�з�6t]�Ȕ��rʨD=��R ��Ưg����׺�[��������?W<*��%`q��+�FA X�*_Q!%G���;t��ۯ\�-��d[�Q��1��e�t=��ct��Z�w>���Օ�t�U���2C׃��h���Vp�pA�)�=����ˡ�"1?5@~�n��Xm1F�~�a�������!pG�����$3u9���u�s��h;�@G@�J1ET����i��Y�O��ؒ�!lG���b��jn����lt�wP::�)T�	�G��sZ8��1d��ܛmӌ�6d0�	���"�������K1I=p��n	e9�/���D������n�r95x�����EXj����g���*GZS+[����
˜�^� �
����_A-9���,"�EI����rjM#gR�,���	���J����HC�k�Bץ�g����n��	NE_gxi�����0����{wp �`Jn���4X�,�ٶߡ7�/vi�U��"m�X�ϖt�vi}�mW����G�=��ww��7.��fs�8<�R����m�,G��iҙb��]�uɾ��7v�;g7'}_�t.���\�WPy��s�=�2JJ�Y�m:�
z|��Ϡ�~�}a�&=��v��%��p�|�K{�F���tZ
1�]ys�2���p`ϓ��Oa.	����6�|���]3��م�q_t۠9�)G��������8rA�o�B���GZx�;�e�c�s��)�T�����e�t�	w����![(5��/��zN����\(���Y�??־_>��<��_�0=�)D�����_�8�����:��O]q�Vى���_y���7��[.�$���G����N���i2Ɛ�n�����UK      S      x���K�%�Τ96ۋ����KO���\Z�.�?�g�Y%��t�c��  �>Gu;~�7�����w��H��]F�;>{�4���1>1���(����W�_K���W�3=��}�����f����Oe���U�9��ۓmX>������rk�������r�J�����F�)�����e���\��v��o?SKq���yӆ�-���z����5�C��k��/�h�և���f���]�)�gc{\L�����߿��9��`y��,���c�R��/c�3G����.��g�{{X}D���`sg=�C[�^~�S~�^&�g}�{��7��[���/�X�:y���Z��>M~l5�n��Z�n��?�/cJ������fLiɛł��-G�1į�Ux��b73�V�O��5e?9`�=���g��;`_e��f,;����V��sn����~���k�|P�-;�՘y�K����FXƇ��+5�b��Ɯ�~f��Ǒl���7�z��p�/��ܽ�Y��eS�﯅���[�f���zL>�$����m�����}kӕlY�b��+�,Jr~�]�W�|3_��|�cji�ҽ�zd����}vu�zd��ž�:Y��|Z�i��T�x�OO��>�׌c9:�^�Ťz�~�h�,8��˅�����g�0�Ŷ�Y*�6��������;�i{��ä�_�y~s���d��2>��X{PF��rLmc���xK��v�G�ֵa?� �0}ų�~���6��+�`r��[��qm��s��}�j�xv�S�O.��!�	��s�?ˣ���ف���.�J�����.aI�����cx0r�Gd/k���m�Y����� �@K��-�%aw�lY<��-���Δ6 ?�ba|�G�����c
8|�m6�%e���*�����R)j�c����r�����y�Y���eV̴���<�&pҴ�窗`K�D�����F����B���ݛ����p��Qa���<��bv�� r�aM�8������-_�zg��.� �l���]gJ^-?y���J|��8�b1��7����{����mP�G�l��ô�I��Xq���e� py��[g�@�[.��#Vm	v�7�s���q��n�����T ௲}�-�-���̭�)\*���] �>{�|����-~c' ��=����_ ���ǡ�gc=��-���$��o�������#+�bb��N�	Cx1[��՝��0�L,�Ӭ�+�3�ג�g��C����ˇ|�Z�{~~���Y�&g�D�, XzR
)x@�~�0f�m>Y��(�k����&����Mb��7��`6o��2�]vF�x\ì��`��Kח2�?t����c��Wqs.\�$vĎ��S �z����0���7a�œ���5@�,ߘ��/K��<	�%�;R(���U|w�|{c�3}�򗰫y�˼x�$.����c�ކ��ߍ���H���C��w2���N�0_��}z�AP�>1n��� E_�Ćc�v���|��'�u�i���� d8�@d��̛�����9L��B-��F��W���ad?F]��=}5XM0M�h�,b/�V����o��(T ~a_c�K�U܋76�׶K��E�Ј���Z�{ޡ?�-�9���Sw6 >���B?J���$�Ka�H��yq������b���uXarZ�_�Q�6�3�p3��� ]O���n�j��]�w�nY�챕�+t;1���t���!��S��ay��w,Iom	[f�4���.؆��U�D�.A<��A>�M���0Sa��5��X�����F�@�`q/4 ��W��h ���ݐ�0 k���ݴ��ń
�g�d��MA`G��h����䯻�1'8B��SvD/�c��+ �k���=����OBǗG�֡/�.V��1�Nv�p �G�F�i'�Bry4y�vC�zJ�����EË'��Dp�����aw�k��6+_uW-G�|����|U	���J�EV=uD��*�E��h3�����͊BO�])C�p=`Ù��Ƈ�d������ݦ��Ӏ����l�08ڂMCT�b��=l��6�L�æ�]�&�BQq^0�iv�6n�� �$�P�L�`#�*!�=�*%e��8�a3{�aX^K��Ξa�H�� ����\NP�&�����x�"����^5�A6�����|2_��3M9y#�C�j�C�7o`�±����9���C��3r5�㊄?��A�B@�uZ��CA������(Xↁ��''bj��QZ`Y���K��Pַ�����N��#����y�x�w�W�'���l'<�c��b ����,i��O.kC���#8;7�J��&�G��x�q�}��^�_�0P �<`�����p&�@	�s�gJ�K>�4��o�"+L,��E��as`�@�H@��b���/��W�ke��لX�<�0n�L(���g���1�)ٝcg���Z\Z^Z�l���˻Z�ӈ
�nxq���n��̎���
���Bp�&/?p
|(��!�,�;�xV��B�0]H�nD|���0�:`�$��'��Ju�cIMR6�a(�JB8Y���ܽ�A	!��䡍�5YJ��P�l���
U�� ډ�Ⲽ.�T{)7���X���M`M���]��$����I
�k�Ǳ
�k��m��0Ow6VQ�_d�V75"2���A��9NK�6A���X��¡A&�����v]�O�JL����Kx7�^�SH�g*� o�qJ��T�싕_[`�����qut�5p��I� !�iW��o�]������	!�(���f����bvT��E�"F����f��-�ĭ�#Ӳ��5��,
�����oՄ ��.�2I����pqvX��&x���) J({x�y����3_��� ,MІ��#8�O�L�ݴR`���*�Du�HS��qf���U?�h8����%�j��`=�
�ȯX�36Ɖ`��W�(S��M#v��V<7P���H�x4KsN$?.�7H�V�!\e�
j#)o�.�AB�H!���f�.�W���81�M�\#C�m2ۃ����A���Lx��˚\���X����&������ q���V��� ���l,�|��._ �`0��c��w~��hy'�� r����-�@��r2��]����!�& ���%w�Z�� ~xw�i��My\��Z.����pu�Pny��C����D� B�ʡ���m����[}���VW�Rqp!�]0��\��H�F	۠�ظ2�Κ�|�G���J��"�z������Αob\G�n��t��ߗ%3 2"Ss�>��7f �O��쾔��K�AF͸X!�)q{�i��4a�����L��-�]�Li|cbO|��xP��$B"��+�QK�/�>M��]��xB�*�P�Qҋ�ڼ����!w�1[��:���etBl-ɇ���b��L?�N�	�I�z4;�=��|��A��m֢L1�
 �z�<��C�|?�4X{��:�Ql�n�x%����p6����Y e=t5�'#������,bJ�le�<X����1Y^(�fA�E�CW��CH�"�����ۀ�8$��4��ģg�`�kA�����H*���M��� ���|U�mq}�� ^,�Yo�Pƥ���?$M����=fT�hp4fo{�=P�� �X0�a��]JK2}�Q�n�=-x�⭕�P��2�Q���>	l���Jj�����`_%4�t�?~�K���� �G"��h����ėKM�S���K��xg�v��~2� a(�2��Ó[삂1�v��|��~�E����}�ǜ��%\�t
� �)[�	�,��b�8����l�&8>� �|�� �Q�U�BĘ�?�0���_r�:K�O�/!�w�����w�G��|���l��k�-6�ƃ�S
x����H�<V�#�Ƹ�G��� ��0�
��p��j��]Q��\u|�
tl��b�eM���,wC׆�k����P�a    &�h�"(�*Z��w'���@��0롨W��o�	3:w��x��d����3�s��b�]N^�A-�N��xq{�>#�"C�τ/��;r aO䁫��WVrU��Z��tt(���p +�?��Cg^��N�ɔ*D�Z";�0}����c�C4x�D���J',%��AY�c͕�4]e�QRʚ���ziNge��U�WVx������A�Y��E2���.�ʜH���vn�o�[�R|?/�p@,.�F��`i=�Ȣ}Y�K�Q]�����n��2�Jiu����&^��ƪacaE�NL�*çNm=� �(~�2�c��X,tc��8Տb��U���e� �~舧��w��a�&!o�<��5����f�t�]��=�9IV������K8�c�����ݵ^!J�0i`WW��~ .�B��hB��#ŵ&���|6[��D�|���u:�Y�R|?�wɱ� J��*�c�w��f��ڈ�=/�p���yB�U�����	��MŘs��cKh��P@��?E5�CJ���Jn�L��ȳѠ��u|�;٤���p3XU��ʜ� [x���}!=��&A���
�	�ƚ��N�Hpzl�@���BB/�������:o�-c���s��j����pW`�۔2~�P�
o���U������׭�s��s��]�`�QD)�%et���*�@�Hs|0+χ��u� P�=�Md�L��N^�
�2}\�U<�����3�DPÞ,A+���y�%�����֦����?=r�u2/->=x(+ap��rg(P�-`\����;��>�Y��@����{�Ȋ���pR�($ܥCz�G�*ߑ�J��Q#|4l���V+s��6w�l-�x8f��_h����YX���VXEx@O�)rt���'�X�
*VUf�UY�X���ꔞ�W��X�����I?�A�8��C
�����d&�	�)��10�P�u�0���XM���Ѥ�
�_:gX�Z���HZaO�����0:V$�&sĕ�O�O�Y�=��}W2�(�m���D��u&1墂���V�5=�E�)�+��m�3/��s��-:�!>�b�7�I�{)Gl���]�����|�Wͱ�R3^��� +ݦ��t�>�	�yI^{U���$y��wj��s �V	�^H�:W���"_'�ɇM���(�:�r��J�*q�5h�[,;u�<��J���X�$��T���8�<a�hħ�hʖ��0����wgDx6Ѕ��x1�����v�Γ�.���
?x=KoaH&�|R�?K�!X&�؀��:�'w�;��)�."?��IN6%B,���;3k�p���Ng�7�|J DPˏ�J��{��F�%}?X��/���L��\%���1j=;�[|��W�ܭx�/l��5�U:�\��)�%3��"�L� �D�)B�=��׀���(`m�K󩲑��,���e}=�P,)'ތ����1	�5]���#Bᷪ�$�%��"j̲Wm�*	:Pд��`��w�kZm�1���E~FV�+����#?�Zħ.$Z�*�*`S�]$be6���!/�}(8U��xU��lU��\ߑz6ߥ<���@��o�`�E�T.���@��r���:��X�U��A�& �:t;A�Z{{��y3:y����"6�$ǼoŸ?7�J��S�)l(^$���"��y� �'D�4S�wy��wl����!�j��ҷA��q�zcm0�G��f�8���*P�[^��m�2�{1^��
"�b��4�+������Hx!�8�qc"_]���v0�*0�,,BMI����f�j5��2Շ�C]|�sAy�����ݺ�	e�T�h#����y3����T�0~���}J�YÌ*|��NE�W�`Zm�O �n��Q�J��r���r��>rSdo���n	SSD"y%NDB++W����`[��G�̰�z`�w٭�7�&���	U�b�!	+��y�$��>�e1�,�3�	ODg��ȦC07<�b�b�c�q��������ǒZ�ߞ�E@^ 鬸A�6������g�s�^���h�e+��+��#F�+�<� x�jf +�3I��en��X�D��P�U��/�`2������C��v�e���@"��LF���⻉����Aǚ����B�qU�v�9	EGd�tr�K n
�H���bÝ{ԣ��*T#�&�K�E�9П�0B�>�2��*���-��/��!*p��Pmp�g ExhV����B	�y����@X`8*N��B�ۊb���,�Ŀ���Y(���	^b���W	sƮj�R�u��� a��J��6�mשs�2������!�N{a����5�Cϒ�e���b�oU��]�/.�� I�N�N X���B������֙�"Lyg�@C1U��f��J�Rv"���~d����2\�/��A6���uܳ�WX~��ށ���q~\%�N[��5Dv�ɞC;D,��7�!�x8��H�9D�{��	|�#��F�89�e�k�XQ� 1��d�*�%g\{/U��|��GQ�8q�ն�x��XN�`ut�el��Xj҉�A�q[�:�K�⼪�=���]!}�\��[�j��&��(ǳ'�F�!к�g���aL�N̻�E�@40�	BN:I��pV�]c�j�]U��b^�*��E��(�]KG�-�,b١��j�ID��
�?��(�4�0��HQ2�c��Y&��i�vı����m[H�AE�[�ӜD����Z�<j�0��
ݓE5-��"�ޘ	���͕�1����
{�Ƴ��V��F`?d��ʸ��=a�����W����,yڰ`�N�nF%>��j3�b������x����@�5�?���3���L�9��
���P��u)��|B%yI���|�ZS��Kݘ�2 P��:��u2ʽ�ٌ*/�k�v�0�����qe����=K�\���W5��[l�s�ӊ�� ��q��(��������q���]�����`�h�1V,������	k����|�Շ�;�J�Ȩ'�J2nU�.Q��Nvȉ͗�fD	
lu5b��AuPP�Y��&���!N[�՘�e_���)�^%<��)��.XR�ᩆ`�VwG�M�����4�	�r���7���l���| _���ߋQg���*iўE���GG%B�V�rJ����]b����N��d&�����*uؗ����_�z*ߺ�c=J����T��*�Z.��8�7'���^f���Xe���	�iC��G�S��&%�2r��'�ޖoI���*�U*'�/B�n�x�m.�K}���M���Je%�1J�:K�30�ģ!��y|�q`oPL��U[�w���(2�<���b�4��Ky Ʉ��`�.�E"�d�4�%��$���&��)��7l�бd�K��cH���!9N"h��aϖՎ��R5:	��"�+��E�ht0[D�M/�i�&��=H묚M%b.�Ԧi�֎��@H�Y@��s6<�9��T��e����ϛ�ކ*�t�r���j,4�H�¼����&��/�:�KJh	��0�Wď�2tP��S��Oi��Zs�:���uX���"皎P���7N�}����1&�������k}���ב���9�JT�	��a\��@|����|�ݪM�"Ja�^T����)��,D������Ƣt��Q
�oD�+r�H��ERؠ�.�ĶG��yC�1ﻒ%�1x��r%��s�
��=��I�Jg����W
yQA}��������%U*=`|5B��f�	���XM̀I+��:������e��4���ͳ�>zy*~�*��e͒��a��j%��%:cu��C�1k�ʬ�&I�srŻ���6IR*C�!�.2_�QAC�
�-Cz6�t[[���\
�@���~NR:�7�Y�����#*����L�;<{�Ubx�B=��X;4Ɵ�����ꀒo닰Сe���:~\A%n�|��`o���j����u}�^�\,��)����>�3��Ԇt'���wg���hx��:����P���d��	�!������:���[�&k    3�Ze�|	Cm�W��x����HI�I��۔����#-�K����&�����g�b��wy�����8��k�,��ɪ��{4D_x:��m��ȫʥ��݁]*��:6����hS~_0���m�u�ߤ����b��9ò�����2e_0�Z@�D�es��1f�J��AX��d��iE�2����Vt0{ٜh�2;/Ē�
%��C�Z5��Id;�ͷ%F�ƴbFR�@]L���AqED7��1�	Ad�p�z��Io��EL��&#����AN;���cDJ\	w����u�*TDn���n���W��'�\h�L�f��s:�E.�e5��G�����@=K�N����Ω�ä뜎yq�Ե�ʦ�h��0^9�N�;���:�S^�V�q:����T�G8�&�`ŵ�Q�pw��9M�kl5�ld�������B�0�1�Z
��}F��WqDt������;X`>�!��S�m�PB���[5�����0 ���W�^c!��R�fp�Ӝ�TuuY������qNT�.ߎ��؃��|V6T�nu�r��	���CWZ!�b4��N
�#�86�Um��X�3���I�D�):�:gE���`�J@������h�E]�������RU�,��	e������lʄ(���#pe������`"@X�����(��>n=���s�+�f��J����~�U�-LD	d�zʶ�ee�b��RE��R��zEp��^�*4O�Y#b�V8�7��t��;]����o�����w5��<L�>��ek���\�aq�ʲ�m|h�:�,>0���R5�܎ܒ�����>�0��� �Y��ܰq�xԺfO����=��+�j>3Et���?T�K��҄+>:da�a�ᲸH5�#T%�����p6h�l��p"8cㄽ��Ңߗ���0�t��bX���-���^әX���U~G�Ԏ��d�V#-�6fϘEF-qY��S`�`�E�xjS��9�<5�)#�zr����f<��P��?�.b	{\W!`B(���ˉ[��RS���I;�G�JL���]ݶc"G�V�A�+Y�}=�\�T֧z^�aw��4E`�G���u	�~�2�%_	h��h՝2$NR��nt'_R��w����������<���ڬ;�F��N�%|I�U%Y��lODz��aO�#�*�)����Sdq�O�B�C&����.k&`*1ʱ�bL�	4�5T�drH>�mCfE &D�Uv�߫J���n��aW�9������� !&r�A7�5'�.@�ЪՄO~���,���t��z�u�s�6;�m��������:��w���cSlY�I4�]����%4�?��,ת�$��i�:�vl����|�7æ���t>>K�H1�$�	q["�de���������jf � �BF�WT�7<�9�F+�#*��}�t�8cA �v�������M2�χ�`6�3  8퓕ɷC�~_���pw��d�A�JOTl_K���fXTR��U���t�8Ը�n�B�b�E&y)��	w�J�I�Z_	Q��Q���L70�(��SCg:<�䶮�f�46�`֟�w�:vN��Pz��p��� �Mj���*kc*�,���Ԡֺ�j��8o�UQ.@���:�����h�}�k��"d�Wu����+�/�|ǭ��UQy����%��Y�Ѩ��Vq��WDy�tP�r���]p���y�&��]�a�_U�gS��b�Η�}��b*j�I���֤�'��Α�i^-�@�ݫ��О���:J���j������7�j���ah�����5z���3��*+u�E�A���34�ThA"������[�vj�A�����
�0�@�KF6;'Zx;Fd�'l6s��xM� @.�	�q3�����jա����x�(���$fR�K�i����I��.�F�՘#�O�L�k ���2(ؒUJA����}S�I���k�ֆ�.h�N�����K7�]�'�5�xx�sQY+ZE�:{�`;����*�;o�%�:�:'�jhN8�"`�~̪���)a酪����S�%�r�]���A@���,�qcc���0 ����f�V�j��A1G�G�\��!(+�s��6B"�i�@ gY>��6,rm�
(�HBǏƣ\�m����+��[��)�Ԡ�J_)�Uu,
_�f4g�o"�f��5��o��N�ܷ���k2n�ܸ�Z%���N��h�5*�����t
��l��w�Ț`3T.�$f�~�I>H9�z�/5���wU8���\�B@�����{�3�\UQ�!�Cf�Fc.�{�5ct��I�=�����*N/E������OG�k�6�����5��\�6��^���j���g���Ye�'�Q@ t��>�� ���l]m�S��WMv��\ei����r�r��'���V��0T�W��h���tL�SL�`P��! h�벭��M�r������1�Dʀe��2���LP
�*�h��Ӌ�c�:�M"����2��:+;l���/e��*��$�{��*�Y-U���g�D���Z% �E��%��wh���p��5����]�-+��Q��]���rP�0�$M�	P@�i?�U�J���gB:G��.��������i�Į�a���'��'}Gt+"��u����&��5�	��0��ؠ	r,$���v��7?)�D�ϻO��!���Ei� �T6�>��~ �>AK���T��'�`U�#��}UaX�V��35ᤶ%wY��zT�V�D,tQ��ͩ#�6C�K#��8��,�.c���.�?ߤ��> ~��g7�P��DV�b�\փ�袤_�����kk��V
�zKH��M*�
^��~�n��D�!y8�T=?碕�vz �Qݖ�(��.������
�T���| ���?>o���� �~�0w�2��}G�*S� �7kS�����$���f/nI:f�����G[�+�R�y��FSlD�:�9�O��V�c�X�
���;�2 �T"A̅?��Ηsс}0��&?�s����*�t��È���)���n���!]V�)i�L͈?#����r�����Ds��ɚ�/f'��:rTuڊ\��&�@��ю�Q�h��q�2c�A�"��gb|H��B^��Ï���.��^�%���"6D����o� ���xQ�p�*U��a3�����q����9�fX9�
�������4-F��z�3ӊ�W1J���V�4�D]����}��Q��G��3���Ex7˳]�IM���aG��0�=�s�#<Z�"�J���N�2M:m�]39m��"���\z����:9�U>�ߛfֈxU �'�j|�`�l-P`�qjSj��;;k.+�T����e'��%�!��䇑�~��BXw��p�r��)s�1f��U��,)��֫���m��ZL2��L���,��LEQ��X3��&����)e��ew"�:��["Jw�x>���]|�=O��D:)�e�~�T�n�0 +�g���'!�U`�)��V[k��u�ϣC`^*�R�VA���q5�����@�<�rn�FU�@sV��N^��T_�����3�n<2�)���_I�ku��s���FM�wb�!����}إ�\���)-�$�[E��l����[,�ԟa;'�s�u7�_�&͞Rݐ)�L[yK��������  ����t=�X�}c�B�i���M��<�Y����]����W�>5o`(�.���e�&��0���:m�5 ��/S}*�Ӕq��3Ɋ`0��|��$��>>:]�Ut��o�)5����u�VVU#��]s"$F�h��v{�uB\��t�`�9�pA�АՁM��5��I6Uie�^��� �&|U%}����"�����[UC��F�_��«{����F�-X�.H8���x. `J�N	x�.��P'c�Y.�%M0HM��)��G�w�}nʹ~�r
���E�j,�l<d5��N�]�(�"��uR.��f߽��EO��d�!k�QS�gMk��k�����9 y�];��R52    Q�xO7f�k,�Ĭ���o`QL�v���ʙ=�RǨ�	|�-��H;�{�A��(��Ol��,_]��ޖ�4��	��gP�~��9��h�p=�˼�*�	�c����Q�>d�j��k\I"f����U��Ŭ�o�T�2&�K�<�*J�^�����h�@x�?A�+4�N �7{ł���R��c��?���/[5�;�Օ �&�,��&2o�����չo��K����U�Us]�􊲎�XB�VEGf	�@/x���YA�ђ����gV���u��� \]��]IU��<U��)o���OSd,,%�U��`	C��z��(x2��5$B6�:+"��u:��]�c8��4W���E�q#Yz�_f�~$����%>TQ�BTo��ndS�8a�{�M݃gl�U��wOC� <Uv膇���:k��Ȕ��!r�(w�s���^�5,��2��� O`���?��.Ԩ�{={H��7]����D"h�z�y��VU!�E�<�x;�Qո�`.g{���+���Դ���ƢA3*B�B��ZPA�߻���7���R�IS7,�^���\�"�<��c�����D}����ɉn�.2��Rz´ �vxN��P�\���~���>�x�2x��/��zT��U��M97h:9�_��E��˪As�1l�t�+�MP���g��E����e�Q�7լ)ʠ�	;�EN��u"��#s���I���hc�>�ABTɋ�c\AT��0�9���x,��.ۧB"d�Nc�tǩ�iMI �75�k��NL��B���u�d/�FM��L����p�;QKEo� Ms�.G����x�z�\T�5���
1�=u�t���$t9���]�HQY]�2��M�mW3v���.A� u������ʩ�a��0�f� ��3
��6�5��Y������7�q�2E0�^��������p�ޔ�!�>������J���K��T5 ~�V�+k��`�y���/7䙪����>M8�|3h��Zh�K�Z�W���Ȓ.m�r��}�pĸ����ф*�2�zj�B�aJ9�]Jap�U�{�.�����Rt����X���S����[���ܤ�~ߚg�ج��4
�CU�Y��X��!k�Wѽ���8yK�1zͼ��6����Y���7)��4]��{-�a��EW�)�o+VyD���%p@��um��Ct/FZjN�(I�o�	<|!���ņ{��s�U6��mk9V�h~��sb�5��[r%��N�;��DX�R�KƱ��?]���Tԭ�t�H���Őf�� �ףy�e6�ߋ��4�1Ԍ���N�⸉�颤ۃ�1y�.~�k(U
1v�p�'�WU�$��2�O,s�==���mͷI�s�Z,�?9=U�g]�GH�%.��1M̐¡�����3B1�<���U&A==�<�{ �t��wy3­�e4�
Յ��"�+k\Ԙ�Q���Z{�e�����۞uu��Q�U��v�uCl��:��F	�z�3c���֚!�����Mt��X�(ʊk�ef��� �Ϣ��U%A^�h$�/c},B�е�]�z�Q�r��^,��~�XgH|��+��<ͮG���i^�GF/�˛4I���V��C9�o��u�U=S��e!������9�l�QR����1���:z���m)Eܪ�F&tV8c���XR͈�Q��F{�묙ڳl�A���^y�$���{^���UպP���ElZz�5Ӥ De r+誆�w�]�m�k��*1�1��������ܕ�T�~�H�	4��bTG�UDE��S��9�\u���y�ŝ[N%��Jϩ��q|����	�4.p��]����!�� gWnR7Q��'M~;�����u˦�����tu���	����Vu�K�חi�x0�)����%":® Ձ�hli�u��הǩ����l�s�s22ue.&X��3G5�=K?��(����Κ%�>��<MWʙr���`\*�������v��!67
+z�WZ!HE�r�: �x���z>X�0E�\g��[;�?Bv���,�t.�'����90
�����/�aË-4h>.�����lJ�G����1��dU!4<���ͽ����d��%|p.]KQi�)n���=���r>��E�C���VM������2f�%��8�zPy-tv������b��T���~�`[a�*��?s9��ߛt��n;K���d�C�B���"�	j��j�Qi�]v��_#c�����V5e/U�J��ك���7�!��mU��]f«�k$�]�i��EM	U�޳ȲZ�e�*$EwZ����`�:Z����:�3�L�[H����eW�r<z�]�Pe��U�Ԅ�����{<�8hڹ�P9��	g����?:���,\I��AB��>�z�<�5�.�=���U�-�T,�,8WO|1>���f}>v�������瓢a|Qv����v���F���K�o��U����g9��ުY3Q�~D���a�Q�b����o���Uh�3�U�|�������.Z��tn7�j/�}��UR4��E2+���&���KK�u��p�f��� ��5����N�RҤ��Z�2�Ш�z�AS����
�8��CR���U�q�g��Y*��wUm� ��]�[����ց�� �\1vbd.����o'׫�u-1�{(ϕ�Eأ�X�e��:BAk#���/���,�$�֟�K4iEw#�brP1>�]С��w�z�o�$��YLP	g�b=�N��U=m���l�����<WvT�&��)�b��G��\C��T�?|5SԊ�W�g2u���k��Ӥ����)�b���Ĥ�5�J%n]���5ŕ��9���H���F��S�O�Mqw�U���۔U���$�`%�tx7������{��Oי�{U��jL��а���X!2��BvXd=H�DӺ�yi��O��^'��0�x��T9��Ae�q>�2�{J��=�A!��r����ǲ�A5E�[�DӔ�r9m��b��m�N*�VϜՄ66N��X���V�3�wM���5A����`Z�UחF������JI�t;_C���3�D�)Hӻ��F��8���4QT�EW�֕�-���FK���kޛ�s)͜��$��	(&��jv�e�K%�^�ux��Sw}Ө)�!$�F5�(i�Wn�H��8X�F�U5B��V%���9]n@����T��S���ٿ7#]��� n�JL%Á�	�{dqZ��ҙ�����GO��Å0g�﹙��V7?S�f���Eg�s!H�S燐�.�pA*�[���Ar�����J�~t�Q/�O�$�jJ�����Y�K#�y�1?{Yt�S��갩8u~��FU��u�Q����أZ�;g����ho:S{�X����c��7Xt�ۥmt����PWsƓ�W��nC��7�v�Q~P�4�Zo�yT<g����UjNEg0���=N�ONunb�sB�惀Mi4EC�˪�𚲆F�|3:�j��Yu-Ak�Q�M_1GlZ/�g��b$]l[��x����ӽj��&8,gu��G�������4~�ا�Mlu��ح#��D�F�z��>���Bx!߫%��,L�!�끑	�p�>�7�e�4?9:_�����Ɂ�Ł���f{{Ro��g#�y3^J$@�i8�_m�n[c��ٰ���IH�ϛ)]e�^��������OJ�N�Z�=�-���ęyw�׶s =�ـ�jX5l�D~jU�4z�B��I]W���)t�����9*���tB���9i�Ҹ���f��b4Dڼ4��e�Ď�&�y� �* ��ֶe�����O��Hw{��Fx.�Z$��@�3�P�x�|?F����FKtD#\N�wN7+W1P�⤡9��"�D�fʙ�$ݲ���ж(�g��XP4M�2of^X~����V��f

�fT͋P SeĲj��P���𢲒n@&���wp�f�!�^&���b`��.{�	�j*(#�8Iͥ�P�'�ȩ���!���5e��r��y�1�S�~��ź.4aa,�F�%H��u�V�L��O(]��U3���nU�r�� �  ��{��N_y��w{'����$�����t����\۾t�0ntݞ
�oRD?/�ɓP/*��=\D���`��d=5Ī�*��n��K�ūA3��v%�5��M�/]��]E���?�=�7)"^��������}⤆�~�s��D���ar����w�n
���`x��j�J�2�F�X͵��p���ۋ5˨`�~����8+_aG4��<ūF��)U���쓆u��u��:��+9ԦO�)��b�����pxn�y�Te4�w���j���P�в9ڸ�zR3��a��tn���ӌ:�T7�s5n��11ddD�}�(�D8c\��Z���1�b
�ҧ��s��B��2էT_��W_NM�yU�W5V����JP��`XQpI7#8W�Cw���6M�Q;[�
�Ȫ�e��k20���r���S��r3��5C�j��ߩb<¾��35���	�������Sk0�
�w�]� &NHč{m�B׮.�2AWѦ������|Ǫ.�-8�Q��ځ��@Y7���4�t�r'e��j����a���t��I����K�E����kΖUA�M��ҍ^���_�'�<�8v��NSQ@��]Մa�lJD7�jh���IE4�i&�?�
oġ�ST|���yG���p�u���~��t���ь��тD�|�W�
���L��Qx�y��S�A�b3��vW��;��J��D*��"���g4_���]V|n1`�α7�R|�+Sw�k��M�uAB�*5�
�Y�g���ҕAW�f������r�4[�f�s�=�Ɛ�R�\iXu˞.D�J���ŴZ���B�_ ����j�G5���^������(6"0�{��ҳ�H���"00���7�I���eʠw�D�Y���g(���!�\��j'QȜ���]�'��w^Pf�W�J��T��7�	5@��:�M��U��ߋ���)l.�m��t����e�r�Y>_ְi����T*�{ّ�<~B���N�H�F-����$_Ok>���%�\����;�F��n��~]���vA^~J�>	��;�"�!:��J{�9j��]�~��;�������D���34<�6��r�iG�������,���z�Z� ��{[��;��o�n@��g,�߫��V�5����1]���L�b��v��t�D��A'�i;�rݟ�*Y��f0=l\������8��fɔQ�m$|}�h,bU�H�uP��4@�/H�u��Ȍ)>y����W��W�l�Ä�<I�b�F�����3��d����b�xGe�E�K���'��(��n�>��Z5�^!Vӵ�2dKW.蒎f�F�Ϟ����;��-_C�J4LE�Tm!UO�Ǜ�R+D��1���we����7��4Mʯ�T��_Pu�`돷��J����kZ�������5�6GM4�in���Lp�O�%j����}��t����B#�dv������ΰH�tw�U+�mgfxm�0 W����?�������Ϩ�?���:��n��R�ѝ3��A?U]_$�]�	��,�AUo��1a��j:z?i��/��������*C�@s=/-�˱N6��~:�c��.�J"��,�T����������ĚB��o�,y5����٨ZE������b���lAC���5�|B���+�R_�g(`�.`cC�7�N���9��@�t�`�a*��\�̹���33��x��E�T[	ꞕu��ƨ�i�{���T��;}Y������y�����4�      T      x������ � �      U      x������ � �      V      x������ � �      W   �   x�u�=n1F�S���̏�C�+E��R��6��٤�"At������fѐ^�-1��-�X���ՂI�E�xӊ�d=;��;@֨��0NQv��pq��
R}A<��K;����L�@ř�?﷏��}��=�/Ԉ��⎡3j]�텃����� �ςܤ��%���q:C�D��
��6�@�}�hЖ�+L���Q�`�Xm�O��T��?�g��gگ�����75g^a     