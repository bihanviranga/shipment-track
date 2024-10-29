-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Client', 'Admin');

-- CreateTable
CREATE TABLE "User" (
    "userID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Client',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "ShipmentStatus" (
    "statusID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShipmentStatus_pkey" PRIMARY KEY ("statusID")
);

-- CreateTable
CREATE TABLE "Shipment" (
    "shipmentID" TEXT NOT NULL,
    "senderID" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "recipientAddress" TEXT NOT NULL,
    "statusID" TEXT NOT NULL,
    "trackingNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Shipment_pkey" PRIMARY KEY ("shipmentID")
);

-- CreateTable
CREATE TABLE "ShipmentTracking" (
    "ID" TEXT NOT NULL,
    "shipmentID" TEXT NOT NULL,
    "shipmentStatusID" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShipmentTracking_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Shipment_trackingNumber_key" ON "Shipment"("trackingNumber");

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_senderID_fkey" FOREIGN KEY ("senderID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_statusID_fkey" FOREIGN KEY ("statusID") REFERENCES "ShipmentStatus"("statusID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShipmentTracking" ADD CONSTRAINT "ShipmentTracking_shipmentID_fkey" FOREIGN KEY ("shipmentID") REFERENCES "Shipment"("shipmentID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShipmentTracking" ADD CONSTRAINT "ShipmentTracking_shipmentStatusID_fkey" FOREIGN KEY ("shipmentStatusID") REFERENCES "ShipmentStatus"("statusID") ON DELETE RESTRICT ON UPDATE CASCADE;
