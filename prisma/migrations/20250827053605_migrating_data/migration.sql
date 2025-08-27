-- CreateEnum
CREATE TYPE "AccommodationType" AS ENUM ('HOTEL', 'RESORT', 'INN', 'APARTMENT');

-- CreateEnum
CREATE TYPE "UserRoleType" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "role" "UserRoleType" NOT NULL DEFAULT 'ADMIN',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ(6),
    "account_id" UUID NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Destination" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "transpo_info" TEXT NOT NULL,
    "email" VARCHAR(320),
    "phone" VARCHAR(20),
    "website" VARCHAR(2048),
    "facebook" VARCHAR(255),
    "address" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "three_sixty_imageUrl" VARCHAR(2048),
    "imageUrl_1" VARCHAR(2048),
    "imageUrl_2" VARCHAR(2048),
    "imageUrl_3" VARCHAR(2048),
    "imageUrl_4" VARCHAR(2048),
    "imageUrl_5" VARCHAR(2048),
    "videoUrl" VARCHAR(2048),
    "count" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accommodation" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "type" "AccommodationType" NOT NULL,
    "email" VARCHAR(320),
    "phone" VARCHAR(20),
    "website" VARCHAR(2048),
    "facebook" VARCHAR(255),
    "address" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "three_sixty_imageUrl" VARCHAR(2048),
    "imageUrl_1" VARCHAR(2048),
    "imageUrl_2" VARCHAR(2048),
    "imageUrl_3" VARCHAR(2048),
    "imageUrl_4" VARCHAR(2048),
    "imageUrl_5" VARCHAR(2048),
    "videoUrl" VARCHAR(2048),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterTransportation" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "guidelines_and_policies" TEXT NOT NULL,
    "rebooking_supercharges" TEXT NOT NULL,
    "refund_policy" TEXT NOT NULL,
    "duration" INTEGER DEFAULT 0,
    "expected_fee" DOUBLE PRECISION NOT NULL,
    "departure_days" JSONB NOT NULL,
    "departure_time" TEXT NOT NULL,
    "imageUrl_1" VARCHAR(2048),
    "imageUrl_2" VARCHAR(2048),
    "imageUrl_3" VARCHAR(2048),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "WaterTransportation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "email" VARCHAR(320),
    "phone" VARCHAR(20),
    "website" VARCHAR(2048),
    "facebook" VARCHAR(255),
    "three_sixty_imageUrl" VARCHAR(2048),
    "imageUrl_1" VARCHAR(2048),
    "imageUrl_2" VARCHAR(2048),
    "imageUrl_3" VARCHAR(2048),
    "imageUrl_4" VARCHAR(2048),
    "imageUrl_5" VARCHAR(2048),
    "videoUrl" VARCHAR(2048),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandTransportation" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "vehicleType" VARCHAR(50),
    "capacity" INTEGER,
    "operator" TEXT,
    "contactNumber" TEXT,
    "baseFee" DOUBLE PRECISION,
    "feeDescription" TEXT,
    "imageUrl_1" VARCHAR(2048),
    "imageUrl_2" VARCHAR(2048),
    "imageUrl_3" VARCHAR(2048),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "LandTransportation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl_1" VARCHAR(2048),
    "imageUrl_2" VARCHAR(2048),
    "imageUrl_3" VARCHAR(2048),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "About" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl_1" VARCHAR(2048),
    "imageUrl_2" VARCHAR(2048),
    "imageUrl_3" VARCHAR(2048),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_created_at_idx" ON "User"("created_at");

-- CreateIndex
CREATE INDEX "User_updated_at_idx" ON "User"("updated_at");

-- CreateIndex
CREATE INDEX "User_deleted_at_idx" ON "User"("deleted_at");

-- CreateIndex
CREATE INDEX "User_first_name_idx" ON "User"("first_name");

-- CreateIndex
CREATE INDEX "User_last_name_idx" ON "User"("last_name");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE INDEX "RefreshToken_token_idx" ON "RefreshToken"("token");

-- CreateIndex
CREATE INDEX "Destination_name_idx" ON "Destination"("name");

-- CreateIndex
CREATE INDEX "Destination_email_idx" ON "Destination"("email");

-- CreateIndex
CREATE INDEX "Destination_latitude_longitude_idx" ON "Destination"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "Accommodation_name_idx" ON "Accommodation"("name");

-- CreateIndex
CREATE INDEX "Accommodation_email_idx" ON "Accommodation"("email");

-- CreateIndex
CREATE INDEX "Accommodation_latitude_longitude_idx" ON "Accommodation"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "WaterTransportation_name_idx" ON "WaterTransportation"("name");

-- CreateIndex
CREATE INDEX "Restaurant_name_idx" ON "Restaurant"("name");

-- CreateIndex
CREATE INDEX "LandTransportation_name_idx" ON "LandTransportation"("name");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
